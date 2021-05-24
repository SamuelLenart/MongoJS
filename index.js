const express = require('express')
const mongodb = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'TaskDB'
const databaseCollection = 'tasks'

const app = express()
const MongoClient = mongodb.MongoClient

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.use(function (req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
  

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
   
    next();
  });

app.get('',(req,res)=> {
    res.send('Hello World')
})

app.get('/about',(req,res)=> {
    res.send('<h1>Server: task manager</h1>')
})

app.get('/author',(req,res)=> {
    res.send({'first name':'Samuel','last name':'Lenart'})
})

app.get('/task', (req, res)=>{
    MongoClient.connect(connectionURL, (error, client) => {
        if(error){
            res.status(400).send({"error":"Unable to save data to database!"})
            return console.log('Unable to connect to database!')
        }
        console.log('Connection succesfully!')
        let filter={};
        if(req.query.done){
            if(req.query.done=='true')
                filter.done=true;
            else
                filter.done=false;
        }else if(req.query.priority){
           filter.priority=parseInt(req.query.priority);
        }
        console.log(filter)
        const db=client.db(databaseName)

        db.collection('tasks').find(filter).toArray( (err, result)=> {
            if (err) throw err;
            console.log(result);
            res.status(200).send(result);
        })    
    }) 
})
app.post('/task/new',(req,res)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const data = req.body;
    const name=data.name;
    const priority=data.priority;
    let price='undefined';
    if(data.price){
        price=data.price;
    }
    console.log(name, ' ',priority,' ', price);
    const done=false;
    const currentdate = new Date();

    const object = {name, priority,date:currentdate, done};
    if(price!=='undefined'){
        object.price=price;
    }

    MongoClient.connect(connectionURL,{useUnifiedTopology: true}, (error, client) => {
        if(error){
            res.status(400).send({"error":"Unable to connect to database!"})
            return console.log('Unable to connect to database!')
        }
        const db=client.db(databaseName);

        db.collection('tasks').insertOne(object, (err,result)=>{
            if(error){
                 console.log('Unable to save data to database!')
                 res.status(400).send({"error":"Unable to save data to database!"})
            }
            res.status(201).contentType('application/json').send()
        });
    })
    
})

app.put('/task/done',(req,res)=>{
    const id = req.query._id
     if(!id){
         res.status(400).send({"error":"missing _id parameter"})
     }
     const filter={}
     filter._id=new mongodb.ObjectID(id);
     
     
     MongoClient.connect(connectionURL, (error, client) => {
        if(error){
            res.status(400).send({"error":"Unable to save data to database!"})
            return console.log('Unable to connect to database!')
        }
        const db=client.db(databaseName)

        db.collection('tasks').updateOne(filter,{$set: {done: true }},(err,result)=>{
            if(err){
                res.status(400).send({"error":"Unable to change the task"})
            }
                res.status(200).send({"result":"Task has been changed to done"})
       
        })
    })
     
})
    app.patch('/task/update', (req, res) => {
        MongoClient.connect(connection, (error, client) => {
            if(error) return console.log("Invalid connection")
            const db = client.db(database)
            db.collection('notes').update({'title':req.body.title}, {$set: {'done':true}}, (err, result) => {
                if(err) throw err
                res.send({"Info":"Update succesfull"})
            })
        })
    })
app.listen(3000, ()=>{
    console.log('Server port is 3000')
})