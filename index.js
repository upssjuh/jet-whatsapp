// ARQUIVO: index.js
const https = require('https');
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const JET_AUTH_DATA = {
    "IntegrationKey": process.env.JET_INTEGRATION_KEY || "MjAwMDUxOTU4Mw==",
    "UserName": process.env.JET_USERNAME || "Y2NnbF9hZG1wZWRpZG8=",
    "Password": process.env.JET_PASSWORD || "YWRtcGVkaWRvY2NnbDJAMjRBM0JCMkIyQw==",
    "StoreID": process.env.JET_STORE_ID || "MjAwMDUxOQ=="
};

const CONVERT_CONFIG = {
    token: process.env.CONVERT_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI2OTNjMGIyYWVkM2NjMGZjZGQ1N2U4YzAiLCJpYXQiOjE3NjcxMTM1NTJ9.SkL8Kn8JJCsoDIaYUFr9CKYmgkmTJiRhpC5loBxMMhQ',
    templateName: process.env.CONVERT_TEMPLATE || 'aviso_coleta_ccgl1'
};

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

let cachedJetToken = null;
let lastTokenTime = null;
const TOKEN_EXPIRY = 3600000; // 1 hora em ms

// Sistema de monitoramento
const monitoring = {
    webhooksRecebidos: 0,
    mensagensEnviadas: 0,
    erros: [],
    ultimaAtividade: new Date(),
    
    registrarErro(erro) {
        this.erros.push({
            timestamp: new Date(),
            mensagem: erro
        });
        if (this.erros.length > 100) this.erros.shift();
    },
    
    getStatus() {
        return {
            ambiente: ENVIRONMENT,
            porta: PORT,
            webhooksRecebidos: this.webhooksRecebidos,
            mensagensEnviadas: this.mensagensEnviadas,
            ultimaAtividade: this.ultimaAtividade,
            errosRecentes: this.erros.slice(-5),
            tokenAtivo: !!cachedJetToken
        };
    }
};

async function loginJet() {
    console.log("Tentando fazer login na JET...");
    
    const url = 'https://adm-pedido-neo1.plataformaneo.com.br/api/v1/adm_order/InsertOrder';
    
    try {
        const agent = new https.Agent({ rejectUnauthorized: false });
        
        const response = await axios.post(url, JET_AUTH_DATA, { httpsAgent: agent });

        if (response.data && response.data.access_token) {
            cachedJetToken = response.data.access_token;
            lastTokenTime = Date.now();
            console.log("✅ LOGIN SUCESSO! Token gerado: " + cachedJetToken.substring(0, 20) + "...");
            return cachedJetToken;
        } else {
            console.log("Login retornou estrutura diferente:", response.data);
            monitoring.registrarErro("Login JET retornou estrutura inesperada");
            return null;
        }
    } catch (error) {
        const mensagem = `Falha ao logar em: ${url}`;
        console.error(mensagem);
        if (error.response) {
            console.error(`Status: ${error.response.status} - ${error.response.statusText}`);
            console.error("Mensagem:", JSON.stringify(error.response.data));
        } else {
            console.error("Erro:", error.message);
        }
        monitoring.registrarErro(mensagem);
        return null;
    }
}
async function getJetAuthHeaders() {
    if (!cachedJetToken) {
        await loginJet();
    }
    return {
        'accept': 'application/json',
        'Authorization': `Bearer ${cachedJetToken}`
    };
}

async function buscarPedidoJet(orderId) {
    try {
        console.log(`Buscando pedido ${orderId}...`);
        
        let headers = await getJetAuthHeaders();
        const url = `https://adm-pedido-neo1.plataformaneo.com.br/api/v1/adm_order/GetOrder/${orderId}`;
        const agent = new https.Agent({ rejectUnauthorized: false });

        const response = await axios.get(url, { 
            headers: headers,
            params: { integrationKey: JET_AUTH_DATA.IntegrationKey },
            httpsAgent: agent 
        });

        return response.data;

    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("Token parece inválido (401). Renovando login...");
            cachedJetToken = null;
            
            await loginJet();
            
            try {
                headers = await getJetAuthHeaders();
                console.log(`Tentando buscar pedido ${orderId} novamente...`);
                const retryResponse = await axios.get(url, { 
                    headers: headers,
                    params: { integrationKey: JET_AUTH_DATA.IntegrationKey },
                    httpsAgent: agent 
                });
                return retryResponse.data;
            } catch (retryError) {
                console.error("Falha na segunda tentativa:", retryError.message);
                return null;
            }
        }
        
        console.error("Erro ao buscar pedido:", error.message);
        return null;
    }
}

