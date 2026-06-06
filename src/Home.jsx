import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();

  return (
    <>
      <h1>Home Page</h1>
      <p>
        Welcome to the homepage. Click the button below to view your profile.
      </p>
      <button onClick={() => navigate("/profile")}>Profile</button>
      //Today class completedd......
    </>
  );
}

export default Home;
