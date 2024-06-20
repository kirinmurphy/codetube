// import Image from "next/image";

import { fetchToDoList, fetchPosts } from '@/lib/posts';


export default async function Home() {
  const todoList = await fetchToDoList();
  const posts = await fetchPosts();
  console.log('posts', posts);

  return (
    <>
      {posts && posts.map(({ id, title, body }) => (
        <div key={id}>
          <a href={`/blog/${id}`}>
            <h3>{title}</h3>
          </a>
          <div>{body}</div>
        </div>
      ))}

      <br/><hr/><br/>

      {todoList && todoList.map(({ id, title, completed }) => (
        <div key={id}>
          <a href={`/blog/${id}`}>
            <h3>{title}</h3>
          </a>
          <p>{completed ? 'Completed' : 'Not completed'}</p>
        </div>
      ))}    
    </>
  );
}
