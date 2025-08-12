import PostCard from "@/components/PostCard";
import { getCollection } from "@/lib/db";

export default async function Home() {
  //get post collection
  const postCollection = await getCollection("post");
  const posts = await postCollection?.find().sort({ $natural: -1 }).toArray();
  return (
    <div>
      <p
        style={{
          fontSize: 40,
          fontFamily: "sans",
          marginLeft: 30,
          marginTop: 40,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Recent Posts 💭
      </p>
      <hr
        style={{
          height: 3,
          width: 1400,
          marginLeft: 30,
          color: "black",
        }}
      />
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
