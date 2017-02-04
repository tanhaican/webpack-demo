var sub = require('./sub.js');
// require('./main.css');
require('./main.scss');
var app  = document.createElement('div');

app.innerHTML = '<h1>Hello World</h1>';
app.appendChild(sub());
document.body.appendChild(app);