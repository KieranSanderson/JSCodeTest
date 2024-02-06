import { Router, Request } from 'express'
import { QueryType } from '@src/types/types'
import HttpStatusCodes from "@src/types/HttpStatusCodes"
import { RandomParams, DBParams, ApiResponse } from "@src/types/types"
import logger from 'jet-logger'
import { getData } from './db'

const apiRouter = Router()
const parseArguments = (query: any) => ({
  names:     (query.names)     ? JSON.parse(query.names)   : undefined,
  startDate: (query.startDate) ? new Date(query.startDate) : undefined,
  endDate:   (query.endDate)   ? new Date(query.endDate)   : undefined,
} as DBParams)

async function getDBData(req: Request, res: ApiResponse) {
  logger.info(`Getting data from DB`)
  
  const {
    names,
    startDate,
    endDate,
  } = parseArguments(req.query)

  logger.info(`Query: ${JSON.stringify({
    names, namesType: typeof names,
    startDate, startDateType: typeof startDate,
    endDate, endDateType: typeof endDate,
  }, null, 2)}`)
  
  const data = await getData({names, startDate, endDate})
  return res.status(HttpStatusCodes.OK).json(data)
}
apiRouter.get(
  QueryType.GET_DB_DATA,
  getDBData,
)


async function getRandomData(req: Request, res: ApiResponse) {
  logger.info(`Getting random data ${JSON.stringify(req.query)}`)

  const {
    dataLength = 100,
  } = req.query as unknown as RandomParams
  
  const arr = Array.from({length: dataLength}, () => Math.floor(Math.random() * 100))

  return res.status(HttpStatusCodes.OK).json(arr)
}
apiRouter.get(
  QueryType.GET_RANDOM_DATA,
  getRandomData,
)

export default apiRouter
