import "../styles/globals.css";
import { TrackingProvider } from "../Conetxt/TrackingContext"; // Fixed the typo
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
        <NavBar />
        <Component {...pageProps} />
      </TrackingProvider>
      <Footer />
    </>
  );
}
