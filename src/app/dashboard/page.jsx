import { deletePost } from "@/actions/posts";
import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Dashboard({ post }) {
  //get auth user
  const user = authUser();

  //find user posts
  const postCollection = await getCollection("post");
  const userPosts = await postCollection
    ?.find({ _id: ObjectId.createFromHexString(user?.userId) })
    .sort({ $natural: -1 })
    .toArray();

  if (!userPosts) {
    return <p style={{ fontSize: 60 }}>Failed to fetch the data!</p>;
  }

  if (userPosts === 0) {
    return <p style={{ fontSize: 60 }}>You don't have any posts!</p>;
  }

  return (
    <div>
      <p className="title">Dashboard</p>

      <table>
        <thead>
          <tr>
            <th className="w-2/9">Title</th>
            <th className="w-1/6 text-blue-600">view</th>
            <th className="w-2/4 text-green-500">Edit</th>
            <th className="w-1/3 text-red-600">Delete</th>
          </tr>
        </thead>
        <tbody>
          {userPosts.map((post) => (
            <tr key={post?._id.toString()}>
              <td className="w-2/9">{post.title}</td>
              <td className="w-1/6 text-blue-500">
                <Link href={`postz/details/${post?._id.toString()}`}>Edit</Link>
              </td>
              <td className="w-2/4">
                <form action={deletePost}>
                  <input
                    type="hidden"
                    name="postId"
                    defaultValue={post._id.toString()}
                  />
                  <button className="delete-btn">Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
