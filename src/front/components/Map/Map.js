/* @flow */

import React from 'react'
import styled from 'styled-jss'
import { connect } from 'react-redux'
import ReactMapboxGl, { ZoomControl, Marker } from 'react-mapbox-gl'

import { compose } from 'recompose'

import * as actions from '../../../actions'
import * as selectors from '../../selectors'
import { type State } from '../../store/reducers'

import { MapOverlay } from '../MapOverlay'

import { UserAvatar } from './avatars'

const AvatarButton = styled('button')({
  padding: 0,
  margin: 0,
  border: 'none',
  background: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
})

const Wrapper = styled('div')({
  height: '100%',
})

const MapBox = ReactMapboxGl({
  attributionControl: false,
  accessToken:
    'pk.eyJ1IjoiYmlnc2x5Y2F0IiwiYSI6ImNqZWFoZ21qcjBud3czM3M2N3V4OXl6cWgifQ.rRLeHprrNrGcGM-O_eJTvQ',
})

export const Map = compose(
  connect(
    (state: State) => ({
      mapCenter: selectors.getMapCenterPoint(state),
      orders: selectors.getOrders(state),
    }),
    dispatch => ({
      joinToOrder: (orderId: string) => () =>
        dispatch(actions.joinToOrder(orderId)),
      setMapCenter: ({ painter }) =>
        dispatch(
          actions.setMapCenter({
            x: painter.transform.center.lng,
            y: painter.transform.center.lat,
          }),
        ),
    }),
  ),
)(({ mapCenter, setMapCenter, orders, joinToOrder }) => (
  <Wrapper>
    <MapOverlay />
    <MapBox
      center={mapCenter}
      onMoveEnd={setMapCenter}
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100%',
        width: '100%',
      }}>
      {orders.map(order => (
        <Marker
          key={order.id}
          coordinates={[order.coords.x, order.coords.y]}
          anchor="bottom">
          <AvatarButton onClick={joinToOrder(order.id)}>
            <UserAvatar order={order} />
          </AvatarButton>
        </Marker>
      ))}

      <ZoomControl position="top-right" />
    </MapBox>
  </Wrapper>
))
