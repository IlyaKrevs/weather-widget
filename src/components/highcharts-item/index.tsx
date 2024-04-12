import React from 'react'
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


export default function HighchartItem(props: HighchartsReact.Props) {

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={props.options}
            />
        </>
    )
}
