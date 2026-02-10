@echo off
echo ?? LIGANDO STRAPI...
start cmd /k "cd backend && npm run develop"
echo ?? LIGANDO REACT...  
start cmd /k "cd frontend && npm run dev"
echo ? PRONTO!
echo Strapi: http://localhost:1337/admin
echo React: http://localhost:5173
pause
