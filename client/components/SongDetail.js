import { graphql } from "react-apollo";
import React, { Component } from "react";
import FetchSong from "../Queries/FetchSong";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    const {
      data: { loading, error, song },
      params,
    } = this.props;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
      <div className="song-detail-container">
        <Link to="/" className="back-button">
          <i className="material-icons">arrow_back</i> Back
        </Link>
        <h3>Song Detail</h3>
        {song && (
          <div>
            <p>ID: {song.id}</p>
            <p>Title: {song.title}</p>
          </div>
        )}
        {song && song.lyrics ? (
          <LyricList lyrics={song.lyrics} />
        ) : (
          <p>No lyrics available.</p>
        )}
        <LyricCreate songId={song.id} />
      </div>
    );
  }
}

export default graphql(FetchSong, {
  options: (props) => ({ variables: { id: props.params.id } }),
})(SongDetail);
