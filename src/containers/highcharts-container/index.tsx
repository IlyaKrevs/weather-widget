import React from 'react'
import HighchartItem from '../../components/highcharts-item'
import * as Highcharts from 'highcharts';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { useAppSelector } from '../../store/redux-hooks';
import { utils } from '../../my-fnc/index'



const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        ...shorthands.gap('50px'),
    }
})



export default function HighchartsContainer() {

    const styles = useStyles()

    const dataArr = useAppSelector(state => state.weatherReducer.forecast.forecastday)

    const firstChartOption: Highcharts.Options = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'График динамики температуры'
        },
        xAxis: {
            categories: dataArr.map(item => utils.fromStringToDateAndMonth(item.date))
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        series: [
            {
                type: 'line',
                name: 'Max',
                data: dataArr.map(item => utils.extractOneParam(item.day, 'maxtemp_c')),
            },
            {
                type: 'line',
                name: 'Min',
                data: dataArr.map(item => utils.extractOneParam(item.day, 'mintemp_c')),
            },
        ]
    }

    const secondChartOptions: Highcharts.Options = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'График динамики максимальной скорости ветра и влажности'
        },
        xAxis: {
            categories: dataArr.map(item => utils.fromStringToDateAndMonth(item.date))
        },
        yAxis: [{
            title: {
                text: 'kph'
            },
        },
        {
            opposite: true,
            title: {
                text: 'percents %'
            },
        }],
        series: [
            {
                type: 'line',
                name: 'Max wind speed (kph)',
                data: dataArr.map(item => utils.extractOneParam(item.day, 'maxwind_kph')),
            },
            {
                type: 'line',
                name: 'Avg humidity',
                data: dataArr.map(item => utils.extractOneParam(item.day, 'avghumidity')),
            },
        ]
    }

    const currentCharts = [firstChartOption, secondChartOptions]

    return (
        <div className={styles.mainContainer}>
            {currentCharts.map((item, i) => <HighchartItem options={item} key={i} />)}
        </div>
    )
}

