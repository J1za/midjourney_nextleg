import '@/assets/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react';
import { store } from '@/store';
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp;
