const mongoose = require('mongoose');
const colorize = require('strcolorize');
require('dotenv').config();

const user = require('./schemas/userschema');

mongoose.connect(process.env.database)
    .then(() => {
        console.log(colorize(`[${'Database'}](yellow bold) carregada com sucesso!`));
    })
    .catch((error) => {
        console.error('Ocorreu um erro durante a conexão com o banco de dados:', error);
    });

module.exports = {
    userDB: user
};