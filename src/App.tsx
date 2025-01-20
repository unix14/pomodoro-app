import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => {
  const [workDuration, setWorkDuration] = useState(25); // Default 25 minutes
  const [breakDuration, setBreakDuration] = useState(5); // Default 5 minutes

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Index
                  workDuration={workDuration}
                  breakDuration={breakDuration}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings
                  workDuration={workDuration}
                  breakDuration={breakDuration}
                  onWorkDurationChange={setWorkDuration}
                  onBreakDurationChange={setBreakDuration}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;