import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ORGANIZATION, WEBSITE_SCHEMA } from '@/data/site';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
