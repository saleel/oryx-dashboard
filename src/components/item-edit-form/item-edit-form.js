import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import pick from 'lodash/pick';
import { Card, Button } from 'react-bootstrap';
import './item-edit-form.scss';


function EntityEditForm(props) {
  const {
    schema, uiSchema, onSubmit, values,
  } = props;


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
    <Card className="item-edit-form">

      <Form
        schema={pick(schema, ['properties', 'required'])}
        uiSchema={uiSchema}
        // onChange={log('changed')}
        formData={values}
        onSubmit={handleSubmit}
      >
        <Button className="mt-4" variant="outline-primary" size="md" type="submit">
          Submit
        </Button>
      </Form>

    </Card>
  );
}


EntityEditForm.propTypes = {
  schema: PropTypes.shape({
    properties: PropTypes.shape({}),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({}),
  uiSchema: PropTypes.shape({}),
};


EntityEditForm.defaultProps = {
  uiSchema: {},
  values: {},
};


export default EntityEditForm;
