import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
export default class SavedList extends Component {
  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => {
          return (
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              activeClassName="saved-active"
            >
              <span className="saved-movie">{movie.title}</span>
            </NavLink>
          );
        })}

        <Link to="/add-movie">
          <Button variant="contained" color="secondary">
            Add Movie
          </Button>
        </Link>

        <Link to="/">
          <Button variant="contained" color="primary">
            Home
          </Button>
        </Link>
      </div>
    );
  }
}
