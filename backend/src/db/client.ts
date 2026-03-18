import { readFileSync } from "node:fs";
import { SQL } from "bun";

function readSecret(path: string): string {
  return readFileSync(path, "utf8").trim();
}

const user = readSecret("/run/secrets/db_user");
const password = readSecret("/run/secrets/db_password");
const database = readSecret("/run/secrets/db_name");

const host = process.env.PGHOST;
const port = process.env.PGPORT;

const databaseUrl =
  `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}` +
  `@${host}:${port}/${encodeURIComponent(database)}`;

export const db = new SQL(databaseUrl);