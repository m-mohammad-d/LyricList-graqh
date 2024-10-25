import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { hashHistory, Link } from "react-router";
import query from "../Queries/FetchSongs";

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
        refetchQueries: [{ query }],
      })
      .then(() => {
        this.setState({ title: "" });
        hashHistory.push("/");
      })
      .catch((error) => {
        console.error("Error adding song:", error);
      });
  }

  render() {
    return (
      <div className="song-create-container">
        <Link to="/" className="back-button">
          <i className="material-icons">arrow_back</i> Back
        </Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit}>
          <label>Song Title</label>
          <input
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="Enter song name"
          />
          <button type="submit" className="btn-submit">
            Submit
          </button>
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
