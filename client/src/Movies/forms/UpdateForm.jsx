import React from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextInput from "./TextInput";

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

const UpdateForm = () => {
  const classes = useStyles();

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
              <Typography variant="h3" gutterBottom>
                Update!
              </Typography>
            </Grid>
            <Grid item container>
              <Formik
                initialValues={{
                  id: Date.now(),
                  title: "",
                  director: "",
                  metascore: "",
                  stars: []
                }}
                validationSchema={Yup.object({
                  title: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                  director: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
                  metascore: Yup.number()
                    .min(0, "Muse be a number higher than 0")
                    .required("Required"),
                  stars: Yup.array().of(
                    Yup.string()
                      .max(15, "Must be 15 characters or less")
                      .required("At least one star name is Required.")
                  )
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ values, error }) => (
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
                    <FieldArray
                      name="stars"
                      render={arrayHelpers => (
                        <div>
                          {values.stars && values.stars.length > 0 ? (
                            values.stars.map((star, index) => (
                              <div key={index}>
                                <TextInput
                                  name={`stars.${index}`}
                                  label="Add Actor"
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton
                                          size="small"
                                          color="secondary"
                                          aria-label="delete"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          } // remove a friend from the list
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              </div>
                            ))
                          ) : (
                            <TextInput
                              name={`stars.0`}
                              label="Add Actor"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      size="small"
                                      color="secondary"
                                      aria-label="delete"
                                      onClick={() => arrayHelpers.remove(0)} // remove a friend from the list
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }}
                            />
                          )}

                          <Fab
                            size="small"
                            aria-label="Add Actor"
                            variant="extended"
                            color="secondary"
                            onClick={() => arrayHelpers.push("")}
                          >
                            <AddIcon />
                            Add an Actor
                          </Fab>
                        </div>
                      )}
                    />

                    <Grid
                      item
                      container
                      spacing={1}
                      className={classes.footerMargin}
                    >
                      <Grid item>
                        <Button variant="contained" type="submit">
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Submit
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
