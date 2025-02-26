import { useState, useEffect } from 'react'

function App() {

  const [posts, setPosts] = useState([]);
  const fetchPosts = () => {
    fetch("http://localhost:3000/posts")
      .then(response => response.json())
      .then(data => setPosts(data));

  };
  useEffect(fetchPosts, []);

  return (
    <>
      <div className='container'>
        <h2 className='mb-3 text center'>lista dei posts</h2>
        <table className='table table-striped'>
          <thead className='thead-dark'>
            <tr>
              <th>ID</th>
              <th>TITOLO</th>
              <th>CONTENUTO</th>
              <th>IMAGGINE</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.image}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
