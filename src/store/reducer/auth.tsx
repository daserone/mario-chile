import { STORE_REMOVE, STORE_SAVE, storeGet } from "../action/aut";

let initial = storeGet();

const reducerAuth = (state = initial, actions: any) => {
  switch (actions.type) {
    case STORE_SAVE:
      return {
        ...state,
        user: actions.payload.data,
        stdAuth: actions.payload.stdAuth,
      };
    case STORE_REMOVE:
      let logout = {
        ...state,
        user: {},
        stdAuth: false,
      };
      return logout;
    default:
      return state;
  }
};
export default reducerAuth;
