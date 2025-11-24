
import { Event } from './types';

// The NEW URL provided by the user
export const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbylg7KanajiDv5pU_iYui_OVAlyhof9uedai8ekfwLYnxZZX_2WN3-XQrZ8g_FR4W2a/exec";

/**
 * Helper to map App Event object to Google Sheet Row Object
 * Matches columns: Event ID, Event Name, Event Date, Event Time, Location, Description, Image URL, Created At, Updated At, Status
 */
const mapEventToSheetRow = (event: Event) => {
  const fullLocation = event.venue ? `${event.venue}, ${event.location}` : event.location;
  
  // Combine Price and Category into Description because the Sheet doesn't have specific columns for them
  // We use a specific format [Key: Value] so we can extract it later
  const richDescription = `${event.description} [Category: ${event.category}] [Price: ${event.price}]`;

  return {
    "Event ID": event.id,
    "Event Name": event.eventName,
    "Event Date": event.date,
    "Event Time": event.time,
    "Location": fullLocation,
    "Description": richDescription,
    "Image URL": event.image,
    "Status": "Active",
    "Created At": new Date().toISOString(),
    "Updated At": new Date().toISOString()
  };
};

/**
 * Helper to map Google Sheet Row Object back to App Event object
 */
const mapSheetRowToEvent = (row: any): Event => {
  let description = row["Description"] || "";
  let category = "Electronic";
  let price = "Free";
  
  // Attempt to extract category and price from description string
  const catMatch = description.match(/\[Category: (.*?)\]/);
  if (catMatch) {
    category = catMatch[1];
    description = description.replace(catMatch[0], "").trim();
  }
  
  const priceMatch = description.match(/\[Price: (.*?)\]/);
  if (priceMatch) {
    price = priceMatch[1];
    description = description.replace(priceMatch[0], "").trim();
  }

  return {
    id: row["Event ID"]?.toString() || Math.random().toString(),
    eventName: row["Event Name"] || "Untitled Event",
    description: description,
    image: row["Image URL"] || "https://picsum.photos/300/300",
    venue: row["Location"]?.split(',')[0] || "Unknown Venue",
    location: row["Location"] || "Unknown Location",
    date: row["Event Date"]?.split('T')[0] || new Date().toISOString().split('T')[0],
    time: row["Event Time"] || "8:00 PM",
    category: category,
    price: price,
    link: "#"
  };
};

/**
 * Fetches events from the Google Sheet.
 */
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    // We expect the script to handle ?action=getEvents
    const response = await fetch(`${WEB_APP_URL}?action=getEvents`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    // Get text first to safely handle non-JSON responses (like error messages from GAS)
    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
          return data.map(mapSheetRowToEvent);
      }
      return [];
    } catch (e) {
      console.error("Failed to parse JSON response from Google Sheet. Raw response:", text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

/**
 * Saves a new event to the Google Sheet.
 * uses text/plain to avoid CORS preflight issues
 */
export const saveEvent = async (event: Event): Promise<boolean> => {
  try {
    const rowData = mapEventToSheetRow(event);
    // action: "addEvent" matches the requested script endpoint
    const payload = { action: "addEvent", ...rowData };
    
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors", 
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error("Error saving event:", error);
    return false;
  }
};

/**
 * Updates an existing event in the Google Sheet.
 */
export const updateEvent = async (event: Event): Promise<boolean> => {
    try {
    const rowData = mapEventToSheetRow(event);
    const payload = { action: "editEvent", ...rowData };
    
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error("Error updating event:", error);
    return false;
  }
}

/**
 * Deletes an event from the Google Sheet by ID.
 */
export const deleteEvent = async (id: string): Promise<boolean> => {
    try {
    await fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ action: "deleteEvent", id: id }),
    });
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    return false;
  }
}
