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
    
app.get('/find', async(req, res)=>{
    var result = await db.getAll();
    res.json(result);
});

app.use('/', express.static(__dirname + '/web/dist/asn3', options));

app.listen(port, function(){
    console.log(`app running on port ${port}`);
});