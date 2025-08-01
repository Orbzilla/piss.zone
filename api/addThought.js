export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // ✅ Replace this with your actual Airtable Base ID
  const BASE_ID = "appAq22MEKHqrAWZ2";

  // ✅ Replace this with your actual Airtable table name exactly as shown in Airtable
  const TABLE_NAME = "Thoughts";

  // ✅ Keep this from Vercel environment variable
  const API_KEY = AIRTABLE_BASE_ID;

  const { thought, location } = req.body;

  console.log("Incoming thought:", thought);
  console.log("Incoming location:", location);

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Response: thought,
            Location: location,
          },
        }),
      }
    );

    const data = await airtableRes.json();
    console.log("AIRTABLE RESPONSE:", data);

    if (airtableRes.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(airtableRes.status).json(data);
    }
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
