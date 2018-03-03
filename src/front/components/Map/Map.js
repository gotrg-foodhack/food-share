/* @flow */

import React from 'react'
import styled from 'styled-jss'
import { connect } from 'react-redux'
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl'

import * as actions from '../../../actions'
import { type State } from '../../store/reducers'

const Wrapper = styled('div')({
  height: '100%',
})

const MapBox = ReactMapboxGl({
  attributionControl: false,
  accessToken:
    'pk.eyJ1IjoiYmlnc2x5Y2F0IiwiYSI6ImNqZWFoZ21qcjBud3czM3M2N3V4OXl6cWgifQ.rRLeHprrNrGcGM-O_eJTvQ',
})

export const Map = connect(
  ({ mapCenter, selfPosition }: State) => ({
    mapCenter: [mapCenter.x, mapCenter.y],
    selfPosition,
  }),
  dispatch => ({
    setMapCenter: ({ painter }) =>
      console.log({
        x: painter.transform.center.lng,
        y: painter.transform.center.lat,
      }) ||
      dispatch(
        actions.setMapCenter({
          x: painter.transform.center.lng,
          y: painter.transform.center.lat,
        }),
      ),
  }),
)(({ mapCenter, setMapCenter }) => (
  <Wrapper>
    <MapBox
      center={mapCenter}
      onMoveEnd={setMapCenter}
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: '100%',
        width: '100%',
      }}>
      <ZoomControl position="bottom-right" />
    </MapBox>
  </Wrapper>
))
