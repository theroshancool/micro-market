import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user)
    return <p className="not-logged">Not logged in</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;