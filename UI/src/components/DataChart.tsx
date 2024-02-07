import React, { FC, useEffect, useState, useMemo } from 'react'
import Chart, { ChartItem } from 'chart.js/auto'
import { useQuery } from 'react-query'
import { DataType, QueryType } from '../types/api'
import { getData } from '../tools/queries/getData'
import _ from 'lodash'

interface ChartDataInput {
    seriesData: {
        [key in DataType]?: number[]
    },
    labelData: {
        [key in DataType]?: string[] 
    },
    chartKeys: Set<DataType>,
    chartName: string,
}

const colourMap = {
    [DataType.EUR]: 'rgb(75, 192, 192)',
    [DataType.USD]: 'rgb(80, 201, 92)',
    [DataType.TKL]: 'rgb(120, 88, 80)',
}

const useTransformData = (data: any[], activeQuery: QueryType) => {
    const [ chartData, setChartData ] = useState<any>({ labels: [], datasets: [] })
    const [ labels, setLabels ] = useState<string[]>()
    const [ datasets, setDatasets ] = useState<any[]>()

    useEffect(() => setChartData({ labels, datasets }), [labels, datasets])

    useEffect(() => {
        if (!data) return
        const {
            seriesData: tr_series,
            labelData: tr_label,
            chartKeys: tr_chartKeys,
        } = data.reduce(
            (acc: ChartDataInput, row: any) => {
                const dataName = row.name as DataType
                acc.chartKeys.add(dataName)
                acc.seriesData[dataName] ? acc.seriesData[dataName]!.push(_.mean(row.hourlyData)) : acc.seriesData[dataName] = [_.mean(row.hourlyData)]
                acc.labelData[dataName] ? acc.labelData[dataName]!.push(row.date) : acc.labelData[dataName] = [row.date]
                return acc
            }, {seriesData: {}, labelData: {}, chartKeys: new Set<DataType>() }
        ) as ChartDataInput
        const dataSets = Array.from(tr_chartKeys).map(key => {
            // tr_label into datapoints
            setLabels(new Array(tr_series[key]?.length).fill('test'))
            return {
                label: key,
                data: tr_series[key],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
        })
        setDatasets(dataSets)
    }, [data, activeQuery])
    
    return { chartData }
}

export const DataChart: FC = () => {
    const [ chartDiv, setChartDiv ] = useState<HTMLCanvasElement | null>(null);
	// Data req
    const [ chartRendered, setChartRendered ] = useState<boolean>(false)
    const [ parameters, setParameters ] = useState<any>({ names: ['EUR'] })
    const [ activeQuery, setActiveQuery ] = useState<QueryType>(QueryType.GET_DB_DATA)
    const fetchData = useMemo(() => getData(activeQuery, parameters),[activeQuery, parameters])

	const { data, error, isLoading } = useQuery(activeQuery, fetchData)

    const { chartData } = useTransformData(data, activeQuery)



    useEffect(() => {
        // reset parameters
        setParameters({})
    }, [activeQuery])

    useEffect(() => {
        if (!chartDiv) setChartDiv(document.getElementById('data_chart') as HTMLCanvasElement)

        const dataChart = document.getElementById('data_chart') as HTMLCanvasElement
        if (chartRendered) {
            Chart.getChart(chartDiv).destroy()
            setChartRendered(false)
        }

        if (chartDiv) {
            console.log('render chart')
            new Chart(
                chartDiv,
                { type: 'line', data: chartData }
            )
            setChartRendered(true)
        }
    }, [chartData, chartDiv])

    if (isLoading) return <div>loading</div>
    return <div className='flex grid-cols-2 bg-red-500'>
        <div className=' col-span-1'>
            <button className="text-right w-16">test</button>
        </div>
        <div  className=' col-span-1'>
            <canvas onClick={(event) => event.preventDefault()} id="data_chart" />
        </div>
    </div>
}