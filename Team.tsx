import React, { useState } from "react";
import TeamMembers from "../components/team/TeamMembers";
import TeamInvites from "../components/team/TeamInvites";
import TeamPermissions from "../components/team/TeamPermissions";
import TeamActivity from "../components/team/TeamActivity";

const Team: React.FC = () => {
  const [activeTab, setActiveTab] = useState("members");

  const tabs = [
    { id: "members", label: "Team Members" },
    { id: "invites", label: "Invitations" },
    { id: "permissions", label: "Permissions" },
    { id: "activity", label: "Activity" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Team Management</h1>
        <p className="text-gray-400">Manage your team members and permissions</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "members" && <TeamMembers />}
          {activeTab === "invites" && <TeamInvites />}
          {activeTab === "permissions" && <TeamPermissions />}
          {activeTab === "activity" && <TeamActivity />}
        </div>
      </div>
    </div>
  );
};

export default Team;