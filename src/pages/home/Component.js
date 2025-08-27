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
          <div className=" px-0">
            {/* Hero Banner */}
            <section className="landing-section hero-banner" aria-label="Hero">
              <div className="row justify-content-center py-5">
                <div className="col-lg-8 text-center">
                  <h1 className="display-4 mb-2">Smarter by Querium</h1>
                  <p className="lead">An AI resource orchestration platform</p>
                </div>
              </div>
              {/* SVG background pinned bottom-right, 2/3 width & height via CSS */}
              <div className="hero-bg-svg" aria-hidden="true"></div>
            </section>

            {/* What is it? */}
            <section className="landing-section what-is-it" aria-label="What is it?">
              <div className="row justify-content-center py-5">
                <div className="col-lg-8">
                  <div className="text-center mb-4">
                    <h2>What is it?</h2>
                    <p>* video goes here</p>
                  </div>
                  <ul className="list-unstyled">
                    <li>
                      AI resource orchestration platform designed for large enterprises
                    </li>
                    <li>Kubernetes architecture, runs on-premise or in the cloud</li>
                    <li>
                      open source (or mention in-progress ????????). Core committers,
                      stakeholders, code base governance
                    </li>
                    <li>flexible licensing and support schemes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Who is it for? */}
            <section
              className="landing-section who-is-it-for"
              aria-label="Who is it for?"
            >
              <div className="row justify-content-center py-5">
                <div className="col-lg-8">
                  <div className="text-center">
                    <h2>Who is it for?</h2>
                    <p>[a brilliant message from Kent goes here]</p>
                  </div>
                  <ul>
                    <li>made for large organizations</li>
                    <li>role based: Prompt engineers in functional areas, IT, Accounting, HR</li>
                    <li>we offer online and on-premise training and certification programs </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How is it sold? */}
            <section
              className="landing-section how-is-it-sold"
              aria-label="How is it sold?"
            >
              <div className="row justify-content-center py-5">
                <div className="col-lg-8">
                  <div className="text-center">
                    <h2>How is it sold?</h2>
                    <p>[a brilliant message from Kent goes here]</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
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
