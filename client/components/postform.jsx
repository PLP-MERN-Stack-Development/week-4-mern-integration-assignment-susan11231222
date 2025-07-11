import { useState, useEffect } from 'react';
import { createPost, updatePost, getCategories, getPostById } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCategories().then(setCategories);
    if (id) {
      getPostById(id).then(post => {
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category?._id || '');
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      return setError('All fields are required');
    }

    const payload = { title, content, category };
    try {
      id ? await updatePost(id, payload) : await createPost(payload);
      navigate('/');
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>
      <button type="submit">{id ? 'Update' : 'Create'} Post</button>
    </form>
  );
};

export default PostForm;
