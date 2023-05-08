import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer, Slide } from 'react-toastify';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
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
	);
}
