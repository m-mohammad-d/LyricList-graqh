import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const LIKE_LYRIC = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

class LyricList extends Component {
  onLike(id , likes) {
    try {
      this.props.mutate({
        variables: { id },
        optimisticResponse: {
          __typename: "Mutation",
          likeLyric: {
            id,
            __typename: "LyricType",
            likes: likes + 1,
          },
        },
      });
    } catch (error) {
      console.error("Error liking lyric:", error);
    }
  }

  render() {
    const { lyrics } = this.props;

    if (!lyrics || lyrics.length === 0) {
      return <p>No lyrics available.</p>;
    }

    return (
      <ul className="collection">
        {lyrics.map((lyric) => (
          <li key={lyric.id} className="collection-item">
            {lyric.content}
            <div className="right">
              <i
                className="material-icons blue-grey-text"
                style={{ cursor: "pointer" }}
                onClick={() => this.onLike(lyric.id , lyric.likes)}
              >
                thumb_up
              </i>
              <span data-badge-caption="" className="new badge">
                {lyric.likes}
              </span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default graphql(LIKE_LYRIC)(LyricList);
