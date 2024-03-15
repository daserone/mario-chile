import {
  r as h,
  p as N,
  q as C,
  j as e,
  R as w,
  C as p,
  s as y,
  t as I,
  v as F,
  b as n,
  B as S,
  _ as m,
} from "./index-6KCvE3Yb.js";
import { d as k } from "./usuario.service-EErYFufJ.js";
const E = (o = {}) => {
    const [c, a] = h.useState(o),
      [r, d] = h.useState(!1);
    return (
      h.useEffect(() => (d(!0), () => d(!1)), []),
      {
        value: c,
        handleInput: (s) => {
          r && a((t) => ({ ...t, [s.target.name]: s.target.value }));
        },
        handleSwitch: (s) => {
          r && a((t) => ({ ...t, [s.target.name]: s.target.checked }));
        },
        handleProps: (s, t) => {
          r && a((x) => ({ ...x, [s]: t }));
        },
        handleSubmit: (s) => (t) => {
          t.preventDefault(), s(c);
        },
        onReset: () => {
          r && a(o);
        },
        onInsert: (s) => {
          r && a(s);
        },
        isMounted: r,
      }
    );
  },
  M =
    "data:image/svg+xml,%3csvg%20width='1512'%20height='982'%20viewBox='0%200%201512%20982'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1084_49609)'%3e%3cpath%20d='M1512%200H0V982H1512V0Z'%20fill='%23F1EFF5'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M0%20633L63%20682.857C126%20732.714%20252%20832.429%20378%20882.286C504%20932.143%20630%20932.143%20756%20882.286C882%20832.429%201008%20732.714%201134%20699.476C1260%20666.238%201386%20699.476%201449%20716.095L1512%20732.714V982H1449C1386%20982%201260%20982%201134%20982C1008%20982%20882%20982%20756%20982C630%20982%20504%20982%20378%20982C252%20982%20126%20982%2063%20982H0V633Z'%20fill='%23EAE7F4'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1084_49609'%3e%3crect%20width='1512'%20height='982'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",
  P = () => {
    const o = N(),
      [c, a] = h.useState(!1),
      {
        value: r,
        handleSubmit: d,
        handleInput: u,
      } = E({ email: "", contrasena: "Australopithecus" }),
      { saveUser: g } = C(),
      f = (l) => {
        if (l.email === "") {
          m.error("Agregue el correo.");
          return;
        }
        if (l.contrasena === "") {
          m.error("Agregue la contraseña.");
          return;
        }
        const i = new FormData();
        i.append("op", "dologinWithCredencial"),
          i.append("correo", l.email.trim()),
          i.append("clave", l.contrasena.trim()),
          k(i)
            .then((s) => {
              const { status: t, data: x } = s;
              if (t === 200) {
                const { responseCode: v, item: b } = x;
                v === 1
                  ? (g(b), o("/usuarios", { replace: !0 }))
                  : m.error("Correo o contraseña incorrecta.");
              }
            })
            .catch((s) => {
              console.error(s), m.error("Error al procesar solicitud.");
            });
      },
      j = () => {
        o("/sendEmailPassword");
      };
    return e.jsx("div", {
      className: "auth-wrapper auth-cover",
      style: {
        backgroundImage: `url(${M})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      },
      children: e.jsxs(w, {
        className: "auth-inner m-0 py-4",
        children: [
          e.jsx(p, {
            className: "d-none d-lg-flex align-items-center p-5",
            lg: "4",
            sm: "12",
          }),
          e.jsx(p, {
            className:
              "d-flex align-items-center auth-bg px-2 p-lg-5 rounded shadow-sm",
            lg: "4",
            sm: "12",
            children: e.jsxs(p, {
              className: "px-xl-2 mx-auto",
              sm: "8",
              md: "6",
              lg: "12",
              children: [
                e.jsx("div", {
                  className: "fondo__img text-center",
                  children: e.jsx("img", {
                    width: "50rem",
                    height: "50rem",
                    src: y,
                    alt: "logo",
                  }),
                }),
                e.jsx(I, {
                  className: "fw-bolder my-1 text-center",
                  color: "#5c586b",
                  children: "Bienvenido a BieniMédico",
                }),
                e.jsx(F, {
                  className: "mb-2  text-center",
                  children: "Todos tus registros médicos en un solo lugar.",
                }),
                e.jsxs(n, {
                  className: "auth-login-form mt-2",
                  action: "",
                  onSubmit: d(f),
                  children: [
                    e.jsx("div", {
                      className: "mb-1",
                      children: e.jsxs(n.Group, {
                        className: "mb-3",
                        controlId: "exampleForm.ControlInput1",
                        children: [
                          e.jsx(n.Label, { children: "Email" }),
                          e.jsx(n.Control, {
                            type: "text",
                            name: "email",
                            value: (r == null ? void 0 : r.email) ?? "",
                            placeholder: "name@example.com",
                            onChange: u,
                          }),
                        ],
                      }),
                    }),
                    e.jsx("div", {
                      className: "mb-1",
                      children: e.jsx("div", {
                        className: "mb-1",
                        children: e.jsxs(n.Group, {
                          className: "mb-3",
                          controlId: "exampleForm.ControlInput1",
                          children: [
                            e.jsx(n.Label, { children: "Contraseña" }),
                            e.jsx(n.Control, {
                              name: "contrasena",
                              type: "password",
                              value: r.contrasena || "",
                              placeholder: "******************",
                              onChange: u,
                            }),
                          ],
                        }),
                      }),
                    }),
                    e.jsx("div", {
                      className: "center my-2",
                      children: e.jsx("div", {
                        className: "pt-1 text-center text-dark fw-bold",
                        children: e.jsx("span", {
                          onClick: () => {
                            j();
                          },
                          className: "cursor-pointer",
                          style: { color: "#887ef2" },
                          children: "Olvidé mi contraseña",
                        }),
                      }),
                    }),
                    e.jsxs("div", {
                      className: "mb-2",
                      children: [
                        e.jsx("input", {
                          type: "checkbox",
                          id: "recordar",
                          className: "cursor-pointer",
                          style: { marginRight: 5 },
                          checked: c,
                          onChange: () => {
                            a(!c);
                          },
                        }),
                        e.jsx("label", {
                          htmlFor: "recordar",
                          className: "cursor-pointer",
                          children: "Recordarme",
                        }),
                      ],
                    }),
                    e.jsx("div", {
                      className: "d-flex justify-content-center",
                      children: e.jsx(S, {
                        size: "lg",
                        type: "submit",
                        children: "Iniciar Sesión",
                      }),
                    }),
                    e.jsx("div", {
                      className: "center",
                      children: e.jsx("div", {
                        className: "pt-1 text-center",
                        children: e.jsx("div", {
                          className: "divider my-1",
                          children: e.jsx("div", {
                            className: "divider-text",
                            children: "o",
                          }),
                        }),
                      }),
                    }),
                    e.jsx("div", {
                      className: "d-flex justify-content-center",
                      children: e.jsx("div", {
                        className: "fw-bold mb-2 text-dark",
                        children: e.jsxs("small", {
                          children: [
                            "¿Aún no utilizas BieniMédico?",
                            " ",
                            e.jsx("small", {
                              onClick: () => {
                                o("/contactanos");
                              },
                              style: { color: "#887ef2", cursor: "pointer" },
                              children: "Contáctanos",
                            }),
                          ],
                        }),
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    });
  };
export { P as default };
