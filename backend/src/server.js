const port = 3333;

const express = require("express");
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(port, err => {
    if (err) console.log(err);
    else console.log(`Server running on port: ${port}`);
});
