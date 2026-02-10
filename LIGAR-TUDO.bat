@echo off
title ?? INICIANDO STRAPI + REACT
echo ========================================
echo    INICIANDO STRAPI E REACT
echo ========================================
echo.
echo ?? Iniciando Strapi (backend)...
start cmd /k "title STRAPI && cd backend && npm run develop"
echo Aguarde 5 segundos...
timeout /t 5 >nul

echo ?? Iniciando React (frontend)...
start cmd /k "title REACT && cd frontend && npm run dev"
echo Aguarde 5 segundos...
timeout /t 5 >nul

echo ========================================
echo ? PRONTO! Ambos est?o rodando:
echo.
echo ?? STRAPI:  http://localhost:1337/admin
echo ??  REACT:   http://localhost:5174
echo ========================================
echo.
echo Abrindo navegador...
start http://localhost:5174
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul
