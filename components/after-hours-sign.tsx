"use client";

import { useEffect, useState } from "react";

import AfterHoursClock from "./after-hours-clock";

const CHICAGO_TIME_ZONE = "America/Chicago";

function getChicagoWeekday(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: CHICAGO_TIME_ZONE,
    weekday: "long",
  }).format(date);
}

function getBackgroundClass(date: Date): string {
  return getChicagoWeekday(date) === "Sunday"
    ? "after-hours-sign--sunday"
    : "after-hours-sign--weekday";
}

export default function AfterHoursSign() {
  const [backgroundClass, setBackgroundClass] = useState("after-hours-sign--weekday");

  useEffect(() => {
    const updateBackground = () => setBackgroundClass(getBackgroundClass(new Date()));
    const timer = window.setInterval(updateBackground, 60 * 1000);

    updateBackground();

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main
      className={`after-hours-sign ${backgroundClass}`}
      aria-label="Brown Line after-hours display"
    >
      <AfterHoursClock />
    </main>
  );
}
