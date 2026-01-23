@echo off
REM Script para monitorar o servidor
REM Execute este arquivo em outro terminal

echo.
echo ========================================
echo  Monitor do Servidor
echo ========================================
echo.

REM Verificar se node está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao esta instalado!
    pause
    exit /b 1
)

echo Iniciando monitor...
echo.

node monitoring.js

pause
