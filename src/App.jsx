import { useState, useEffect } from 'react'


function App() {

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: "",
    tags: ""
  });

  const fetchPosts = () => {
    fetch("http://localhost:3000/posts")
      .then(response => response.json())
      .then(data => setPosts(data));

  };


  useEffect(fetchPosts, []);

  const handleChange = (e) => {
    setNewPost({
      ...newPost, [e.target.name]: e.target.value

    })


  };

  const addPost = (event) => {
    event.preventDefault();

    const formattedPost = {
      ...newPost,
      tags: newPost.tags.split(",").map(tag => tag.trim()),
    };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedPost),
    })
      .then(response => response.json())
      .then(() => {
        setNewPost({
          title: "",
          content: "",
          image: "",
          tags: ""
        });
      });

  };

  return (
    <>
      <div className='container'>
        <h2 className='mb-3 text center'>lista dei posts</h2>

        <div className="card p-3 mb-4">
          <h4>Aggiungi un Post</h4>
          <form onSubmit={addPost}>
            <input type="text" name="title" placeholder="Title" className="form-control mb-2" value={newPost.title} onChange={handleChange} />
            <textarea name="content" placeholder="Content" className="form-control mb-2" value={newPost.content} onChange={handleChange}></textarea>
            <input type="text" name="image" placeholder="Image URL" className="form-control mb-2" value={newPost.image} onChange={handleChange} />
            <input type="text" name="tags" placeholder="Tags (separati da virgola)" className="form-control mb-2" value={newPost.tags} onChange={handleChange} />
            <button type="submit" className="btn btn-success">Aggiungi Post</button>
          </form>
        </div>
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
                <td>{JSON.stringify(post.tags)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
