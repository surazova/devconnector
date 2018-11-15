import React from 'react' //functional component 
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
}) => {
  return (
    <div className = "input-group mb-3">
      <div className="input-group-prepend">
      <div className="input-group-text">
      <i className={icon} />
      
    <input 
    className={classnames('form-control form-control-lg', {
      'is-invalid': error
    })}
    placeholder={placeholder}
    name={name}
    value ={value}
    onChange ={onChange}
    /> 
    {error && <div className="invalid-feedback">{error}</div>} 
    </div>
        </div>

    </div>

  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
  type: 'text'
}
export default InputGroup;
