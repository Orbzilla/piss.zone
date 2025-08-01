export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE_NAME = "Messages"; // Confirmed from your screenshot
  const API_KEY = process.env.AIRTABLE_API_KEY;

  const { Thought, Location } = req.body;

  console.log("Incoming Thought:", Thought);
  console.log("Incoming Location:", Location);

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
                "Thought": Thought,
                "Location": Location,
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
