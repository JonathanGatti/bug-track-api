require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017/bug-track';

app.use(cors())
mongoose.connect(url,  {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const issuesRouter = require('./routes/issues');
app.use('/issues', issuesRouter);

const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const commentsRouter = require('./routes/comments');
app.use('/comments', commentsRouter);

app.use(express.static(__dirname + '/views'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})


app.listen(process.env.PORT || 8080, () => console.log('Server listening'))