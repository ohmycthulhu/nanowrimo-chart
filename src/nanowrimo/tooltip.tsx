import React from 'react'
import { TooltipRendererProps } from "react-charts/types/components/TooltipRenderer";
import moment from 'moment'
import './tooltip.css'

type DataType = {date: Date, value: number}

export type NanowrimoTooltipProps = TooltipRendererProps<DataType>

export function NanowrimoTooltip({focusedDatum, ...rest}: NanowrimoTooltipProps) {
  const dailyData = focusedDatum?.interactiveGroup?.find(group => group.seriesId === 'daily')
  const cumulativeData = focusedDatum?.interactiveGroup?.find(group => group.seriesId === 'cumulative')

  return (
    <div className="nanowrimo-tooltip">
      <div className="nanowrimo-tooltip-date">{moment(focusedDatum?.primaryValue).format('MMMM d')}</div>
      <div>Daily word count: {Math.floor(dailyData?.secondaryValue)}</div>
      <div className="nanowrimo-tooltip-cumulative">Cumulative word count (Me): {Math.floor(cumulativeData?.secondaryValue)}</div>
      <div className="nanowrimo-tooltip-cumulative">Cumulative word count (Everyone Else): {Math.floor(cumulativeData?.secondaryValue)}</div>
    </div>
  )
}
