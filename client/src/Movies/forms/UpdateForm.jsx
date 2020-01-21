import React from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextInput from "./TextInput";
import MyFieldArray from "./MyFieldArray";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      flexGrow: 1
    }
  },
  card: {
    maxWidth: "min-content",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  marginBtns: {
    marginRight: theme.spacing(1)
  },
  footerMargin: {
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(2),
    borderTop: `1px solid #f4f4f4`
  }
}));

const UpdateForm = ({ location, history }) => {
  const classes = useStyles();

  console.log("PROPS", history, location);

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Card className={classes.card}>
          <CardContent className={classes.card}>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                {location.state ? "Update Movie" : "Add Movie"}
              </Typography>
            </Grid>
            <Grid item container>
              <Formik
                initialValues={{
                  id: location.state ? location.state.movie.id : Date.now(),
                  title: location.state ? location.state.movie.title : "",
                  director: location.state ? location.state.movie.director : "",
                  metascore: location.state
                    ? location.state.movie.metascore
                    : "",
                  stars: location.state ? [...location.state.movie.stars] : []
                }}
                validationSchema={Yup.object({
                  title: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .required("Required"),
                  director: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .required("Required"),
                  metascore: Yup.number()
                    .min(0, "Muse be a number higher than 0")
                    .required("Required"),
                  stars: Yup.array().of(
                    Yup.string()
                      .max(30, "Must be 30 characters or less")
                      .required("At least one star name is Required.")
                  )
                })}
                onSubmit={async (
                  values,
                  { setSubmitting, setErrors, setStatus, resetForm }
                ) => {
                  try {
                    location.state
                      ? await axios.put(
                          `http://localhost:5000/api/movies/${location.state.movie.id}`,
                          values
                        )
                      : await axios.post(
                          `http://localhost:5000/api/movies/`,
                          values
                        );
                    resetForm({});
                    setStatus({ success: true });
                    history.replace(
                      location.state
                        ? `/movies/${location.state.movie.id}`
                        : "/"
                    );
                  } catch (error) {
                    setStatus({ success: false });
                    setSubmitting(false);
                    setErrors({ submit: error.message });
                  }
                }}
              >
                {({ values }) => (
                  <Form>
                    <TextInput
                      label="Movie Title"
                      name="title"
                      type="text"
                      placeholder="Movie Title..."
                    />
                    <TextInput
                      label="Movie Director"
                      name="director"
                      type="text"
                      placeholder="Movie Director..."
                    />
                    <TextInput
                      label="Metascore"
                      name="metascore"
                      type="text"
                      placeholder="Metascore..."
                    />
                    <MyFieldArray name="stars" values={values} />

                    <Grid
                      item
                      container
                      spacing={1}
                      className={classes.footerMargin}
                    >
                      <Grid item>
                        <Button
                          variant="contained"
                          onClick={() => history.goBack()}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          {location.state ? "Update" : "Submit"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default UpdateForm;
