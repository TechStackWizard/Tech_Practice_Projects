const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')


let port = 8080;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(methodOverride('_method'))


app.set('view engine', 'ejs');

let users = [
    {
      "id": uuidv4(),
      "username": "sunset.diva",
      "bio": "Golden hour glow & weekend flows",
      "profile_picture": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      "posts": [
        {
          "post_image": "https://images.pexels.com/photos/3064070/pexels-photo-3064070.jpeg",
          "likes": 1450,
          "comments": ["Absolutely stunning!", "Love this vibe!", "🔥🔥🔥"],
          "shares": 88
        },
        {
          "post_image": "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg",
          "likes": 987,
          "comments": ["Queen of golden hour", "Model vibes!", "You glow girl!"],
          "shares": 52
        }
      ]
    },
    {
      "id": uuidv4(),
      "username": "glamqueen.xo",
      "bio": "Bold lips & high heels 💄👠",
      "profile_picture": "https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg",
      "posts": [
        {
          "post_image": "https://images.pexels.com/photos/208052/pexels-photo-208052.jpeg",
          "likes": 1620,
          "comments": ["SLAYYYY 💅", "Makeup on point!", "Where's that dress from?"],
          "shares": 109
        },
        {
          "post_image": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          "likes": 1345,
          "comments": ["Just wow 😍", "Red suits you!", "Iconic."],
          "shares": 76
        },
        {
          "post_image": "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
          "likes": 1120,
          "comments": ["Such grace!", "Hot af 🔥", "💖💖💖"],
          "shares": 60
        }
      ]
    },
    {
      "id": uuidv4(),
      "username": "beachbabe_vibes",
      "bio": "Bikinis, beaches & blessings 🏖️🌊",
      "profile_picture": "https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg",
      "posts": [
        {
          "post_image": "https://images.pexels.com/photos/2306776/pexels-photo-2306776.jpeg",
          "likes": 1920,
          "comments": ["Beach goddess 🌊", "Sun-kissed queen!", "🔥🔥🔥"],
          "shares": 120
        },
        {
          "post_image": "https://images.pexels.com/photos/3048527/pexels-photo-3048527.jpeg",
          "likes": 1405,
          "comments": ["Need that bikini 😍", "Goals!", "Vibe check passed 🔥"],
          "shares": 89
        }
      ]
    },
    {
      "id": uuidv4(),
      "username": "sassymiss",
      "bio": "Too glam to give a damn 🔥💋",
      "profile_picture": "https://images.pexels.com/photos/1846344/pexels-photo-1846344.jpeg",
      "posts": [
        {
          "post_image": "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg",
          "likes": 1555,
          "comments": ["You're glowing!", "Ultimate boss energy!", "That look tho!"],
          "shares": 101
        },
        {
          "post_image": "https://images.pexels.com/photos/247322/pexels-photo-247322.jpeg",
          "likes": 1268,
          "comments": ["Slaying 🔥", "Where’s this outfit from?", "Insane vibes!"],
          "shares": 66
        }
      ]
    },
    {
      "id": uuidv4(),
      "username": "boldandbeauty",
      "bio": "Brains, beauty, and boldness 💃",
      "profile_picture": "https://images.pexels.com/photos/2112652/pexels-photo-2112652.jpeg",
      "posts": [
        {
          'id': uuidv4(),
          "post_image": "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
          "likes": 1789,
          "comments": ["Elegance 🔥", "True queen!", "Inspo all day"],
          "shares": 95
        },
        {
          'id': uuidv4(),
          "post_image": "https://images.pexels.com/photos/1441151/pexels-photo-1441151.jpeg",
          "likes": 1402,
          "comments": ["Style on point 👑", "This is art.", "SO beautiful!"],
          "shares": 70
        },
        {
          'id': uuidv4(),
          "post_image": "https://images.pexels.com/photos/1988681/pexels-photo-1988681.jpeg",
          "likes": 1530,
          "comments": ["Yasss girl 🔥", "Icon!", "You’re glowing!"],
          "shares": 88
        }
      ]
    }
  ]
  
// async function loadUser() {
//     let response = await fetch('http://localhost:8080/users.json');
//     let users = await response.json();
    
// }

app.get('/',(req,res)=>{
    res.render('home.ejs',{users})
})

app.get('/user/:id',(req,res)=>{
    let {id} = req.params;
    let user = users.find(p => p.id === id)
    res.render(`user.ejs`,{user})
})

app.get('/user/:id/edit',(req,res)=>{
  // console.log('edit page')
  let {id} = req.params;
  let user = users.find(u => u.id === id);
  res.render('edit.ejs',{user})
})

app.patch('/user/:id',(req,res)=>{
  let {id} = req.params;
  let newUsername = req.body.username;
  let newBio = req.body.bio;
  let user = users.find(u => u.id === id);
  user.username = newUsername;
  user.bio = newBio;
  res.redirect(`/user/${id}`)
})
// app.delete('/user/:userId/:postId', (req, res) => {
//   const { userId, postId } = req.params;
//   res.send(`Deleted post ${postId} from user ${userId}`);
// });
app.delete('/user/:id/:postId',(req,res)=>{
  let {id, postId} = req.params;
  let user = users.find(u => u.id === id);
  user.posts = user.posts.filter(post => post.id !== postId);
  console.log(user)
 
  res.redirect(`/user/${id}`)
})


app.listen(port , ()=>{
    console.log('App is listing on port ',port)
})