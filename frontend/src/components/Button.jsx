import "./Button.css";

const Button = ({
  children,
  icon,
  variant = "primary",
  onClick,
  type = "button",
}) => {
  return (
    <button type={type} className={`btn btn-${variant}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
