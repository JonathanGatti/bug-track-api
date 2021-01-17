require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;

mongoose.connect(url,  {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const issuesRouter = require('./routes/issues');
app.use('/issues', issuesRouter);

app.use(express.static(__dirname + '/views'))

app.get('/', (req, res) => {
  res.sendFile('index.html')
})


app.listen(8080 || process.env.PORT, () => console.log('Server listening'))