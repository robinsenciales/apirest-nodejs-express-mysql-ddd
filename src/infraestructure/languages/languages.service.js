import {makeDb} from '../../kernel/db'
import makeLanguagesDb from './languages.db'

const languagesService = makeLanguagesDb({ makeDb })
export default languagesService
