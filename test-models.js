const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf-8');
const match = env.match(/GEMINI_API_KEY="([^"]+)"/);
if (match) {
  const key = match[1];
  fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + key)
    .then(r => r.json())
    .then(data => console.log(JSON.stringify(data.models?.map(m => m.name), null, 2)))
    .catch(console.error);
} else {
  console.log("Key not found");
}
