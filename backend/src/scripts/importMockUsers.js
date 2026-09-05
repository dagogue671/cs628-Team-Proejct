import "dotenv/config";
import bcrypt from "bcryptjs";
import fs from "fs";
import mongoose from "mongoose";
import User from "../models/User.js";

const mongoUri = process.env.MONGO_URI ?? "mongodb://localhost:27017/social-media";
const csvPath = process.argv[2] ?? "data/MOCK_DATA.csv";
// mock accounts are for browsing/testing only; nobody signs in with them
const PLACEHOLDER_PASSWORD = "MockData123!";

function parseCsv(text) {
  const [headerLine, ...lines] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(",");
  return lines
    .filter((line) => line.trim().length > 0)
    .map((line) => {
      const values = line.split(",");
      return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
    });
}

async function run() {
  const csvText = fs.readFileSync(csvPath, "utf8");
  const rows = parseCsv(csvText);

  await mongoose.connect(mongoUri);
  const passwordHash = await bcrypt.hash(PLACEHOLDER_PASSWORD, 10);

  let imported = 0;
  let skipped = 0;
  for (const row of rows) {
    const email = row.email?.toLowerCase().trim();
    const name = row.name?.trim();
    if (!email || !name) {
      continue;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      skipped += 1;
      continue;
    }

    await User.create({ name, email, passwordHash });
    imported += 1;
  }

  console.log(`Imported ${imported} users, skipped ${skipped} existing.`);
  await mongoose.disconnect();
}

run().catch((error) => {
  console.error("Import failed:", error.message);
  process.exit(1);
});
