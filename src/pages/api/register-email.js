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

  if (!allEvents) {
    return res.status(404).json({
      message: 'Events data not found',
    });
  }

  if (method === 'POST') {
    const { email, id } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({
        message: 'Invalid Email adress',
      });
    }

    const newArr = allEvents.map((ev) => {
      if (ev.id === id) {
        if (ev.emails_registered.includes(email)) {
          res.status(409).json({
            message: 'This Email has already been registered',
          });
        }

        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      } else {
        return ev;
      }
    });

    const test = path.join(process.cwd(), 'data', 'test.json');

    fs.writeFileSync(
      dataPath,
      JSON.stringify({ events_categories, allEvents: newArr })
    );

    res.status(201).json({
      message: `You hass been registered with this email ${email} for this event ${id}  `,
    });
  }
}
