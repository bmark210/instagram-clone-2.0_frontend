import Timeline from "../components/Timeline";
import RigthSideBar from "../components/rigthSideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../redux/slices/auth";
import { useEffect } from "react";
import { fetchPosts } from "../redux/slices/posts";
import { RootState } from "../redux/store";
import { Posts } from "../types/posts/post";

const Feed = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth);
  const posts: Posts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchAuth() as any);
    dispatch(fetchPosts() as any);
  }, []);

  return (
    <div className="flex w-full flex-row ml-20">
      <Timeline posts={posts} />
      <RigthSideBar user={user} />
    </div>
  );
};

export default Feed;
