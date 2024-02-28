interface Props {
  title?: string;
  subtitle: string;
  perfilType?: "principal" | "dependent";
  verificationType?: "manual" | "automatic";
  state?: "pending" | "active" | "rejected";
  age?: string;
  birthdate?: string;
  registerDate?: string;
  email?: string;
}

const DetailBox = (props: Props) => {
  const {
    title,
    subtitle,
    perfilType,
    verificationType,
    state,
    age,
    birthdate,
    registerDate,
    email,
  } = props;
  return (
    <div className="detail-item my-1">
      <span className="subtitle text-muted">{subtitle}</span>
      {title && <span className="title">{title}</span>}
      {perfilType && (
        <span
          className={`${
            perfilType === "principal" ? "main-badge" : "dependent-badge"
          }`}
        >
          {perfilType === "principal" ? "Principal" : "Dependiente"}
        </span>
      )}
      {verificationType && (
        <span
          className={`${
            verificationType === "automatic"
              ? "automatic-badge"
              : "inactive-badge"
          }`}
        >
          {verificationType === "automatic" ? "Automática" : "Manual"}
        </span>
      )}
      {state && (
        <span
          className={`${
            state === "active"
              ? "automatic-badge"
              : state === "rejected"
              ? "inactive-badge"
              : "inactive-badge"
          }`}
        >
          {state === "active"
            ? "Activo"
            : state === "rejected"
            ? "Rechazado"
            : "Pendiente"}
        </span>
      )}
      {age && (
        <div
          className="d-flex flex-row align-items-center"
          style={{
            paddingBottom: "4px",
          }}
        >
          <span>{birthdate}</span>, {age} años
        </div>
      )}
      {registerDate && (
        <div className="d-flex flex-row align-items-center">{registerDate}</div>
      )}
      {email && (
        <div className="d-flex flex-row align-items-center">{email}</div>
      )}
    </div>
  );
};

export default DetailBox;
