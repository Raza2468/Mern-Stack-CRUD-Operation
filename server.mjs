import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://faiz:2468@cheak.wzeho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')


const User = mongoose.model('User', {
    name: String,
    email: String,
    address: String
})




const app = express()
const __dirname = path.resolve('../web/build');

const Port = process.env.Port || 3030


let profiles = [] //local varible
app.use(express.json())
app.use(morgan('short'))
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use("/", express.static(__dirname));


app.use((req, res, next) => {

    console.log("a request came", req.body);
    next()
})


app.use((req, res, next) => {

    console.log('a request Come', Date.now());
    next()

})

app.get('/profiles', (req, res, next) => {

    // res.send(profiles)
    User.find({}, (err, doc) => {
        if (doc) {
            res.send(doc)
        } else {
            res.send(err)

        }
    })
    // next()
})


app.get('/profile/:id', (req, res) => {

    console.log(req.params.id, "req.body.params")

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (!err) {
            res.send(user)
        } else {
            res.status(500).send("error happened")
        }

    })
    // if (profiles[req.body.params]) {
    //     res.send(profiles[req.body.params])

    // } else {
    //     res.send("user not found")
    // }
})



app.post('/profile', (req, res, next) => {

    if (!req.body.name || !req.body.email || !req.body.address) {
        res.status(400).send("invlid Data")
        // console.log("inviled");
    } else {
        // profiles.push({
        //     name: req.body.name,
        //     email: req.body.email,
        //     address: req.body.address
        // })

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address
        })
        newUser.save().then(() => (
            console.log('profile create'),
            res.send("profile create"))
        );
    }
})




app.delete('/profile/:id', (req, res, next) => {

    User.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
        if (!err) {
            res.send("user deleted")
        } else {
            res.status(500).send("error happened")
        }

    })
    // if (profile[req.params.id]) {
    //     profile[req.params.id] = {}
    //     res.send(profile)
    // }
    // res.send("delet")
})



app.put('/profile/:id', (req, res, next) => {
    let updateObj = {}

    if (req.body.name) {
        updateObj.name = req.body.name
    }
    if (req.body.email) {
        updateObj.email = req.body.email
    }

    if (req.body.address) {
        updateObj.address = req.body.address
    }

    User.findByIdAndUpdate(req.params.id, updateObj, { new: true },
        (err, data) => {
            if (!err) {
                res.send(data)
            } else {
                res.status(500).send("error happened")
            }
        })
})



app.delete('/prfile/:id', (req, res, next) => {

    if (profiles[req.body.params]) {

        profiles[req.body.params] = {}
        res.send("user delet")

    } else {
        res.send("user not found")
    }

})

app.get('/home', (req, res) => {
    res.send('here is your home')
})

app.get('/', (req, res) => {
    res.send('Hi I am a hello world Server program')
})

app.listen(Port, (req, res) => {
    console.log(`Server app listening at http://localhost:${Port}`)
})