import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import DisplayPublic from './Tweeter/displayPublic.js'
import DisplayPrivate from './Tweeter/displayPrivate.js'
import Post from './Tweeter/Create.js'
import apiUrl from './apiConfig.js'

const home = () => (
  <h1> home </h1>
)

const post = () => (
  <React.Fragment>
    <Post />
  </React.Fragment>
)

const tweets = () => (
  <React.Fragment>
    <DisplayPublic />
  </React.Fragment>
)

const chirps = () => (
  <React.Fragment>
    <DisplayPrivate />
  </React.Fragment>
)

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}

        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp flash={this.flash} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn flash={this.flash} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword flash={this.flash} user={user} />
          )} />
        </main>

        <div>
          <Route exact path="/tweets" component={tweets} />
          { tweets }
          <Route exact path="/chirps" component={chirps} />
          { chirps }
          <Route exact path="/post" component={post} />
          { post }
        </div>
      </React.Fragment>
    )
  }
}

export default App
