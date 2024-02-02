const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env'})
const test = require('./router/test.js');
const push = require('./router/push.js');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', test.testRouter);
app.use('/push', push);


app.listen(3000, test.dbConnect)

