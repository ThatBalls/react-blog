import { SSRProvider } from 'react-bootstrap';
import { Layout } from 'components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStyles } from "styles/GlobalStyles.css";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <GlobalStyles>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalStyles>
    </SSRProvider>
  );
};

export default MyApp
