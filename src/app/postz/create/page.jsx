import { createPost } from "@/actions/posts";
import BlogForm from "@/components/BlogForm";

export default function Create({ post }) {
  return (
    <div>
      <p
        style={{
          fontSize: 45,
          fontFamily: "sans-serif",
          textAlign: "center",
          marginTop: 40,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Create a Post
      </p>
      <BlogForm handler={createPost} post={post} />
    </div>
  );
}
