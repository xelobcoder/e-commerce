import '../styles/globals.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/header';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Header/>
       <Component {...pageProps} />
    </ChakraProvider>
     
  )
}

export default MyApp
