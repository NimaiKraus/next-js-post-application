'use server';

const { revalidatePath } = require("next/cache");

const { updatePostLikeStatus } = require("@/lib/posts");

export const togglePostLikeStatus = async (postId) => {
    await updatePostLikeStatus(postId, 2);
    revalidatePath('/feed');
  }