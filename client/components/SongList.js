import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router";
import QUERY from "../Queries/FetchSongs";

function SongList({ data: { loading, error, songs }, mutate }) {
  if (loading) return <div className="loading">Loading songs...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const onSongDelete = (id) => {
    mutate({
      variables: { id },
      refetchQueries: [{ query: QUERY }],
    })
      .then(() => {
        console.log(`Song with id ${id} deleted successfully`);
      })
      .catch((error) => {
        console.error("Error deleting song:", error);
      });
  };

  return (
    <div className="song-list">
      <h3>Song List</h3>
      {songs.map((song) => (
        <div key={song.id} className="song-card">
          <div className="song-info">
            <Link to={`/song/${song.id}`} className="song-title">
              {song.title}
            </Link>
          </div>
          <div className="song-actions">
            <i className="material-icons" onClick={() => onSongDelete(song.id)}>
              delete
            </i>
          </div>
        </div>
      ))}
      <div className="add-button-container">
        <Link to="/song/new" className="btn-floating btn-large">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      title
    }
  }
`;

export default graphql(mutation)(graphql(QUERY)(SongList));
