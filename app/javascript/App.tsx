import React from 'react'

import { State } from './state'
import { router } from './routes'

type Props = {
  state: State
}

class App extends React.Component<Props> {
  render() {
    return (
      <div className='app'>
        <div key='content' className='content'>{this.getView()}</div>
      </div>
    )
  }

  getView() {
    const state = this.props.state
    const View: any = router.view(state.location.url() || '/')
    return (<View state={state} />)
  }
}

export default App
