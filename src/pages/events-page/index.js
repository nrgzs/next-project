import Link from 'next/link';

export default function ({ data }) {
  return (
    <main className="events-page">
      {data.map((e) => {
        return (
          <div key={e.id} className="event-container--events">
            <Link href={`/events-page/${e.id}/`} legacyBehavior>
              <a className="event-link--events">
                <img
                  className="event-img--events"
                  src={e.image}
                  alt="event image"
                  width={200}
                  height={200}
                ></img>
                <h2 className="event-title--events">{e.title}</h2>
              </a>
            </Link>
          </div>
        );
      })}
    </main>
  );
}

export async function getServerSideProps() {
  const { events_categories } = await import('../../../data/data.json');
  console.log(events_categories);
  return {
    props: {
      data: events_categories,
    },
  };
}
