import ReactLoading from "react-loading";

export const Loading: React.FC<{
  show: Boolean;
  text: string;
}> = ({ show, text }) => {
  if (show) {
    return (
      <div className="loader-container">
        <div className="loader">
          <div className="spinner-center">
            {/*<video loop autoPlay muted width="640" height="480">
              <source src={`./images/loader.mp4`} type="video/mp4" />
    </video>*/}
            <ReactLoading type={"spin"} color="#293f76" />
          </div>
          <p className="fs-18 font-w500 text-info">{text}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Loading;
