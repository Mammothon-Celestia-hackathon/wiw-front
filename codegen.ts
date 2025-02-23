import { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";

dotenv.config({
  path: [
    `env.${process.env.NODE_ENV}.local`,
    ".env.local",
    `.env.${process.env.NODE_ENV}`,
    ".env",
  ],
});

const config: CodegenConfig = {
  schema: process.env.API_SERVER_ENDPOINT,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
