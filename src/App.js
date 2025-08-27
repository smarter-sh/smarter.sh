import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { APP_CONFIG } from './shared/constants'
import { Header } from './components/header/Component'
import Head from './components/Head'
import Home from './pages/home/Component'
import Footer from './components/footer/Component'
import { setCookie } from './components/cookieSetter'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSet: false, // True once componentDidMount runs
    }
  }

  // ----------------------------------------------------
  // ------------ React Component life cycle ------------
  // ----------------------------------------------------
  componentDidMount() {
    if (APP_CONFIG.debug) console.log('App.componentDidMount()')

    this.setState({
      isSet: true,
    })

    // Ensure all cookies have the SameSite and Secure attributes
    document.cookie.split(';').forEach((cookie) => {
      const [name, value] = cookie.split('=')
      setCookie(name.trim(), value, { sameSite: 'None', secure: true })
    })
  }

  render() {
    if (APP_CONFIG.debug) console.log('App.render()')

    return (
      <React.Fragment>
        <Head />
        <BrowserRouter>
          <div
            className="container d-flex flex-column flex-root app-root"
            id="kt_app_root"
          >
            <Header />
            <Home />
            <Footer />
          </div>
        </BrowserRouter>
      </React.Fragment>
    )
  }
}

export default App
