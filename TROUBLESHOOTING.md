# 🆘 Guia Completo de Troubleshooting

## 🔍 Diagnóstico Rápido

### Passo 1: Verificar se o Servidor está Rodando
```bash
curl http://localhost:3000/status
```

**Esperado:**
```json
{
  "ambiente": "development",
  "porta": 3000,
  "webhooksRecebidos": 0,
  "tokenAtivo": true
}
```

**Se não responder:** Servidor não está rodando
```bash
npm start
```

---

## 🚨 Problemas Comuns

### 1. "Cannot find module 'express'"

**Causa:** Dependências não instaladas

**Solução:**
```bash
npm install
```

**Verificar:**
```bash
npm list express
```

---

### 2. "Cannot find module 'dotenv'"

**Causa:** dotenv não instalado

**Solução:**
```bash
npm install dotenv
```

**Ou reinstalar tudo:**
```bash
rm -r node_modules package-lock.json
npm install
```

---

### 3. "ECONNREFUSED 127.0.0.1:3000"

**Causa:** Servidor não está rodando

**Solução:**
```bash
# Terminal 1
npm start

# Verificar se está rodando
curl http://localhost:3000/status
```

**Se ainda não funcionar:**
```bash
# Verificar se porta 3000 está em uso
netstat -ano | findstr :3000

# Se estiver em uso, matar processo
taskkill /PID <PID> /F

# Tentar novamente
npm start
```

---

### 4. "401 Unauthorized" na JET

**Causa:** Credenciais inválidas

**Solução:**
1. Verificar `.env`:
```bash
cat .env
```

2. Validar credenciais:
   - `JET_INTEGRATION_KEY` correto?
   - `JET_USERNAME` correto?
   - `JET_PASSWORD` correto?
   - `JET_STORE_ID` correto?

3. Testar login manualmente:
```bash
curl -X POST https://adm-pedido-neo1.plataformaneo.com.br/api/v1/auth \
  -H "Content-Type: application/json" \
  -d '{
    "IntegrationKey": "seu_valor",
    "UserName": "seu_valor",
    "Password": "seu_valor",
    "StoreID": "seu_valor"
  }'
```

---

### 5. "401 Unauthorized" na Convert

**Causa:** Token inválido ou expirado

**Solução:**
1. Verificar token em `.env`:
```bash
echo %CONVERT_TOKEN%
```

2. Gerar novo token:
   - Acessar https://app.convert.com.br
   - Gerar novo token
   - Atualizar `.env`

3. Testar token:
```bash
curl -X GET https://api.convert.com.br/v1/account \
  -H "Authorization: Bearer seu_token"
```

---

### 6. "Webhook não chega"

**Causa:** URL não acessível

**Solução 1: Usar ngrok**
```bash
# Terminal 1
npm start

# Terminal 2
ngrok http 3000

# Copiar URL: https://abc123.ngrok.io
# Configurar na JET: https://abc123.ngrok.io/webhook
```

**Solução 2: Verificar firewall**
```bash
# Windows Firewall
netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Program Files\nodejs\node.exe"
```

**Solução 3: Testar manualmente**
```bash
npm test
```

---

### 7. "Mensagem não é enviada"

**Causa:** Erro na Convert API

**Solução:**
1. Verificar logs:
```bash
npm run monitor
```

2. Verificar template:
   - Template existe na Convert?
   - Nome do template correto em `.env`?

3. Verificar telefone:
   - Formato correto? (55 + DDD + número)
   - Número válido?

4. Testar manualmente:
```bash
curl -X POST https://api.convert.com.br/v1/whatsapp/send_template \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{
    "channel_id": "whatsapp",
    "to": "5511999999999",
    "type": "template",
    "template": {
      "name": "seu_template",
      "language": {"code": "pt_BR"},
      "components": [{
        "type": "body",
        "parameters": [
          {"type": "text", "text": "João"},
          {"type": "text", "text": "ABC123"}
        ]
      }]
    }
  }'
```

---

### 8. "Muitos erros consecutivos"

**Causa:** Problema na integração

**Solução:**
1. Verificar logs:
```bash
npm run monitor
```

2. Verificar status:
```bash
curl http://localhost:3000/status
```

3. Reiniciar servidor:
```bash
# Ctrl+C para parar
# npm start para iniciar novamente
```

4. Verificar conectividade:
```bash
ping google.com
ping api.convert.com.br
ping adm-pedido-neo1.plataformaneo.com.br
```

---

### 9. "Token expirado"

**Causa:** Token JWT expirou

**Solução:**
O sistema renova automaticamente, mas se não funcionar:

1. Forçar novo login:
```javascript
// No código, adicione:
cachedJetToken = null;
await loginJet();
```

2. Ou reinicie o servidor:
```bash
npm start
```

---

### 10. "Porta 3000 já está em uso"

