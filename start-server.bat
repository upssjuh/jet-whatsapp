@echo off
REM Script para iniciar o servidor JET + WhatsApp
REM Execute este arquivo clicando duas vezes

echo.
echo ========================================
echo  JET + WhatsApp Integration
echo ========================================
echo.

REM Verificar se node está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao esta instalado!
    echo Baixe em: https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js encontrado
echo.

REM Verificar se node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo ERRO ao instalar dependencias!
        pause
        exit /b 1
    )
    echo [OK] Dependencias instaladas
    echo.
)

REM Verificar se .env existe
if not exist ".env" (
    echo AVISO: Arquivo .env nao encontrado!
    echo Criando .env a partir de .env.example...
    copy .env.example .env
    echo.
    echo IMPORTANTE: Edite o arquivo .env com suas credenciais!
    echo Pressione qualquer tecla para continuar...
    pause
)

REM Iniciar servidor
echo.
echo Iniciando servidor...
echo.
node index.js

pause
