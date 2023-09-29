"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}&sajt=2`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete?");
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id}`, { method: "DELETE" });
        const filteredPosts = posts.filter(
          (currentPost) => currentPost._id !== post._id
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);
  return (
    <div>
      <Profile
        name="My"
        desc="welcome to your adjskhfsdj"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
