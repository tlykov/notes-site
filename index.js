const express = require('express');
const app = express();
const db = require('./db');

var port = 8080;
    
var options = {
    index: 'index.html',
    dotfiles: 'ignore',
    extensions: ['html','css','json','js']
};
    
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/', function(req,res,next){
    console.log(req.method, 'request: ', req.url, JSON.stringify(req.body));
    next();
});
    
app.get('/notes', async(req, res)=>{
    var result = await db.getAll();
    res.json(result);
});

app.put('/notes', async(req,res)=>{
    var success = await db.update(req.body);
    if(success) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

app.delete('/notes/:title', async(req,res)=>{
    var title = req.params.title;
    var success = await db.remove(title);
    if(success) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

app.post('/notes', async(req,res)=>{
    var success = await db.addNote(req.body);
    if(success) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

app.use('/', express.static(__dirname + '/web/dist/asn3', options));

app.listen(port, function(){
    console.log(`app running on port ${port}`);
});