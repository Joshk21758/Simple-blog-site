import BlogForm from "@/components/BlogForm";

export default function Create() {
  return (
    <div>
      <p
        style={{
          fontSize: 45,
          fontFamily: "sans",
          textAlign: "center",
          marginTop: 40,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Create a Post
      </p>
      <BlogForm />
    </div>
  );
}
