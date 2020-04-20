import React from "react";

const MovieItemWillWatch = ({ movie }) => {
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item mt-2">
          {movie.title}
          <span className="badge badge-primary badge-pill ml-2">
            {movie.vote_average}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MovieItemWillWatch;
