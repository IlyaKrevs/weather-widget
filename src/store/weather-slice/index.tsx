import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "..";

export type oneDay = {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    maxwind_kph: number;
    avghumidity: number;
  };
};

type errorResponse = {
  code: number;
  message: string;
};

interface IWeatherAPI {
  forecast: {
    forecastday: oneDay[];
  };
  isLoading: boolean;
  error: errorResponse | null | unknown;
}

const initialState: IWeatherAPI = {
  forecast: {
    forecastday: [],
  },
  isLoading: false,
  error: null,
};

export type ReqParam = {
  days: string;
  q: string;
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    storeForecast: (
      state,
      action: PayloadAction<{ forecastday: oneDay[] }>
    ) => {
      state.forecast = action.payload;
    },

    storeLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    storeError: (
      state,
      action: PayloadAction<errorResponse | null | unknown>
    ) => {
      state.error = action.payload;
    },
  },
});

const { storeForecast, storeLoading, storeError } = weatherSlice.actions;

const fetchWeather =
  (param: ReqParam): AppThunk =>
    async (dispatch, getState) => {
      const baseURL = "http://api.weatherapi.com/v1/";
      const typeRequest = "forecast.json?";
      const apiKey = "1eb665fad2d049c2bfc170949241104";

      dispatch(storeLoading(true));

      return fetch(
        `${baseURL}${typeRequest}key=${apiKey}&days=${param.days}&q=${param.q}`
      )
        .then((res) => res.json())
        .then((data: Partial<IWeatherAPI>) => {
          console.log(">>>>>ERROR<<<<<", data);
          dispatch(storeLoading(false));
          const { forecast, error } = data;
          error && dispatch(storeError(error));
          forecast && dispatch(storeForecast(forecast));
        });
    };

const asyncActions = {
  fetchWeather,
};

export const weatherActions = { ...asyncActions };

export default weatherSlice.reducer;
