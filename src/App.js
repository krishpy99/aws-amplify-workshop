// src/App.js
import React, { useState, useEffect } from "react";

// import API from Amplify library
import { generateClient } from 'aws-amplify/api';

// import query definition
import { listPosts } from "./graphql/queries";

export default function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    try {
      const API = generateClient();
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items);
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <div>
      <h1>Hello World</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <p>{post.location}</p>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}
