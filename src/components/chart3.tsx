import React from 'react'
import randomstring from 'randomstring'
import { scaleBand, scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";
import { select, selectAll, Selection } from "d3-selection";

import { transition } from 'd3-transition';

import { useEffect, useRef, useState } from "react";
import {max, median, mean} from "d3-array";
const initialData = [
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
    width: 900,
    height: 600,
    chartWidth: 800,
    chartHeight: 500,
    marginLeft: 100,
    marginRight: 100,
}
const Chart3 = () => {

  const svgRef = useRef<null| SVGSVGElement>(null)
  const [selection, setSelection] = useState<null| Selection<SVGSVGElement | null, unknown, null, undefined>>(null)
  const [data, setData] = useState<{name: string; units: number; color: string}[]>(initialData)
  const maxValue = max(data, d => d.units)

  let y = scaleLinear()
                  .domain([0, maxValue!])
                  .range([dimensions.chartHeight, 0])
                  
  let x = scaleBand()
                .domain(data.map(d=> d.name))
                .range([0, dimensions.chartWidth])
                .paddingInner(0.05);
  const yAxis = axisLeft(y).ticks(3).tickFormat(d=> `£${d}`);
  const xAxis = axisBottom(x);

    
  useEffect(()=>{
    console.log('maxValue',maxValue)
    if(!selection){
      setSelection(select(svgRef.current))
    } else{
      
    // Clear the existing axes before appending new ones
    selection.selectAll('.x-axis-group, .y-axis-group').remove(); // Remove existing axes

      selection
        .append('rect')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
        .attr('fill', 'grey')

        const xAxisGroup = selection.append('g')

      .attr('class', 'x-axis-group') // Assign class for identification
        .attr('transform', `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`)
        // .append('rect')
        // .attr('fill', `black`)
        .call(xAxis)

        const yAxisGroup = selection.append('g')
      .attr('class', 'y-axis-group') // Assign class for identification

            .attr('transform', `translate(${dimensions.marginLeft}, ${0})`)
            .call(yAxis)

      selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, ${0})`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('fill', 'maroon')
        .attr('width', x.bandwidth)
        .attr('x', d =>  x(d.name) || null)


        // .attr('y', dimensions.chartHeight)
        // .attr('height', 0)
        // .transition()
        // .duration(500)
        // .delay((_, i) => i * 100)


        .attr('y', d =>  y(d.units) || null)
        .attr('height', d => dimensions.chartHeight - y(d.units))
    }
  }, [selection])

  useEffect(() =>{
    if ( selection){
          y = scaleLinear()
                  .domain([0, max(data, d => d.units)!])
                  .range([dimensions.chartHeight, 0])
                  
          x = scaleBand()
                .domain(data.map(d=> d.name))
                .range([0, dimensions.chartWidth])
                .paddingInner(0.05);

        const rects = selection.selectAll('rect').data(data)
        rects.exit()
        .transition()
        .duration(300)
          .attr('y', d =>  y(d.units)!)
        .remove()
        rects
          .attr('width', x.bandwidth)
          .attr('height', d => dimensions.chartHeight - y(d.units))
          .attr('x', d =>  x(d.name) || null)
          .attr('y', d =>  y(d.units) || null)
          .attr('fill', 'green')


        rects
          .enter()
          .append('rect')
          .attr('width', x.bandwidth)
          .attr('height', d => dimensions.chartHeight - y(d.units))
          .attr('x', d =>  x(d.name)!)
          .attr('y', d =>  y(d.units)!)
          .attr('fill', 'green')
    }
  },[data])
  const addRandomData = () => {
    const newData = 
    {
    name: randomstring.generate(10) ,
    units: Math.floor(Math.random() * (8500) + 2000),
    color: 'yellow'
    };

    setData([...data, newData])
    
  }
  const removeLastData = () => {
    if (data.length === 0) return;
    const newData =  data.splice(0, data.length-1) 
    setData(newData)
  }
  return (
    <>
        <svg
        name='chart'
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
        ></svg>

        <button onClick={addRandomData}>Add rand data</button>
        <button onClick={removeLastData}>Remove rand data</button>
        </>
  )
}

export default Chart3