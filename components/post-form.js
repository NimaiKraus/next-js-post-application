'use client';

import FormSubmit from "./form-submit";

const PostForm = ({ createPost }) => {
    return (
        <form action={createPost}>
            <p className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required />
            </p>
            <p className="form-control">
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="image"
                    name="image"
                    required
                />
            </p>
            <p className="form-control">
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows="5" required />
            </p>
            <p className="form-actions">
                <FormSubmit />
            </p>
        </form>
    )
}

export default PostForm;