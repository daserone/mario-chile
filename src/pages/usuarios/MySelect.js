import { useField } from "formik";
import styled from "@emotion/styled";
import Select from 'react-select';

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;


const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  
  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      {<select {...field} {...props} />}
      {/*<Select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />*/}
      {meta.touched && meta.error ? (
        <div className="error error-check text-danger">{meta.error}</div>
      ) : null}
    </>
  );
};
export default MySelect;