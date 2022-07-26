import '../styles/globals.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/header';
import { ChakraProvider } from '@chakra-ui/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Header/>
       <Component {...pageProps} />
    </ChakraProvider>
     
  )
}

export default MyApp
