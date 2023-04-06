export default function () {
  return (
    <main className="events-page">
      <div className="event-container--events">
        <a className="event-link--events" href="/events-page/london/">
          <img className="event-img--events" src=""></img>
          <h2 className="event-title--events">Events in London</h2>
        </a>
      </div>
      <div className="event-container--events">
        <a className="event-link--events" href="/events-page/san-francisco/">
          <img className="event-img--events" src=""></img>
          <h2 className="event-title--events">Events in San Francisco</h2>
        </a>
      </div>
      <div className="event-container--events">
        <a className="event-link--events" href="/events-page/barcelona/">
          <img className="event-img--events" src=""></img>
          <h2 className="event-title--events">Events in Barcelona</h2>
        </a>
      </div>
    </main>
  );
}
