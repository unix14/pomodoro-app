import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SettingsFormProps {
  workDuration: number;
  breakDuration: number;
  onWorkDurationChange: (duration: number) => void;
  onBreakDurationChange: (duration: number) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  workDuration,
  breakDuration,
  onWorkDurationChange,
  onBreakDurationChange,
}) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Button
        type="button"
        variant="ghost"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Button>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="workDuration">Work Duration (minutes)</Label>
          <Input
            id="workDuration"
            type="number"
            min="1"
            max="60"
            value={workDuration}
            onChange={(e) => onWorkDurationChange(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
          <Input
            id="breakDuration"
            type="number"
            min="1"
            max="60"
            value={breakDuration}
            onChange={(e) => onBreakDurationChange(Number(e.target.value))}
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Save Settings
      </Button>
    </form>
  );
};

export default SettingsForm;