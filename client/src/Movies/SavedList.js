import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import TheatersOutlinedIcon from "@material-ui/icons/TheatersOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: "white"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbar: {
    alignItems: "flex-center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "white",
    borderColor: "white"
  }
}));

const SavedList = props => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <TheatersOutlinedIcon />
            </IconButton>
            <Typography className={classes.title} variant="h5" noWrap>
              Saved Movies:
            </Typography>
            {props.list.map(movie => {
              return (
                <NavLink
                  to={`/movies/${movie.id}`}
                  key={movie.id}
                  activeClassName="saved-active"
                >
                  <Button className={classes.title} variant="outlined">
                    {movie.title}
                  </Button>
                </NavLink>
              );
            })}
            <Link to="/add-movie">
              <IconButton aria-label="add" className={classes.root}>
                <AddIcon />
              </IconButton>
            </Link>

            <Link to="/">
              <IconButton aria-label="home" edge="end" className={classes.root}>
                <HomeIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default SavedList;
