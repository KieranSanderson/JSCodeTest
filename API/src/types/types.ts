import * as e from 'express'

export enum QueryType {
  GET_RANDOM_DATA = "/GET_RANDOM_DATA",
  GET_DB_DATA = "/GET_DB_DATA",
}

export type ApiError = Error & {
  status?: number
}

export interface RandomParams {
  dataLength: number
}

export interface DBParams {
  names?: string[]
  startDate?: Date
  endDate?: Date
}

export interface ApiResponse extends e.Response {
  locals: {
    data?: any[]
  }
}