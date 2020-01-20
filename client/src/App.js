import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from "./Movies/forms/UpdateForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Switch>
        <Route
          path="/update-movie/:id?"
          render={props => {
            return <UpdateForm {...props} />;
          }}
        />
        <Route
          path="/add-movie/"
          render={props => {
            return <UpdateForm {...props} />;
          }}
        />
        <Route
          path="/movies/:id"
          render={props => {
            return <Movie {...props} addToSavedList={addToSavedList} />;
          }}
        />
        <Route exact path="/" component={MovieList} />
      </Switch>
    </>
  );
};

export default App;
