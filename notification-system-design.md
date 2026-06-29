# Notification System Design

## Project Description

This project is a React application that displays the **Top 10 unread notifications** based on their priority. The priority is calculated using the notification type and how recently it was received.

## How It Works

The notifications are stored using React's `useState()`. First, the application filters out all the read notifications. Then, it calculates a priority score for each unread notification based on its weight and recency.

The notifications are sorted from highest to lowest priority, and only the top 10 are displayed. A new notification is automatically added every 8 seconds using `useEffect()`, and the list updates automatically.

## Priority Logic

* Placement → Weight = 3
* Result → Weight = 2
* Event → Weight = 1

**Formula:**

```text
Priority = (Weight × 100) + Recency Score
```

This ensures that more important and newer notifications appear at the top.

## React Concepts Used

* `useState()` – Store notifications
* `useEffect()` – Generate new notifications
* `filter()` – Show only unread notifications
* `sort()` – Arrange by priority
* `slice()` – Display only the top 10
* `map()` – Display notifications on the screen

## Conclusion

This project uses React state and the hooks to manage notifications efficiently and automatically updates the Top 10 priority notifications whenever new notifications arrive.
