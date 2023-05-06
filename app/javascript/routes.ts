import actions from './actions'
import Router from './lib/router'
import HomePage from './pages/HomePage'

const router = new Router()
router.register('/', actions.HOME.LOAD, HomePage)

export { router }
