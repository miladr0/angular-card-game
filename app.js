const express = require('express');
const path = require('path');
const app = express();
const publicDir = __dirname + "/public/";
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
    res.sendFile(publicDir +'index.html');
});

app.listen(3000, () => console.log('House of Cards listening on port 3000!'));
