import React, { useMemo } from "react";
import { AxisOptions, ChartOptions, Chart } from "react-charts";
import {map, sum} from 'lodash'
import moment from 'moment'
import { NanowrimoTooltip } from "./tooltip";
import './chart.css'

const daily = map(Array.from({length: 30}), () => Math.random() * 150)
const cumulative = map(daily, (_, i, arr) => sum(arr.slice(0, i + 1)))

type DataType = {date: Date, value: number}

export function NanowrimoChart() {
  const options: ChartOptions<DataType> = useMemo(() => ({
    primaryAxis: {
      getValue: (datum) => datum.date,
    },
    secondaryAxes: [
      {
        getValue: (datum) => datum.value || 0,
        elementType: 'bar',
        min: 0,
        max: Math.max(...daily),
        hardMin: 0,
        hardMax: Math.max(...daily) * 1.2 + 10,
      },
      {
        getValue: (datum) => datum.value || 0,
        elementType: 'line',
        id: 'cumulative',
        min: 0,
        max: Math.max(...cumulative),
        hardMin: 0,
        hardMax: Math.max(...cumulative) * 1.2 + 10,
      },
    ],
    data: [
      {
        label: 'Daily',
        id: 'daily',
        data: map(daily, (daily, i) => ({
          date: moment().add(i, 'days').toDate(),
          value: daily,
        })),
      },
      {
        label: 'Cumulative',
        id: 'cumulative',
        data: map(cumulative, (cumulative, i) => ({
          date: moment().add(i, 'days').toDate(),
          value: cumulative,
        })),
        secondaryAxisId: 'cumulative',
      },
    ],
    tooltip: {
      render: (props) => (<NanowrimoTooltip {...props} />)
    }
  }), [])

  return <div className="chart-container">
    <div className="chart-label-left-container">
      <h2 className="chart-label-left">Daily words</h2>
    </div>
    <div className="chart">
      <Chart options={options} />
    </div>
    <div className="chart-label-right-container">
      <h2 className="chart-label-right">Cumulative Words</h2>
    </div>
  </div>
}
