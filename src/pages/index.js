import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ data }) {
  data;
  return (
    <>
      <main className="main">
        {data.map((e) => {
          return (
            <div key={e.id} className="event-card">
              <Link href={`/events-page/${e.id}`} passHref>
                <Image
                  src={e.image}
                  className="event-img"
                  alt={e.title}
                  width={200}
                  height={250}
                ></Image>
                <h2 className="event-title">Events in {e.title}</h2>
                <p className="event-paragraph">{e.description}</p>
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { events_categories } = await import('../../data/data.json');

  return {
    props: {
      data: events_categories,
    },
  };
}
