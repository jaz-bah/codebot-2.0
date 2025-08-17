"use client"

import { useState } from "react";

export default function HomeBanner() {
  const [status, setStatus] = useState("");

  function handleStatus() {
    setStatus("active");
    setTimeout(() => {
      setStatus("");
    }, 1000);
  }

  return (
    <div className="home_banner w-full h-[calc(100vh-60px)] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 z-10">
        <div className="h-full flex flex-col items-end justify-center">
          <h2 className="text-sm md:text-lg lg:text-2xl">Hi...!</h2>
          <h1 className="text-lg md:text-2xl lg:text-4xl font-bold">I&apos;m CodeBot</h1>
          <h3 className="text-sm md:text-lg lg:text-2xl">Your Code Helper</h3>
        </div>
        <div className="robot">
          <div className="personal-assistant">
            <div id="felix" className={`felix ${status}`} onClick={handleStatus}>
              <div className="eyes">
                <div className="eye left"></div>
                <div className="eye right"></div>
              </div>
            </div>
            <div className="platform"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
