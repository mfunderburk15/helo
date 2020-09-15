import React, { Component } from 'react'
import axios from 'axios'

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

    handleLogin = () => {
        axios.post('/auth/login', this.state)
            .then((res) => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
    }

    handleRegister = () => {
        const { username, password } = this.state
        axios
            .post('/auth/register', { username, password })
            .then((res) => {
                this.props.loginUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch((err) => {
                alert(err.message)
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
                    <button onClick={this.handleLogin}>Login</button>
                    <button onClick={this.handleRegister}>Register</button>
                </section>
            </section>
        )
    }
}

export default Auth