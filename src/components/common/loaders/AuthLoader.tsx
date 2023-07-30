import ContentLoader from "react-content-loader";

const AuthLoader = () => {
  return (
    <div className="flex justify-center">
      <ContentLoader viewBox="0 0 400 40" backgroundColor="transparent">
        <circle cx="170" cy="20" r="5" />
        <circle cx="194" cy="20" r="5" />
        <circle cx="218" cy="20" r="5" />
      </ContentLoader>
    </div>
  );
};

export default AuthLoader;
