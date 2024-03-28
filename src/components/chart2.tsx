import React from 'react'

import { scaleBand, scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";
import { select, selectAll, Selection } from "d3-selection";
import { useEffect, useRef, useState } from "react";
import {max, median, mean} from "d3-array";
const data = [
    {
    name: 'foo',
    units: 9001,
    color: 'blue'
    },
    {
    name: 'bar',
    units: 2344,
    color: 'brown'
    },
    {
    name: 'baz',
    units: 3422,
    color: 'purple'
    },
    {
    name: 'yole',
    units: 8066,
    color: 'yellow'
    },
    {
    name: 'toye',
    units: 6887,
    color: 'green'
    },
]
const dimensions = {
    width: 800,
    height: 500,
    chartWidth: 700,
    chartHeight: 400,
    marginLeft: 100,
    marginRight: 100,
}
const Chart2 = () => {

  const svgRef = useRef<null| SVGSVGElement>(null)
  const [selection, setSelection] = useState<null| Selection<SVGSVGElement | null, unknown, null, undefined>>(null)
  const maxValue = max(data, d => d.units)
  const medianValue = median(data, d => d.units)
  const meanValue = mean(data, d => d.units)
  const y = scaleLinear().domain([0, maxValue!]).range([0, dimensions.chartHeight])
  const x = scaleBand()
                .domain(data.map(d=> d.name))
                .range([0, dimensions.chartWidth])
                // .padding(0.25)
                .paddingInner(0.05);
  const yAxis = axisLeft(y).ticks(3).tickFormat(d=> `£${d}`);
  const xAxis = axisBottom(x);

    
  useEffect(()=>{
    console.log('maxValue',maxValue)
    console.log('medianValue',medianValue)
    console.log('meanValue',meanValue)
    if(!selection){
      setSelection(select(svgRef.current))
    } else{
      
      selection
        .append('rect')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
        .attr('fill', 'grey')

        const xAxisGroup = selection.append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`)
        // .append('rect')
        // .attr('fill', `black`)
        .call(xAxis)

        const yAxisGroup = selection.append('g')
            .attr('transform', `translate(${dimensions.marginLeft}, ${0})`)
            .call(yAxis)

      selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, ${0})`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d =>  x(d.name) || null)
        .attr('fill', 'maroon')
        .attr('width', x.bandwidth)
        .attr('height', d => y(d.units))
    }
  }, [selection, maxValue])
  return (
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          style={{ backgroundColor: 'skyblue', margin: 30 }}
        ></svg>
  )
}

export default Chart2