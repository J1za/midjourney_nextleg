import { useEffect } from 'react';
import ReactGA from 'react-ga';
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
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      ReactGA.initialize('G-2PE03SZNL5');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp;
