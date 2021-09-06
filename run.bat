@echo off
node app
echo 3秒后自动关闭...
ping -n 3 127.1>nul
exit
