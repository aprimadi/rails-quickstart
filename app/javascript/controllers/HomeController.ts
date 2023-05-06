import actions from '../actions'
import { dispatch } from '../lib/dispatcher'
import { State } from '../state'

class HomeController {
  private state: State

  public constructor(state: State) {
    this.state = state
  }

  async load() {
    dispatch(actions.UPDATE)
  }
}

export default HomeController
