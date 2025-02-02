import React from "react";
import SettingsForm from "@/components/SettingsForm";
import { Timer } from "lucide-react";

interface SettingsProps {
  workDuration: number;
  breakDuration: number;
  onWorkDurationChange: (duration: number) => void;
  onBreakDurationChange: (duration: number) => void;
}

const Settings: React.FC<SettingsProps> = ({
  workDuration,
  breakDuration,
  onWorkDurationChange,
  onBreakDurationChange,
}) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-pomodoro-header-bg shadow-sm mb-6">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center relative">
          <div className="flex items-center space-x-2">
            <Timer className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </div>
      </div>
      <div className="max-w-md mx-auto p-8">
        <SettingsForm
          workDuration={workDuration}
          breakDuration={breakDuration}
          onWorkDurationChange={onWorkDurationChange}
          onBreakDurationChange={onBreakDurationChange}
        />
      </div>
      <footer className="fixed bottom-0 left-0 right-0 p-4 text-center bg-background/80 backdrop-blur-sm">
        <a
          href="https://github.com/unix14"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Eyal Yaakobi
        </a>
      </footer>
    </div>
  );
};

export default Settings;