export default function ({ data }) {
  return (
    <>
      <h2>{data.title}</h2>
      <img src={data.image} alt={data.title} width={500} height={400}></img>
      <p>{data.description}</p>
    </>
  );
}

export async function getStaticPaths({}) {
  const { allEvents } = await import('../../../../data/data.json');
  const data = allEvents.map((e) => {
    return {
      params: {
        category: e.city.toString(),
        id: e.id.toString(),
      },
    };
  });

  return {
    paths: data,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { allEvents } = await import('../../../../data/data.json');
  console.log(context);
  const data = allEvents.filter((e) => context?.params.id == e.id);
  console.log(data);
  return {
    props: {
      data: data[0],
    },
  };
}
