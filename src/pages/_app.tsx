import '@/assets/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import { store } from '@/components/store';
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp;
