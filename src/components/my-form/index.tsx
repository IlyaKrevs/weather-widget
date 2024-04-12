import React, { useState } from 'react'
import {
    InputProps,
    Label,
    makeStyles,
    shorthands,
    Button,
} from '@fluentui/react-components'
import MyInput from '../my-input';



const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('20px'),
        ...shorthands.padding('200px', '0'),
    },
    inputContainer: {
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        ...shorthands.gap('5px')
    }
})



interface IMyForm {
    inputsArr: InputProps[],
    btnObj: {
        text: string,
        btnCallBack: () => void
    },
    inputCallBack: (value: string, name: string | undefined) => void
}



export default function MyForm(props: IMyForm) {

    const styles = useStyles();

    return (
        <div className={styles.mainContainer}>
            {props.inputsArr.map((item, i) => {
                let { content, ...other } = item
                return (
                    <div
                        className={styles.inputContainer}
                        key={i}
                    >
                        <Label >
                            {content}
                        </Label>
                        <MyInput
                            {...other}
                            inputCallback={props.inputCallBack}
                        />
                    </div>
                )
            })}
            <Button
                onClick={props.btnObj.btnCallBack}
                appearance='primary'
            >
                {props.btnObj.text}
            </Button>
        </div>
    )
}

