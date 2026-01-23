# 🌐 Guia de Deploy em Nuvem

## Comparação de Plataformas

| Plataforma | Custo | Setup | Monitoramento | Recomendação |
|-----------|-------|-------|---------------|--------------|
| **Railway** | $5-20/mês | ⭐⭐⭐ Fácil | ✅ Excelente | ✅ Melhor custo-benefício |
| **Heroku** | $7-50/mês | ⭐⭐⭐ Fácil | ✅ Bom | ⚠️ Mais caro |
| **AWS Lambda** | $0.20/1M | ⭐⭐ Médio | ✅ Excelente | ⚠️ Complexo |
| **DigitalOcean** | $5-12/mês | ⭐⭐ Médio | ✅ Bom | ✅ Alternativa |
| **Render** | $7-25/mês | ⭐⭐⭐ Fácil | ✅ Bom | ✅ Alternativa |

---

## 🚀 Opção 1: Railway (RECOMENDADO)

### Passo 1: Preparar Repositório
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

### Passo 2: Criar Conta Railway
1. Acesse https://railway.app
2. Faça login com GitHub
3. Autorize Railway

### Passo 3: Deploy
1. Clique em "New Project"
2. Selecione "Deploy from GitHub"
3. Escolha seu repositório
4. Railway detectará automaticamente Node.js

### Passo 4: Configurar Variáveis
1. Vá para "Variables"
2. Adicione todas as variáveis do `.env`:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `JET_INTEGRATION_KEY=...`
   - `JET_USERNAME=...`
   - `JET_PASSWORD=...`
   - `JET_STORE_ID=...`
   - `CONVERT_TOKEN=...`
   - `CONVERT_TEMPLATE=...`

### Passo 5: Deploy Automático
- Railway faz deploy automático a cada push no GitHub
- Seu app estará disponível em: `https://seu-app.railway.app`

### Monitoramento Railway
```bash
# Ver logs em tempo real
railway logs

# Ver status
railway status
```

---

## 🚀 Opção 2: Heroku

### Passo 1: Instalar Heroku CLI
```bash
# Windows
choco install heroku-cli

# Ou baixe em: https://devcenter.heroku.com/articles/heroku-cli
```

### Passo 2: Login e Deploy
```bash
heroku login
heroku create seu-app-name
git push heroku main
```

### Passo 3: Configurar Variáveis
```bash
heroku config:set NODE_ENV=production
heroku config:set JET_INTEGRATION_KEY=seu_valor
heroku config:set JET_USERNAME=seu_valor
heroku config:set JET_PASSWORD=seu_valor
heroku config:set JET_STORE_ID=seu_valor
heroku config:set CONVERT_TOKEN=seu_valor
heroku config:set CONVERT_TEMPLATE=seu_valor
```

### Passo 4: Verificar Deploy
```bash
heroku logs --tail
heroku open
```

---

## 🚀 Opção 3: AWS Lambda (Serverless)

### Passo 1: Instalar Serverless Framework
```bash
npm install -g serverless
serverless login
```

### Passo 2: Criar Configuração
Crie arquivo `serverless.yml`:
```yaml
service: jet-whatsapp

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    NODE_ENV: production
    JET_INTEGRATION_KEY: ${env:JET_INTEGRATION_KEY}
    JET_USERNAME: ${env:JET_USERNAME}
    JET_PASSWORD: ${env:JET_PASSWORD}
    JET_STORE_ID: ${env:JET_STORE_ID}
    CONVERT_TOKEN: ${env:CONVERT_TOKEN}
    CONVERT_TEMPLATE: ${env:CONVERT_TEMPLATE}

functions:
  api:
    handler: handler.main
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true

plugins:
  - serverless-http
```

### Passo 3: Instalar Dependência
```bash
npm install serverless-http
```

### Passo 4: Criar Handler
Crie arquivo `handler.js`:
```javascript
const serverless = require('serverless-http');
const app = require('./index');

module.exports.main = serverless(app);
```

### Passo 5: Deploy
```bash
serverless deploy
```

---

## 🚀 Opção 4: DigitalOcean App Platform

### Passo 1: Conectar GitHub
1. Acesse https://cloud.digitalocean.com
2. Vá para "Apps"
3. Clique "Create App"
4. Selecione seu repositório GitHub

### Passo 2: Configurar
- Detectará automaticamente Node.js
- Configure porta: 3000
- Adicione variáveis de ambiente

### Passo 3: Deploy
- Clique "Deploy"
- DigitalOcean fará deploy automático

---

## 📊 Monitoramento em Produção

### Health Check Automático
Adicione ao seu `index.js`:
```javascript
// Verificar saúde a cada 5 minutos
setInterval(async () => {
    try {
        const response = await axios.get('http://localhost:3000/status');
        console.log('✅ Health check OK:', response.data.webhooksRecebidos);
    } catch (error) {
        console.error('❌ Health check falhou:', error.message);
        // Enviar alerta
    }
}, 5 * 60 * 1000);
```

### Alertas Recomendados
1. **Servidor offline** - Verificar a cada 5 min
2. **Sem webhooks por 1 hora** - Possível problema na JET
3. **Mais de 5 erros em 10 min** - Problema na integração
4. **Token expirado** - Renovar automaticamente

### Ferramentas de Monitoramento
- **Uptime Robot** (Gratuito): https://uptimerobot.com
- **Better Stack** (Pago): https://betterstack.com
- **Datadog** (Pago): https://www.datadoghq.com

---

## 🔄 CI/CD com GitHub Actions

Crie arquivo `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - name: Deploy to Railway
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
        run: |
          npm install -g @railway/cli
          railway deploy
```

---

## 💡 Dicas Importantes

1. **Sempre use HTTPS em produção**
2. **Rotacione tokens a cada 90 dias**
3. **Mantenha logs por pelo menos 30 dias**
4. **Faça backup das configurações**
5. **Teste webhooks antes de ir para produção**
6. **Configure alertas para erros críticos**
7. **Monitore uso de banda e CPU**

---

## 🆘 Troubleshooting

### App não inicia
```bash
# Ver logs
railway logs
# ou
heroku logs --tail
```

### Variáveis de ambiente não carregam
```bash
# Verificar variáveis
railway variables
# ou
heroku config
```

### Webhook não funciona
1. Verificar URL pública do app
2. Testar com curl: `curl https://seu-app.com/status`
3. Verificar firewall/CORS
4. Verificar logs em tempo real

---

## 📞 Suporte

- **Railway**: https://docs.railway.app
- **Heroku**: https://devcenter.heroku.com
- **AWS**: https://docs.aws.amazon.com/lambda
- **DigitalOcean**: https://docs.digitalocean.com/products/app-platform
