import PostCard from "@/components/PostCard";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function Details({ params }) {
  //get route params
  const { id } = await params;

  const postCollection = await getCollection("posts");
  let post;
  if (id.length === 24 && postCollection) {
    post = await postCollection?.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    post = JSON.parse(JSON.stringify(post));
  } else {
    console.log("Invalid post id");
    return null;
  }

  return (
    <div>
      <p className="title">Post Details</p>
      {post ? <PostCard post={post} /> : <p>Post not found</p>}
    </div>
  );
}
