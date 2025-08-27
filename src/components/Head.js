import React from 'react'
import { Helmet } from 'react-helmet'

/* eslint-disable no-unused-vars */
export default function Head(props) {
  const description = 'Smarter is an AI resource orchestration platform.'
  return (
    <React.Fragment>
      <Helmet>
        <title>Querium Smarter</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="description"
          content="Data scientist, full stack developer, online instructor, Open edX® consultant, amateur photographer"
        />
        <link
          href="assets/querium/querium-favicon-192x192.png"
          rel="shortcut icon"
          type="image/png"
        />
        <meta charset="utf-8" />
        <meta content="index, follow" name="robots" />
        <meta content="10 days" name="revisit-after" />
        <meta content="Lawrence McDaniel" name="author" />
        <meta content="https://lawrencemcdaniel.com" name="author-url" />
        <meta content="ReactJS" name="generator" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content={description} name="description" />
        <meta
          content="Querium, Smarter, generative AI, Chatbots, prompt engineering, documentation, chatGPT"
          name="keywords"
        />
        <meta
          content="https://cdn.platform.smarter.sh/cms/img/smarter_og_image.png"
          property="og:image"
        />
        <meta content="image/png" property="og:image:type" />
        <meta content="1200" property="og:image:width" />
        <meta content="630" property="og:image:height" />
        <meta content="Smarter by Querium Corp." property="og:image:alt" />
        <meta content="en_US" property="og:locale" />
        <meta content="article" property="og:type" />
        <meta content="Smarter by Querium" property="og:title" />
        <meta content="Smarter" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@smarter" name="twitter:site" />
        <meta content="Smarter by Querium" name="twitter:title" />
        <meta content={description} name="twitter:description" />
        <meta
          content="https://cdn.platform.smarter.sh/cms/img/smarter_og_image.png"
          name="twitter:image"
        />
        <link href="/" rel="canonical" />
        <link
          href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"
          rel="stylesheet"
        />
        <link
          href="assets/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="assets/assets/plugins/custom/datatables/datatables.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="assets/assets/plugins/global/plugins.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="assets/assets/css/style.bundle.css"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="shortcut icon" href="favicon32x32.jpg" type="image/x-icon" />

        <link rel="apple-touch-icon" sizes="180x180" href="favicon180x180.jpg" />

        <link rel="icon" sizes="180x180" href="favicon180x180.jpg" />

        <meta name="msapplication-TileImage" content="favicon180x180.jpg" />
      </Helmet>
    </React.Fragment>
  )
}
