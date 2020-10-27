const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')

const homeRoutes = require('./api/routes/homeRoutes');
const userRoutes = require('./api/routes/userRoutes');
const articleRoutes = require('./api/routes/articleRoutes');
const adminRoutes = require('./api/routes/adminRoutes');


mongoose.connect('mongodb+srv://blogUser:blogPassword@testcluster.eik60.mongodb.net/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})


const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileupload({
  limits: { fileSize: 5 * 1024 * 1024 },
  createParentPath: true
}))
app.use(morgan('dev'))
app.use('/uploads', express.static('./uploads'))

// Point static path to dist (angular build results)
app.use(express.static(path.join(__dirname, 'dist')));

//set cors
app.use((req, res, next) => {
  req.header('Access-Control-Allow-Orgin', '*');
  req.header('Access-Control-Allow-Heasers', 'Origin, X-Requested-With, Accept, Autherization');
  if (req.method == 'OPTIONs') {
    req.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
})


// Set our api routes
app.use('/api', homeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/admin', adminRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);