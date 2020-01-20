import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  deleteMovie = id => {
    // Make copy of state

    // const movieNew = [...this.state.movies].filter(movie => movie.id !== id);
    this.setState({
      movies: [...id]
    });
  };

  render() {
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails
            key={movie.id}
            movie={movie}
            movies={this.state.movies}
            deleteMovie={this.state.deleteMovie}
          />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie, movies, deleteMovie }) {
  return (
    // <Link to={`/movies/${movie.id}`}>
    <Link
      to={{
        pathname: `/movies/${movie.id}`,
        state: {
          movies: [...movies]
        }
      }}
    >
      <MovieCard movie={movie} movies={movies} deleteMovie={deleteMovie} />
    </Link>
  );
}
