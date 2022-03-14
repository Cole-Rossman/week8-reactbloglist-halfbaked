import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import { fetchBlogs } from '../../services/blogs';

export default function Main() {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetchBlogs();
        setBlogs(resp);
        setLoading(false);
      } catch (e) {
        setErrorMessage('An error ocurred. Please refresh the page');
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <p className='error'>{errorMessage}</p>
      <div className='main'>
        {blogs.map((blog) => (
          <BlogCard key={blog.title} {...blog} />
        ))}
      </div>
    </>
  );
}

