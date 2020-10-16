const express = require('express');
const path = require('path');
const app = express();
//Set up Express Server and Port

app.listen(3000);
app.use(express.static("public"));
