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
        <main key="home-page" className="home-page jumbotron dark-background" role="main">
          <div className="h-100">
            <div className="row pt-1 m-0 mr-0 px-0 jumbotron-spacer">
              <section
                className="col-lg-6 pt-5 col-md-12 text-center noselect"
                aria-label="Profile"
              >
                <h1 className="pt-2 mb-0 lawrence-mcdaniel">Smarter by Querium</h1>
                <p className="digital-creator">an AI resource orchestration platform</p>
              </section>
            </div>
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
