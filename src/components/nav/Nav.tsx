import React, { useState } from "react";

export const Nav: React.FC <{li?:any}> = ({li}) => {
  const [window, setWindow] = useState(false);

  let openClose = () => {
    if (window === false) {
      setWindow(true);
    } else {
      setWindow(false);
    }
  };

  const [isOpen, setIsopen] = useState(false);

  const toggleDropDown = () => {
    setIsopen((isOpen) => !isOpen);
  };

  return (
    <nav className="navbar-menu" style={{ width: window === false ? '100%' : 60 }}>
      <div className="burger" onClick={() => openClose()}>
        <img src="./images/afiliados-light.svg" alt="burger" />
      </div>
      <ul className="navbar__list">
        <div className="navbar__li-box">
            <img
              src="./images/afiliados-light.svg"
              alt="Mis pacientes"
              style={{ paddingLeft: window === false ? 27 : 17 }}
            />
            <li
              className="navbar__li"
              style={{ display: window === false ? "inline-block" : "none" }}
            >
              <a href="#">Mis pacientes</a>
            </li>
        </div>
        <div className="navbar__li-box">
            <img
              src="./images/afiliados-light.svg"
              alt="Mis pacientes"
              style={{ paddingLeft: window === false ? 27 : 17 }}
            />
            <li
              className="navbar__li"
              style={{ display: window === false ? "inline-block" : "none" }}
              onClick={toggleDropDown}
            >
              Seguridad
              {isOpen && (
                <ul>
                  <div className="">
                    <li
                      className="navbar__li"
                      style={{ display: window === false ? "inline-block" : "none" }}
                    >
                      <a href="#">Niveles</a>
                    </li>
                  </div>
                </ul>
              )}
            </li>
          </div>
      </ul>
    </nav>
  );
};