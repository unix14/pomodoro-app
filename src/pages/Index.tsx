import React, { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const audio = new Audio("/bell.mp3");
      audio.play();
      setIsWorkMode(!isWorkMode);
      setTimeLeft(isWorkMode ? breakDuration * 60 : workDuration * 60);
      toast({
        title: isWorkMode ? "Break Time!" : "Back to Work!",
        description: isWorkMode
          ? "Take a well-deserved break."
          : "Let's focus on the task ahead.",
      });
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isWorkMode, workDuration, breakDuration, toast]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(workDuration * 60);
    setIsWorkMode(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-between p-8 transition-colors duration-700 ${
        isWorkMode ? "bg-pomodoro-work-bg" : "bg-pomodoro-break-bg"
      }`}
    >
      <div className="w-full max-w-md flex-1 flex items-center justify-center">
        <Timer
          minutes={Math.floor(timeLeft / 60)}
          seconds={timeLeft % 60}
          isRunning={isRunning}
          isWorkMode={isWorkMode}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </div>
      <a
        href="https://github.com/eyalyaakobi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        Eyal Yaakobi
      </a>
    </div>
  );
};

export default Index;