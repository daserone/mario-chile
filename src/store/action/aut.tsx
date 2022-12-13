export const STORE_SAVE: string = "[AUT] STORE_SAVE";
export const STORE_REMOVE: string = "[AUT] STORE_REMOVE";

export const doLogin = (data: any): {} => {
  return (dispatch: any) => {
    const sessionStore = {
      user: data,
      stdAuth: true,
    };
    let isSession: any[] = [];
    isSession.push(sessionStore);
    sessionStorage.setItem("session", JSON.stringify(isSession));
    dispatch(storeSave(data, true));
  };
};

export const storeSave = (data: any, stdAuth: boolean): {} => ({
  type: STORE_SAVE,
  payload: {
    data: data,
    stdAuth: stdAuth,
  },
});

export const storeGet = () => {
  if (sessionStorage.getItem("session") !== null) {
    let session: any = sessionStorage.getItem("session");
    let parseado = JSON.parse(session);
    const [{ user, stdAuth }] = parseado;
    return { user, stdAuth };
  } else {
    return { user: {}, stdAuth: false };
  }
};

export const logout = (): {} => {
  return (dispatch: any) => {
    if (sessionStorage.getItem("session") !== null) {
      sessionStorage.removeItem("session");
      dispatch(storeRemove());
    }
  };
};

const storeRemove = (): {} => ({
  type: STORE_REMOVE,
});
