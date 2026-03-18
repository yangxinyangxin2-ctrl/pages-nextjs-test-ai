"use client";

import { useState } from "react";
import Calculator from "@/components/Calculator";
import MortgageCalculator from "@/components/MortgageCalculator";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"normal" | "mortgage">("normal");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-black">
      <h1 className="text-4xl font-bold mb-8 text-white">计算器</h1>
      
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-md">
        <button
          onClick={() => setActiveTab("normal")}
          className={`px-6 py-2 rounded-md font-medium transition ${
            activeTab === "normal" 
              ? "bg-blue-500 text-white shadow-sm" 
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          普通计算器
        </button>
        <button
          onClick={() => setActiveTab("mortgage")}
          className={`px-6 py-2 rounded-md font-medium transition ${
            activeTab === "mortgage" 
              ? "bg-blue-500 text-white shadow-sm" 
              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          房贷计算器
        </button>
      </div>

      {activeTab === "normal" ? <Calculator /> : <MortgageCalculator />}
    </main>
  );
}
