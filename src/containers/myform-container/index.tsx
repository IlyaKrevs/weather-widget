import React, { useEffect, useState } from 'react'
import MyForm from '../../components/my-form'
import { InputProps, makeStyles } from '@fluentui/react-components'
import { useAppDispatch } from '../../store/redux-hooks'
import { weatherActions } from '../../store/weather-slice'
import { ReqParam } from '../../store/weather-slice'



const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center'
    }
})



export default function MyFormContainer() {
    const styles = useStyles()

    const [state, setState] = useState<ReqParam>({
        q: '',
        days: '1'
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log(state)
    }, [state])


    // ALWAYS HAVE NAME FCNG TS!
    function inputCallback(value: string, name: string = '',) {
        setState(prev => ({
            ...prev,
            [name]: value,
        }))

    }

    function btnCallback() {
        dispatch(weatherActions.fetchWeather(state))
    }


    const myInput: InputProps[] = [{
        type: 'text',
        placeholder: 'City name',
        name: 'q',
        content: 'Print city name (english only)',
    },
    {
        type: 'number',
        min: 1,
        max: 10,
        name: 'days',
        placeholder: 'Amount of days',
        content: 'Print amount of days (min:1, max: 10)',
    }]

    const myBtn = {
        text: 'Make request',
        btnCallBack: btnCallback,
    }


    return (
        <div className={styles.mainContainer}>
            <MyForm
                inputsArr={myInput}
                btnObj={myBtn}
                inputCallBack={inputCallback}
            />
        </div>
    )
}
