import { useState } from "react";

const AppsAndWebsites = () => {
  const [currentPage, setCurrentPage] = useState("Active");
  const handlePageClick = (page: string) => {
    setCurrentPage(page);
  };
  return (
    <div className="mx-16 mt-16">
      <p>Apps and Websites</p>
      <div className="mt-8 grid grid-cols-3">
        <p
          role="button"
          className={`w-full py-1 text-center ${
            currentPage === "Active"
              ? "border-b border-black-dark font-medium text-black-dark dark:border-white dark:text-white"
              : "border-b border-gray-300 text-gray-300 dark:opacity-60"
          } mx-auto`}
          onClick={() => handlePageClick("Active")}
        >
          Active
        </p>
        <p
          role="button"
          className={`w-full py-1 text-center ${
            currentPage === "Expired"
              ? "border-b border-black-dark font-medium text-black-dark dark:border-white dark:text-white"
              : "border-b border-gray-300 text-gray-300 dark:opacity-60"
          }`}
          onClick={() => handlePageClick("Expired")}
        >
          Expired
        </p>
        <p
          role="button"
          className={`w-full py-1 text-center ${
            currentPage === "Removed"
              ? "border-b border-black-dark font-medium text-black-dark dark:border-white dark:text-white"
              : "border-b border-gray-300 text-gray-300 dark:opacity-60"
          } text-center`}
          onClick={() => handlePageClick("Removed")}
        >
          Removed
        </p>
      </div>
      <div className="mt-5 w-full">
        {currentPage === "Active" && (
          <p className="text-sm">
            These are apps and websites you've connected to your Instagram account. They can access{" "}
            <br /> non-public information that you choose to share with them.
          </p>
        )}
        {currentPage === "Expired" && (
          <p className="text-sm">
            These are apps and websites you've connected to your Instagram account that you may not{" "}
            <br /> have used in the last 90 days. They're no longer able to access your non-public
            information,
            <br /> but may still have the information you shared while they were active.
            "Non-public" means <br /> information that an app can only access if you choose to share
            it when you log in with your <br /> Instagram account (like your email address).
          </p>
        )}
        {currentPage === "Removed" && (
          <p className="text-sm">
            These are apps and websites that are no longer connected to your Instagram account. They{" "}
            <br /> can't access your non-public information anymore, but may still have the
            information you <br />
            shared while they were active. "Non-public" means information that an app can only
            access if <br /> you choose to share it when you log in with your Instagram account
            (like your email address). <br /> You can ask an app to delete your information. To do
            it, review their Privacy Policy for details <br /> and contact information. If you
            contact an app, they may need your User ID.
          </p>
        )}
      </div>
      <p className="mt-5 text-xs text-gray-500">
        You have no expired applications that had access to your Instagram account.
      </p>
    </div>
  );
};

export default AppsAndWebsites;
