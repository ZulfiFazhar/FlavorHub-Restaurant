import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Define pages that should not use the global layout
  const noLayoutPages = ['/login'];

  // Check if the current page is in the noLayoutPages array
  const isLayoutExcluded = noLayoutPages.includes(router.pathname);
  console.log(isLayoutExcluded)

  return isLayoutExcluded ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;