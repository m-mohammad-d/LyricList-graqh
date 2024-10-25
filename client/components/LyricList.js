import React from "react";

const LyricList = ({ lyrics, onLike }) => {
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
              onClick={() => onLike(lyric.id, lyric.likes)}
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
};

export default LyricList;
