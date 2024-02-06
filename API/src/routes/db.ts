import mongoose from 'mongoose'
import EnvVars from '@src/types/EnvVars'
import logger from 'jet-logger'
import { DBParams } from '@src/types/types'

mongoose.connect(EnvVars.MongoUri.toString())
logger.info(`Connection set up to: ${EnvVars.MongoUri}`)

const conversion = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId },
    date: { type: String },
    name: { type: String },
    hourlyData: [{ type: Number }],
}, { collection: 'ConversionRates' })
const conversionData = mongoose.model('ConversionRates', conversion)

const buildFilter = async ({names, startDate, endDate}: DBParams) => {
    var filter = {} as any
    if (names)     filter.name      = names
    if (startDate) filter.startDate = { $gt: startDate }
    if (startDate) filter.endDate   = { $lt: endDate }

    return filter
}

export const getData = async ({ names, startDate, endDate }: DBParams) => {
    try {
        const filter = await buildFilter({names, startDate, endDate})
        const data = await conversionData.find(filter).exec()
        return data
    } catch (err) {
        logger.err(err)
        return 'error occured'
    }
}
