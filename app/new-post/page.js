import { redirect } from 'next/navigation';

import { storePost } from '@/lib/posts';

import PostForm from '@/components/post-form';
import { uploadImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export default function NewPostPage() {
  async function createPost(formData) {
    "use server";
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    const errors = [];

    if (!title || title.trim() === '') {
      errors.push('Title is required');
    }

    if (!content || content.trim() === '') {
      errors.push('Content is required');
    }

    if (!image || image.size === 0) {
      errors.push('Image is required');
    }

    if (errors.length > 0) {
      return { errors };
    }

    let imageUrl;

    try {
      imageUrl = await uploadImage(image);
    } catch (error) {
      throw new Error('Could not upload image! Please try again.');
    }

    await storePost({
      imageUrl,
      title,
      content,
      userId: 1
    })

    revalidatePath('/feed');
    redirect('/feed')
  }

  return (
    <>
      <h1>Create a new post</h1>
      <PostForm createPost={createPost} />
    </>
  );
}
