const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {

        /*
            TODO get username, password from req.body
            TODO check if the user exists; and if they do, reject the request
            TODO salt and hash password
            TODO create the user in the db
            TODO put the user on session
            TODO send confirmation
        */

        const db = req.app.get('db')
        //destructuring values from req.body
        const { username, password } = req.body

        //checking if the user exists
        const [user] = await db.check_user([username])

        //if that user exists, reject them its not you, its your username
        if (user) {
            return res.status(409).send('Username taken')
        }

        //adding salt to the hash browns
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        //create the user in the db
        const [newUser] = await db.register_user([username, hash])

        req.session.user = newUser

        //congrats
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        /*
        todo get username and password from req.body
        todo see if the user exists. If they don't, reject the request
        todo compare the password and hash.  if it doesn't match reject the request
        todo put the user on session
        todo send confirmation
        */

        const db = req.app.get('db')

        //destructure username and password from body
        const { username, password } = req.body

        //check if the user exist
        const [existingUser] = await db.check_user([username])

        //If that user does not exist reject them
        if (!existingUser) {
            return res.status(404).send('User does not exist')
        }

        //compare password and hash
        const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)

        //If there is a mismatch, reject the request
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect username or password')
        }

        delete existingUser.hash

        //put user on the session
        req.session.user = existingUser

        //send confirmation
        res.status(200).send(req.session.user)
    },
    getPosts: async (req, res) => {

        const db = req.app.get('db')

        const { user_id } = req.params
        const { search, user_posts } = req.query

        const posts = await db.get_posts()
        console.log(posts)
        const lowerSearch = search.toLowerCase()

        if (user_posts === 'true' && lowerSearch) {
            const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(lowerSearch))
            return res.status(200).send(filteredPosts)
        } else if (user_posts === 'false' && !lowerSearch) {
            const filteredPosts = posts.filter(post => post.author_id != user_id)
            return res.status(200).send(filteredPosts)
        } else if (user_posts === 'false' && lowerSearch) {
            const filteredPosts = posts.filter(post => post.author_id != user_id && post.title.toLowerCase().includes(lowerSearch))
            return res.status(200).send(filteredPosts)
        } else {
            return res.status(200).send(posts)
        }
    }
}