import { inngest } from "./client";


//inngest functtion to create user
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-creation" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const {data} = event
    await prisma.user.create({

        data: {
            id: data.id,
            email: data.email_addresses[0].email_addresses,
            name: `${data.first_name} ${data.last_name}`,
            image: data.image_url,

        }

    })
  }
);


// inngest function to update user
export const syncUserUpdation = inngest.createFunction(
    { id: "sync-user-update" },
  { event: "clerk/user.updated" },

  async ({event})=> {

    const {data} = event
    await prisma.user.update({
        where: {id:data.id,},

        data: {
           email: data.email_addresses[0].email_addresses,
            name: `${data.first_name} ${data.last_name}`,
            image: data.image_url,

        }
    })
  }
)

//inngest function ot delete user

export const syncUserDeletion = inngest.createFunction(
    { id: "sync-user-delete" },
  { event: "clerk/user.deleted" },

  async ({event})=> {

    const {data} = event
    await prisma.user.delete({
        where: {id: data.id,},
    })
  }
)