async function enviarWhatsapp(telefone, nome, rastreio, endereco) {
    console.log(`📱 Enviando WhatsApp para ${nome} (${telefone})...`);
    
    let phone = telefone.replace(/\D/g, '');
    if (!phone.startsWith('55')) phone = '55' + phone;

    try {
        await axios.post('https://api.convert.com.br/v1/whatsapp/send_template', {
            "channel_id": "whatsapp",
            "to": phone,
            "type": "template",
            "template": {
                "name": CONVERT_CONFIG.templateName,
                "language": { "code": "pt_BR" },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            { "type": "text", "text": nome },
                            { "type": "text", "text": rastreio },
                            { "type": "text", "text": endereco || "Não informado" }
                        ]
                    }
                ]
            }
        }, {
            headers: { 'Authorization': `Bearer ${CONVERT_CONFIG.token}` }
        });
        console.log("✅ Mensagem enviada com sucesso!");
        monitoring.mensagensEnviadas++;
        monitoring.ultimaAtividade = new Date();
    } catch (error) {
        const mensagem = `Erro na Convert: ${error.response?.data?.message || error.message}`;
        console.error("❌ " + mensagem);
        monitoring.registrarErro(mensagem);
    }
}

app.post('/webhook', async (req, res) => {
    res.status(200).send('Recebido');
    
    const evento = req.body;
    console.log('\n📨 Webhook recebido:', evento.Event);

    // Ignorar webhooks de teste e verificação
    if (evento.Event === 'NotifyURL.Checking' || !evento.ModifiedId) {
        console.log('⏭️  Ignorando webhook de teste/verificação');
        return;
    }

    monitoring.webhooksRecebidos++;
    monitoring.ultimaAtividade = new Date();

    if (evento.Event === 'Pedido.Enviado' || evento.Event === 'Order.Shipped') {
        const idPedido = evento.ModifiedId; 
        
        await new Promise(r => setTimeout(r, 2000));

        const dados = await buscarPedidoJet(idPedido);
        
        if (dados) {
            console.log("✅ Pedido encontrado! Cliente:", dados.Customer?.Name || dados.nameCustomer);

            let rastreio = dados.trackingLink || 
                           dados.Delivery?.TrackingCode || 
                           dados.historyListOrderStatus?.[0]?.trackingLink ||
                           "";

            if (rastreio && !rastreio.includes('http')) {
                console.log(`Transformando código ${rastreio} em link clicável...`);
                rastreio = `https://www.google.com/search?q=rastreio+${rastreio}`;
            }

            if (!rastreio) rastreio = "Aguardando atualização";

            const telefone = dados.phone1 || 
                             dados.phone2 || 
                             dados.Customer?.CellPhone || 
                             dados.Customer?.Telephone;
            
            const nome = dados.nameCustomer || dados.Customer?.Name || "Cliente";
            
            const endereco = dados.Address?.Street || 
                            dados.address || 
                            "Não informado";

            if (rastreio && telefone) {
                await enviarWhatsapp(telefone, nome, rastreio, endereco);
            } else {
                console.log('⚠️ Dados incompletos. Rastreio:', rastreio, 'Telefone:', telefone);
            }
        }
    }
});

// Endpoint de status para monitoramento
app.get('/status', (req, res) => {
    res.json(monitoring.getStatus());
});

// Endpoint para simular webhook (desenvolvimento local)
app.post('/test-webhook', async (req, res) => {
    console.log('\n🧪 TESTE: Simulando webhook...');
    const testEvent = {
        Event: 'Pedido.Enviado',
        ModifiedId: req.body.orderId || '123456'
    };
    
    // Chama o handler do webhook
    await new Promise(r => setTimeout(r, 100));
    res.json({ 
        mensagem: 'Webhook de teste enviado',
        evento: testEvent,
        status: monitoring.getStatus()
    });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 Ambiente: ${ENVIRONMENT}`);
    console.log(`📊 Status disponível em: http://localhost:${PORT}/status`);
    console.log(`🧪 Teste webhook em: http://localhost:${PORT}/test-webhook`);
    console.log('Aguardando chamadas da JET...\n');
    loginJet();
});
