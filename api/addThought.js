
export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { thought, location } = req.body;
  console.log("Incoming thought:", thought);
  console.log("Incoming location:", location);

  try {
    const airtableRes = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Thoughts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Response: thought,
          Location: location,
        },
      }),
    });

    const data = await airtableRes.json();
    console.log("AIRTABLE RESPONSE:", data); // 👈 This is what we want to see
    res.status(200).json(data);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}

