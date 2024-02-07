import React, { FC, useEffect, useState, useMemo } from 'react'
import Chart, { ChartItem } from 'chart.js/auto'
import { useQuery } from 'react-query'
import { DataType, QueryType } from '../types/api'
import { getData } from '../tools/queries/getData'
import _ from 'lodash'
import Button from './Button'

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
    const [ dataKeys, setDataKeys ] = useState<string[]>([])

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
        const dkys = Array.from(tr_chartKeys);
        setDataKeys(dkys)
        const dataSets = dkys.map(key => {
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

        if (chartRendered) {
            Chart.getChart(chartDiv).destroy()
            setChartRendered(false)
        }

        if (chartDiv) {
            new Chart(
                chartDiv,
                { type: 'line', data: chartData, options: {
                    responsive: true,
                    aspectRatio: 1,
                    maintainAspectRatio: false
                  }
                }
            )
            setChartRendered(true)
        }
    }, [chartData, chartDiv])

    if (isLoading) return <div className=''>loading</div>
    return <div className='flex flex-col items-center justify-center h-5/6 w-5/6'>
        <div className='grid grid-cols-1 grid-rows-3 gap-4 content-center' style={{
            marginRight: '30px'
        }}>
        
            <Button title="test" />
        </div>
        <div className='flex-shrink-0 bg-slate-50 rounded-lg' style={{
            background: '#FFFFFF',
            padding: 20,
            borderRadius: 10,
            border: '1px black solid',
            widows: '600px'
        }}>
            <canvas onClick={(event) => event.preventDefault()} id="data_chart" />
        </div>
    </div>
}