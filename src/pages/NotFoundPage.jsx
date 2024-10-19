import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <Link to="/">Go back to HOME</Link>
      <h2 style={{ textAlign: "center" }}>NotFoundPage</h2>
    </div>
  );
};

export default NotFoundPage;
