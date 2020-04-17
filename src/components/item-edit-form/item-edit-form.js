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
    schema, onSubmit, item, onChange,
  } = props;


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
        formData={item}
        onSubmit={({ formData }) => onSubmit(formData)}
        onChange={({ formData }) => {
          if (typeof onChange === 'function') {
            onChange(formData);
          }
        }}
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
  item: PropTypes.shape({}),
};


ItemEditForm.defaultProps = {
  item: {},
  onChange: null,
};


export default ItemEditForm;
