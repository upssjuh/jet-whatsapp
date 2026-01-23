# 🎯 Como Usar - Guia Simples

Se você está tendo problemas com o terminal, use os scripts `.bat` que criei para você!

---

## 📋 Passo 1: Preparação Inicial

### 1.1 Editar o arquivo `.env`

1. Abra o arquivo `.env` com o Bloco de Notas
2. Preencha com suas credenciais:

```
NODE_ENV=development
PORT=3000
JET_INTEGRATION_KEY=sua_chave_aqui
JET_USERNAME=seu_usuario_aqui
JET_PASSWORD=sua_senha_aqui
JET_STORE_ID=seu_store_id_aqui
CONVERT_TOKEN=seu_token_aqui
CONVERT_TEMPLATE=seu_template_aqui
```

3. Salve o arquivo (Ctrl+S)

---

## 🚀 Passo 2: Executar o Servidor

### Opção A: Usando o Script (Recomendado)

1. Abra a pasta do projeto no Windows Explorer
2. Clique duas vezes em **`start-server.bat`**
3. Uma janela preta vai abrir
4. Você verá mensagens como:
   ```
   🚀 Servidor rodando na porta 3000
   📍 Ambiente: development
   Aguardando chamadas da JET...
   ```

**Deixe esta janela aberta!**

### Opção B: Usando o Terminal Manualmente

1. Abra o CMD (Prompt de Comando)
2. Navegue até a pasta do projeto:
   ```
   cd C:\Users\seu_usuario\Desktop\jet
   ```
3. Digite:
   ```
   npm start
   ```

---

## 🧪 Passo 3: Testar o Servidor

**Abra OUTRO terminal/janela** (deixe o servidor rodando)

### Opção A: Usando o Script (Recomendado)

1. Clique duas vezes em **`test-server.bat`**
2. Uma janela vai abrir e testar automaticamente
3. Você verá o resultado do teste

### Opção B: Usando o Terminal Manualmente

1. Abra um novo CMD
2. Navegue até a pasta:
   ```
   cd C:\Users\seu_usuario\Desktop\jet
   ```
3. Digite:
   ```
   npm test
   ```

---

## 📊 Passo 4: Monitorar (Opcional)

**Abra UM TERCEIRO terminal** (deixe os outros rodando)

### Opção A: Usando o Script (Recomendado)

1. Clique duas vezes em **`monitor-server.bat`**
2. Uma janela vai abrir mostrando o status
3. Você verá atualizações a cada 5 minutos

### Opção B: Usando o Terminal Manualmente

1. Abra um novo CMD
2. Navegue até a pasta:
   ```
   cd C:\Users\seu_usuario\Desktop\jet
   ```
3. Digite:
   ```
   npm run monitor
   ```

---

## 📁 Estrutura de Terminais

Você deve ter **3 janelas abertas**:

```
┌─────────────────────────────────────────┐
│ Terminal 1: start-server.bat            │
│ (Servidor rodando)                      │
│                                         │
│ 🚀 Servidor rodando na porta 3000       │
│ Aguardando chamadas da JET...           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Terminal 2: test-server.bat             │
│ (Testar webhook)                        │
│                                         │
│ 🧪 Enviando webhook de teste...         │
│ ✅ Webhook enviado com sucesso!         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Terminal 3: monitor-server.bat          │
│ (Monitorar status)                      │
│                                         │
│ ✅ Servidor OK                          │
│ Webhooks: 1                             │
│ Mensagens: 1                            │
└─────────────────────────────────────────┘
```

---

## ✅ Checklist de Execução

- [ ] Arquivo `.env` editado com credenciais
- [ ] `start-server.bat` aberto (Terminal 1)
- [ ] Servidor mostra "🚀 Servidor rodando"
- [ ] `test-server.bat` aberto (Terminal 2)
- [ ] Teste mostra "✅ Webhook enviado"
- [ ] `monitor-server.bat` aberto (Terminal 3)
- [ ] Monitor mostra status atualizado

---

## 🆘 Se Algo Não Funcionar

### Erro: "Node.js não está instalado"

1. Baixe Node.js em: https://nodejs.org
2. Instale (clique em Next, Next, Finish)
3. Reinicie o computador
4. Tente novamente

### Erro: "npm: comando não encontrado"

1. Verifique se Node.js foi instalado corretamente
2. Reinicie o CMD
3. Digite: `node --version`
4. Se não funcionar, reinstale Node.js

### Erro: "Porta 3000 já está em uso"

1. Feche o Terminal 1
2. Aguarde 5 segundos
3. Abra `start-server.bat` novamente

### Erro: "Arquivo .env não encontrado"

1. Verifique se `.env` existe na pasta
2. Se não existir, copie `.env.example` para `.env`
3. Edite `.env` com suas credenciais

### Webhook não chega

1. Verifique se o servidor está rodando (Terminal 1)
2. Verifique se `.env` está correto
3. Tente novamente com `test-server.bat`

---

## 📞 Próximos Passos

Depois que tudo funcionar localmente:

1. **Testar com ngrok** (expor para internet)
   - Veja: [NGROK_SETUP.md](./NGROK_SETUP.md)

2. **Fazer deploy em nuvem**
   - Veja: [deploy-guide.md](./deploy-guide.md)

3. **Configurar alertas**
   - Veja: [SLACK_ALERTS.md](./SLACK_ALERTS.md)

---

## 💡 Dicas

- **Deixe os 3 terminais abertos** enquanto testa
- **Não feche o Terminal 1** (servidor principal)
- **Abra novos terminais** para testar
- **Verifique o .env** se algo não funcionar
- **Leia os logs** para entender o que está acontecendo

---

## 🎯 Resumo Rápido

1. Edite `.env` com suas credenciais
2. Clique em `start-server.bat`
3. Clique em `test-server.bat` (em outro terminal)
4. Clique em `monitor-server.bat` (em outro terminal)
5. Pronto! Tudo funcionando!

---

**Precisa de ajuda?** Veja [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
