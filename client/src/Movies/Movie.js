import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import MovieCard from "./MovieCard";
import Box from "@material-ui/core/Box";

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
    try {
      axios.delete(`http://localhost:5000/api/movies/${id}`);
      window.location = "/";
      // this.props.history.replace("/");
    } catch (error) {
      console.log(error.message);
    }
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
        <CssBaseline />
        <Container maxWidth="sm">
          <MovieCard movie={this.state.movie} />

          <Grid item container spacing={1}>
            <div style={{ width: "100%" }}>
              <Box display="flex" justifyContent="space-between">
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={this.saveMovie}
                    color="primary"
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
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
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.deleteMovie(this.state.movie.id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Box>
            </div>
          </Grid>
        </Container>
      </div>
    );
  }
}
