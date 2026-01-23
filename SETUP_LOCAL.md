# 🚀 Guia de Execução Local - JET + WhatsApp

## Pré-requisitos
- Node.js 14+ instalado
- npm ou yarn
- Dois terminais (CMD) abertos

## 1️⃣ Instalação de Dependências

```bash
npm install
```

Ou se precisar instalar o dotenv:
```bash
npm install dotenv
```

## 2️⃣ Configuração de Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
```bash
copy .env.example .env
```

2. Edite o `.env` com suas credenciais reais:
```
NODE_ENV=development
PORT=3000
JET_INTEGRATION_KEY=sua_chave
JET_USERNAME=seu_usuario
JET_PASSWORD=sua_senha
JET_STORE_ID=seu_store_id
CONVERT_TOKEN=seu_token_convert
CONVERT_TEMPLATE=seu_template
```

## 3️⃣ Execução Local (Dois Terminais)

### Terminal 1 - Servidor Principal
```bash
node index.js
```

Você verá:
```
🚀 Servidor rodando na porta 3000
📍 Ambiente: development
📊 Status disponível em: http://localhost:3000/status
🧪 Teste webhook em: http://localhost:3000/test-webhook
Aguardando chamadas da JET...
```

### Terminal 2 - Enviar Webhook de Teste
```bash
node test-webhook.js
```

Ou com ID de pedido customizado:
```bash
set ORDER_ID=999999 && node test-webhook.js
```

## 4️⃣ Monitoramento

### Ver Status em Tempo Real
```bash
curl http://localhost:3000/status
```

Resposta esperada:
```json
{
  "ambiente": "development",
  "porta": 3000,
  "webhooksRecebidos": 1,
  "mensagensEnviadas": 1,
  "ultimaAtividade": "2026-01-23T10:30:00.000Z",
  "errosRecentes": [],
  "tokenAtivo": true
}
```

## 5️⃣ Próximos Passos - Deploy em Nuvem

### Opção 1: Heroku (Gratuito com limitações)
```bash
npm install -g heroku-cli
heroku login
heroku create seu-app-name
git push heroku main
```

### Opção 2: Railway (Recomendado)
1. Acesse https://railway.app
2. Conecte seu repositório GitHub
3. Configure variáveis de ambiente
4. Deploy automático

### Opção 3: AWS Lambda + API Gateway
- Converta para serverless com `serverless-http`
- Configure triggers automáticos
- Monitoramento via CloudWatch

### Opção 4: DigitalOcean App Platform
1. Conecte repositório GitHub
2. Configure variáveis de ambiente
3. Deploy com 1 clique

## 6️⃣ Monitoramento em Produção

### Alertas Recomendados
- Verificar `/status` a cada 5 minutos
- Alertar se `webhooksRecebidos` não aumenta por 1 hora
- Alertar se `errosRecentes` > 5 em 10 minutos

### Exemplo com cron (Linux/Mac):
```bash
*/5 * * * * curl -s http://seu-dominio.com/status | grep -q "tokenAtivo" || echo "ALERTA: Servidor offline"
```

## 7️⃣ Troubleshooting

### Erro: "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### Erro: "ECONNREFUSED" ao conectar na JET
- Verifique se as credenciais estão corretas
- Verifique se a URL da JET está acessível
- Tente fazer login manualmente

### Erro: "401 Unauthorized" na Convert
- Verifique se o token está válido
- Verifique se o template existe
- Teste o token diretamente na API da Convert

### Webhook não dispara
- Verifique se a JET consegue acessar seu servidor
- Use ngrok para expor localmente: `ngrok http 3000`
- Configure o webhook da JET com a URL do ngrok

## 📝 Estrutura de Arquivos
```
.
├── index.js              # Servidor principal
├── test-webhook.js       # Script de teste
├── .env                  # Variáveis de ambiente (não commitar)
├── .env.example          # Template de variáveis
├── package.json          # Dependências
└── SETUP_LOCAL.md        # Este arquivo
```

## 🔒 Segurança

- ✅ Nunca commitar `.env` com credenciais reais
- ✅ Usar variáveis de ambiente em produção
- ✅ Rotacionar tokens regularmente
- ✅ Usar HTTPS em produção
- ✅ Implementar rate limiting
- ✅ Validar webhooks com assinatura

## 📞 Suporte

Para dúvidas sobre:
- **JET API**: Contate suporte JET
- **Convert API**: Contate suporte Convert
- **Deploy**: Consulte documentação da plataforma escolhida
