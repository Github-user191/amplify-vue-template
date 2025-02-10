import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // Todo Table
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // User Profile Table
  UserProfile: a
    .model({
      username: a.string(),
      email: a.string(),
      avatar: a.string(), // Optional field for storing profile images
    })
    .authorization((allow) => [allow.authenticated()]), // Only authenticated users can access this
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
