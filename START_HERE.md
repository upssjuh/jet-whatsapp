# 🎯 COMECE AQUI

Bem-vindo! Este é seu guia rápido para começar com a integração JET + WhatsApp.

---

## ⚡ 5 Minutos para Começar

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Configurar Variáveis
```bash
copy .env.example .env
# Edite .env com suas credenciais
```

### 3️⃣ Iniciar Servidor (Terminal 1)
```bash
npm start
```

Você verá:
```
🚀 Servidor rodando na porta 3000
📍 Ambiente: development
📊 Status disponível em: http://localhost:3000/status
🧪 Teste webhook em: http://localhost:3000/test-webhook
Aguardando chamadas da JET...
```

### 4️⃣ Testar (Terminal 2)
```bash
npm test
```

### 5️⃣ Monitorar (Terminal 3)
```bash
npm run monitor
```

---

## 📚 Documentação por Caso de Uso

### 🏠 Executar Localmente
👉 [SETUP_LOCAL.md](./SETUP_LOCAL.md)

### 🌐 Deploy em Nuvem
👉 [deploy-guide.md](./deploy-guide.md)

### 🧪 Testar com ngrok
👉 [NGROK_SETUP.md](./NGROK_SETUP.md)

### 🔔 Configurar Alertas Slack
👉 [SLACK_ALERTS.md](./SLACK_ALERTS.md)

### ⚡ Referência Rápida
👉 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

### 🆘 Resolver Problemas
👉 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

### 🏗️ Entender Arquitetura
👉 [ARCHITECTURE.md](./ARCHITECTURE.md)

### ✅ Checklist de Implementação
👉 [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)

---

## 🎯 Seu Próximo Passo

Escolha um:

### Opção A: Testar Localmente
```bash
npm install
npm start
npm test
```
👉 Vá para [SETUP_LOCAL.md](./SETUP_LOCAL.md)

### Opção B: Deploy em Nuvem
```bash
git push origin main
```
👉 Vá para [deploy-guide.md](./deploy-guide.md)

### Opção C: Resolver Problema
```bash
npm run monitor
```
👉 Vá para [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📊 O que Você Tem

✅ **Servidor Node.js** - Recebe webhooks da JET
✅ **Integração JET** - Busca dados de pedidos
✅ **Integração Convert** - Envia WhatsApp
✅ **Monitoramento** - Alertas em tempo real
✅ **Documentação** - Completa e detalhada
✅ **Scripts de Teste** - Para validar tudo

---

## 🚀 Fluxo Completo

```
1. npm install
   ↓
2. Configurar .env
   ↓
3. npm start (Terminal 1)
   ↓
4. npm test (Terminal 2)
   ↓
5. npm run monitor (Terminal 3)
   ↓
6. Configurar webhook na JET
   ↓
7. Testar com ngrok (opcional)
   ↓
8. Deploy em nuvem
   ↓
9. Monitorar em produção
```

---

## 🔧 Comandos Essenciais

```bash
# Instalar
npm install

# Iniciar servidor
npm start

# Testar webhook
npm test

# Monitorar
npm run monitor

# Ver status
curl http://localhost:3000/status

# Expor localmente
ngrok http 3000
```

---

## 📁 Arquivos Importantes

| Arquivo | O que é |
|---------|---------|
| `index.js` | Servidor principal |
| `.env` | Suas credenciais |
| `test-webhook.js` | Script de teste |
| `monitoring.js` | Monitor com alertas |

---

## ❓ Perguntas Frequentes

### P: Como testar localmente?
R: `npm start` + `npm test`

### P: Como expor para a internet?
R: Use ngrok: `ngrok http 3000`

### P: Como fazer deploy?
R: Veja [deploy-guide.md](./deploy-guide.md)

### P: Como receber alertas?
R: Veja [SLACK_ALERTS.md](./SLACK_ALERTS.md)

### P: Algo não funciona?
R: Veja [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 🎓 Aprenda Mais

- **Arquitetura**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Checklist**: [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md)
- **Resumo**: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- **README**: [README.md](./README.md)

---

## 🆘 Precisa de Ajuda?

1. **Verificar logs**: `npm run monitor`
2. **Ver status**: `curl http://localhost:3000/status`
3. **Ler documentação**: Veja links acima
4. **Contatar suporte**:
   - JET: suporte@plataformaneo.com.br
   - Convert: suporte@convert.com.br

---

## ✨ Próximos Passos

1. ✅ Instalar dependências
2. ✅ Configurar `.env`
3. ✅ Testar localmente
4. ✅ Configurar webhook na JET
5. ✅ Deploy em nuvem
6. ✅ Monitorar em produção

---

**Pronto para começar?** 🚀

```bash
npm install
npm start
```

Depois, abra outro terminal:
```bash
npm test
```

Sucesso! 🎉

---

**Última Atualização**: 23/01/2026
**Status**: ✅ Pronto para Usar
