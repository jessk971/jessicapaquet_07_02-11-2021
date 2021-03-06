const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const userRoutes = require('./routes/user.routes');
const publicationRoutes = require('./routes/publication.routes');
const commentRoutes = require('./routes/comment.routes');
const auth = require('./middleware/auth');
const db = require('./models')
db.sequelize.sync().then((req) => {
    console.log(req);
})





app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());


app.use('/api/user', userRoutes)
app.use('/api/publications', publicationRoutes);
app.use('/api/comments', auth, commentRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;