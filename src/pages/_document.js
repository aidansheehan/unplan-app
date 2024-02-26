import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='h-full bg-lightneutral'>
      <Head >
          <link href="https://fonts.googleapis.com/css2?family=Changa+One&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body className='h-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
