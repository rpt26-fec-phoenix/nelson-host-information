const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/db.js');
const PORT = 3007;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/:listingID', express.static(__dirname + '/../client/dist'));

app.get('/:listingID/host', (req, res) => {
  db.getHostInfo(req.params.listingID).then((host) => {
    res.send(host);
  }).catch((error) =>{
    console.log(error);
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
