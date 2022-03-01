const express = require('express');
const connection = require('./config/db');
const app = express();
const PORT = process.env.PORT || 9000;

connection();

app.use(express.json({extended: false}));
app.get('/',(req, res) => res.send('API Running'));
// Define Route
app.use('/posterUpload', require('./api/posterUpload'));

app.listen(PORT , () => console.log(`Server started on port ${PORT}`));
