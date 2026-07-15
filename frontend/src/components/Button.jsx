import "./Button.css";

const Button = ({
  children,
  icon,
  iconRight,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
      {iconRight && <span className="btn-icon">{iconRight}</span>}
    </button>
  );
};

export default Button;
