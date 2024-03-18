export const Footer = () => {
  return (
    <p className="clearfix mb-0 text-center">
      <span className="d-block d-md-inline-block mt-25">
        © {new Date().getFullYear()}{" "}
        <a href="#" target="_blank" rel="">
          Nowli Express
        </a>
        <span className="d-none d-sm-inline-block">
          , todos los derechos reservados.
        </span>
      </span>
    </p>
  );
};
