import {legacy_createStore as createStore} from 'redux'
import rootReduser from './reducer'

const store=createStore(rootReduser)

export default store