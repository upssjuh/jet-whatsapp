// Sistema de Monitoramento com Alertas
const axios = require('axios');

const CONFIG = {
    serverUrl: process.env.SERVER_URL || 'http://localhost:3000',
    checkInterval: 5 * 60 * 1000, // 5 minutos
    alertEmail: process.env.ALERT_EMAIL || 'seu-email@example.com',
    webhookTimeout: 60 * 60 * 1000, // 1 hora sem webhooks = alerta
};

class Monitor {
    constructor() {
        this.lastWebhookTime = Date.now();
        this.consecutiveErrors = 0;
        this.maxConsecutiveErrors = 3;
    }

    async verificarSaude() {
        try {
            const response = await axios.get(`${CONFIG.serverUrl}/status`, {
                timeout: 10000
            });

            const status = response.data;
            this.consecutiveErrors = 0;

            console.log(`\n✅ [${new Date().toLocaleTimeString()}] Servidor OK`);
            console.log(`   Webhooks: ${status.webhooksRecebidos}`);
            console.log(`   Mensagens: ${status.mensagensEnviadas}`);
            console.log(`   Token: ${status.tokenAtivo ? '✅' : '❌'}`);

            // Verificar se há webhooks recentes
            const ultimaAtividadeTime = new Date(status.ultimaAtividade).getTime();
            const tempoSemAtividade = Date.now() - ultimaAtividadeTime;

            if (tempoSemAtividade > CONFIG.webhookTimeout) {
                this.alertar('⚠️ ALERTA', `Nenhum webhook recebido há ${Math.round(tempoSemAtividade / 60000)} minutos`);
            }

            // Verificar erros
            if (status.errosRecentes && status.errosRecentes.length > 0) {
                console.log(`   ⚠️ Erros recentes: ${status.errosRecentes.length}`);
                status.errosRecentes.forEach(erro => {
                    console.log(`      - ${erro.mensagem}`);
                });
            }

            return true;

        } catch (error) {
            this.consecutiveErrors++;
            console.error(`\n❌ [${new Date().toLocaleTimeString()}] Erro ao verificar servidor`);
            console.error(`   ${error.message}`);
            console.error(`   Tentativas falhadas: ${this.consecutiveErrors}/${this.maxConsecutiveErrors}`);

            if (this.consecutiveErrors >= this.maxConsecutiveErrors) {
                this.alertar('🚨 CRÍTICO', `Servidor offline por ${this.consecutiveErrors} verificações consecutivas`);
                this.consecutiveErrors = 0; // Reset para não spammar alertas
            }

            return false;
        }
    }

    alertar(tipo, mensagem) {
        const timestamp = new Date().toLocaleString('pt-BR');
        const alerta = `[${timestamp}] ${tipo}: ${mensagem}`;

        console.log(`\n${'='.repeat(60)}`);
        console.log(alerta);
        console.log(`${'='.repeat(60)}\n`);

        // Aqui você pode integrar com:
        // - Enviar email
        // - Enviar SMS
        // - Postar no Slack
        // - Enviar para PagerDuty
        // - Etc.

        this.enviarAlertaSlack(tipo, mensagem);
    }

    async enviarAlertaSlack(tipo, mensagem) {
        const webhookUrl = process.env.SLACK_WEBHOOK_URL;
        if (!webhookUrl) return;

        try {
            await axios.post(webhookUrl, {
                text: `${tipo} - JET WhatsApp Integration`,
                attachments: [{
                    color: tipo.includes('CRÍTICO') ? 'danger' : 'warning',
                    text: mensagem,
                    ts: Math.floor(Date.now() / 1000)
                }]
            });
        } catch (error) {
            console.error('Erro ao enviar alerta Slack:', error.message);
        }
    }

    iniciar() {
        console.log(`\n🔍 Monitor iniciado`);
        console.log(`📍 Servidor: ${CONFIG.serverUrl}`);
        console.log(`⏱️  Intervalo: ${CONFIG.checkInterval / 60000} minutos`);
        console.log(`📧 Email de alerta: ${CONFIG.alertEmail}\n`);

        // Verificação inicial
        this.verificarSaude();

        // Verificações periódicas
        setInterval(() => this.verificarSaude(), CONFIG.checkInterval);
    }
}

// Iniciar monitor
const monitor = new Monitor();
monitor.iniciar();

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Monitor finalizado');
    process.exit(0);
});
