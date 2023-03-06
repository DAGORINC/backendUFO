const express = require('express');
require('dotenv').config();
const producersRouter = require('./App/routes/producersRouter/producersRouter');
const collectionsRouter = require('./App/routes/collectionsRouter/collectionsRouter');
const furnitureRouter = require('./App/routes/furnitureRouter/furnitureRouter');
const imageSliderRouter = require('./App/routes/imageSlider/imageSliderRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3000;

if(!port) return console.log("Port is undefined: "+port);

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
app.use('/api', imageSliderRouter);

//mixed-content
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
    next();
  });

//server
app.listen(port, function () {
    console.log(`Serwer działa na porcie: ${port}`);
});