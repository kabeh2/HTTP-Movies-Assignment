import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Button } from "@material-ui/core";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
    console.log("MATCH", this.props);
    // console.log("STATE", this.state);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        this.setState({ movie: res.data });
        console.log("State", this.state);
        console.log("Props", this.props);
      })
      .catch(err => console.log(err.response));
  };

  deleteMovie = id => {
    // Remove from state
    // 1. Save copy
    const movieCopy = [...this.props.location.state.movies];

    // 2. Isolate
    const movieNew = [...this.props.location.state.movies].filter(
      movie => movie.id !== id
    );

    console.log("MOVIENEW", movieNew);

    // this.props.location.state.deleteMovie(movieNew);
    // 3. Update State

    // Remove from server
    // axios.delete(`http://localhost:5000/api/movies/${id}`);
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <Link
          to={{
            pathname: `/update-movie/${this.props.match.params.id}`,
            state: {
              movie: this.state.movie
            }
          }}
        >
          <Button variant="contained" color="primary">
            Update
          </Button>
        </Link>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => this.deleteMovie(this.state.movie.id)}
        >
          Delete
        </Button>
      </div>
    );
  }
}
