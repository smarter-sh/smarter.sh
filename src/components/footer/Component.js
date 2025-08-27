import React from 'react'

/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'

import BlankSpace from '../blankSpace/Component'
import './styles.css'
import Copyright from './copyrightComponent'

/* eslint-disable no-unused-vars */
const Footer = (props) => {
  return (
    <React.Fragment>
      <footer key="app-footer footer">
        <div className="row mx-0">
          <div className="col">
            <div className="text-center mr-3 mb-0">
              <Copyright />
              <BlankSpace />
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}

Footer.propTypes = {
  // Define prop types if needed
}

export default Footer
