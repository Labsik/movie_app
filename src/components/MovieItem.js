import React, { Component } from "react";

class MovieItem extends Component {
  state = {
    willWatch: false,
  };

  render() {
    const {
      movie,
      removeMovie,
      addMovieToWatchList,
      removeMovieFromWatchList,
    } = this.props;

    return (
      <div className="col-6 mb-4">
        <div className="card mt-3">
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w500${
              movie.backdrop_path || movie.poster_path
            }`}
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">Rating: {movie.vote_average}</p>
          </div>

          <div className="card-body d-flex justify-content-between align-items-center">
            <button
              className="btn btn-danger"
              onClick={() => {
                removeMovie(movie.id);
              }}
            >
              Delete movie
            </button>
            {this.state.willWatch ? (
              <button
                className="btn btn-warning"
                onClick={() => {
                  removeMovieFromWatchList(movie.id);

                  this.setState({
                    willWatch: false,
                  });
                }}
              >
                Remove
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  addMovieToWatchList(movie);
                  this.setState({
                    willWatch: true,
                  });
                }}
              >
                Will watch
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieItem;
