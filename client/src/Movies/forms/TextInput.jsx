import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useField } from "formik";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: 320
  }
}));

const TextInput = ({ label, ...props }) => {
  const classes = useStyles();

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      {/* <label htmlFor={props.id || props.name}>{label}</label> */}
      <TextField
        error={meta.error && true}
        // id="standard-error-helper-text"
        helperText={meta.touched && meta.error ? meta.error : null}
        label={label}
        className={`text-input ${classes.textField}`}
        {...field}
        {...props}
      />
    </>
  );
};

export default TextInput;
