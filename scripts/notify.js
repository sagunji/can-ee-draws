import https from "node:https";

export async function notifyNewDraw(newDraw) {
  return new Promise((resolve, reject) => {
    const webhookUrl = process.env.WEBHOOK_API;

    // Debug: Check environment variable
    console.log(
      "🔍 Debug notifyNewDraw: WEBHOOK_API =",
      webhookUrl ? "SET" : "NOT SET"
    );
    console.log(
      "🔍 Debug notifyNewDraw: All env vars with 'WEBHOOK':",
      Object.keys(process.env).filter((key) => key.includes("WEBHOOK"))
    );

    if (!webhookUrl) {
      console.log(
        "⚠️ WEBHOOK_API environment variable not set, skipping notification"
      );
      resolve();
      return;
    }

    const postData = JSON.stringify(newDraw);
    const url = new URL(webhookUrl);

    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname + url.search,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log("✅ Notification sent successfully");
          resolve(data);
        } else {
          console.error(
            `❌ Notification failed with status: ${res.statusCode}`
          );
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on("error", (error) => {
      console.error("❌ Notification request failed:", error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}
