import '@/styles/globals.css'

//Fix for issue https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t#:~:text=This%20is%20a%20very%20common,before%20the%20CSS%20is%20loaded
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ErrorProvider } from '@/context/error.context'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAnalytics } from '@next/third-parties/google'

config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return (
    <>
      <ErrorProvider>
        <Component {...pageProps} />
      </ErrorProvider>
      <Analytics />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
    </>
  )
}
