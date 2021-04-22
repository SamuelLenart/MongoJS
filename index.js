const express = require('express')
const mongodb = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'
const databaseName = 'TaskDB'
const databaseCollection = 'tasks'

const app = express()
const MongoClient = mongodb.MongoClient

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
    MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
        if(error){
            return console.log('Unable to connect to database!')
        }
        console.log('Connection successed')
        let filter={};
        if(req.query.done){
            if(req.query.done=='true')
                filter = {done:true};
            else
                filter={done:false}
        }else if(req.query.priority){
            filter.priority=parseInt(req.query.priority);
            /*if(req.query.priority=='true')
                filter = {priority:true};
            else
                filter={priority:false}*/
        }
        const db = client.db(databaseName);

        db.collection('tasks').find().toArray((err, result)=> {
            if (err) throw err;
            console.log(result);
            res.send(result);
        })
        
    })
})

app.listen(3000, ()=>{
    console.log('Server port is 3000')
})