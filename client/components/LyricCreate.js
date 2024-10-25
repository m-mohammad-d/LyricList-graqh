import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => {
        this.setState({ content: "" });
      })
      .catch((error) => {
        console.error("Error adding lyric:", error);
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor="song-lyric">Add a Lyric</label>
        <input
          id="song-lyric"
          value={this.state.content}
          onChange={(e) => this.setState({ content: e.target.value })}
        />
        <button type="submit" className="btn-submit">
          Create Lyric
        </button>
      </form>
    );
  }
}
const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
