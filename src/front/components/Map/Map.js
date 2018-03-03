/* @flow */

import React from 'react'
import styled from 'styled-jss'
import { connect } from 'react-redux'
import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl'

import { compose } from 'recompose'

import * as actions from '../../../actions'
import * as selectors from '../../selectors'
import { type State } from '../../store/reducers'

import { MapOverlay } from '../MapOverlay'

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
    }),
    dispatch => ({
      setMapCenter: ({ painter }) =>
        dispatch(
          actions.setMapCenter({
            x: painter.transform.center.lng,
            y: painter.transform.center.lat,
          }),
        ),
    }),
  ),
)(({ mapCenter, setMapCenter }) => (
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
      <ZoomControl position="top-right" />
    </MapBox>
  </Wrapper>
))
