# 🌐 Usando ngrok para Testar Webhooks Localmente

ngrok cria um túnel seguro que expõe seu servidor local para a internet, permitindo que a JET envie webhooks para sua máquina.

## 📥 Instalação

### Windows
```bash
# Usando Chocolatey
choco install ngrok

# Ou baixe em: https://ngrok.com/download
```

### Mac
```bash
brew install ngrok
```

### Linux
```bash
# Baixe em: https://ngrok.com/download
# Ou use:
sudo apt-get install ngrok
```

## 🚀 Uso Básico

### Terminal 1: Servidor Principal
```bash
npm start
```

Você verá:
```
🚀 Servidor rodando na porta 3000
📍 Ambiente: development
```

### Terminal 2: Expor com ngrok
```bash
ngrok http 3000
```

Você verá algo como:
```
ngrok by @inconshreveable

Session Status                online
Account                       seu-email@example.com
Version                       3.0.0
Region                        us (United States)
Forwarding                    https://abc123def456.ngrok.io -> http://localhost:3000
Connections                   0/20

Web Interface                 http://127.0.0.1:4040
```

## 📋 Configurar Webhook na JET

1. Acesse o painel da JET
2. Vá para "Integrações" ou "Webhooks"
3. Configure a URL como: `https://abc123def456.ngrok.io/webhook`
4. Selecione eventos: "Pedido.Enviado" ou "Order.Shipped"
5. Salve

## 🧪 Testar Webhook

### Terminal 3: Enviar Teste
```bash
# Teste local (sem ngrok)
npm test

# Ou teste via ngrok
curl -X POST https://abc123def456.ngrok.io/webhook \
  -H "Content-Type: application/json" \
  -d '{"Event":"Pedido.Enviado","ModifiedId":"123456"}'
```

## 📊 Monitorar Requisições

ngrok fornece um painel web para ver todas as requisições:

```
http://127.0.0.1:4040
```

Aqui você pode:
- Ver todas as requisições recebidas
- Inspecionar headers e body
- Reenviar requisições
- Testar diferentes payloads

## 🔐 Autenticação ngrok

Para usar ngrok sem limitações:

```bash
# Criar conta em: https://ngrok.com
# Obter seu token de autenticação

ngrok config add-authtoken seu_token_aqui

# Agora pode usar sem limitações
ngrok http 3000
```

## 💡 Dicas Importantes

### 1. URL Muda a Cada Execução
```bash
# Cada vez que você executa ngrok, gera uma URL diferente
# Solução: Use ngrok com domínio customizado (plano pago)
```

### 2. Manter URL Fixa (Plano Pago)
```bash
ngrok http 3000 --subdomain seu-dominio
# URL será: https://seu-dominio.ngrok.io
```

### 3. Monitorar Logs em Tempo Real
```bash
# Terminal 1: Servidor
npm start

# Terminal 2: ngrok
ngrok http 3000

# Terminal 3: Monitor
npm run monitor

# Terminal 4: Ver logs do ngrok
curl http://127.0.0.1:4040/api/requests/http
```

### 4. Testar com Diferentes Payloads
```bash
# Criar arquivo test-payload.json
{
  "Event": "Pedido.Enviado",
  "ModifiedId": "999999"
}

# Enviar
curl -X POST https://abc123def456.ngrok.io/webhook \
  -H "Content-Type: application/json" \
  -d @test-payload.json
```

## 🔄 Fluxo Completo de Teste

```
┌─────────────────────────────────────────────────────────┐
│ Terminal 1: npm start                                   │
│ Servidor rodando em http://localhost:3000               │
└─────────────────────────────────────────────────────────┘
                          ↑
                          │
┌─────────────────────────────────────────────────────────┐
│ Terminal 2: ngrok http 3000                             │
│ Expõe em https://abc123def456.ngrok.io                  │
└─────────────────────────────────────────────────────────┘
                          ↑
                          │
┌─────────────────────────────────────────────────────────┐
│ JET API                                                 │
│ Envia webhook para https://abc123def456.ngrok.io/webhook│
└─────────────────────────────────────────────────────────┘
                          ↓
                          │
┌─────────────────────────────────────────────────────────┐
│ Terminal 3: npm run monitor                             │
│ Monitora status e alertas                               │
└─────────────────────────────────────────────────────────┘
```

## 🆘 Troubleshooting

### ngrok não conecta
```bash
# Verificar internet
ping google.com

# Verificar se porta 3000 está em uso
netstat -ano | findstr :3000

# Matar processo na porta 3000
taskkill /PID <PID> /F
```

### Webhook não chega
1. Verificar URL no painel ngrok: `http://127.0.0.1:4040`
2. Verificar se servidor está rodando: `npm start`
3. Verificar logs: `npm run monitor`
4. Testar manualmente: `npm test`

### Erro "tunnel session failed"
```bash
# Fazer login
ngrok config add-authtoken seu_token

# Ou usar nova sessão
ngrok http 3000 --region us
```

## 📚 Recursos

- [ngrok Docs](https://ngrok.com/docs)
- [ngrok Pricing](https://ngrok.com/pricing)
- [ngrok Dashboard](https://dashboard.ngrok.com)

## 🎯 Próximos Passos

Após testar localmente com ngrok:

1. ✅ Validar que webhooks chegam corretamente
2. ✅ Testar envio de mensagens WhatsApp
3. ✅ Verificar monitoramento e alertas
4. ✅ Deploy em nuvem (Railway, Heroku, etc)
5. ✅ Configurar webhook permanente na JET

Veja [deploy-guide.md](./deploy-guide.md) para deploy em produção.
