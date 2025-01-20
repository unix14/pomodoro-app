import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TimerProps {
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isWorkMode: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const Timer: React.FC<TimerProps> = ({
  minutes,
  seconds,
  isRunning,
  isWorkMode,
  onStart,
  onPause,
  onReset,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="text-6xl font-bold animate-timer-pulse">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>
      <div className="text-xl font-semibold">
        {isWorkMode ? "Focus Time" : "Break Time"}
      </div>
      <div className="flex space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={isRunning ? onPause : onStart}
          className="h-12 w-12"
        >
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onReset}
          className="h-12 w-12"
        >
          <RefreshCw className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/settings")}
          className="h-12 w-12"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Timer;