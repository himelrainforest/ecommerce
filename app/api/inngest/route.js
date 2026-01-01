import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import {
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
} from "@/lib/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
  ],
});
