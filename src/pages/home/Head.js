import React from 'react'
import { Helmet } from 'react-helmet'
import { APP_CONFIG } from '../../shared/constants'

export const Head = () => {
  return (
    <React.Fragment>
      <Helmet>
        <link rel="canonical" href={APP_CONFIG.urls.site} />
      </Helmet>
    </React.Fragment>
  )
}
