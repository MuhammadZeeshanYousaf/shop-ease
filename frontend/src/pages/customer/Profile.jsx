import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      Profile:
      <br />
      <p>{user.email}</p>
      <p>{user.firstName}</p>
    </div>
  );
}

export default Profile;
