import { Layout } from 'components';
import { GlobalStyles } from "styles/GlobalStyles.css";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStyles>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalStyles>
  );
};

export default MyApp
