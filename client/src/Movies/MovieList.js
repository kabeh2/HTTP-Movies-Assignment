import React, { PureComponent } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  render() {
    return (
      <>
        <CssBaseline />
        <Container maxWidth="sm">
          <div className="movie-list">
            {this.state.movies.map(movie => (
              <MovieDetails key={movie.id} movie={movie} />
            ))}
          </div>
        </Container>
      </>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );
}
