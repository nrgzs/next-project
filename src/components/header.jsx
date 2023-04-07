import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav>
        <img></img>
        <Link href="/" legacyBehavior>
          <a>Home</a>
        </Link>

        <Link href="/events-page" legacyBehavior>
          <a>Events</a>
        </Link>

        <Link href="/about-us" legacyBehavior>
          <a>About us</a>
        </Link>
      </nav>
    </header>
  );
}
