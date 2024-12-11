// src/context/ProfileContext.js
import React, { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profiles, setProfiles] = useState({});
    const [activeProfile, setActiveProfile] = useState("default");

    // Load profiles and active profile from localStorage on mount
    useEffect(() => {
        const storedProfiles = JSON.parse(localStorage.getItem("profiles")) || {};
        setProfiles(storedProfiles);
        const storedActiveProfile = localStorage.getItem("activeProfile") || "default";
        setActiveProfile(storedActiveProfile);
    }, []);

    // Save profiles and active profile to localStorage on change
    useEffect(() => {
        localStorage.setItem("profiles", JSON.stringify(profiles));
        localStorage.setItem("activeProfile", activeProfile);
    }, [profiles, activeProfile]);

    const addProfile = (name, preferences = {}) => {
        setProfiles((prevProfiles) => ({
            ...prevProfiles,
            [name]: { preferences, readArticles: [] },
        }));
    };

    const deleteProfile = (name) => {
        setProfiles((prevProfiles) => {
            const updatedProfiles = { ...prevProfiles };
            delete updatedProfiles[name];
            return updatedProfiles;
        });
        if (name === activeProfile) {
            setActiveProfile("default");
        }
    };

    return (
        <ProfileContext.Provider
            value={{ profiles, activeProfile, setActiveProfile, addProfile, deleteProfile }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
