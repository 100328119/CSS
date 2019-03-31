const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CSS',{ useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
