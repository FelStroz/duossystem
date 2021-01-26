let express = require('express');
let app = express();
require('dotenv').config();

let isHttps = process.env.HTTPS === 'true';

if (isHttps)
    https.createServer({
        key: fs.readFileSync(process.env.KEY),
        cert: fs.readFileSync(process.env.CERT),
        passphrase: process.env.PASSPHRASE
    }, app).listen(process.env.PORT, function () {
        console.log(`Servidor de produção iniciando na porta ${process.env.PORT} [HTTPS]`);
    });

else app.listen(process.env.PORT, function () {
    console.log(`Servidor de produção iniciando na porta ${process.env.PORT} [SEM HTTPS]`);
});
