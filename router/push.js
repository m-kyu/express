const pushRouter = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push');

var corsOptions = {
  origin: 'https://r-pwa-54sz.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

let vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  'mailto:yicha7@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

pushRouter.get('/', async function (req, res) {
    res.send('push ready...');
})

  pushRouter.get('/publicKey', cors(corsOptions), function (req, res) {
    res.send(vapidKeys.publicKey)
  })
  
  pushRouter.post('/sendNoti', cors(corsOptions), function (req, res) {

    let data = JSON.stringify({msg:'hello pwa'})

    setTimeout(function () {
        webpush.sendNotification(req.body.subscribe)
        .then(function () {
          res.sendStatus(202);
        })
        .catch(function (error) {
            res.sendStatus(500);
            console.log(error);
          });
    }, 3000);

  })

module.exports = pushRouter;



