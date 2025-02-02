import React, { useState, useEffect } from "react";
import Timer from "@/components/Timer";
import { useToast } from "@/hooks/use-toast";
import { Timer as TimerIcon, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { requestNotificationPermission, sendNotification } from "@/utils/notifications";
import { Alert, AlertDescription } from "@/components/ui/alert";

const motivationalMessages = [
  "Great work! Time to recharge.",
  "Stretch a bit, you deserve it!",
  "Another step closer to your goal!",
  "Take a moment to breathe and reset.",
  "You're doing amazing! Keep it up.",
  "Small breaks lead to big successes.",
  "Fantastic focus! Time to rest now.",
];

interface IndexProps {
  workDuration: number;
  breakDuration: number;
}

const Index: React.FC<IndexProps> = ({ workDuration, breakDuration }) => {
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkNotificationPermission = async () => {
      if ("Notification" in window) {
        const isGranted = await requestNotificationPermission();
        setNotificationsEnabled(isGranted);
        if (!isGranted && Notification.permission === "default") {
          setShowNotificationAlert(true);
        }
      }
    };
    checkNotificationPermission();
  }, []);

  const playSound = (soundName: string) => {
    const audio = new Audio(`/${soundName}.mp3`);
    audio.play();
  };

  const getRandomMotivationalMessage = () => {
    return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  };

  useEffect(() => {
    setTimeLeft(isWorkMode ? workDuration * 60 : breakDuration * 60);
  }, [workDuration, breakDuration, isWorkMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound("bell");
      const wasWorkMode = isWorkMode;
      setIsWorkMode(!isWorkMode);
      setTimeLeft(isWorkMode ? breakDuration * 60 : workDuration * 60);
      
      const message = wasWorkMode 
        ? "Break Time! " + getRandomMotivationalMessage()
        : "Back to Work! Let's crush this next cycle!";

      if (notificationsEnabled) {
        sendNotification(
          wasWorkMode ? "Break Time!" : "Back to Work!",
          message
        );
      }
      
      if (!wasWorkMode) {
        setCompletedCycles(prev => prev + 1);
        toast({
          title: "New Cycle Starting!",
          description: "Let's crush this next cycle! You've got this!",
        });
      } else {
        toast({
          title: isWorkMode ? "Break Time!" : "Back to Work!",
          description: getRandomMotivationalMessage(),
        });
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isWorkMode, workDuration, breakDuration, toast, notificationsEnabled]);

  const handleStart = () => {
    setIsRunning(true);
    playSound("start");
  };

  const handlePause = () => {
    setIsRunning(false);
    playSound("stop");
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(workDuration * 60);
    setIsWorkMode(true);
    playSound("stop");
  };

  const handleEnableNotifications = async () => {
    const isGranted = await requestNotificationPermission();
    setNotificationsEnabled(isGranted);
    setShowNotificationAlert(false);
  };

  return (
    <div
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
            <h1 className="text-xl font-semibold">Pomodoro App</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/settings")}
            className="flex items-center space-x-2"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {showNotificationAlert && (
        <Alert className="m-4">
          <Bell className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            Enable notifications to get timer updates
            <Button variant="outline" size="sm" onClick={handleEnableNotifications}>
              Enable
            </Button>
          </AlertDescription>
        </Alert>
      )}
      <div className="flex-1 flex items-center justify-center p-8">
        <Timer
          minutes={Math.floor(timeLeft / 60)}
          seconds={timeLeft % 60}
          isRunning={isRunning}
          isWorkMode={isWorkMode}
          completedCycles={completedCycles}
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
    </div>
  );
};

export default Index;