import Link from 'next/link';

export default function ({ dataEvents, datacity }) {
  return (
    <>
      <h2>Events in {datacity}</h2>
      {dataEvents.map((e) => {
        return (
          <div key={e.id} className="event-card">
            <Link href={`${e.city}/${e.id}`} className="event-link" passHref>
              <img
                src={e.image}
                className="event-img"
                alt={e.title}
                width={200}
                height={250}
              ></img>
              <h2 className="event-title">Events in {e.title}</h2>
              <p className="event-paragraph">{e.description}</p>
            </Link>
          </div>
        );
      })}
    </>
  );
}

export async function getStaticPaths() {
  const { events_categories } = await import('../../../../data/data.json');
  const eventsName = events_categories.map((e) => {
    return {
      params: {
        category: e.id.toString(),
      },
    };
  });

  return {
    paths: eventsName,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.category;
  console.log(context);
  const { allEvents } = await import('../../../../data/data.json');
  const data = allEvents.filter((ev) => ev.city === id);
  return {
    props: {
      dataEvents: data,
      datacity: id,
    },
  };
}
