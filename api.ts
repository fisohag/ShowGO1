
import { Event } from './types';

// The NEW URL provided by the user
export const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbylg7KanajiDv5pU_iYui_OVAlyhof9uedai8ekfwLYnxZZX_2WN3-XQrZ8g_FR4W2a/exec";

/**
 * Helper to map App Event object to Google Sheet Row Object.
 * KEYS MUST MATCH GOOGLE SHEET HEADERS EXACTLY.
 */
const mapEventToSheetRow = (event: Event) => {
  return {
    "Event ID": event.id,
    "Event Name": event.eventName,
    "Description": event.description,
    "category": event.category,        // Matches user sheet header
    "Price": event.price,
    "Venue": event.venue,
    "Location": event.location,
    "Event Date": event.date,
    "Event time": event.time,          // Matches user sheet header
    "Image url": event.image,          // Matches user sheet header
    "Status": "Active",
    "Created At": new Date().toISOString(),
    "Updated At": new Date().toISOString()
  };
};

/**
 * Helper to map Google Sheet Row Object back to App Event object.
 * Reads directly from specific columns matching the sheet headers.
 * We include fallbacks just in case headers change slightly.
 */
const mapSheetRowToEvent = (row: any): Event => {
  return {
    id: row["Event ID"]?.toString() || Math.random().toString(),
    eventName: row["Event Name"] || "Untitled Event",
    description: row["Description"] || "",
    // Try lowercase 'c' first, then Title Case fallback
    category: row["category"] || row["Category"] || "Electronic", 
    price: row["Price"] || "Free",
    venue: row["Venue"] || "Unknown Venue",
    location: row["Location"] || "Unknown Location",
    date: row["Event Date"] ? row["Event Date"].toString().split('T')[0] : new Date().toISOString().split('T')[0],
    // Try lowercase 't' first
    time: row["Event time"] || row["Event Time"] || "8:00 PM",
    // Try lowercase 'url' first
    image: row["Image url"] || row["Image URL"] || "https://picsum.photos/800/600",
    link: "#"
  };
};

/**
 * Fetches events from the Google Sheet with robust error handling.
 */
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    console.log("Fetching events from Google Sheet...");
    
    const response = await fetch(`${WEB_APP_URL}?action=getEvents`, {
        method: "GET",
        credentials: "omit", // CRITICAL: prevents browser from sending cookies, avoiding CORS errors
        redirect: "follow"
    });
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    const text = await response.text();
    
    // 1. Handle empty response
    if (!text || text.trim() === "") {
        console.warn("Google Sheet returned an empty response.");
        return [];
    }
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // 2. Handle non-JSON response (e.g., HTML error page or plain string error)
      console.error("Invalid JSON received from Google Sheet. This usually means the Script URL is incorrect or the script crashed.");
      console.error("Raw Response Preview:", text.substring(0, 500)); 
      return [];
    }

    // 3. Handle Script-level errors (if script returns { result: 'error', message: '...' })
    if (data && typeof data === 'object' && !Array.isArray(data) && (data.result === 'error' || data.status === 'error')) {
        console.error("Google Script reported an error:", data.message || data.error || data);
        return [];
    }

    // 4. Validate Array
    if (Array.isArray(data)) {
        console.log(`Successfully fetched ${data.length} events from sheet.`);
        return data.map(mapSheetRowToEvent);
    } else {
        console.warn("Received valid JSON, but it was not an array of events.", data);
        return [];
    }

  } catch (error) {
    console.error("Network or Logic Error in fetchEvents:", error);
    return [];
  }
};

/**
 * Saves a new event to the Google Sheet.
 */
export const saveEvent = async (event: Event): Promise<boolean> => {
  try {
    const rowData = mapEventToSheetRow(event);
    const payload = { action: "addEvent", ...rowData };
    
    // SEND ACTION IN URL AND BODY to ensure script finds it
    await fetch(`${WEB_APP_URL}?action=addEvent`, {
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
    
    // SEND ACTION IN URL AND BODY
    await fetch(`${WEB_APP_URL}?action=editEvent`, {
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
    // SEND ACTION IN URL AND BODY
    await fetch(`${WEB_APP_URL}?action=deleteEvent`, {
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
