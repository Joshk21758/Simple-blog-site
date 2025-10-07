import PostCard from "@/components/PostCard";
import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function Details({ params }) {
  //get route params
  const { id } = await params;

  //get auth user
  const user = await authUser();

  const postCollection = await getCollection("post");
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
  console.log(post);

  return (
    <div>
      <p className="title">Post Details</p>
      {post ? <PostCard post={post} /> : <p>Post not found</p>}
    </div>
  );
}
