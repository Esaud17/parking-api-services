import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootswatch/dist/flatly/bootstrap.min.css";
import { Auth0Provider } from '@auth0/auth0-react';

import Head from "next/head";
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Auth0Provider
    domain="dev-t8spfgkc.us.auth0.com"
    clientId="GR8byfHy1hODGnzkZZxAcQKzeyctOCdk"
    //redirectUri={'https://sercrets.vercel.app/balance/'}
    redirectUri={'http://localhost:3000/profile/'}
  >
    <Component {...pageProps} />
  </Auth0Provider>;
}
export default MyApp