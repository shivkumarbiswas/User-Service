const express = require('express');
const bodyParser = require('body-parser');
let users = require('./app/users-data/users.json');
const app = express();

app.use(bodyParser.urlencoded({extended: true }));

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    res.send({"users": users});
});

app.post('/users', (req, res) => {
    const _user = req.body;

    if(_user === null){
        res.status(400).send("Invalid user");
    }

    try {
        users.push(_user);
        res.send(_user);
    } catch(error) {
        res.status(500).send(error);
    }
});

app.put('/users/:id', (req, res) => {
    const _user = req.body;
    const _id = req.params.id;
    
    if(_user === null || _id === 0){
        res.status(400).send("Invalid user or Id");
    }
    
    try{
        const user = users.find((user) => user.id == _id);
        user.firstName = _user.firstName;
        user.lastName = _user.lastName;
        user.email = _user.email;
        user.contactNo = _user.contactNo;

        res.send(_user);
    } catch(error) {
        res.status(500).send(error);
    }
});

app.delete('/users/:id', (req, res) => {
    const _id = req.params.id;
    console.log(_id);
    if(_id === 0){
        res.status(400).send("Invalid Id");
    }

    try{
        const newUsers = users.filter((user) => user.id != _id);
        users = newUsers;
        res.send({_id});
    } catch(error) {
        res.status(500).send(error);
    }
});

app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});