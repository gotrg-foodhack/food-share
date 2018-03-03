/* @flow */

import * as React from 'react'
import styled from 'styled-jss'
import { connect } from 'react-redux'
import { compose, withStateHandlers, withProps } from 'recompose'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import * as actions from '../../../actions'

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
    <Username value={username} onChange={setUsername} />
    <Password value={password} onChange={setPassword} />
    <LoginButton onClick={login} />
  </Wrapper>
))
