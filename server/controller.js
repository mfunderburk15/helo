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
}