import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@iconscout/react-unicons/icons/uil-plus';
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash';
import { FormLabel } from 'react-bootstrap';


function ArrayFieldTemplate(props) {
  const {
    title, description, items, canAdd, onAddClick,
  } = props;

  return (
    <div className="item-edit-form__array-field-template">
      <FormLabel>
        {title}
      </FormLabel>

      {description}

      <div className="item-edit-form__array-field-template-fields">
        {items.map((element, index) => (
          <div className="row">
            <div className="col pr-0">
              {element.children}
            </div>
            <div className="d-flex align-items-center p-2">
              <button className="btn" type="button" onClick={element.onDropIndexClick(index)}>
                <DeleteIcon size="1.25rem" />
              </button>
            </div>
          </div>
        ))}

        {canAdd && (
          <button className="btn mx-0 px-0 d-flex align-items-center" type="button" onClick={onAddClick}>
            <AddIcon size="1.25rem" />
            {' Add new '}
            {title}
          </button>
        )}
      </div>

    </div>
  );
}


ArrayFieldTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    children: PropTypes.node.isRequired,
    onDropIndexClick: PropTypes.func.isRequired,
  })).isRequired,
  canAdd: PropTypes.bool.isRequired,
  onAddClick: PropTypes.func.isRequired,
};


export default ArrayFieldTemplate;
