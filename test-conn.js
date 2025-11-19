import pkg from "pg";
const { Client } = pkg;

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("No DATABASE_URL in env");
  process.exit(1);
}

const client = new Client({
  connectionString: url,
  ssl: { rejectUnauthorized: false } // Neon requires SSL
});

(async () => {
  try {
    await client.connect();
    const r = await client.query("SELECT now()");
    console.log("Connection SUCCESS:", r.rows);
    await client.end();
  } catch (err) {
    console.error("Connection FAILED:", err.message);
    console.error(err);
    process.exit(2);
  }
})();
