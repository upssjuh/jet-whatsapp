# ⚡ Quick Reference - Comandos Essenciais

## 🚀 Iniciar Servidor

```bash
npm start
```

## 🧪 Testar Webhook

```bash
npm test
```

## 📊 Monitorar em Tempo Real

```bash
npm run monitor
```

## 🌐 Expor Localmente (ngrok)

```bash
ngrok http 3000
```

## 📈 Ver Status

```bash
curl http://localhost:3000/status
```

---

## 📁 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `index.js` | Servidor principal |
| `test-webhook.js` | Script de teste |
| `monitoring.js` | Monitor com alertas |
| `.env` | Credenciais (não commitar) |
| `.env.example` | Template de variáveis |

---

## 🔧 Configuração Rápida

### 1. Instalar Dependências
```bash
npm install
```

### 2. Copiar Variáveis
```bash
copy .env.example .env
```

### 3. Editar `.env`
```
NODE_ENV=development
PORT=3000
JET_INTEGRATION_KEY=sua_chave
JET_USERNAME=seu_usuario
JET_PASSWORD=sua_senha
JET_STORE_ID=seu_store_id
CONVERT_TOKEN=seu_token
CONVERT_TEMPLATE=seu_template
```

### 4. Iniciar
```bash
npm start
```

---

## 📚 Documentação

- **Execução Local**: [SETUP_LOCAL.md](./SETUP_LOCAL.md)
- **Deploy em Nuvem**: [deploy-guide.md](./deploy-guide.md)
- **ngrok Setup**: [NGROK_SETUP.md](./NGROK_SETUP.md)
- **README**: [README.md](./README.md)

---

## 🎯 Fluxo de Desenvolvimento

```
1. npm install
   ↓
2. cp .env.example .env
   ↓
3. Editar .env com credenciais
   ↓
4. npm start (Terminal 1)
   ↓
5. npm test (Terminal 2)
   ↓
6. npm run monitor (Terminal 3)
   ↓
7. ngrok http 3000 (Terminal 4)
   ↓
8. Configurar webhook na JET
   ↓
9. Testar e validar
   ↓
10. Deploy em nuvem
```

---

## 🚨 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Cannot find module" | `npm install` |
| "401 Unauthorized" | Verificar credenciais em `.env` |
| "ECONNREFUSED" | Servidor não está rodando |
| "Webhook não chega" | Usar ngrok ou verificar URL |
| "Token expirado" | Renovar token automaticamente |

---

## 📞 Endpoints

```bash
# Receber webhook
POST /webhook

# Ver status
GET /status

# Testar webhook (dev)
POST /test-webhook
```

---

## 🌐 Deploy Rápido

### Railway
```bash
git push origin main
# Deploy automático
```

### Heroku
```bash
heroku create seu-app
git push heroku main
```

### DigitalOcean
1. Conectar GitHub
2. Configurar variáveis
3. Deploy

---

## 💡 Dicas

- ✅ Sempre usar `.env` para credenciais
- ✅ Testar localmente antes de fazer deploy
- ✅ Monitorar em tempo real com `npm run monitor`
- ✅ Usar ngrok para testar webhooks localmente
- ✅ Verificar logs regularmente
- ✅ Rotacionar tokens a cada 90 dias

---

## 📊 Monitoramento

```bash
# Status em tempo real
curl http://localhost:3000/status

# Resposta esperada
{
  "ambiente": "development",
  "porta": 3000,
  "webhooksRecebidos": 5,
  "mensagensEnviadas": 5,
  "ultimaAtividade": "2026-01-23T10:30:00.000Z",
  "errosRecentes": [],
  "tokenAtivo": true
}
```

---

**Última atualização**: 23/01/2026
