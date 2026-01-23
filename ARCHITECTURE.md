# 🏗️ Arquitetura do Projeto

## 📊 Diagrama de Fluxo

```
┌─────────────────────────────────────────────────────────────────┐
│                         JET PLATFORM                            │
│                    (E-commerce Management)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Webhook: Pedido.Enviado
                             │ POST /webhook
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SEU SERVIDOR NODE.JS                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ index.js - Servidor Principal                           │  │
│  │                                                          │  │
│  │ 1. Recebe webhook da JET                                │  │
│  │ 2. Busca dados do pedido (GET /api/v1/adm_order)        │  │
│  │ 3. Extrai informações:                                  │  │
│  │    - Nome do cliente                                    │  │
│  │    - Telefone                                           │  │
│  │    - Código de rastreio                                 │  │
│  │ 4. Transforma rastreio em link clicável                 │  │
│  │ 5. Envia para Convert API                               │  │
│  │                                                          │  │
│  │ Endpoints:                                              │  │
│  │ - POST /webhook (recebe webhooks)                       │  │
│  │ - GET /status (status em tempo real)                    │  │
│  │ - POST /test-webhook (teste local)                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ monitoring.js - Sistema de Monitoramento                │  │
│  │                                                          │  │
│  │ 1. Verifica saúde a cada 5 minutos                       │  │
│  │ 2. Registra métricas:                                   │  │
│  │    - Webhooks recebidos                                 │  │
│  │    - Mensagens enviadas                                 │  │
│  │    - Erros ocorridos                                    │  │
│  │ 3. Dispara alertas:                                     │  │
│  │    - Servidor offline                                  │  │
│  │    - Sem webhooks por 1 hora                            │  │
│  │    - Muitos erros consecutivos                          │  │
│  │ 4. Envia para Slack                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ test-webhook.js - Script de Teste                       │  │
│  │                                                          │  │
│  │ 1. Simula webhook da JET                                │  │
│  │ 2. Envia para /webhook                                  │  │
│  │ 3. Verifica status                                      │  │
│  │ 4. Exibe resultado                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         │                              │                    │
         │                              │                    │
         ↓                              ↓                    ↓
    ┌─────────────┐          ┌──────────────────┐    ┌──────────────┐
    │ Convert API │          │  Slack Webhooks  │    │ Logs/Metrics │
    │ (WhatsApp)  │          │   (Alertas)      │    │  (Monitoring)│
    └─────────────┘          └──────────────────┘    └──────────────┘
         │
         ↓
    ┌─────────────┐
    │  Cliente    │
    │ (WhatsApp)  │
    └─────────────┘
```

---

## 🔄 Fluxo de Dados

### 1️⃣ Webhook Recebido
```
JET → POST /webhook
{
  "Event": "Pedido.Enviado",
  "ModifiedId": "123456"
}
```

### 2️⃣ Buscar Dados
```
GET /api/v1/adm_order/GetOrder/123456
Headers: Authorization: Bearer {token}
```

### 3️⃣ Processar Dados
```
{
  "nameCustomer": "João Silva",
  "phone1": "11999999999",
  "trackingLink": "ABC123XYZ"
}
```

### 4️⃣ Enviar WhatsApp
```
POST https://api.convert.com.br/v1/whatsapp/send_template
{
  "to": "5511999999999",
  "template": {
    "name": "aviso_coleta_ccgl1",
    "parameters": [
      "João Silva",
      "https://www.google.com/search?q=rastreio+ABC123XYZ"
    ]
  }
}
```

### 5️⃣ Cliente Recebe
```
📱 WhatsApp
"Olá João Silva! Seu rastreio: [link clicável]"
```

---

## 📁 Estrutura de Diretórios

```
jet-whatsapp-integration/
│
├── 📄 index.js                      # Servidor principal
├── 📄 test-webhook.js               # Script de teste
├── 📄 monitoring.js                 # Monitor com alertas
│
├── 📄 .env                          # Variáveis (não commitar)
├── 📄 .env.example                  # Template
├── 📄 .gitignore                    # Arquivos ignorados
│
├── 📄 package.json                  # Dependências
├── 📄 package-lock.json             # Lock file
│
├── 📚 README.md                     # Visão geral
├── 📚 SETUP_LOCAL.md                # Setup local
├── 📚 deploy-guide.md               # Deploy em nuvem
├── 📚 NGROK_SETUP.md                # Teste com ngrok
├── 📚 SLACK_ALERTS.md               # Alertas Slack
├── 📚 QUICK_REFERENCE.md            # Referência rápida
├── 📚 IMPLEMENTATION_CHECKLIST.md    # Checklist
├── 📚 PROJECT_SUMMARY.md            # Resumo
├── 📚 ARCHITECTURE.md               # Este arquivo
│
└── 📁 node_modules/                 # Dependências instaladas
```

---

## 🔐 Fluxo de Autenticação

