import React from 'react';
import { VictoryBar, VictoryChart,VictoryAxis,VictoryTheme,VictoryStack} from "victory";

export const Graph = (props) => {


    const active = [
        {quarter: 1, earnings: 13000},
        {quarter: 2, earnings: 16500},
        {quarter: 3, earnings: 14250},
        {quarter: 4, earnings: 19000},
        {quarter: 5, earnings: 16500},
        {quarter: 6, earnings: 14250},
        {quarter: 7, earnings: 19000}
      ];

    const recovered = [
        {quarter: 1, earnings: 100},
        {quarter: 2, earnings: 100},
        {quarter: 3, earnings: 10},
        {quarter: 4, earnings: 1000},
        {quarter: 5, earnings: 10},
        {quarter: 6, earnings: 5000},
        {quarter: 7, earnings: 10}
    ];  

    const dead = [
        {quarter: 1, earnings: 1150},
        {quarter: 2, earnings: 1325},
        {quarter: 3, earnings: 2000},
        {quarter: 4, earnings: 1550},
        {quarter: 5, earnings: 11250},
        {quarter: 6, earnings: 13000},
        {quarter: 7, earnings: 15000},
      ];
      
  return (
    <div>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material} >

            <VictoryAxis style={{tickLabels: {fontSize: 10}}}
            
            tickValues={[1, 2, 3,4,5,6,7]}
            tickFormat={["day 1", "day 2", "day 3", "day 4","day 5","day 6","day 7"]}
            />
            <VictoryAxis style={{tickLabels: {fontSize: 10}}}
                dependentAxis

            tickFormat={(x) => (`${x / 500}k`)}
            />
            <VictoryStack>

                <VictoryBar
                    data={active}
                    x="quarter"
                    y="earnings"
                />
                <VictoryBar
                    data={recovered}
                    x="quarter"
                    y="earnings"
                />
                <VictoryBar
                    data={dead}
                    x="quarter"
                    y="earnings"
                />

            </VictoryStack>
            
      </VictoryChart>
    </div>
  )
}
