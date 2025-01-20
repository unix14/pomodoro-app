import React from "react";
import SettingsForm from "@/components/SettingsForm";

const Settings = () => {
  // In a real app, these would be managed with global state management
  const [workDuration, setWorkDuration] = React.useState(25);
  const [breakDuration, setBreakDuration] = React.useState(5);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Timer Settings</h1>
        <SettingsForm
          workDuration={workDuration}
          breakDuration={breakDuration}
          onWorkDurationChange={setWorkDuration}
          onBreakDurationChange={setBreakDuration}
        />
      </div>
    </div>
  );
};

export default Settings;