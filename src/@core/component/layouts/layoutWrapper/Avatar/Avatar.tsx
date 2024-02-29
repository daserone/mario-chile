import classnames from "classnames";
import Badge from "react-bootstrap/Badge";

interface Props {
  icon?: React.ReactNode;
  src?: string;
  img?: string;
  badgeUp?: boolean;
  initials?: string;
  content?: string;
  badgeText?: string;
  className?: string;
  imgClassName?: string;
  contentStyles?: React.CSSProperties;
  size?: "sm" | "lg" | "xl" | "xxl";
  tag?: React.ElementType | string;
  status?: "online" | "offline" | "away" | "busy";
  imgHeight?: string | number;
  imgWidth?: string | number;
  badgeColor?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "info"
    | "warning"
    | "dark"
    | "light-primary"
    | "light-secondary"
    | "light-success"
    | "light-danger"
    | "light-info"
    | "light-warning"
    | "light-dark";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "info"
    | "warning"
    | "dark"
    | "light-primary"
    | "light-secondary"
    | "light-success"
    | "light-danger"
    | "light-info"
    | "light-warning"
    | "light-dark";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
  forwardedRef?: React.Ref<HTMLImageElement>;
}

const Avatar = (props: Props) => {
  const {
    size,
    icon,
    img,
    color,
    status,
    badgeUp,
    initials = "no",
    content = "",
    imgWidth,
    className = "",
    badgeText,
    imgHeight,
    badgeColor,
    contentStyles,
    onClick,
  } = props;

  // ** Function to extract initials from content
  const getInitials = (str: string) => {
    const results: string[] = [];
    const wordArray = str.split(" ");
    wordArray.forEach((e) => {
      results.push(e[0]);
    });
    return results.join("");
  };

  return (
    <div
      className={classnames("avatar", {
        [className]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size,
      })}
      onClick={onClick}
    >
      {img === "" ? (
        <span
          className={classnames("avatar-content", {
            "position-relative": badgeUp,
          })}
          style={contentStyles}
        >
          {initials === "si" ? getInitials(content) : content}

          {icon ? icon : null}
          {badgeUp ? (
            <Badge
              color={badgeColor ? badgeColor : "primary"}
              className="badge-sm badge-up"
              pill
            >
              {badgeText ? badgeText : "0"}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          src={img}
          alt="avatarImg"
          style={{
            objectFit: "cover",
          }}
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size,
          })}
        ></span>
      ) : null}
    </div>
  );
};

export default Avatar;
