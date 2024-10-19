import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import CreatePost from "./components/Sidebar/CreatePost";
import { auth, firestore } from "./firebase/firebase";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import AdminPage from "./pages/AdminPage/AdminPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const [authUser] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (authUser) {
        const userRef = doc(firestore, "users", authUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setIsAdmin(userSnap.data().isAdmin === true);
        }
      }
      setIsLoading(false);
    };

    checkAdminStatus();
  }, [authUser]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              isAdmin ? (
                <Navigate to="/admin" />
              ) : (
                <HomePage />
              )
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/auth"
          element={!authUser ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={
            authUser ? (
              isAdmin ? (
                <AdminPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
