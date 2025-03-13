"use client";

import React, { useState, useEffect } from "react";
import { Settings, LineChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// ShadCN UI - Dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

// ShadCN UI - Tabs (for Report dialog)
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

// ShadCN UI - Switch, Label, Input, Select (for Settings dialog)
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Pomodoro durations in seconds
const POMODORO_DURATION = 25 * 60;    // 25:00
const SHORT_BREAK_DURATION = 5 * 60;  //  5:00
const LONG_BREAK_DURATION = 15 * 60;  // 15:00

type Mode = "pomodoro" | "shortBreak" | "longBreak";

const Pomodoro: React.FC = () => {
  // Basic Pomodoro state
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState<number>(POMODORO_DURATION);
  const [isRunning, setIsRunning] = useState(false);

  // Dialog open states
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Dynamically update background color based on mode
  let containerBg = "bg-red-200";
  if (mode === "shortBreak") containerBg = "bg-blue-200";
  if (mode === "longBreak") containerBg = "bg-gray-300";

  // Switch modes: reset timer and stop
  const handleModeSwitch = (newMode: Mode) => {
    setMode(newMode);
    setIsRunning(false);
    if (newMode === "pomodoro") {
      setTimeLeft(POMODORO_DURATION);
    } else if (newMode === "shortBreak") {
      setTimeLeft(SHORT_BREAK_DURATION);
    } else {
      setTimeLeft(LONG_BREAK_DURATION);
    }
  };

  // Start or pause the timer
  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  // Decrement timeLeft by 1 every second if running
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Optionally play a sound or notify user
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  // Format seconds into mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Display text under timer
  let displayText = "Time to focus!";
  if (mode === "shortBreak" || mode === "longBreak") {
    displayText = "Time for a break!";
  }

  return (
    <div className={`flex flex-col items-center w-full min-h-screen ${containerBg}`}>
      {/* Header with Report and Settings buttons */}
      <div className="flex items-center justify-end w-full max-w-5xl py-4 px-2 gap-3">

        {/* REPORT DIALOG */}
        <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <LineChartIcon className="h-4 w-4 mr-1" />
              Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Report</DialogTitle>
              <DialogDescription>
                View your Pomodoro statistics and rankings.
              </DialogDescription>
            </DialogHeader>

            {/* TABS: Summary, Detail, Ranking */}
            <Tabs defaultValue="summary">
              <TabsList className="mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="detail">Detail</TabsTrigger>
                <TabsTrigger value="ranking">Ranking</TabsTrigger>
              </TabsList>

              {/* SUMMARY TAB */}
              <TabsContent value="summary">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Activity Summary</h2>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">3.2</p>
                      <p className="text-sm text-gray-500">hours focused</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-gray-500">days accessed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-gray-500">day streak</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium mb-2">Focus Hours</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Button variant="outline" size="sm">
                        Week
                      </Button>
                      <Button variant="outline" size="sm">
                        Month
                      </Button>
                      <Button variant="outline" size="sm">
                        Year
                      </Button>
                    </div>
                    <div className="h-32 bg-gray-100 flex items-center justify-center rounded-md">
                      <span className="text-gray-500">[Chart Placeholder]</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* DETAIL TAB */}
              <TabsContent value="detail">
                <p className="text-sm text-gray-600">
                  Here you could show a detailed daily or session-based breakdown of your Pomodoro usage.
                </p>
              </TabsContent>

              {/* RANKING TAB */}
              <TabsContent value="ranking">
                <p className="text-sm text-gray-600">
                  Show your rank among friends or a global leaderboard.
                </p>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              {/* Optional footer actions */}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* SETTINGS DIALOG */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} className="custom-scrollbar min-h-[400px]" >
          <DialogTrigger asChild>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md min-h-[400px] custom-scrollbar">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Adjust your Pomodoro preferences
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* TIMER SETTINGS */}
              <div className="space-y-4">
                <h2 className="font-semibold">Timer (minutes)</h2>
                <div className="flex items-center justify-between">
                  <Label>Pomodoro</Label>
                  <Input type="number" defaultValue={25} className="w-16" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Short Break</Label>
                  <Input type="number" defaultValue={5} className="w-16" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Long Break</Label>
                  <Input type="number" defaultValue={15} className="w-16" />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Auto Start Breaks</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto Start Pomodoros</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Long Break Interval</Label>
                  <Input type="number" defaultValue={4} className="w-16" />
                </div>
              </div>

              {/* TASK SETTINGS */}
              <div className="space-y-4">
                <h2 className="font-semibold">Task</h2>
                <div className="flex items-center justify-between">
                  <Label>Auto Check Tasks</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Auto Switch Tasks</Label>
                  <Switch defaultChecked />
                </div>
              </div>

              {/* SOUND SETTINGS */}
              <div className="space-y-4">
                <h2 className="font-semibold">Sound</h2>
                <div className="flex items-center justify-between">
                  <Label>Alarm Sound</Label>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Bird" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bird">Bird</SelectItem>
                      <SelectItem value="bell">Bell</SelectItem>
                      <SelectItem value="chime">Chime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Repeat</Label>
                  <Input type="number" defaultValue={3} className="w-16" />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Ticking Sound</Label>
                  <Input type="range" min={0} max={100} defaultValue={50} className="w-32" />
                </div>
              </div>

              {/* THEME SETTINGS */}
              <div className="space-y-4">
                <h2 className="font-semibold">Theme</h2>
                <div className="flex items-center justify-between">
                  <Label>Color Themes</Label>
                  <div className="flex items-center gap-2">
                    <button className="w-6 h-6 rounded-full bg-red-500" />
                    <button className="w-6 h-6 rounded-full bg-blue-500" />
                    <button className="w-6 h-6 rounded-full bg-gray-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Hour Format</Label>
                  <Select>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="24 hour" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 hour</SelectItem>
                      <SelectItem value="12">12 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              {/* e.g. <Button>Save</Button> if needed */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pomodoro Body */}
      <div className="w-full max-w-4xl flex flex-col items-center p-4">
        {/* Tabs (Pomodoro, Short Break, Long Break) */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => handleModeSwitch("pomodoro")}
            className={`px-4 py-2 rounded-md text-white font-semibold
              ${mode === "pomodoro" ? "bg-red-500" : "bg-red-300"}
            `}
          >
            Pomodoro
          </button>
          <button
            onClick={() => handleModeSwitch("shortBreak")}
            className={`px-4 py-2 rounded-md text-white font-semibold
              ${mode === "shortBreak" ? "bg-blue-500" : "bg-blue-300"}
            `}
          >
            Short Break
          </button>
          <button
            onClick={() => handleModeSwitch("longBreak")}
            className={`px-4 py-2 rounded-md text-white font-semibold
              ${mode === "longBreak" ? "bg-gray-600" : "bg-gray-400"}
            `}
          >
            Long Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center justify-center  p-8 rounded-md s max-w-xl w-full">
          <h1 className="text-8xl font-bold mb-4">{formatTime(timeLeft)}</h1>
          <Button variant="default"  onClick={handleStartPause}>
            {isRunning ? "Pause" : "Start"}
          </Button>
        </div>

        {/* Display text */}
        <p className="mt-6 text-lg font-semibold">{displayText}</p>

       
      </div>
    </div>
  );
};

export default Pomodoro;
