import React, { useState } from 'react'
import {
    Input,
    InputProps
} from '@fluentui/react-components'


interface IMyInput extends InputProps {
    inputCallback: (value: string, name: string | undefined) => void,
}

export default function MyInput(props: IMyInput) {

    let [value, setValue] = useState('')

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        let currentValue = e.target.value
        let { type, min, max } = e.target

        if (type === 'number') {

            if (min.length && +currentValue < +min) {
                setValue(min)
            } else if (max.length && +currentValue > +max) {
                setValue(max)
            } else {
                setValue(currentValue)
            }
        } else if (type === 'text') {
            if (/^[a-z]*$/i.test(currentValue.slice(-1))) {
                setValue(currentValue)
            } else {
                e.preventDefault()
            }
        } else {
            setValue(currentValue)
        }
        props.inputCallback(value, props.name)
    }

    return (
        <>
            <Input
                {...props}
                value={value}
                onChange={(e) => onChangeHandler(e)}
            />
        </>
    )
}
