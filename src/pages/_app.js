import '@/styles/globals.css'

//Fix for issue https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t#:~:text=This%20is%20a%20very%20common,before%20the%20CSS%20is%20loaded
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { AuthContextProvider } from '@/context/auth.context'
import { Toaster } from 'react-hot-toast'
import GlobalErrorHandlerComponent from '@/components/global-error-handler.component'
import LayoutComponent from '@/components/layouts/layout.component'
import Head from 'next/head'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from "@vercel/analytics/react"
import { LessonsProvider } from '@/context/lessons.context'
import { ActivitiesProvider } from '@/context/activities.context'
import { LessonsLibraryProvider } from '@/context/lessons-library.context'
import Script from 'next/script'

config.autoAddCss = false

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Unplan</title>
        <Script 
          src='https://cdn-cookieyes.com/client_data/06486cd6cdfdc119dfec2fd4/script.js'
          strategy='beforeInteractive'
        />
      </Head>
      <AuthContextProvider >
        <LessonsProvider>
          <ActivitiesProvider>
            <LessonsLibraryProvider >
              <LayoutComponent>
                  <Component {...pageProps} />
              </LayoutComponent>
            </LessonsLibraryProvider>
          </ActivitiesProvider>
        </LessonsProvider>
          
          <Toaster 
            position='top-right'
            reverseOrder={false}
          />
          <GlobalErrorHandlerComponent />
      </AuthContextProvider>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID} />
      <SpeedInsights />
      <Analytics />
    </>
  )
}
