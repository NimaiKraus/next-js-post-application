'use client';

import { useOptimistic } from 'react';

import { formatDate } from '@/lib/format';
import { togglePostLikeStatus } from '@/actions/actions';

import LikeButton from './like-icon';

function Post({ post, action }) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, post.id)} className={post.isLiked ? 'liked' : ''}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    const postIndex = prevPosts.findIndex((post) => post.id === updatedPostId);

    if (postIndex === -1) {
      return prevPosts;
    }

    const updatedPost = {
      ...prevPosts[postIndex],
      isLiked: !prevPosts[postIndex].isLiked,
      likes: prevPosts[postIndex].isLiked ? prevPosts[postIndex].likes - 1 : prevPosts[postIndex].likes + 1
    };

    const updatedPosts = [...prevPosts];
    updatedPosts[postIndex] = updatedPost;
    return updatedPosts;
  });

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  const updatePosts = async (updatedPostId) => {
    await updateOptimisticPosts(updatedPostId);
    togglePostLikeStatus(updatedPostId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePosts} />
        </li>
      ))}
    </ul>
  );
}
