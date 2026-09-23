const OpenAI = require("openai");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const message = String(req.body?.message || "").trim();
    if (!message) return res.status(400).json({ error: "Pertanyaan kosong." });
    if (message.length > 4000) return res.status(400).json({ error: "Pertanyaan terlalu panjang (maks. 4000 karakter)." });

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
      instructions:
        "Kamu adalah TKJ ISP AI Assistant. Jawab Bahasa Indonesia. Fokus pada jaringan komputer dan ISP: FTTH, fiber optik, OLT, ONU/ONT, optical budget, MikroTik RouterOS, PPPoE, VLAN, DHCP, DNS, NAT, routing, IPv4/IPv6, Wi-Fi, monitoring dan troubleshooting. " +
        "Untuk troubleshooting, mulai dari pemeriksaan fisik lalu Layer 2, Layer 3, kemudian service. Berikan langkah praktis, alasan tiap langkah, dan perintah hanya jika relevan. Jangan mengarang hasil pengukuran. Jika sebuah tindakan berisiko mengubah konfigurasi produksi, beri peringatan dan sarankan backup terlebih dahulu.",
      input: message,
      max_output_tokens: 1200
    });

    return res.status(200).json({ answer: response.output_text || "Tidak ada jawaban teks." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "AI request gagal. Periksa OPENAI_API_KEY dan konfigurasi model." });
  }
};
