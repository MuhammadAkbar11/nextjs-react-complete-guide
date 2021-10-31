import { ListGroupItem } from "react-bootstrap";

function LogisticsItem({ icon: Icon, iconProps, children }) {
  return (
    <ListGroupItem className="border-0 ps-0 bg-transparent d-flex align-items-center">
      <span className="me-2">
        <Icon {...iconProps} />
      </span>
      <span className="mt-1">{children}</span>
    </ListGroupItem>
  );
}

export default LogisticsItem;
