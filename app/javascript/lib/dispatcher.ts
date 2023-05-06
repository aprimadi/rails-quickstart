import type { SyntheticEvent } from 'react'

export {
  dispatch,
  dispatcher,
  setDispatch,
}

type DispatchHandler = (...args: any[]) => void
type Dispatcher = Record<string, DispatchHandler>

const dispatchers: Dispatcher = {}
let _dispatch: DispatchHandler = function() {}

function setDispatch(dispatch: DispatchHandler) {
  _dispatch = dispatch
}

function dispatch(...args: any[]) {
  _dispatch(...args)
}

// Most DOM event handlers are trivial functions like `() => dispatch(<args>)`.
// For these, `dispatcher(<args>)` is preferred because it memoizes the handler
// function. This prevents React from updating the listener functions on
// each update().
function dispatcher(...args: any[]) {
  const str: string = JSON.stringify(args)
  let handler = dispatchers[str]
  if (!handler) {
    handler = dispatchers[str] = function(e: SyntheticEvent) {
      // Do no propagate click to elements below the button
      e.stopPropagation()

      if (e.currentTarget.classList.contains('disabled')) {
        // Ignore clicks on disabled elements
        return
      }

      dispatch(...args)
    }
  }
  return handler
}
