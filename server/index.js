require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const ctrl = require('./controller')



const app = express()
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env
app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
    })
)

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)

app.get('/api/posts/:user_id', ctrl.getPosts)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    },
}).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('DB Works!')
    app.listen(SERVER_PORT, () => console.log(`This server is looking at port: ${SERVER_PORT}`))
})