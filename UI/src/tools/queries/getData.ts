import { QueryType } from "../../types/api"

const paramsToURL = (parameters: any) => {
    let urlParams = ''
    if (parameters.names) urlParams += `${urlParams ? '&' : ''}names=${JSON.stringify(parameters.names)}`
    if (parameters.startDate) urlParams += `${urlParams ? '&' : ''}startDate=${parameters.startDate.toISOString()}`
    if (parameters.endDate) urlParams += `${urlParams ? '&' : ''}endDate=${parameters.endDate.toISOString()}`
    return urlParams
}

export const getData = (endpoint: QueryType, parameters: any) => async () => {
    const urlParams = paramsToURL(parameters)
    const res = await fetch(`http://localhost:8001/api/${endpoint}${urlParams ? '?' : ''}${urlParams}`)
    return res.json()
}