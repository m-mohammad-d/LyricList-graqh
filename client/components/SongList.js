import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router";
import QUERY from "../Queries/FetchSongs";

function SongList({ data: { loading, error, songs }, mutate }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
    <div>
      <ul className="collection">
        {songs.map((song) => (
          <li key={song.id} className="collection-item">
            {song.title}
            <i
              className="material-icons"
              style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
              onClick={() => onSongDelete(song.id)} // ارسال id آهنگ به تابع onSongDelete
            >
              delete
            </i>
          </li>
        ))}
      </ul>
      <Link to="/song/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
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
