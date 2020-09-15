import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Link to='/dashboard'>Home</Link>
                <Link to='/new'>New Post</Link>
                <Link to='/'>Logout</Link>
            </div >
        )
    }
}

export default Nav