```
┌─────────────────────────────────────────────────────────┐
│ 1. Login na JET                                         │
│                                                         │
│ POST /api/v1/auth                                       │
│ {                                                       │
│   "IntegrationKey": "...",                              │
│   "UserName": "...",                                    │
│   "Password": "...",                                    │
│   "StoreID": "..."                                      │
│ }                                                       │
│                                                         │
│ Response: { "access_token": "jwt_token" }              │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Cache Token                                          │
│                                                         │
│ cachedJetToken = "jwt_token"                            │
│ lastTokenTime = Date.now()                              │
│ TOKEN_EXPIRY = 3600000 (1 hora)                         │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Usar Token em Requisições                            │
│                                                         │
│ GET /api/v1/adm_order/GetOrder/123456                   │
│ Headers: {                                              │
│   "Authorization": "Bearer jwt_token"                   │
│ }                                                       │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Renovar Token se Expirado                            │
│                                                         │
│ if (Date.now() - lastTokenTime > TOKEN_EXPIRY) {        │
│   await loginJet()                                      │
│ }                                                       │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Estrutura de Dados

### Webhook Recebido
```javascript
{
  "Event": "Pedido.Enviado",
  "ModifiedId": "123456"
}
```

### Dados do Pedido (JET)
```javascript
{
  "nameCustomer": "João Silva",
  "phone1": "11999999999",
  "phone2": "11988888888",
  "trackingLink": "ABC123XYZ",
  "Delivery": {
    "TrackingCode": "ABC123XYZ"
  },
  "Customer": {
    "Name": "João Silva",
    "CellPhone": "11999999999",
    "Telephone": "1133333333"
  }
}
```

### Status do Servidor
```javascript
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

## 🚀 Ciclo de Vida da Requisição

```
1. Webhook Recebido
   └─ POST /webhook
      └─ Responde 200 OK imediatamente
         └─ Processa em background

2. Buscar Dados
   └─ GET /api/v1/adm_order/GetOrder/{id}
      └─ Se 401: Renovar token e tentar novamente
         └─ Extrair dados do cliente

3. Processar Dados
   └─ Validar telefone
      └─ Transformar rastreio em link
         └─ Preparar mensagem

4. Enviar WhatsApp
   └─ POST /v1/whatsapp/send_template
      └─ Se sucesso: Incrementar contador
         └─ Se erro: Registrar e alertar

5. Monitorar
   └─ Registrar métrica
      └─ Verificar saúde
         └─ Enviar alerta se necessário
```

---

## 🔄 Tratamento de Erros

```
Erro Detectado
    ↓
├─ 401 Unauthorized
│  └─ Renovar token
│     └─ Tentar novamente
│
├─ 500 Server Error
│  └─ Registrar erro
│     └─ Alertar
│        └─ Continuar processando
│
├─ Network Error
│  └─ Registrar erro
│     └─ Alertar
│        └─ Retry automático
│
└─ Validation Error
   └─ Registrar erro
      └─ Alertar
         └─ Continuar processando
```

---

## 📈 Métricas Coletadas

```
┌─────────────────────────────────────────┐
│ Webhooks Recebidos                      │
│ - Total de webhooks processados         │
│ - Taxa de sucesso                       │
│ - Taxa de erro                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Mensagens Enviadas                      │
│ - Total de mensagens                    │
│ - Taxa de entrega                       │
│ - Tempo médio de envio                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Erros Registrados                       │
│ - Tipo de erro                          │
│ - Frequência                            │
│ - Timestamp                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Saúde do Sistema                        │
│ - Uptime                                │
│ - Última atividade                      │
│ - Status do token                       │
└─────────────────────────────────────────┘
```

---

## 🌐 Integração com Plataformas

### Railway
```
GitHub → Railway → Seu App
         ↓
    Variáveis de Ambiente
    ↓
    Logs em Tempo Real
    ↓
    Deploy Automático
```

### Heroku
```
Git Push → Heroku → Seu App
           ↓
      Buildpack Node.js
      ↓
      Dyno
      ↓
      Logs
```

### AWS Lambda
```
GitHub → CodePipeline → Lambda
                        ↓
                   API Gateway
                   ↓
                   CloudWatch
```

---

## 🔒 Segurança em Camadas

```
┌─────────────────────────────────────────┐
│ Camada 1: Variáveis de Ambiente         │
│ - Credenciais não no código             │
│ - .env no .gitignore                    │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ Camada 2: Autenticação                  │
│ - JWT Bearer Token                      │
│ - Token refresh automático              │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ Camada 3: HTTPS                         │
│ - Criptografia em trânsito              │
│ - Certificado SSL/TLS                   │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ Camada 4: Validação                     │
│ - Validar entrada                       │
│ - Sanitizar dados                       │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ Camada 5: Logging                       │
│ - Logs sem dados sensíveis              │
│ - Auditoria de ações                    │
└─────────────────────────────────────────┘
```

---

## 📊 Escalabilidade

### Fase 1: Desenvolvimento
```
1 Servidor Node.js
1 Banco de Dados (opcional)
Monitoramento básico
```

### Fase 2: Produção
```
Load Balancer
├─ Servidor 1
├─ Servidor 2
└─ Servidor 3
Cache (Redis)
Banco de Dados
Monitoramento avançado
```

### Fase 3: Enterprise
```
CDN
├─ Load Balancer
│  ├─ Servidor 1
│  ├─ Servidor 2
│  └─ Servidor 3
├─ Cache (Redis Cluster)
├─ Banco de Dados (Replicado)
├─ Fila de Mensagens (RabbitMQ)
└─ Monitoramento (Datadog/New Relic)
```

---

## 🎯 Próximas Arquiteturas

### Com Fila de Mensagens
```
Webhook → Queue (Bull/RabbitMQ) → Worker → Convert
```

### Com Cache
```
Webhook → Cache (Redis) → Buscar Dados → Convert
```

### Com Banco de Dados
```
Webhook → DB → Histórico → Analytics
```

---

**Arquitetura Finalizada**: 23/01/2026
**Versão**: 1.0.0
**Status**: ✅ Pronto para Produção
