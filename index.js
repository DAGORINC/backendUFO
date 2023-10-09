const express = require('express');
require('dotenv').config();
const producersRouter = require('./App/routes/producersRouter');
const collectionsRouter = require('./App/routes/collectionsRouter');
const furnitureRouter = require('./App/routes/furnitureRouter');
const promotionalFurnitureRouter = require('./App/routes/promotionalFurnitureRouter');
const imageSliderRouter = require('./App/routes/imageSliderRouter');
const viewCounterRouter = require('./App/routes/viewCounterRouter');
const storageRouter = require('./App/routes/storageRouter');
const userRouter = require('./App/routes/userRouter');
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
app.use('/api/users', userRouter);

app.get('/admin', (req, res) => {
    res.send('Witaj w panelu admina')
})

// ssl
// const privateKey = fs.readFileSync('/etc/ssl/certs/private.key', 'utf8');
// const certificate = fs.readFileSync('/etc/ssl/certs/certificate.crt', 'utf8');
// const ca = fs.readFileSync('/etc/ssl/certs/ca_bundle.crt', 'utf8');
// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// };

//server
// const httpsServer = https.createServer(credentials, app);

// httpsServer.listen(port, () => {
//     console.log(`Serwer działa na porcie: ${port}`);
// });


app.listen(port, function () {
    console.log(`Serwer działa na porcie: ${port}`);
});