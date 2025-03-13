"use client";

import React, { useEffect, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Loader } from "lucide-react";

const TASKS = [
  {
    name: "Employee Details",
    description: "Update information about employees",
    due: "Feb 14, 2024 - Feb 16, 2024",
    type: "Dashboard",
    priority: "High",
  },
  {
    name: "Darkmode version",
    description: "Implement darkmode for all employees",
    due: "Feb 14, 2024 - Feb 16, 2024",
    type: "UI",
    priority: "Medium",
  },
  {
    name: "User Admin Role",
    description: "Set up new admin roles in system",
    due: "Mar 1, 2024 - Mar 5, 2024",
    type: "Backend",
    priority: "High",
  },
];

export default function DashboardPage() {
  const { user, error, isLoading } = useUser();
  const hasSynced = useRef(false);

  // Sync user info to your backend once
  useEffect(() => {
    if (user && !hasSynced.current) {
      hasSynced.current = true;
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          sub: user.sub,
          phoneNumber: user.phone_number || "",
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("User saved:", data))
        .catch((err) => console.error("Error saving user:", err));
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loader className="animate-spin h-6 w-6 text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  const userName = user?.name || "Amanda";

  return (
    <div className="min-h-screen w-full bg-[#F9F9F9] text-gray-800">
      {/* HEADER */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LEFT: Date + Greeting */}
          <div>
            <p className="text-sm text-gray-500">Monday, September 30</p>
            <h1 className="text-2xl font-semibold mt-1">
              Good morning, {userName}
            </h1>
          </div>

          {/* RIGHT: Customize + Profile */}
          <div className="flex items-center gap-3">
            <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100">
              Customize
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-400">
                  ?
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* TO-DO TABLE */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">To-do</h2>
          </div>
          <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 font-medium text-gray-700">Name</th>
                  <th className="px-4 py-2 font-medium text-gray-700">Description</th>
                  <th className="px-4 py-2 font-medium text-gray-700">Due</th>
                  <th className="px-4 py-2 font-medium text-gray-700">Type</th>
                  <th className="px-4 py-2 font-medium text-gray-700">Priority</th>
                </tr>
              </thead>
              <tbody>
                {TASKS.map((task, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{task.name}</td>
                    <td className="px-4 py-3">{task.description}</td>
                    <td className="px-4 py-3">{task.due}</td>
                    <td className="px-4 py-3">{task.type}</td>
                    <td className="px-4 py-3">{task.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* GRID OF CARDS */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* PROJECT PROGRESS (Green card) */}
          <div className="rounded-lg p-4 shadow-sm bg-[#ECFAF0]">
            <h3 className="text-lg font-semibold mb-2">Project Progress</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shadow">
                {/* Just a placeholder 41% */}
                <div className="text-xl font-bold text-green-600">41%</div>
                <div className="absolute text-[10px] text-gray-500 top-full mt-1">
                  Project Ended
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Completed</p>
                <p className="text-gray-400">End date: 09/25/2024</p>
              </div>
            </div>
          </div>

          {/* TODAY'S MEETINGS (Dark card) */}
          <div className="rounded-lg p-4 shadow-sm bg-[#1B1B1B] text-white">
            <h3 className="text-lg font-semibold mb-2">Today’s meetings</h3>
            <div className="text-sm space-y-1">
              <p>9:00 AM – Team Standup</p>
              <p>11:00 AM – Client Call</p>
              <p>2:00 PM – Project Sync</p>
              <p>4:00 PM – One-on-One</p>
            </div>
          </div>

          {/* TIME TRACKER (Green wave style) */}
          <div className="rounded-lg p-4 shadow-sm bg-gradient-to-tr from-[#003B2A] to-[#026040] text-white flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-2">Time Tracker</h3>
            <div className="text-3xl font-bold">01:24:08</div>
            <div className="mt-4 flex items-center gap-2">
              <button className="bg-white text-green-700 font-semibold px-4 py-1 rounded-md hover:opacity-90">
                Start
              </button>
              <button className="bg-red-600 font-semibold px-4 py-1 rounded-md hover:bg-red-700">
                Stop
              </button>
            </div>
          </div>

          {/* TASKS I'VE ASSIGNED (White card) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-lg p-4 shadow-sm bg-white">
            <h3 className="text-lg font-semibold mb-2">Tasks I’ve assigned</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex items-center justify-between">
                  <p>Change button colors</p>
                  <p className="text-gray-400">60%</p>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Design PDF #2</p>
                  <p className="text-gray-400">45%</p>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                  <div
                    className="bg-orange-400 h-2 rounded-full"
                    style={{ width: "45%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p>Project QA</p>
                  <p className="text-gray-400">10%</p>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                  <div
                    className="bg-red-400 h-2 rounded-full"
                    style={{ width: "10%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* NOTES (White card) */}
          <div className="rounded-lg p-4 shadow-sm bg-white">
            <h3 className="text-lg font-semibold mb-2">Notes</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Landing: All buckets notes / Page for new ideas</li>
              <li>Discussion regarding user flow improvements</li>
              <li>Meeting with DevOps on Friday</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
