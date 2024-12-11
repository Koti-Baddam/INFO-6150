// Profiles Module

// Save a new profile
function saveProfile(profileName, preferences) {
    try {
        const profiles = JSON.parse(localStorage.getItem("userProfiles")) || {};
        profiles[profileName] = preferences; // Add or overwrite profile
        localStorage.setItem("userProfiles", JSON.stringify(profiles));
        console.log(`Profile "${profileName}" saved successfully!`);
    } catch (error) {
        console.error("Error saving profile:", error);
    }
}

// Get all saved profiles
function getProfiles() {
    try {
        const profiles = JSON.parse(localStorage.getItem("userProfiles"));
        return profiles || {};
    } catch (error) {
        console.error("Error retrieving profiles:", error);
        return {};
    }
}

// Set the active profile
function setActiveProfile(profileName) {
    try {
        const profiles = getProfiles();
        if (!profiles[profileName]) {
            console.error(`Profile "${profileName}" does not exist.`);
            return;
        }
        localStorage.setItem("activeProfile", profileName);
        console.log(`Active profile set to "${profileName}"`);
    } catch (error) {
        console.error("Error setting active profile:", error);
    }
}

// Get the active profile
function getActiveProfile() {
    try {
        const activeProfileName = localStorage.getItem("activeProfile");
        if (!activeProfileName) {
            console.log("No active profile found.");
            return null;
        }
        const profiles = getProfiles();
        return profiles[activeProfileName] || null;
    } catch (error) {
        console.error("Error retrieving active profile:", error);
        return null;
    }
}

// Example Usage
// Save a new profile
saveProfile("TechFan", {
    categories: ["technology", "science"],
    ageGroup: "adult",
});

// Save another profile
saveProfile("SportsEnthusiast", {
    categories: ["sports", "health"],
    ageGroup: "teen",
});

// Retrieve all profiles
const profiles = getProfiles();
console.log("Saved Profiles:", profiles);

// Set active profile
setActiveProfile("TechFan");

// Retrieve active profile
const activeProfile = getActiveProfile();
console.log("Active Profile:", activeProfile);
