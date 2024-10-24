import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ title: e.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    this.props
      .mutate({
        variables: { title },
      })
      .then(() => {
        this.setState({ title: "" });
      })
      .catch((error) => {
        console.error("Error adding song:", error);
      });
  }

  render() {
    return (
      <div>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song name: </label>
          <input onChange={this.handleChange} value={this.state.title} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
    }
  }
`;

export default graphql(mutation)(SongCreate);
