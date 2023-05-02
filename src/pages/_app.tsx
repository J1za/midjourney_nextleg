import '@/assets/styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store } from '@/store';
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: any) {
  const theme = extendTheme({
    components: {
      Checkbox: {
        baseStyle: {
          control: {
            bg: "white",
          }
        }
      }
    }
  });
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp;
