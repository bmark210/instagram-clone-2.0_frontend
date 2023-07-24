import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mx-auto my-16 flex w-full flex-col items-center justify-center gap-6">
      <h2 className="text-2xl">The Page is not found</h2>
      <Link to={"/feed"} className="text-blue-primary hover:text-black-light">
        Back to feed
      </Link>
    </div>
  );
};

export default NotFound;
