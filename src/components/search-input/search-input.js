import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@iconscout/react-unicons/icons/uil-search';
import { InputGroup, FormControl } from 'react-bootstrap';


const SearchInput = (props) => {
  const {
    className, onChange, placeholder,
  } = props;


  return (
    <InputGroup className={className}>
      <InputGroup.Prepend>
        <InputGroup.Text>
          <SearchIcon size="1.25rem" />
        </InputGroup.Text>
      </InputGroup.Prepend>

      <FormControl
        placeholder={placeholder}
        onChange={onChange}
      />
    </InputGroup>
  );
};


SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.shape({}),
};


SearchInput.defaultProps = {
  className: undefined,
  style: undefined,
  placeholder: undefined,
};


export default SearchInput;
