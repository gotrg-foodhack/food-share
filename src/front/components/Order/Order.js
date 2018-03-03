import React, { Component } from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import { Chat } from '../Chat'

export class App extends Component {
  state = {
    activeTab: 0,
  }

  onChangeTab = (event, value) => {
    this.setState({ activeTab: value })
  }

  getStyle = number => ({
    display: this.state.activeTab === number ? 'block' : 'none',
    height: '100%',
  })

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div style={this.getStyle(0)}>
          <Chat />
        </div>
        <div style={this.getStyle(1)}>
          <Chat />
        </div>
        <div style={this.getStyle(2)}>
          <Chat />
        </div>
        <Tabs
          value={this.state.activeTab}
          onChange={this.onChangeTab}
          indicatorColor="primary"
          textColor="primary"
          fullWidth>
          <Tab label="Чат" />
          <Tab label="Детали заказа" />
          <Tab label="Меню" href="#basic-tabs" />
        </Tabs>
      </div>
    )
  }
}
