// src/components/ProfileSwitcher.js
import React, { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";

const ProfileSwitcher = () => {
    const { profiles, activeProfile, setActiveProfile, deleteProfile } = useContext(ProfileContext);

    const handleProfileChange = (e) => {
        setActiveProfile(e.target.value);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the profile "${activeProfile}"?`)) {
            deleteProfile(activeProfile);
        }
    };

    return (
        <div className="profile-switcher">
            <select value={activeProfile} onChange={handleProfileChange} className="form-select">
                {Object.keys(profiles).map((profile) => (
                    <option key={profile} value={profile}>
                        {profile}
                    </option>
                ))}
            </select>
            <button onClick={handleDelete} className="btn btn-danger ms-2">
                Delete Profile
            </button>
        </div>
    );
};

export default ProfileSwitcher;
