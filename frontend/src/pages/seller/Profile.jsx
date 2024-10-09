import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { currentUser } = useAuth();
  const user = currentUser();

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
