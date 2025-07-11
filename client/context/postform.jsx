import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PostForm = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  // ... rest of your form
};
export default PostForm;
