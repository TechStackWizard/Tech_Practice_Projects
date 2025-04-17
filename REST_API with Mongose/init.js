const Chat = require('./models/chat');
const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/miniwhatsapp');
}

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});

let chats = [
    {
        from: 'John',
        to: 'Doe',
        msg: 'Hello',
        created_at: new Date()
    },
    { from: 'Suhani', to: 'Anshul', msg: 'Hi', created_at: new Date() },
    { from: 'Anshul', to: 'Suhani', msg: 'Hello', created_at: new Date() },
    { from: 'Doe', to: 'John', msg: 'Hi there!', created_at: new Date() },
    { from: 'John', to: 'Doe', msg: 'How are you?', created_at: new Date() },
    { from: 'Doe', to: 'John', msg: 'I am fine, thank you!', created_at: new Date() },
    { from: 'Alice', to: 'Bob', msg: 'Good morning!', created_at: new Date() },
    { from: 'Bob', to: 'Alice', msg: 'Good morning!', created_at: new Date() }
]

// Chat.insertMany(chats).then(() => {
//     console.log('Chats saved!');
// }).catch(err => {
//     console.error('Error saving chats', err);
// })


Chat.deleteOne({}).then(() => {
    console.log('Chats deleted!');
}).catch(err => {
    console.error('Error deleting chats', err);
})