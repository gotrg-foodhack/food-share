/* @flow */

import * as React from 'react'
import { withProps, mapProps, compose, withStateHandlers } from 'recompose'
import styled from 'styled-jss'
import classNames from 'classnames'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui-icons/Add'
import DoneIcon from 'material-ui-icons/Done'
import CancelIcon from 'material-ui-icons/Cancel'
import AddLocationIcon from 'material-ui-icons/AddLocation'
import MyLocationIcon from 'material-ui-icons/MyLocation'

import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { type State } from '../../store/reducers'

export const ApproveCreatingOrderButton = compose(
  withStyles({
    root: {},
  }),
  connect(
    (state: State) => ({
      mapCenter: state.mapCenter,
    }),
    dispatch => ({
      createOrder: compose(dispatch, actions.createOrder),
    }),
    ({ mapCenter }, { createOrder }) => ({
      onClick: () => createOrder(mapCenter),
    }),
  ),
  withProps({
    color: 'secondary',
    variant: 'fab',
    'aria-label': 'OK',
    children: <DoneIcon />,
  }),
)(Button)

export const StartCreatingOrderButton = compose(
  withProps({
    color: 'secondary',
    variant: 'fab',
    'aria-label': 'Create order',
    children: <AddIcon />,
  }),
)(Button)

export const CancelCreatingOrderButton = compose(
  withStyles({
    root: {
      marginRight: 8,
    },
  }),
  withProps({
    color: 'primary',
    variant: 'fab',
    'aria-label': 'Cancel',
    children: <CancelIcon />,
  }),
)(Button)

const AddOrderIconWrapper = styled('div')({
  position: 'fixed',
  zIndex: 1000,
  top: '50%',
  left: '50%',
})

const AddOrderIcon = withStyles({
  root: {
    position: 'absolute',
    display: 'block',
    bottom: 0,
    marginLeft: -24,
    width: 48,
    height: 48,
    color: '#008080',
  },
})(props => (
  <AddOrderIconWrapper>
    <AddLocationIcon {...props} />
  </AddOrderIconWrapper>
))

const LocationButton = compose(
  (connect(
    ({ mapCenter, selfPosition }: State): any => ({
      mapCenter,
      selfPosition,
    }),
    dispatch => ({
      setMapCenter: compose(dispatch, actions.setMapCenter),
    }),
    ({ mapCenter, selfPosition }, { setMapCenter }) => ({
      mapCenter,
      selfPosition,
      onClick: () => setMapCenter(selfPosition),
    }),
  ): any),
  withStyles({
    root: {
      position: 'absolute',
      right: 4,
      bottom: 90,
    },
    matches: {
      color: 'black',
    },
  }),
  mapProps(({ classes, mapCenter, selfPosition, ...props }) => ({
    ...props,
    className: classNames(classes.root, {
      [classes.matches]:
        Math.abs(mapCenter.x - selfPosition.x) < 0.0000001 &&
        Math.abs(mapCenter.y - selfPosition.y) < 0.0000001,
    }),
    'aria-label': 'Delete',
    children: <MyLocationIcon />,
  })),
)(IconButton)

const Wrapper = styled('div')({
  position: 'absolute',
  zIndex: 1000,
  right: 16,
  bottom: 16,
})

export const MapOverlay = compose(
  (withStateHandlers(
    {
      isCreatingStarted: false,
    },
    {
      startCreating: ({ isCreatingStarted, ...state }) => () => ({
        ...state,
        isCreatingStarted: true,
      }),
      stopCreating: ({ isCreatingStarted, ...state }) => () => ({
        ...state,
        isCreatingStarted: false,
      }),
    },
  ): any),
)(({ isCreatingStarted, startCreating, stopCreating }) => (
  <Wrapper>
    <LocationButton />
    {isCreatingStarted ? (
      <React.Fragment>
        <AddOrderIcon />
        <CancelCreatingOrderButton onClick={stopCreating} />
        <ApproveCreatingOrderButton />
      </React.Fragment>
    ) : (
      <StartCreatingOrderButton onClick={startCreating} />
    )}
  </Wrapper>
))
