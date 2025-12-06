import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.NEXT_PUBLIC_SERVICE_DOMAIN;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!serviceDomain || !apiKey) {
  throw new Error("microCMS env が不足しています。GCP の env / Secrets を確認してください。");
}

export const client = createClient({
  serviceDomain,
  apiKey,
});
