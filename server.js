// JS
const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('YOUR_DB_PATH');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.listen(app.get("port"), () => {
    console.log(
        'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.'
    );
});

let query1 = 'SELECT * FROM Artist INNER JOIN Album ON Artist.ArtistId = Album.ArtistId';
let query1Results = [];

db.each(query1, (err, row) => {
    query1Results.push(row)
});

app.get('/', (request, response) => {
    response.render('home')
});

app.get('/albums', (request, response) => {
    response.render('albums', {albums: query1Results})
});

