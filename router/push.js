const pushRouter = require('express').Router();
const webpush = require('web-push');

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
  
  pushRouter.post('/sendNotification', function (req, res) {
    const payload = JSON.stringify({message:'Hello, service worker~~~'});
    setTimeout(function () {
      webpush
        .sendNotification(req.body.subscription,payload)
        .then(function () {
          res.sendStatus(202);
        })
    }, 3000);
  })

module.exports = pushRouter;



