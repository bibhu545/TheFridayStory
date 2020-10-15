const express = require('express');
const path = require('path');

// Get our API routes
const homeRoutes = require('./api/routes/homeRoutes');
// const articleRoutes = require('./api/routes/articleRoutes');

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
// app.use('/api/articles', articleRoutes);
app.use('/api', homeRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);