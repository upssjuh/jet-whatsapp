@echo off
REM Script para testar o servidor
REM Execute este arquivo em outro terminal enquanto o servidor esta rodando

echo.
echo ========================================
echo  Teste de Webhook
echo ========================================
echo.

REM Verificar se node está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao esta instalado!
    pause
    exit /b 1
)

echo Enviando webhook de teste...
echo.

node test-webhook.js

echo.
echo Teste concluido!
pause
