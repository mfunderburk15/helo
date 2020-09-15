import React, { Component } from 'react'

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <section>
                <section>
                    <div>
                        <p>Username:</p>
                        <input name="username" onChange={(e) => {
                            this.handleInput(e)
                        }} />
                    </div>
                    <div>
                        <p>Password:</p>
                        <input name="password" onChange={(e) => {
                            this.handleInput(e)
                        }} />
                    </div>
                </section>
                <section>
                    <button>Login</button>
                    <button>Register</button>
                </section>
            </section>
        )
    }
}

export default Auth