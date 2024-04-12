import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type oneDay = {
    date: string,
    day: {
        maxtemp_c: number,
        mintemp_c: number,
        maxwind_kph: number,
        avghumidity: number,
    }
}

type errorResponse = {
    code: number,
    message: string
}

interface IWeatherAPI {
    forecast: {
        forecastday: oneDay[]
    },
    isLoading: boolean,
    error: errorResponse | null | unknown,
}

const initialState: IWeatherAPI = {
    forecast: {
        forecastday: []
    },
    isLoading: false,
    error: null,
}



export type ReqParam = {
    days: string,
    q: string,
}

const fetchWeather = createAsyncThunk('weather/fetch', async (param: ReqParam) => {

    const baseURL = 'http://api.weatherapi.com/v1/'
    const typeRequest = 'forecast.json?'
    const apiKey = '1eb665fad2d049c2bfc170949241104'

    return fetch(`${baseURL}${typeRequest}key=${apiKey}&days=${param.days}&q=${param.q}`)
        .then(res => res.json())
        .then(data => {
            return { data }
        })
})



const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(fetchWeather.fulfilled, (state, action: PayloadAction<{ data: IWeatherAPI }>) => {
            state.isLoading = false

            if (action.payload.data.error) {
                state.error = action.payload.data.error
                return
            }
            state.forecast = action.payload.data.forecast
        });

    }
})

const asyncActions = {
    fetchWeather,
}

export const weatherActions = { ...weatherSlice.actions, ...asyncActions }

export default weatherSlice.reducer