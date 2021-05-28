import '../styles/globals.css'
import withData from "../lib/apollo";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default withData(MyApp)
