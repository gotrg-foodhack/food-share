import React, { Component } from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import { Chat } from '../Chat'
import { Details } from '../Details'
import { Menu } from '../Menu'

const navStyle = {
  position: 'fixed',
  backgroundColor: '#ffffff',
  width: '100%',
  bottom: 0,
  fontSize: '21px !important',
}

export class Order extends Component {
  state = {
    activeTab: 0,
  }

  onChangeTab = (event, value) => {
    this.setState({ activeTab: value })
  }

  getStyle = number => ({
    display: this.state.activeTab === number ? 'block' : 'none',
    height: '90%',
  })

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div style={this.getStyle(0)}>
          <Chat />
        </div>
        <div style={this.getStyle(1)}>
          <Details />
        </div>
        <div style={this.getStyle(2)}>
          <Menu />
        </div>
        <Tabs
          value={this.state.activeTab}
          onChange={this.onChangeTab}
          indicatorColor="primary"
          textColor="primary"
          style={navStyle}
          fullWidth>
          <Tab label={<div style={{ fontSize: '1rem' }}>Чат</div>} />
          <Tab label={<div style={{ fontSize: '1rem' }}>Детали заказа</div>} />
          <Tab label={<div style={{ fontSize: '1rem' }}>Меню</div>} />
        </Tabs>
      </div>
    )
  }
}
