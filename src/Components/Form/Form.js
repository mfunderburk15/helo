import React, { Component } from "react";

class Form extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <section>
        <div>
          <p>Title:</p>
          <input type="text" />
        </div>
        <div>
          <img />
          <p>Image URL:</p>
          <input type="text" />
        </div>
        <div>
          <p>Content:</p>
          <input type="text" />
        </div>
      </section>
    );
  }
}

export default Form;
