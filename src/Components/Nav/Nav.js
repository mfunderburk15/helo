import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (

            <section>
                <div>
                    <img src={this.props.proPic} />
                    <p>{this.props.username}</p>
                </div>
                <div>
                    <Link to='/dashboard'>Home</Link>
                    <Link to='/new'>New Post</Link>
                    <Link to='/'>Logout</Link>
                </div >
            </section>

        )
    }
}

function mapStateToProps(state) {
    return state
}

export default withRouter(connect(mapStateToProps)(Nav))