import { AuthenticatedExtra, defineTool } from "@descope/mcp-express";
import { z } from "zod";
import {
  cancelMeeting,
  checkCalendarBusy,
  createMeeting,
  listUpcomingMeetings,
  rescheduleMeeting,
} from "../services/calendar.service.js";

function textResult(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function authUserIdFromToken(token: string): string {
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1] ?? "", "base64").toString("utf8"),
  ) as { sub?: string };

  if (!payload.sub) {
    throw new Error("MCP token has no user id");
  }

  return String(payload.sub);
}

const defineMcpTool = defineTool as (cfg: {
  name: string;
  description: string;
  input?: Record<string, unknown>;
  scopes?: string[];
  handler: (
    args: Record<string, unknown>,
    extra: AuthenticatedExtra,
  ) => ReturnType<typeof textResult> | Promise<ReturnType<typeof textResult>>;
}) => ReturnType<typeof defineTool>;

export const listUpcomingMeetingsTools = defineMcpTool({
  name: "listUpcomingMeetings",
  description:
    "List Google Calendar events. Set todayOnly=true for today's agenda only.",
  input: {
    maxResults: z.number().int().min(1).max(20).optional(),
    todayOnly: z
      .boolean()
      .optional()
      .describe("If true, only return events for today"),
  },
  scopes: ["profile"],
  handler: async (args, extra) => {
    try {
      const authUserId = authUserIdFromToken(extra.authInfo.token);
      const meetings = await listUpcomingMeetings({
        authUserId,
        maxResults:
          typeof args.maxResults === "number" ? args.maxResults : undefined,
        todayOnly:
          typeof args.todayOnly === "boolean" ? args.todayOnly : undefined,
      });

      return textResult({ meetings });
    } catch (error) {
      const message = error instanceof Error ? error.message : "List Failed";
      return textResult({ error: message });
    }
  },
});

export const checkCalendarBusyTool = defineMcpTool({
  name: "checkCalendarBusy",
  description:
    "Check if the user is busy between two ISO datetimes using Google freebusy.",
  input: {
    startIso: z.string().describe("Start time as ISO-8601 datetime"),
    endIso: z.string().describe("End time as ISO-8601 datetime"),
  },
  scopes: ["profile"],
  handler: async (args, extra) => {
    try {
      const authUserId = authUserIdFromToken(extra.authInfo.token);
      const result = await checkCalendarBusy({
        authUserId,
        startIso: String(args.startIso),
        endIso: String(args.endIso),
      });

      return textResult(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Check Busy Failed";
      return textResult({ error: message });
    }
  },
});

export const createMeetingTool = defineMcpTool({
  name: "createMeeting",
  description:
    "Create a Google Calendar event. Adds a Google Meet link by default. Emails invitees when attendeeEmails are set.",
  input: {
    title: z.string().min(1),
    startIso: z.string().describe("Start time as ISO-8601 datetime"),
    endIso: z.string().describe("End time as ISO-8601 datetime"),
    attendeeEmails: z
      .array(z.string())
      .optional()
      .describe("Invite these emails; Google sends calendar invites"),
    description: z.string().optional(),
    addGoogleMeet: z
      .boolean()
      .optional()
      .describe("Default true. Set false to skip Google Meet link"),
  },
  scopes: ["profile"],
  handler: async (args, extra) => {
    try {
      const authUserId = authUserIdFromToken(extra.authInfo.token);
      const result = await createMeeting({
        authUserId,
        title: String(args.title),
        startIso: String(args.startIso),
        endIso: String(args.endIso),
        attendeeEmails: Array.isArray(args.attendeeEmails)
          ? (args.attendeeEmails as string[])
          : undefined,
        description:
          typeof args.description === "string" ? args.description : undefined,
        addGoogleMeet:
          typeof args.addGoogleMeet === "boolean"
            ? args.addGoogleMeet
            : undefined,
      });

      return textResult(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Create Meeting Failed";
      return textResult({ error: message });
    }
  },
});

export const rescheduleMeetingTool = defineMcpTool({
  name: "rescheduleMeeting",
  description:
    "Move an existing event to a new start/end time and email invitees.",
  input: {
    eventId: z.string().min(1),
    startIso: z.string().describe("Start time as ISO-8601 datetime"),
    endIso: z.string().describe("End time as ISO-8601 datetime"),
  },
  scopes: ["profile"],
  handler: async (args, extra) => {
    try {
      const authUserId = authUserIdFromToken(extra.authInfo.token);
      const result = await rescheduleMeeting({
        authUserId,
        eventId: String(args.eventId),
        startIso: String(args.startIso),
        endIso: String(args.endIso),
      });

      return textResult(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Reschedule Meeting Failed";
      return textResult({ error: message });
    }
  },
});

export const cancelMeetingTool = defineMcpTool({
  name: "cancelMeeting",
  description:
    "Cancel a Google Calendar event by id and email attendees about the cancellation.",
  input: {
    eventId: z.string().min(1),
  },
  scopes: ["profile"],
  handler: async (args, extra) => {
    try {
      const authUserId = authUserIdFromToken(extra.authInfo.token);
      const result = await cancelMeeting({
        authUserId,
        eventId: String(args.eventId),
      });

      return textResult(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Cancel Meeting Failed";
      return textResult({ error: message });
    }
  },
});
