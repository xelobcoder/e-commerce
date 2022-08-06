import '../styles/globals.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
       <Component {...pageProps} />
    </ChakraProvider>
     
  )
}

export default MyApp
