import { Redirect, Route } from "react-router";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
export const Autenticadas = ({ component: Component, ...rest }: any) => {
  const auth: any = useSelector<any>((state) => state.reducerAuth.stdAuth);
  return (
    <Route
      {...rest}
      render={(props: any) =>
        auth === true ? <Component {...props} /> : <Redirect to="/registros" />
      }
    />
  );
};
Autenticadas.protoTypes = {
  Auth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
