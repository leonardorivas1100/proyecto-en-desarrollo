// components/login-form/FormInput.jsx
const FormInput = ({ type, placeholder, value, onChange, required, ariaLabel }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        aria-label={ariaLabel}
      />
    );
  };
  
  export default FormInput;
  