import { Spinner } from "react-bootstrap";

/* eslint-disable */
const defaultProps = {
  className: "",
  size: 45,
  width: 45,
  variant: "primary",
};

const Loader = ({ size, className, variant }) => {
  return (
    <Spinner
      className={`${className}`}
      variant={variant}
      animation="border"
      role="status"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: "auto",
        display: "block",
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

Loader.defaultProps = defaultProps;

export default Loader;
