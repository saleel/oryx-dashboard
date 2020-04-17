import React from 'react';
import PropTypes from 'prop-types';
import {
  FormLabel, FormControl, InputGroup, Button,
} from 'react-bootstrap';
import CrossIcon from '@iconscout/react-unicons/icons/uil-times';
import DefaultArrayField from 'react-jsonschema-form-bs4/lib/components/fields/ArrayField';


function ArrayField(props) {
  const {
    schema, formData, onChange,
  } = props;

  const itemType = schema.items.type;


  if (!['string', 'number'].includes(itemType)) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <DefaultArrayField {...props} />
    );
  }


  function handleChange(e) {
    if (![','].includes(e.key)) {
      return;
    }

    let value = e.target.value.trim().replace(',', '');

    e.target.value = '';

    if (itemType === 'string' && value === '') {
      return;
    }

    if (itemType === 'number') {
      value = Number(value);

      if (Number.isNaN(value)) {
        return;
      }
    }

    onChange([...new Set([...formData, value])]);
  }


  function handleDelete(index) {
    const newValue = [...formData].filter((f, i) => i !== index);
    onChange(newValue);
  }


  return (
    <div className="item-edit-form__array-field-template">
      <FormLabel>
        {schema.title}
      </FormLabel>

      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text className="item-edit-form__array">
            {formData.map((data, i) => (
              <div className="item-edit-form__array-item" variant="secondary">
                <span>
                  {data}
                </span>
                <Button className="btn item-edit-form__array-delete" onClick={() => handleDelete(i)}>
                  <CrossIcon size="1rem" />
                </Button>
              </div>
            ))}
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          type={itemType}
          placeholder="Separate new items by a comma"
          onKeyUp={handleChange}
        />
      </InputGroup>

    </div>
  );
}


ArrayField.propTypes = {
  schema: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
  formData: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
};


ArrayField.defaultProps = {
  formData: [],
};


export default ArrayField;
