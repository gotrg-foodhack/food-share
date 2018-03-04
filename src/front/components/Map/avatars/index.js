/* @flow */

import * as React from 'react'
import styled from 'styled-jss'
import MUIAvatar from 'material-ui/Avatar'

import AccountCircle from 'material-ui-icons/AccountCircle'

import type { Order } from '../../../../types'

import maxim from './maxim.jpg'
import oleg from './oleg.jpg'
import pavlik from './pavlik.jpg'
import perlmutter from './perlmutter.jpg'

export const avatars = { maxim, oleg, pavlik, perlmutter }

const AccountCircleIcon = styled(AccountCircle)({
  width: '100%',
  height: '100%',
})

export const Avatar = styled(MUIAvatar)({
  width: 48 * 2,
  height: 48 * 2,
})

export const UserAvatar = ({ order }: { order: Order }) => {
  const { owner, members } = order
  const ownerLogin = members[owner].login

  const src = avatars[ownerLogin]

  return src ? (
    <Avatar src={src} alt={ownerLogin} />
  ) : (
    <Avatar alt={ownerLogin}>
      <AccountCircleIcon />
    </Avatar>
  )
}
