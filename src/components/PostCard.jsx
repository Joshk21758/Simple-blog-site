import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div>
      <div className="border-class">
        <p className="date-class">{post._id.getTimestamp().toLocaleString()}</p>
        <Link
          className="post-title"
          href={`postz/details/${post._id.toString()}`}
        >
          {post.title}
        </Link>
        <p className="content-class">{post.content}</p>
      </div>
    </div>
  );
}
