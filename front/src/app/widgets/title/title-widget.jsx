import { Navbar } from "react-bootstrap";

export const TitleWidget = (props) => {
  return (
    <Navbar variant="dark" bg="dark" className="px-4">
      <Navbar.Brand>{props.title}</Navbar.Brand>
    </Navbar>
  );
};
