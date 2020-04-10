import React from 'react';
import PropTypes from 'prop-types';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import {
  AutoForm, ErrorsField, SubmitField, AutoField, ListField,
} from 'uniforms-bootstrap4';
import AddIcon from '@iconscout/react-unicons/icons/uil-plus';
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash';
import Ajv from 'ajv';
import { Card } from 'react-bootstrap';
import './item-edit-form.scss';


const ajv = new Ajv({ allErrors: true, useDefaults: true });

function createValidator(schema) {
  const validator = ajv.compile(schema);

  return (model) => {
    validator(model);

    if (validator.errors && validator.errors.length) {
      throw { details: validator.errors };
    }
  };
}


function EntityEditForm(props) {
  const { schema, onSubmit, values } = props;

  // const [value, setValue] = React.useState(defaultValues);

  const schemaValidator = createValidator(schema);
  const bridgedSchema = new JSONSchemaBridge(schema, schemaValidator);


  if (!schema) return null;


  return (
    <Card className="item-edit-form">

      <AutoForm
        schema={bridgedSchema}
        // onChange={log('changed')}
        // formData={values}
        onSubmit={onSubmit}
      >
        {Object.keys(schema.properties).map((key) => {
          const property = schema.properties[key];

          if (property.type === 'array' && property.items.type === 'object') {
            return (
              <ListField
                name={key}
                addIcon={<AddIcon size="1.5rem" />}
                removeIcon={<DeleteIcon size="1.5rem" />}
              />
            );
          }

          return <AutoField name={key} />;
        })}

        <ErrorsField />
        <SubmitField className="mt-5" />
      </AutoForm>

    </Card>
  );
}


EntityEditForm.propTypes = {
  schema: PropTypes.shape({
    properties: PropTypes.shape({}),
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({}),
};


EntityEditForm.defaultProps = {
  values: {},
};


export default EntityEditForm;
