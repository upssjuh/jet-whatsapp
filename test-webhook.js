// Script para testar webhooks localmente
const axios = require('axios');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const ORDER_ID = process.env.ORDER_ID || '123456';

async function testarWebhook() {
    try {
        console.log(`\n🧪 Enviando webhook de teste para ${SERVER_URL}/webhook`);
        console.log(`📦 ID do Pedido: ${ORDER_ID}\n`);

        const response = await axios.post(`${SERVER_URL}/webhook`, {
            Event: 'Pedido.Enviado',
            ModifiedId: ORDER_ID
        });

        console.log('✅ Webhook enviado com sucesso!');
        console.log('Resposta:', response.data);

        // Aguarda um pouco e verifica o status
        await new Promise(r => setTimeout(r, 2000));
        
        const statusResponse = await axios.get(`${SERVER_URL}/status`);
        console.log('\n📊 Status do servidor:');
        console.log(JSON.stringify(statusResponse.data, null, 2));

    } catch (error) {
        console.error('❌ Erro ao enviar webhook:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Dados:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testarWebhook();
