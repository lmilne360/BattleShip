const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var Pusher = require('pusher');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// initialize Pusher
const pusher = new Pusher({
    appId: '500700',
    key: 'df4a008b26afcfc9d53f',
    secret: '0cba0054f9f914883839',
    cluster: 'mt1',
    encrypted: true
});

// Serve our Static Files
app.use(express.static('./dist/'));

// CORS
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// Client authentication endpoint
 app.post('/pusher/auth', (req, res) => {
      let socketId = req.body.socket_id;
      let channel = req.body.channel_name;
      let presenceData = {
        user_id: crypto.randomBytes(16).toString("hex")
      };
      let auth = pusher.authenticate(socketId, channel, presenceData);
      res.send(auth);
});

// Redirect all other request to view
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at  http://localhost:${port}`));