const express = require('express');
require('dotenv').config();
const producersRouter = require('./App/routes/producersRouter/producersRouter');
const collectionsRouter = require('./App/routes/collectionsRouter/collectionsRouter');
const furnitureRouter = require('./App/routes/furnitureRouter/furnitureRouter');
const promotionalFurnitureRouter = require('./App/routes/promotionalFurnitureRouter/promotionalFurnitureRouter');
const imageSliderRouter = require('./App/routes/imageSlider/imageSliderRouter');
const viewCounterRouter = require('./App/routes/viewCounter/viewCounterRouter');
const storageRouter = require('./App/routes/storageRouter/storageRouter')
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

const port = process.env.PORT || 3000;

if (!port) return console.log("Port is undefined: " + port);

const app = express();

//db
require('./App/DataBase/mongoose');

//parser
app.use(bodyParser.json());

//Image static folder
app.use('/storage', express.static('./storage'))

//fix cors
app.use(cors());

//routes
app.use('/api', producersRouter);
app.use('/api', collectionsRouter);
app.use('/api', furnitureRouter);
app.use('/api', promotionalFurnitureRouter);
app.use('/api', imageSliderRouter);
app.use('/api', viewCounterRouter);
app.use('/api', storageRouter);

// ssl
const privateKey = fs.readFileSync('/etc/ssl/certs/private.key', 'utf8');
const certificate = fs.readFileSync('/etc/ssl/certs/certificate.crt', 'utf8');
const ca = fs.readFileSync('/etc/ssl/certs/ca_bundle.crt', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

//server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
    console.log(`Serwer działa na porcie: ${port}`);
});


// app.listen(port, function () {
//     console.log(`Serwer działa na porcie: ${port}`);
// });