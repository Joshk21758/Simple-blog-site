import { authUser } from "@/lib/authUser";
import { getCollection } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { deletePost } from "@/actions/posts";

export default async function Dashboard() {
  //get auth user
  const user = await authUser();
  if (!user) {
    redirect("/login");
  }

  //find user posts
  const postCollection = await getCollection("posts");
  const userPosts = await postCollection
    .find({ userId: ObjectId.createFromHexString(user.userId) })
    .sort({ $natural: -1 })
    .toArray();

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 45, fontWeight: 800, marginBottom: 16 }}>
        Dashboard
      </h1>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#ffffff",
          }}
        >
          <thead>
            <tr
              style={{
                background: "linear-gradient(90deg,#4f46e5,#06b6d4)",
                color: "#fff",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "12px 12px" }}>Title</th>
              <th style={{ padding: "12px 16px", width: 100 }}>Date</th>
              <th style={{ padding: "12px 16px", width: 220 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userPosts && userPosts.length > 0 ? (
              userPosts.map((post) => (
                <tr
                  key={post._id.toString()}
                  style={{ borderBottom: "1px solid #eef2ff" }}
                >
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>
                    {post.title}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#6b7280" }}>
                    {post._id && post._id.getTimestamp
                      ? post._id.getTimestamp().toDateString()
                      : "-"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <Link
                        href={`/postz/details/${post._id.toString()}`}
                        style={{
                          padding: "8px 12px",
                          background: "#f3f4f6",
                          borderRadius: 6,
                          color: "#111",
                          textDecoration: "none",
                        }}
                      >
                        View
                      </Link>
                      <Link
                        href={`/postz/edit/${post._id.toString()}`}
                        style={{
                          padding: "8px 12px",
                          background: "#eef2ff",
                          borderRadius: 6,
                          color: "#1e293b",
                          textDecoration: "none",
                        }}
                      >
                        Edit
                      </Link>
                      <form action={deletePost}>
                        <input
                          type="hidden"
                          name="postId"
                          defaultValue={post._id.toString()}
                        />
                        <button
                          style={{
                            padding: "8px 12px",
                            background: "#eef2ff",
                            borderRadius: 6,
                            color: "#1e293b",
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  style={{ fontSize: 30, padding: 16, color: "#6b7280" }}
                >
                  You have no posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
