import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../store/redux-hooks'
import { weatherActions } from '../../store/weather-slice'
import HighchartsContainer from '../../containers/highcharts-container'
import MyFormContainer from '../../containers/myform-container'



export default function WeatherPage() {

    const dispatch = useAppDispatch()

    const initParams = {
        city: 'moscow',
        days: '7'
    }

    useEffect(() => {
        dispatch(weatherActions.fetchWeather({ q: initParams.city, days: initParams.days }))
    }, [])

    return (
        <>
            <MyFormContainer />
            <HighchartsContainer />
        </>
    )
}
    