// start file
const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send({ bye : 'buddy'});
});

const PORT = process.env.PORT || 5000;  //process used to accept user input from terminal
app.listen(PORT);
