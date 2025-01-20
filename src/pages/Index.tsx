import React, { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import { useToast } from "@/components/ui/use-toast";
import { Timer as TimerIcon, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Reset timer when durations change
    if (!isRunning) {
      setTimeLeft(isWorkMode ? workDuration * 60 : breakDuration * 60);
    }
  }, [workDuration, breakDuration, isWorkMode, isRunning]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`min-h-screen flex flex-col transition-colors duration-700 ${
        isRunning
          ? isWorkMode
            ? "bg-pomodoro-work-bg"
            : "bg-pomodoro-break-bg"
          : "bg-background"
      }`}
    >
      <div className="bg-pomodoro-header-bg shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TimerIcon className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Pomodoro Timer</h1>
          </div>
          <Link
            to="/settings"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <SettingsIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
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
    </motion.div>
  );
};

export default Index;