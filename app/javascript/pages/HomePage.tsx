import React from 'react'

import { State } from '../state'

type Props = {
  state: State
}

class HomePage extends React.Component<Props> {
  render() {
    return (
      <div>
        Hello, world!
      </div>
    )
  }
}

export default HomePage
