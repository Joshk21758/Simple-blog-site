import { updatePost } from "@/actions/posts";
import BlogForm from "@/components/BlogForm";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export default async function Edit({ params }) {
  //get route params
  const { id } = await params;

  const postCollection = await getCollection("posts");
  let post;
  if (id.length === 24 && postCollection) {
    post = await postCollection.findOne({
      _id: ObjectId.createFromHexString(id),
    });
    post = JSON.parse(JSON.stringify(post));
  } else {
    console.log("Invalid post id");
  }

  return (
    <div>
      <p className="title">Edit your Post</p>
      {post ? (
        <BlogForm handler={updatePost} post={post} />
      ) : (
        <p
          style={{
            fontSize: 50,
          }}
        >
          Post not found
        </p>
      )}
    </div>
  );
}
