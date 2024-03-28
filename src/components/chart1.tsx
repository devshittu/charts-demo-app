"use client"
import { select, selectAll, Selection } from "d3-selection";
import React, { useEffect, useRef, useState } from "react";
const data = [{
  units: 150,
  color: 'blue'
},
{
  units: 129,
  color: 'brown'
},
{
  units: 140,
  color: 'purple'
},
{
  units: 80,
  color: 'yellow'
},
{
  units: 100,
  color: 'green'
},
]


const Chart1 = () => {
  const svgRef = useRef<null| SVGSVGElement>(null)
  const [selection, setSelection] = useState<null| Selection<SVGSVGElement | null, unknown, null, undefined>>(null)
  useEffect(()=>{
    if(!selection){
      setSelection(select(svgRef.current))
    } else{
      const rects = 
      selection
      .selectAll('rect')
        .data(data)
        .attr("width", 100)
        .attr("height", d=> d.units)
        .attr("fill", d=> d.color)
        .attr("x", (_, i)=> i * 100)
      // console.log(selection)
      rects.enter()
        .append('rect')
        .attr("width", 100)
        .attr("height", d=> d.units)
        .attr("fill", d=> d.color)
        .attr("x", (_, i)=> i * 100)
    }
  }, [selection])
  return (
  <>
        <svg
          ref={svgRef}
          width={500}
        >
          <rect/>
          <rect/>
          <rect/>
        </svg>
        </>
  );
}


export default Chart1