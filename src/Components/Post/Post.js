import React, { Component } from 'react'

class Post extends Component {
    constructor() {
        super()
        this.state = {
            author: '',
            authorPic: '',
            title: '',
            img: '',
            content: ''
        }
    }

    render() {
        return (
            <section>
                <div>
                    <h2>{this.state.title}</h2>
                    <div>
                        <p>by {this.state.author}</p>
                        <img src={this.state.authorPic} />
                    </div>
                </div>
                <div>
                    <img />
                    <p>{this.state.content}</p>
                </div>
            </section>
        )
    }
}

export default Post