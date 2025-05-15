export function getAt(date: Date) {
  const fDate = getDate(date);
  const time = getTime(date);

  return `${fDate} ${time}`;
}

export function getDate(date: Date) {
  if (!date) {
    const now = new Date();
    return now.toISOString().split("T")[0];
  }

  return date.toISOString().split("T")[0];
}

export function getTime(date: Date) {
  if (!date) {
    const now = new Date();
    return formatTime(now);
  }

  return formatTime(date);
}

function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // If hours is 0, set to 12

  // Pad with leading zeros
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes} ${meridiem}`;
}
