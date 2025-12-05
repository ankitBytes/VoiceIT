import { addDays, nextDay } from "date-fns";

const daysMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export const parseVoiceTask = (textRaw) => {
  if (!textRaw) {
    return {
      transcript: "",
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      dueDate: null,
    };
  }

  const text = textRaw.toLowerCase();

  const sentences = textRaw
    .split(/[.!?]/)
    .map((s) => s.trim())
    .filter(Boolean);

  let extractedTitle = sentences[0] || "";
  let extractedDescription = sentences.slice(1).join(". ") || "";

  // Priority
  let priority = "medium";
  if (
    text.includes("high priority") ||
    text.includes("urgent") ||
    text.includes("critical")
  ) {
    priority = "high";
  } else if (text.includes("low priority") || text.includes("low importance")) {
    priority = "low";
  }

  // Status
  let status = "todo";
  if (text.includes("in progress") || text.includes("start working")) {
    status = "in-progress";
  } else if (text.includes("mark as done") || text.includes("already done")) {
    status = "done";
  }

  // Due date
  let dueDate = null;
  const now = new Date();

  if (text.includes("today")) {
    dueDate = now;
  } else if (text.includes("tomorrow")) {
    dueDate = addDays(now, 1);
  } else {
    // next monday, next friday, etc
    const matchNext = text.match(
      /next\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/
    );
    if (matchNext) {
      const dayName = matchNext[1];
      const weekday = daysMap[dayName];
      if (weekday !== undefined) {
        dueDate = nextDay(now, weekday);
      }
    }

    // in X days
    const inDaysMatch = text.match(/in\s+(\d+)\s+day/);
    if (inDaysMatch) {
      const n = parseInt(inDaysMatch[1], 10);
      if (!isNaN(n)) {
        dueDate = addDays(now, n);
      }
    }
  }

  // Title extraction: strip common phrases
  let titlePart = textRaw;

  const patterns = [
    /create a (high priority )?task to/i,
    /create a task/i,
    /add a task/i,
    /remind me to/i,
    /i need to/i,
  ];

  patterns.forEach((p) => {
    titlePart = titlePart.replace(p, "");
  });

  // Remove trailing priority/due phrases for title
  titlePart = titlePart.replace(
    /by (tomorrow|today|next .*|in \d+ days).*/i,
    ""
  );
  titlePart = titlePart.replace(/it's high priority.*/i, "");
  titlePart = titlePart.replace(/it'?s low priority.*/i, "");

  const title = titlePart.trim();

  return {
    transcript: textRaw,
    title,
    description: extractedDescription,
    priority,
    status,
    dueDate: dueDate ? dueDate.toISOString().slice(0, 10) : null,
  };
};
