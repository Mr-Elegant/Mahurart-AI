import { Router } from "express";
import { requireSession } from "../middleware/requireSession.js";
import { listCalendarEvents } from "../services/calendar.service.js";

export const calendarRouter = Router();

calendarRouter.use(requireSession);

calendarRouter.get("/events", async (req, res) => {
  try {
    const timeMin = typeof req.query.timeMin === "string" ? req.query.timeMin : undefined;
    const timeMax = typeof req.query.timeMax === "string" ? req.query.timeMax : undefined;
    const maxResults =
      typeof req.query.maxResults === "string" ? parseInt(req.query.maxResults, 10) : 100;

    const events = await listCalendarEvents({
      authUserId: req.userAuth!.authUserId,
      timeMin,
      timeMax,
      maxResults: isNaN(maxResults) ? 100 : maxResults,
    });

    res.json({ events });
  } catch (error) {
    console.error("Failed to fetch calendar events:", error);
    res.status(500).json({ error: "Could not fetch calendar events" });
  }
});
