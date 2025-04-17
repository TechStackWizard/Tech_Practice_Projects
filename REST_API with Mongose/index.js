const express = require('express');
const app = express();
const path = require('path');
const Chat = require('./models/chat.js');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});

async function main(){
    await mongoose.connect('mongodb://localhost:27017/miniwhatsapp');
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

let port = 3000
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/chats',async (req,res)=>{
    let chats = await Chat.find();
    // console.log(chats)
    res.render(`index.ejs`,{chats});
})

app.get('/chats/new',(req,res)=>{
    res.render('newChat.ejs')
})

app.post('/chats',(req,res)=>{
    let {from, msg, to} = req.body;
    let chat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date(),
    })

    chat.save().then(() => {
        console.log('Chat saved');
        res.redirect('/chats');
    }).catch(err => {
        console.error('Error saving chat', err);
        res.status(500).send('Internal Server Error');
    });

    // console.log(info)
    // let chat = new Chat({
    //     from: req.body.name,
    //     message: req.body.message
    // });
    // chat.save().then(() => {
    //     res.redirect('/chats');
    // }).catch(err => {
    //     console.error('Error saving chat', err);
    //     res.status(500).send('Internal Server Error');
    // });
});


app.delete('/chats/:id',async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findByIdAndDelete(id)
    .then(() => {
        console.log(`${id} Chat deleted`);
        res.redirect('/chats');
    }).catch(err => {
        console.error('Error deleting chat', err);
        res.status(500).send('Internal Server Error');
    });
})

// Edit Route
app.get('/chats/:id/edit',async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id)
    res.render('edit.ejs',{chat})
})

// Update Route
app.put('/chats/:id',(req,res)=>{
    let {id} = req.params;
    let {msg} = req.body;
    Chat.findByIdAndUpdate(id,{msg:msg})
    .then(() => {
        console.log(`${id} Chat updated`);
        res.redirect('/chats');
    }).catch(err => {
        console.error('Error updating chat', err);
        res.status(500).send('Internal Server Error');
    });
})


// app.put('chat/:id')



app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
})

