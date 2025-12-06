  // pages/_app.tsx
  import { AppProps } from 'next/app';
  import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

  function MyApp({ Component, pageProps }: AppProps) {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}>
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    );
  }

  export default MyApp;
