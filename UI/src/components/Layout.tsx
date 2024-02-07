import React, { FC } from 'react'
import { DataChart } from './DataChart'

export const Layout: FC = () => {
    return <div className="w-screen h-screen bg-green-200">
        <DataChart />
    </div>
}