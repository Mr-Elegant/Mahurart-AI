import "dotenv/config";
import { Agent } from "@mastra/core/agent";
import { createAgentMemory } from "./backend/src/config/memory.js";
import { getAgentInstructions } from "./backend/src/config/agent-instructions.js";

async function test() {
  console.log("GOOGLE_GENERATIVE_AI_API_KEY:", process.env.GOOGLE_GENERATIVE_AI_API_KEY?.slice(0, 8));
  try {
    const memory = createAgentMemory();
    const agent = new Agent({
      id: "test-agent",
      name: "Test Agent",
      instructions: getAgentInstructions(),
      model: "google/gemini-2.0-flash",
      memory,
    });

    console.log("Calling agent.stream...");
    const result = await agent.stream("Hello", {
      memory: {
        resource: "test-user",
        thread: "00000000-0000-0000-0000-000000000001",
      },
    });

    for await (const chunk of result.fullStream) {
      console.log("Chunk:", chunk.type);
    }
    console.log("Stream finished successfully");
  } catch (err) {
    console.error("AGENT ERROR:", err);
  }
}

test();
