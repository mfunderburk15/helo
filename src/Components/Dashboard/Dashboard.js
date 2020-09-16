import React, { Component } from 'react'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            search: '',
            myPosts: true,
        }
    }

    handleChange = (e) => {
        this.setState({
            userInput: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <section>
                    <div>
                        <input name='search' placeholder='Search by Title' onChange={(e) => { this.handleChange(e) }} />
                        <button>Search</button>
                        <button>Reset</button>
                    </div>
                    <div>
                        <p>My Posts</p>
                        <input type='checkbox' onClick={() => this.setState({ myPosts: !this.state.myPosts })} />
                    </div>
                </section>
                <section>
                    {this.state.posts}
                </section>
            </div>
        )
    }
}

export default Dashboard