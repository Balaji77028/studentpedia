import { useEffect, useState } from "react";

// Assume these functions are defined elsewhere in your app where Firebase is initialized
import { getCurrentUser, getUserPosts } from "../../firebase/firebaseUtils";

const AdminProfilePage = () => {
  const [adminData, setAdminData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch current user data
        const user = await getCurrentUser();
        if (!user) {
          throw new Error("No authenticated user found");
        }

        setAdminData({
          username: user.displayName || "Admin User",
          profilePic: user.photoURL || "/api/placeholder/100/100",
          email: user.email,
        });

        // Fetch user's posts
        const userPosts = await getUserPosts(user.uid);
        setPosts(userPosts);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}>
        <img
          src={adminData.profilePic}
          alt={adminData.username}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            marginRight: "20px",
          }}
        />
        <div>
          <h2 style={{ margin: "0 0 10px 0" }}>{adminData.username}</h2>
          <p>{adminData.email}</p>
          <p>Admin User</p>
        </div>
      </div>

      <h3>Posts</h3>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}>
              <h4 style={{ margin: "0 0 10px 0" }}>{post.title}</h4>
              <p>{post.content}</p>
              <p style={{ fontSize: "0.8em", color: "#666" }}>
                Posted on: {new Date(post.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProfilePage;
