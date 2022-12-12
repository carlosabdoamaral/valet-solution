import React from "react";

export default class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Title",
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
      </div>
    )
  }
}
