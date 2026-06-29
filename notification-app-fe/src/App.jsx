import React, { useEffect, useState } from "react";
import { fetchNotifications } from "./api/notifications";
function App() {
  const [notifications, setNotifications] = useState(fetchNotifications());
  // Calculate Priority
  const calculatePriority = (notification) => {
    const ageMinutes = (Date.now() - notification.time) / (1000 * 60);
    const recencyScore = Math.max(0, 100 - ageMinutes);

    return notification.weight * 100 + recencyScore;
  };

  // Get Top 10
  const topNotifications = notifications
    .filter((n) => n.unread)
    .sort((a, b) => calculatePriority(b) - calculatePriority(a))
    .slice(0, 10);

  // Simulate new notification every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const types = [
        {
          type: "placement",
          weight: 3,
        },
        {
          type: "result",
          weight: 2,
        },
        {
          type: "event",
          weight: 1,
        },
      ];

      const random = types[Math.floor(Math.random() * types.length)];

      const newNotification = {
        id: Date.now(),
        title: `${random.type.toUpperCase()} Notification`,
        type: random.type,
        weight: random.weight,
        unread: true,
        time: Date.now(),
      };

      setNotifications((prev) => [newNotification, ...prev]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        maxWidth: "50%",
        margin: "30px auto",
        fontFamily: "Arial",
      }}
    >
      <h1>Stage 1 - Priority Inbox</h1>

      <h3>Top 10 Unread Notifications</h3>

      {topNotifications.map((item, index) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginBottom: "10px",
            padding: "15px",
            background:
              item.type === "placement"
                ? "#ffe6e6"
                : item.type === "result"
                ? "#e6f0ff"
                : "#e8ffe8",
          }}
        >
          <h4>
            #{index + 1} {item.title}
          </h4>

          <p>
            <strong>Type:</strong> {item.type}
          </p>

          <p>
            <strong>Priority Score:</strong>{" "}
            {calculatePriority(item).toFixed(2)}
          </p>

          <p>
            <strong>Received:</strong>{" "}
            {Math.floor((Date.now() - item.time) / (1000 * 60))} minute(s) ago
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;