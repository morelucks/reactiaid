import Head from 'next/head';
import dynamic from 'next/dynamic';
import DashboardContent from '../components/DashboardContent';

// Dynamically import to avoid SSR issues with wagmi
const ClientDashboard = dynamic(() => Promise.resolve(DashboardContent), {
  ssr: false,
});

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>ReactiAid - Emergency Response</title>
        <meta name="description" content="Decentralized Emergency Response System" />
      </Head>
      <ClientDashboard />
    </>
  );
}