@echo off
title ?? PARANDO TUDO
echo ========================================
echo    PARANDO STRAPI E REACT
echo ========================================
echo.
echo ?? Parando todos os processos Node.js...
taskkill /f /im node.exe 2>nul
echo ?? Parando janelas do terminal...
taskkill /f /im cmd.exe 2>nul
echo.
echo ? Todos os processos foram parados!
echo.
echo Pressione qualquer tecla para fechar...
pause >nul
