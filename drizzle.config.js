export default {
  dialect: "postgresql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",

  dbCredentials: {
    url: "postgresql://thread_ai_owner:ltEAriOn7g1w@ep-falling-moon-a56quvyd.us-east-2.aws.neon.tech/thread_ai?sslmode=require",
    connectionString:
      "postgresql://thread_ai_owner:ltEAriOn7g1w@ep-falling-moon-a56quvyd.us-east-2.aws.neon.tech/thread_ai?sslmode=require",
  },
};
