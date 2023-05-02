import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

export default function ({ data }) {
  const inptVal = useRef();
  const router = useRouter();
  const [message, setmessage] = useState('');

  async function submitFunc(e) {
    e.preventDefault();
    const emailVal = inptVal.current.value;
    const eventId = router.query?.id;

    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailVal.match(validEmail)) {
      setmessage('Please introduce a correct email address');
    }

    try {
      const res = await fetch('./../../api/register-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailVal, id: eventId }),
      });

      if (!res.ok) throw new Error(`Eroor: ${res.status}`);

      const datamessage = await res.json();
      setmessage(datamessage.message);
      inptVal.current.value = '';
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2>{data.title}</h2>
      <img src={data.image} alt={data.title} width={500} height={400}></img>
      <p>{data.description}</p>
      <label> Get Registered for this event!</label>
      <form>
        <input
          ref={inptVal}
          type="email"
          placeholder="yourEmail@email.com"
        ></input>
        <button onClick={submitFunc}>Submit</button>
        <p>{message}</p>
      </form>
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

  const data = allEvents.filter((e) => context?.params.id == e.id);

  return {
    props: {
      data: data[0],
    },
  };
}
