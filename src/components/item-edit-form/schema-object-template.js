import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel } from 'react-bootstrap';
import { PropertyTypes } from '../../constants';


function SchemaObjectTemplate(props) {
  const {
    title, description, properties, formData,
  } = props;

  const showEnumField = formData.type === PropertyTypes.Enum;
  const showPropertiesField = formData.type === PropertyTypes.Object;


  return (
    <div>
      <FormLabel>
        {title}
      </FormLabel>

      {description}

      <div className="row px-2">
        {properties
          .filter((element) => ['key', 'title', 'type'].includes(element.name))
          .map((element) => <div className="col-4">{element.content}</div>)}

        {showEnumField && (
          <div className="col-12">{properties.find((element) => element.name === 'enum').content}</div>
        )}

        {showPropertiesField && (
          <div className="col-12">{properties.find((element) => element.name === 'properties').content}</div>
        )}
      </div>

    </div>
  );
}


SchemaObjectTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    children: PropTypes.node.isRequired,
  })).isRequired,
  formData: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
};


export default SchemaObjectTemplate;
