import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form-bs4';
import { Card, Button } from 'react-bootstrap';
import ArrayFieldTemplate from './array-field-template';
import SchemaObjectTemplate from './schema-object-template';
import './item-edit-form.scss';
import ArrayField from './array-field';


function ItemEditForm(props) {
  const {
    schema, onSubmit, values, onChange,
  } = props;

  // const [value, setValue] = React.useState(defaultValues);


  if (!schema) return null;

  const uiSchema = {
    properties: {
      'ui:ArrayFieldTemplate': ArrayFieldTemplate,
      items: {
        'ui:ObjectFieldTemplate': SchemaObjectTemplate,
        properties: {
          'ui:ArrayFieldTemplate': ArrayFieldTemplate,
          items: {
            'ui:ObjectFieldTemplate': SchemaObjectTemplate,
          },
        },
      },
    },
  };

  const customFields = {
    DescriptionField: () => null,
    ArrayField,
  };


  return (
    <Card className="item-edit-form">

      <Form
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={({ formData }) => onSubmit(formData)}
        onError={(error) => console.error(error)}
        fields={customFields}
      >
        <div>
          <Button type="submit" variant="primary">Submit</Button>
        </div>
      </Form>

    </Card>
  );
}


ItemEditForm.propTypes = {
  schema: PropTypes.shape({
    properties: PropTypes.shape({}),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  values: PropTypes.shape({}),
};


ItemEditForm.defaultProps = {
  values: {},
  onChange: null,
};


export default ItemEditForm;
