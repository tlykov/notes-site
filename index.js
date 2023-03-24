const express = require('express');
const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tlykov:root23@cluster372.g5gslr3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = 'cmpt372';
const colName = 'notes';
var collection;

async function connectDB() {
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection(colName);
};

async function fetchNotes() {
    await connectDB();
    const findResult = await collection.find({}).toArray();
    return findResult[0];
};

    
var port = process.argv[0] | 8080;
    
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
    var result = await fetchNotes();
    console.log(result);
    res.json(result);
});

app.get('/test', (req, res) => {
    res.json({msg: 'test success'});
});

app.use('/', express.static('./web/dist/asn3', options));

    
app.listen(port, function(){
    console.log(`app running on port ${port}`);
});