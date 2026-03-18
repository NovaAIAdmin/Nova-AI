import React, { useState } from "react";
import AccountSettings from "../components/settings/AccountSettings";
import BillingSettings from "../components/settings/BillingSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import ApiSettings from "../components/settings/ApiSettings";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account" },
    { id: "billing", label: "Billing" },
    { id: "notifications", label: "Notifications" },
    { id: "api", label: "API" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and settings</p>
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
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "billing" && <BillingSettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "api" && <ApiSettings />}
        </div>
      </div>
    </div>
  );
};

export default Settings;