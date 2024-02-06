import './pre-start' // Must be the first import
import logger from 'jet-logger'

import EnvVars from '@src/types/EnvVars'
import server from './server'

// **** Run **** //
server.listen(EnvVars.Port, () => logger.info(`Express server started on port: ${EnvVars.Port.toString()}`))
