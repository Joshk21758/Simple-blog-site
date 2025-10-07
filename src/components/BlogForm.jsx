"use client";

import { createPost } from "@/actions/posts";
import { useActionState } from "react";

export default function BlogForm({ post, handler }) {
  const [state, action, isPending] = useActionState(handler, undefined);
  return (
    <div>
      <form action={action} className="form-class">
        <input type="hidden" name="postId" defaultValue={post?._id} />
        <input
          type="hidden"
          name="postId"
          defaultValue={post?._id?.toString()}
        />
        <label className="label-class">Title</label>
        <input
          type="text"
          className="input-class"
          name="title"
          placeholder="Enter a Title"
          defaultValue={state?.title || post?.title}
        />
        {state?.errors?.title && <p className="errors">{state.errors.title}</p>}
        <label className="label-class">Content</label>
        <textarea
          className="message-body"
          name="content"
          defaultValue={state?.content || post?.content}
        />
        {state?.errors?.content && (
          <p className="errors">{state.errors.content}</p>
        )}
        <button className="post-btn" disabled={isPending}>
          {isPending ? "Loading..." : "Post"}
        </button>
      </form>
    </div>
  );
}
