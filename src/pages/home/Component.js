import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setHomePage } from '../../redux/actions/homeActions'

import { Head } from './Head'
import './styles.css'

const mapStateToProps = (state) => ({
  ...state,
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setHomePage }, dispatch),
})

class Home extends Component {
  componentWillUnmount() {
    this.props.actions.setHomePage()
  }

  render() {
    return (
      <React.Fragment>
        <Head />
        <main key="home-page" className="home-page" role="main">
          <section className="landing-section hero-banner" aria-label="Hero">
            <div className="row justify-content-center py-5">
              <div className="col-lg-8 text-center">
                <h1 className="display-4 mb-2 text-white">Smarter by Querium</h1>
                <p className="lead">An AI resource orchestration platform</p>
              </div>
            </div>
            <div className="hero-bg-svg" aria-hidden="true"></div>
          </section>

          <section className="landing-section what-is-it" aria-label="What is it?">
            <div className="row justify-content-center py-5">
              <div className="col-lg-8">
                <div className="text-center mb-4">
                  <h2>What is it?</h2>
                  <p>* video goes here</p>
                </div>
                <ul>
                  <li>
                    An AI resource orchestration platform designed for large enterprises
                  </li>
                  <li>Kubernetes architecture</li>
                  <li>Runs on-premise or in the cloud</li>
                  <li>Flexible licensing and support schemes</li>
                  <li>Open source access</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="landing-section who-is-it-for" aria-label="Who is it for?">
            <div className="row justify-content-center py-5">
              <div className="col-lg-8">
                <div className="text-center">
                  <h2>Who is it for?</h2>
                  <p>For organizations that need to protect their trade secrets and sensitive data.</p>
                </div>
                <ul>
                  <li>Scalable for large organizations</li>
                  <li>Role based authorization</li>
                  <li>Supports prompt engineers in functional areas: IT, Accounting, HR, Marketing, Support, etc.</li>
                </ul>
              </div>
            </div>
          </section>

          <section
            className="landing-section how-is-it-sold"
            aria-label="How is it sold?"
          >
            <div className="row justify-content-center py-5">
              <div className="col-lg-8">
                <div className="text-center">
                  <h2>How is it sold?</h2>
                  <p>We are easy to do business with.</p>
                  <ul>
                    <li>Usage-based pricing</li>
                    <li>No long-term contracts</li>
                    <li>Supports on-premises or cloud-hosted environmnts</li>
                    <li> We offer online and on-premise training and certification programs{' '}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </React.Fragment>
    )
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    setHomePage: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
