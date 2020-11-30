let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

let app = express();
app.use(cors());

app.use(logger(`${process.env.MORGAN_CONFIG}`));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
)
    .then(console.log("Conexão estabelecida com o DB!"))
    .catch((e) => console.log("Erro na conexão com o DB! Veja os detalhes abaixo:", e));

app.all('*', require('./routes/index'));

module.exports = app;
