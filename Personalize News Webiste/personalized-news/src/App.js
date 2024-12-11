import React, { useState } from "react";
import { ProfileProvider } from "./context/ProfileContext";
import ProfileSwitcher from "./components/ProfileSwitcher";
import ProfileForm from "./components/ProfileForm";
import "./App.css"; // Keep your CSS imports for global styling

function App() {
  const [showProfileForm, setShowProfileForm] = useState(false);

  return (
    <ProfileProvider>
      <div className="App">
        <header className="App-header">
          <h1>Personalized News</h1>
          {/* Profile Switcher Component */}
          <ProfileSwitcher />
          {/* Add Profile Button */}
          <button
            className="btn btn-primary ms-2"
            onClick={() => setShowProfileForm(true)}
          >
            Add Profile
          </button>
        </header>
        {/* Profile Form Modal */}
        <ProfileForm show={showProfileForm} onHide={() => setShowProfileForm(false)} />
        <main>
          <p>Welcome to your personalized news feed! Select a profile to start.</p>
        </main>
      </div>
    </ProfileProvider>
  );
}

export default App;
