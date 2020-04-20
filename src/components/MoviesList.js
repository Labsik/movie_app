import React, { Component } from "react";
import { API_KEY, URL } from "../utils";
import MovieItem from "./MovieItem";
import MovieItemWillWatch from "./MovieItemWillWatch";
import MovieTabs from "./MovieTabs";

class MoviesList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
    };
  }
  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    }
  }

  getMovies = () => {
    return fetch(
      `${URL}/discover/movie?api_key=${API_KEY}&sort_by=${this.state.sort_by}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
        });
      });
  };

  removeMovie = (id) => {
    this.setState((state) => ({
      movies: state.movies.filter((movie) => movie.id !== id),
    }));
  };

  addMovieToWatchList = (movie) => {
    this.setState({
      moviesWillWatch: [...this.state.moviesWillWatch, movie],
    });
  };

  removeMovieFromWatchList = (id) => {
    this.setState((state) => ({
      moviesWillWatch: state.moviesWillWatch.filter((movie) => movie.id !== id),
    }));
  };

  updateSortBy = (value) => {
    this.setState({
      sort_by: value,
    });
  };

  render() {
    const movies = this.state.movies;
    const moviesWillWatch = this.state.moviesWillWatch;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row">
              {movies.map((movie) => {
                return (
                  <MovieItem
                    key={movie.id}
                    movie={movie}
                    removeMovie={this.removeMovie}
                    addMovieToWatchList={this.addMovieToWatchList}
                    removeMovieFromWatchList={this.removeMovieFromWatchList}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-3 mt-2">
            <div className="row ml-5">
              <h2>Will Watch: &nbsp;</h2>
              <h2>
                {moviesWillWatch.length
                  ? moviesWillWatch.length
                  : "No movies in this list"}
              </h2>
              {moviesWillWatch.map((movie) => {
                return <MovieItemWillWatch key={movie.id} movie={movie} />;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesList;
