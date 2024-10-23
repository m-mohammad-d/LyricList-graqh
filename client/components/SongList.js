import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

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
      {songs.map((song, index) => (
        <div key={index}>{song.title}</div>
      ))}
    </div>
  );
}

export default graphql(QUERY)(SongList);
