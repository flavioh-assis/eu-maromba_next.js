import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, Slide } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from '@/store';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ToastContainer
					position='bottom-right'
					autoClose={2000}
					pauseOnHover
					theme='light'
					pauseOnFocusLoss
					transition={Slide}
				/>
				<Component {...pageProps} />
			</QueryClientProvider>
		</Provider>
	);
}
