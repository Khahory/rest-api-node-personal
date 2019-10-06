const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const userRouters = require('./routes/users');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rest_api_example', {
    useMongoClient: true
}).then(db => console.log('La db esta conectada '))
    .catch(err => console.log(err));

//  settings
app.set('port', process.env.PORT || 3000);

//  Routes
app.use('/users', userRouters);

//  Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//  Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port: ', app.get('port'));
});
