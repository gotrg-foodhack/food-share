/* @flow */

import * as React from 'react'
import styled from 'styled-jss'
import { connect } from 'react-redux'
import { compose, withStateHandlers, withProps } from 'recompose'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import raccoon from './raccoon.png'

import * as actions from '../../../actions'

const RaccoonImg = withProps({
  src: raccoon,
})(
  styled('img')({
    width: '100%',
    maxWidth: 240,
    margin: 0,
    padding: 0,
    // paddingTop:
  }),
)

const Headline = styled('p')({
  fontFamily: 'Yanone Kaffeesatz',
  fontWeight: 700,
  fontSize: 52,
  lineHeight: 1,
})

const Raccoon = withProps({
  children: (
    <React.Fragment>
      <RaccoonImg />
      <Headline>OmNomNom</Headline>
    </React.Fragment>
  ),
})(
  styled('div')({
    textAlign: 'center',
  }),
)

const Wrapper = styled('div')({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  padding: '15%',
})

const Username = withProps({ label: 'Username' })(TextField)
const Password = withProps({ label: 'Password', type: 'password' })(TextField)
const LoginButton = withProps({
  children: 'Login',
  color: 'primary',
})(
  styled(Button)({
    marginTop: 16,
  }),
)

export const LoginScreen = compose(
  withStateHandlers(
    { username: '', password: '' },
    {
      setUsername: () => ({ target }) => ({ username: target.value }),
      setPassword: () => ({ target }) => ({ password: target.value }),
    },
  ),
  connect(null, (dispatch, { username, password }) => ({
    login: () => dispatch(actions.login(username, password)),
  })),
)(({ setUsername, setPassword, login, username, password }) => (
  <Wrapper>
    <Raccoon />
    <Username value={username} onChange={setUsername} />
    <Password value={password} onChange={setPassword} />
    <LoginButton onClick={login} />
  </Wrapper>
))
