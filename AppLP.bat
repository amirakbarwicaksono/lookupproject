@echo off
REM Mengaktifkan pencetakan perintah pada layar

REM Langkah 1: Buka folder backend dan jalankan perintah Go secara asinkron
start "" cmd /k "cd /d D:\lookupproject\backend && echo Membuka folder backend dan menjalankan go run main.go... && go run main.go"

REM Langkah 2: Buka Git Bash di folder frontend dan jalankan npm run dev
echo Membuka Git Bash di folder frontend...
"C:\Program Files\Git\bin\bash.exe" --cd="D:/lookupproject/frontend" -c "npm run dev"

pause
REM Pause untuk memastikan pengguna dapat melihat hasil sebelum jendela CMD tertutup