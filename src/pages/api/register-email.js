import path from 'path';
import fs from 'fs';
import { log } from 'console';

export default function handler(req, res) {
  const { method } = req;

  function getPath() {
    return path.join(process.cwd(), 'data', 'data.json');
  }

  const dataPath = getPath();

  const { events_categories, allEvents } = JSON.parse(
    fs.readFileSync(dataPath)
  );

  const { email, id } = req.body;
  console.log(dataPath);
  if (method === 'POST') {
    const newArr = allEvents.map((ev) => {
      if (ev === id) {
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      } else {
        return ev;
      }
    });
    console.log(newArr);

    const test = path.join(process.cwd(), 'data', 'test.json');

    fs.writeFileSync(
      dataPath,
      JSON.stringify({ events_categories, allEvents: newArr })
    );

    res.status(200).json({
      message: `You hass been registered with this email ${email} for this event ${id}  `,
    });
  }
}
