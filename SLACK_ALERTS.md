# 🔔 Configurar Alertas no Slack

Receba notificações em tempo real sobre problemas na integração JET + WhatsApp.

## 📋 Pré-requisitos

- Workspace Slack criado
- Permissão para criar webhooks
- Canal Slack para alertas

## 🔧 Passo 1: Criar Webhook no Slack

### 1.1 Acessar Slack API
1. Vá para https://api.slack.com/apps
2. Clique em "Create New App"
3. Escolha "From scratch"
4. Nome: "JET WhatsApp Alerts"
5. Workspace: Selecione seu workspace

### 1.2 Ativar Incoming Webhooks
1. No menu esquerdo, clique em "Incoming Webhooks"
2. Ative "Incoming Webhooks"
3. Clique em "Add New Webhook to Workspace"
4. Selecione o canal: `#alertas` (ou crie um novo)
5. Autorize

### 1.3 Copiar URL do Webhook
Você verá uma URL como:
```
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

## 🔐 Passo 2: Configurar Variável de Ambiente

### 2.1 Adicionar ao `.env`
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

### 2.2 Adicionar ao `.env.example`
```bash
SLACK_WEBHOOK_URL=seu_webhook_url_aqui
```

## 🚀 Passo 3: Ativar Alertas

O sistema já está configurado para enviar alertas! Basta ter a variável `SLACK_WEBHOOK_URL` definida.

### Tipos de Alertas

1. **⚠️ Aviso**: Nenhum webhook por 1 hora
2. **🚨 Crítico**: Servidor offline por 3 verificações
3. **❌ Erro**: Falha ao enviar mensagem WhatsApp
4. **🔄 Token**: Token expirado ou inválido

## 📊 Passo 4: Testar Alertas

### Terminal 1: Servidor
```bash
npm start
```

### Terminal 2: Monitor
```bash
npm run monitor
```

Você verá alertas no Slack quando:
- Servidor fica offline
- Nenhum webhook por 1 hora
- Mais de 5 erros em 10 minutos

## 🎨 Personalizar Mensagens

Edite `monitoring.js` para customizar alertas:

```javascript
async enviarAlertaSlack(tipo, mensagem) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) return;

    try {
        await axios.post(webhookUrl, {
            text: `${tipo} - JET WhatsApp Integration`,
            attachments: [{
                color: tipo.includes('CRÍTICO') ? 'danger' : 'warning',
                text: mensagem,
                ts: Math.floor(Date.now() / 1000),
                // Adicione mais campos aqui
                fields: [
                    {
                        title: "Ambiente",
                        value: process.env.NODE_ENV,
                        short: true
                    },
                    {
                        title: "Servidor",
                        value: process.env.SERVER_URL,
                        short: true
                    }
                ]
            }]
        });
    } catch (error) {
        console.error('Erro ao enviar alerta Slack:', error.message);
    }
}
```

## 📧 Alternativa: Alertas por Email

Se preferir email em vez de Slack:

### Instalar Nodemailer
```bash
npm install nodemailer
```

### Configurar `.env`
```bash
EMAIL_SERVICE=gmail
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=sua-senha-app
EMAIL_TO=seu-email@example.com
```

### Adicionar ao `monitoring.js`
```javascript
const nodemailer = require('nodemailer');

async enviarAlertaEmail(tipo, mensagem) {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `[${tipo}] JET WhatsApp Integration`,
            html: `
                <h2>${tipo}</h2>
                <p>${mensagem}</p>
                <p>Timestamp: ${new Date().toLocaleString('pt-BR')}</p>
            `
        });
    } catch (error) {
        console.error('Erro ao enviar email:', error.message);
    }
}
```

## 🔔 Alertas Recomendados

### 1. Servidor Offline
```javascript
if (consecutiveErrors >= maxConsecutiveErrors) {
    this.alertar('🚨 CRÍTICO', 'Servidor offline');
}
```

### 2. Sem Webhooks
```javascript
if (tempoSemAtividade > CONFIG.webhookTimeout) {
    this.alertar('⚠️ ALERTA', 'Nenhum webhook por 1 hora');
}
```

### 3. Taxa de Erro Alta
```javascript
if (status.errosRecentes.length > 5) {
    this.alertar('⚠️ ALERTA', `${status.errosRecentes.length} erros recentes`);
}
```

### 4. Token Expirado
```javascript
if (!status.tokenAtivo) {
    this.alertar('🔄 AVISO', 'Token JET pode estar expirado');
}
```

## 📱 Configurar Notificações Slack

### No Slack:
1. Abra o canal `#alertas`
2. Clique em "Notificações"
3. Escolha "Todas as mensagens"
4. Ative notificações push no celular

## 🎯 Exemplo de Fluxo

```
Servidor offline
    ↓
Monitor detecta erro
    ↓
Envia alerta para Slack
    ↓
Você recebe notificação
    ↓
Acessa dashboard
    ↓
Verifica logs
    ↓
Resolve problema
```

## 🆘 Troubleshooting

### Alerta não chega
1. Verificar URL do webhook
2. Verificar se `SLACK_WEBHOOK_URL` está em `.env`
3. Testar webhook manualmente:
```bash
curl -X POST https://hooks.slack.com/services/... \
  -H 'Content-type: application/json' \
  -d '{"text":"Teste"}'
```

### Muitos alertas
1. Aumentar intervalo de verificação em `monitoring.js`
2. Aumentar limite de erros consecutivos
3. Aumentar timeout de webhooks

### Webhook expirado
1. Gerar novo webhook em https://api.slack.com/apps
2. Atualizar `SLACK_WEBHOOK_URL` em `.env`
3. Reiniciar monitor

## 📚 Recursos

- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)
- [Slack Message Formatting](https://api.slack.com/reference/surfaces/formatting)
- [Slack API Documentation](https://api.slack.com/docs)

## 🔒 Segurança

- ✅ Nunca compartilhe URL do webhook
- ✅ Regenere webhook se comprometido
- ✅ Use variáveis de ambiente
- ✅ Não commitar webhook URL no Git

---

**Configuração Slack Completa!** 🎉
