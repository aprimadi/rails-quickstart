import React from 'react'
import { createRoot } from 'react-dom/client'

import App from "./App"
import actions from "./actions"
import { State } from "./state"
import { setDispatch } from "./lib/dispatcher"
import HomeController from "./controllers/HomeController"

const LocationHistory = require("location-history")

// Global state
let state: State = {
  location: new LocationHistory()
}

// Controllers registry
const controllers = {
  home: new HomeController(state),
}

// Root React component
let app: App | null = null

setDispatch(dispatch)
window.onload = () => {
  const container = document.querySelector('#body')
  const root = createRoot(container)
  root.render(<App ref={(_app) => app = _app} state={state} />)
}

const dispatchHandlers = {
  [actions.HOME.LOAD]: () => controllers.home.load(),

  [actions.UPDATE]: () => {}, // No-op, just trigger an update
}

function dispatch(action: string, ...args: any[]) {
  // Log dispatch calls, for debugging, but don't spam
  if (![actions.UPDATE].includes(action)) {
    console.debug("dispatch", action, ...args)
  }

  const handler: (...args: any[]) => void = dispatchHandlers[action]
  if (handler) {
    handler(...args)
  } else {
    console.error('Missing dispatch handler: ' + action)
  }

  if (action == actions.UPDATE) {
    update()
  }
}

function update() {
  app.setState(state)
}
