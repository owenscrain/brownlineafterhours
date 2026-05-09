"use client";

import { useEffect, useState } from "react";

function formatCurrentTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
  }).format(date);
}

export default function AfterHoursClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    const timer = window.setInterval(updateTime, 1000);

    updateTime();

    return () => window.clearInterval(timer);
  }, []);

  return (
    <time className="after-hours-sign__clock" dateTime={now?.toISOString()}>
      {now ? formatCurrentTime(now) : ""}
    </time>
  );
}
