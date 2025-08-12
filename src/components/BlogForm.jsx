"use client";

import { createPost } from "@/actions/posts";
import { useActionState } from "react";

export default function BlogForm() {
  const [state, action, isPending] = useActionState(createPost, undefined);
  return (
    <div>
      <form action={action} className="form-class">
        <label className="label-class">Title</label>
        <input
          type="text"
          className="input-class"
          name="title"
          placeholder="Enter a Title"
        />
        {state?.errors?.title && <p className="errors">{state.errors.title}</p>}
        <label className="label-class">Content</label>
        <textarea className="message-body" name="content" />
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
