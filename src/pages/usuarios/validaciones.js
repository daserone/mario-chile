import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const today = new Date();
today.setHours(0, 0, 0, 0); // make it today 00:00:00:00
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  age: yup.number().positive().integer().required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
    date: yup.date().min(today).required(),
    phoneNumber: yup.string().matches(phoneRegExp)
});


export const advancedSchema = yup.object().shape({
    nombre: yup
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(120)
        .required("Requerido"),
    descripcion: yup
        .string()
        .min(5, "descripcion must be at least 5 characters long")
        .max(120)
        .required("Requerido"),
    terminos: yup
        .boolean()
        .oneOf([true], "Please accept the terms of service"),
    estatus: yup
        .string()
        .oneOf(["1", "0"], "Seleccione un estatus")
        .required("Requerido")
});