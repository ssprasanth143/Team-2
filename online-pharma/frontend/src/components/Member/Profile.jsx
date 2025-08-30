import React, { useEffect, useState } from "react";
import MemberSidebar from "./Membersidebar";
import "../../styles/Profile.css";


const Profile = () => {
  const memberId = localStorage.getItem("memberId");
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (memberId) {
      fetch(`http://localhost:8080/api/members/${memberId}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load profile", err);
          setIsLoading(false);
        });
    }
  }, [memberId]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/members/${memberId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-layout">
      <div className="profile-sidebar">
        <MemberSidebar />
      </div>

      <div className="profile-main">
        <div className="profile-header">
         
          <h2 className="heading1">My Profile</h2>
        </div>

        <div className="profile-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile:</label>
              <input
                type="text"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                rows="3"
                required
              ></textarea>
            </div>

            <button type="submit" className="update-btn">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
