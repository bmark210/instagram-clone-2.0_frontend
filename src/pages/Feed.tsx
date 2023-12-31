import Timeline from "../components/Timeline";
import RigthSideBar from "../components/rigthSideBar";
import { fetchAuth } from "../redux/slices/user";
import { useEffect } from "react";
import { fetchPosts } from "../redux/slices/posts";
import { useAppDispach, useAppSelector } from "../redux/hooks";

const Feed = () => {
  const dispatch = useAppDispach();

  const user = useAppSelector(state => state.auth);
  const posts = useAppSelector(state => state.posts);

  useEffect(() => {
    if (user) {
      dispatch(fetchPosts());
    } else {
      dispatch(fetchPosts());
      dispatch(fetchAuth());
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full flex-row">
      <Timeline posts={posts} />
      <RigthSideBar user={user} />
    </div>
  );
};

export default Feed;
