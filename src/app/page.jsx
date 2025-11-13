import PostCard from "@/components/PostCard";
import { getCollection } from "@/lib/db";

export default async function Home() {
  //get post collection
  const postCollection = await getCollection("posts");
  const posts = await postCollection?.find().sort({ $natural: -1 }).toArray();
  return (
    <div>
      <p
        style={{
          fontSize: 40,
          fontFamily: "sans-serif",
          marginLeft: 40,
          marginTop: 40,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Recent Posts 💭
      </p>
      <div className="grid-class">
        {posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
