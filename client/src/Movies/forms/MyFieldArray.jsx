import React from "react";
import { FieldArray } from "formik";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextInput from "./TextInput";

function MyFieldArray({ values, name }) {
  return (
    <FieldArray
      name={name}
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
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
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
  );
}

export default MyFieldArray;
