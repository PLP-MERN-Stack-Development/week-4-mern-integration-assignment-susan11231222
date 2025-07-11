import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../api/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    setPosts((prev) => prev.filter((post) => post._id !== id)); // optimistic UI
    await deletePost(id);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
