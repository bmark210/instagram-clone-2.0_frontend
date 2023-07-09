// import { useEffect, useState } from "react";
// import { fetchUser } from "../api/endpoints/users";

// type Props = {
//   username: string;
// };

// const useUser = ({ username }: Props) => {
//   const [user, setUser] = useState(null);
//   console.log(user);

//   useEffect(() => {
//     if (username) {
//       fetchUser(username).then((res) => {
//         setUser(res.data);
//       });
//     }
//   }, [username]);
//   return user;
// };

// export default useUser;
