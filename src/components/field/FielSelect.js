import { useField } from "formik";

export const FieldSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
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
