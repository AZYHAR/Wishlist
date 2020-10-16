const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});

app.get('/', (req, res) => {
    res.send('Home');
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});