// @ts-check

import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import {
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    minWidth: '30rem',
    marginBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function EntityEditForm(props) {
  const {
    schema, onSubmit, onDelete, values: defaultValues,
  } = props;


  const classes = useStyles();

  const [value, setValue] = React.useState(defaultValues);
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(value);
    } catch (error) {
      // eslint-disable-next-line no-alert
      window.alert(error.message);
    }
  }


  function onChange(key, v) {
    setIsSubmitting(false);
    setValue((existing) => ({ ...existing, [key]: v }));
  }

  const { properties } = schema;


  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardContent className={classes.content}>
        <div className={classes.inner}>

          <form onSubmit={handleSubmit}>
            {Object.keys(properties).map((key) => (
              <div key={key}>
                <TextField
                  required
                  className={classes.input}
                  label={properties[key].title}
                  variant="outlined"
                  onChange={(e) => onChange(key, e.target.value)}
                />
              </div>
            ))}

            <Button
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              Submit
            </Button>

          </form>

        </div>
      </CardContent>

    </Card>
  );
}


EntityEditForm.propTypes = {
  schema: PropTypes.shape({
    properties: PropTypes.shape({}),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};


EntityEditForm.defaultProps = {
};

export default EntityEditForm;
