@echo off
REM Script para instalar dependencias
REM Execute este arquivo se tiver problemas com npm install

echo.
echo ========================================
echo  Instalando Dependencias
echo ========================================
echo.

REM Verificar se node está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Node.js nao esta instalado!
    echo.
    echo Baixe em: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js encontrado
echo.

REM Verificar se npm está instalado
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: npm nao esta instalado!
    echo.
    pause
    exit /b 1
)

echo [OK] npm encontrado
echo.

REM Limpar cache (opcional)
echo Limpando cache do npm...
call npm cache clean --force
echo.

REM Remover node_modules se existir
if exist "node_modules" (
    echo Removendo node_modules antigo...
    rmdir /s /q node_modules
    echo.
)

REM Remover package-lock.json se existir
if exist "package-lock.json" (
    echo Removendo package-lock.json antigo...
    del package-lock.json
    echo.
)

REM Instalar dependencias
echo Instalando dependencias...
echo.
call npm install

if errorlevel 1 (
    echo.
    echo ERRO ao instalar dependencias!
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Instalacao Concluida!
echo ========================================
echo.
echo Agora voce pode executar:
echo   - start-server.bat
echo   - test-server.bat
echo   - monitor-server.bat
echo.
pause
