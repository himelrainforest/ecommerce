import { inngest } from "./client";
import { prisma } from "@/lib/prisma";

// CREATE
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event;

    await prisma.user.create({
      data: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: [data.first_name, data.last_name].filter(Boolean).join(" "),
        image: data.image_url,
      },
    });

    return { success: true };
  }
);

// UPDATE (UPSERT)
export const syncUserUpdation = inngest.createFunction(
  { id: "sync-user-update" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { data } = event;

    await prisma.user.upsert({
      where: { id: data.id },
      update: {
        email: data.email_addresses[0].email_address,
        name: [data.first_name, data.last_name].filter(Boolean).join(" "),
        image: data.image_url,
      },
      create: {
        id: data.id,
        email: data.email_addresses[0].email_address,
        name: [data.first_name, data.last_name].filter(Boolean).join(" "),
        image: data.image_url,
      },
    });

    return { success: true };
  }
);

// DELETE
export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-delete" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { data } = event;

    await prisma.user.deleteMany({
      where: { id: data.id },
    });

    return { success: true };
  }
);
