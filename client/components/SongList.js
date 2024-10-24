import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router";

const QUERY = gql`
  {
    songs {
      title
    }
  }
`;

function SongList({ data: { loading, error, songs } }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul className="collection">
        {songs.map((song, index) => (
          <li key={index} className="collection-item">
            {song.title}
          </li>
        ))}
      </ul>
      <Link to='/song/new' className='btn-floating btn-large red right'>
      <i className="material-icons">add</i>
      </Link>
    </div>
  );
}

export default graphql(QUERY)(SongList);