**Causa:** Outro processo usando a porta

**Solução 1: Usar outra porta**
```bash
set PORT=3001
npm start
```

**Solução 2: Matar processo**
```bash
# Encontrar PID
netstat -ano | findstr :3000

# Matar processo
taskkill /PID <PID> /F

# Iniciar novamente
npm start
```

---

## 🔧 Troubleshooting Avançado

### Verificar Variáveis de Ambiente

```bash
# Windows CMD
echo %NODE_ENV%
echo %PORT%
echo %JET_INTEGRATION_KEY%

# Windows PowerShell
$env:NODE_ENV
$env:PORT
$env:JET_INTEGRATION_KEY
```

### Verificar Conectividade

```bash
# Testar JET API
curl -v https://adm-pedido-neo1.plataformaneo.com.br/api/v1/auth

# Testar Convert API
curl -v https://api.convert.com.br/v1/account

# Testar DNS
nslookup adm-pedido-neo1.plataformaneo.com.br
nslookup api.convert.com.br
```

### Verificar Logs Detalhados

```bash
# Adicionar ao index.js
console.log('DEBUG:', JSON.stringify(response.data, null, 2));

# Ou usar npm com debug
DEBUG=* npm start
```

### Verificar Certificado SSL

```bash
# Testar certificado
curl -v https://adm-pedido-neo1.plataformaneo.com.br

# Se erro de certificado, pode ser necessário:
# Adicionar ao código:
const agent = new https.Agent({ rejectUnauthorized: false });
```

---

## 📊 Checklist de Diagnóstico

- [ ] Node.js instalado? `node --version`
- [ ] npm instalado? `npm --version`
- [ ] Dependências instaladas? `npm list`
- [ ] `.env` existe? `cat .env`
- [ ] Variáveis corretas? `echo %CONVERT_TOKEN%`
- [ ] Servidor rodando? `curl http://localhost:3000/status`
- [ ] Porta 3000 livre? `netstat -ano | findstr :3000`
- [ ] Internet funcionando? `ping google.com`
- [ ] JET API acessível? `curl https://adm-pedido-neo1.plataformaneo.com.br`
- [ ] Convert API acessível? `curl https://api.convert.com.br`

---

## 🎯 Fluxo de Resolução

```
Problema Detectado
    ↓
1. Verificar Logs
   npm run monitor
    ↓
2. Verificar Status
   curl http://localhost:3000/status
    ↓
3. Verificar Variáveis
   echo %CONVERT_TOKEN%
    ↓
4. Verificar Conectividade
   ping api.convert.com.br
    ↓
5. Testar Manualmente
   npm test
    ↓
6. Reiniciar Servidor
   npm start
    ↓
7. Limpar Cache
   rm -r node_modules
   npm install
    ↓
8. Contatar Suporte
   suporte@convert.com.br
```

---

## 📞 Contatos de Suporte

| Serviço | Email | Docs |
|---------|-------|------|
| JET | suporte@plataformaneo.com.br | https://docs.plataformaneo.com.br |
| Convert | suporte@convert.com.br | https://docs.convert.com.br |
| Node.js | - | https://nodejs.org/docs |

---

## 🔍 Ferramentas de Debug

### 1. Postman
```
Testar APIs manualmente
- Importar endpoints
- Testar com diferentes payloads
- Ver respostas detalhadas
```

### 2. ngrok
```
Expor servidor local
- Testar webhooks
- Ver requisições em tempo real
- Inspecionar headers
```

### 3. VS Code Debugger
```
Adicionar ao .vscode/launch.json:
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/index.js",
      "restart": true,
      "console": "integratedTerminal"
    }
  ]
}
```

### 4. Chrome DevTools
```
Inspecionar requisições HTTP
- Abrir DevTools (F12)
- Aba Network
- Ver requisições e respostas
```

---

## 💡 Dicas de Debug

1. **Adicionar logs estratégicos**
```javascript
console.log('🔍 DEBUG:', variavel);
```

2. **Usar try-catch com detalhes**
```javascript
try {
  // código
} catch (error) {
  console.error('❌ Erro:', error.message);
  console.error('Stack:', error.stack);
}
```

3. **Verificar tipos de dados**
```javascript
console.log('Tipo:', typeof variavel);
console.log('Valor:', JSON.stringify(variavel, null, 2));
```

4. **Usar debugger do Node.js**
```bash
node inspect index.js
```

---

## 🚀 Recuperação Rápida

### Se Tudo Falhar
```bash
# 1. Parar servidor
# Ctrl+C

# 2. Limpar tudo
rm -r node_modules package-lock.json

# 3. Reinstalar
npm install

# 4. Verificar .env
cat .env

# 5. Iniciar novamente
npm start

# 6. Testar
npm test
```

---

**Última Atualização**: 23/01/2026
**Versão**: 1.0.0
