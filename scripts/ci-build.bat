:: This batch file will be called by bacon CI for windows testing

call npm install
call npm test:e2e
