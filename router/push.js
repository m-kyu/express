const pushRouter = require('express').Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const webpush = require('web-push');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  'mailto:yicha7@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

pushRouter.get('/', async function (req, res) {
    res.send('push ready...');
})

  pushRouter.get('/publicKey', function (req, res) {
    res.send(vapidKeys.publicKey)
  })
  
  pushRouter.post('/sendNoti', function (req, res) {

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



