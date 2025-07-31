
export default async function handler(req, res) {
  try {
    const airtableRes = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Thoughts?sort[0][field]=Created&sort[0][direction]=desc`, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });

    const data = await airtableRes.json();
    res.status(200).json(data.records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
