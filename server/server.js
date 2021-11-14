const port = 4000;
//Express + cors
const express = require('express');
const cors = require('cors');
const app = express();

//app uses
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//usersUtils
const usersUtils = require('./usersUtils.fs.js')

//Users Requests

    //Request responds with array of users, could be empty.
app.get('/users',(req,res)=>{
    res.status(200).json(usersUtils.getUsersFromJSON());
})

    //Get specific user
app.get('/users/:passportID',(req,res)=>{
    const fsFunctionResponse = usersUtils.getSpecificUser(req.params.passportID);
    if(fsFunctionResponse) {
        res.status(200).json(fsFunctionResponse);
    }
    else
        res.status(404).json('User does not exist');
})

    //Add user
app.post('/users', (req, res) =>{
    const fsFunctionResponse = usersUtils.addUser(req.body);
    if(fsFunctionResponse) {
        res.status(201).json(fsFunctionResponse);
    }
    else
        res.status(222).json('User already exists');
})

    //Update user credit
app.post('/updateCredit/:passportID', (req, res) =>{
    const fsFunctionResponse = usersUtils.updateUserCredit(req.params.passportID, req.body.credit);
    if(fsFunctionResponse) {
        res.status(201).json('User credit updated succesfully');
    }
    else
        res.status(222).json('User credit update failed');
})

//Transactions Requests

    //Get transactions
app.get('/transactions',(req,res)=>{
    res.status(200).json(usersUtils.getAllTransactionsFromJSON());
})

    //Add transaction
app.post('/transactions',(req,res)=>{
    const fsFunctionResponse = usersUtils.addTransaction(req.body);
    if(fsFunctionResponse) {
        res.status(201).json(fsFunctionResponse);
    }
    else
        res.status(222).json('Error in processing transaction');
})

app.listen(port, ()=> console.log(`Listening to port ${port}`))