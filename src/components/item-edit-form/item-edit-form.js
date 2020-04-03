// @ts-check

import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import {
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { withTheme } from 'react-jsonschema-form';
import { Theme as MuiTheme } from 'rjsf-material-ui';
import pick from 'lodash/pick';


const Form = withTheme(MuiTheme);


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
    schema, uiSchema, onSubmit, values,
  } = props;


  const classes = useStyles();

  // const [value, setValue] = React.useState(defaultValues);
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  async function handleSubmit({ formData }) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      // eslint-disable-next-line no-alert
      window.alert(error.message);
    }
  }


  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardContent className={classes.content}>
        <div className={classes.inner}>

          <Form
            schema={pick(schema, ['properties', 'required'])}
            uiSchema={uiSchema}
            // onChange={log('changed')}
            formData={values}
            onSubmit={handleSubmit}
          // onError={log('errors')}
          >
            <Box mt={3}>
              <Button variant="contained" size="large" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </Form>

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
  uiSchema: PropTypes.shape({}),
};


EntityEditForm.defaultProps = {
  uiSchema: {},
};


export default EntityEditForm;
