const express = require('express');
const path = require('path');
require('dotenv').config();

//Express APP
const app = express();
//Public Path
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static(publicPath) );

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket')

server.listen( process.env.PORT, (err) => {
    if( err ) throw new Error(err);

    console.log('Server running in port ', process.env.PORT);
})