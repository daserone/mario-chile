import { useField } from "formik";

const MyTextInput = ({ label, ...props }) => {
const [field, meta]  = useField(props);
return (
    <div className=" my-3">
    {meta.touched && meta.error ? (
        <>
        <input className="form-control" {...field} {...props} />
        <div className="error error-check text-danger">{meta.error}</div>
        </>
    ) : (
        <>
        <label htmlFor={props.name}>{label}</label>
        <input className="form-control" {...field} {...props} />
        </>
    )}
    </div>
);
};

export default MyTextInput;