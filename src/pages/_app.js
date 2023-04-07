import HeadComponent from '@/components/head';
import '../styles/style.css';
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function App({ Component, pageProps }) {
  return (
    <>
      <HeadComponent />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
