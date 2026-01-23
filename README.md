# 🚀 JET + WhatsApp Integration

Automação que conecta a plataforma JET ao WhatsApp via Convert API para enviar rastreios de e-commerce instantaneamente.

## ✨ Funcionalidades

- ✅ Detecta automaticamente quando um pedido é enviado na JET
- ✅ Transforma código de rastreio em link clicável
- ✅ Dispara notificação WhatsApp via Convert
- ✅ Monitoramento em tempo real
- ✅ Sistema de alertas
- ✅ Pronto para deploy em nuvem

## 🛠️ Stack Técnico

- **Backend**: Node.js + Express
- **HTTP Client**: Axios
- **APIs**: JET API + Convert API
- **Autenticação**: JWT Bearer Token
- **Protocolos**: REST API, Webhooks

## 📋 Pré-requisitos

- Node.js 14+
- npm ou yarn
- Credenciais JET API
- Token Convert API

## 🚀 Quick Start

### 1. Instalação
```bash
npm install
```

### 2. Configuração
```bash
cp .env.example .env
# Edite .env com suas credenciais
```

### 3. Execução Local (Terminal 1)
```bash
npm start
```

### 4. Teste (Terminal 2)
```bash
npm test
```

## 📊 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/webhook` | Recebe webhooks da JET |
| GET | `/status` | Status em tempo real |
| POST | `/test-webhook` | Simula webhook (dev) |

## 📈 Monitoramento

### Ver Status
```bash
curl http://localhost:3000/status
```

### Monitorar em Tempo Real
```bash
npm run monitor
```

## 🌐 Deploy em Nuvem

### Railway (Recomendado)
```bash
git push origin main
# Railway faz deploy automático
```

### Heroku
```bash
heroku create seu-app
git push heroku main
heroku config:set NODE_ENV=production
```

Veja [deploy-guide.md](./deploy-guide.md) para mais opções.

## 📁 Estrutura

```
.
├── index.js              # Servidor principal
├── test-webhook.js       # Script de teste
├── monitoring.js         # Sistema de monitoramento
├── .env                  # Variáveis de ambiente
├── .env.example          # Template
├── package.json          # Dependências
├── SETUP_LOCAL.md        # Guia de execução local
├── deploy-guide.md       # Guia de deploy
└── README.md             # Este arquivo
```

## 🔒 Segurança

- ✅ Credenciais em variáveis de ambiente
- ✅ `.env` no `.gitignore`
- ✅ HTTPS em produção
- ✅ Validação de tokens
- ✅ Rate limiting recomendado

## 🆘 Troubleshooting

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "401 Unauthorized"
- Verifique credenciais no `.env`
- Verifique se tokens estão válidos
- Tente fazer login manualmente

### Webhook não dispara
- Verifique URL pública do servidor
- Use ngrok para expor localmente
- Verifique logs: `npm run monitor`

## 📚 Documentação

- [SETUP_LOCAL.md](./SETUP_LOCAL.md) - Execução local detalhada
- [deploy-guide.md](./deploy-guide.md) - Deploy em nuvem
- [JET API Docs](https://docs.plataformaneo.com.br)
- [Convert API Docs](https://docs.convert.com.br)

## 🤝 Contribuindo

1. Faça um fork
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Consulte os logs: `npm run monitor`
3. Teste com: `npm test`

---

**Desenvolvido com ❤️ para automação de e-commerce**
