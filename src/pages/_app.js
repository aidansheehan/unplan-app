import '@/styles/globals.css'

//Fix for issue https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t#:~:text=This%20is%20a%20very%20common,before%20the%20CSS%20is%20loaded
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { AuthContextProvider } from '@/context/auth.context'
import { Toaster } from 'react-hot-toast'

config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider >
          <Component {...pageProps} />
          <Toaster 
            position='top-right'
            reverseOrder={false}
          />
      </AuthContextProvider>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID} />
    </>
  )
}
