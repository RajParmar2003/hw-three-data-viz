import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const data = this.props.data2;
    const margin = { top: 50, right: 10, bottom: 50, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    
    const avgTipsByDay = d3.rollup(
      data,
      v => d3.mean(v, d => d.tip),
      d => d.day
    );

    const temp_data = Array.from(avgTipsByDay, ([day, avgTip]) => ({ day, avgTip }));

    const container = d3.select(".child2_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_2")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x_data = temp_data.map(item => item.day);
    const x_scale = d3.scaleBand().domain(x_data).range([0, w]).padding(0.2);

    const y_data = temp_data.map(item => item.avgTip);
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);

    container.selectAll("rect")
      .data(temp_data)
      .join('rect')
      .attr("x", d => x_scale(d.day))
      .attr('width', x_scale.bandwidth())
      .attr("fill", 'orange')
      .attr("y", d => y_scale(d.avgTip))
      .attr("height", d => h - y_scale(d.avgTip));

    
    container.selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    
    container.selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .call(d3.axisLeft(y_scale));

    
    container.append("text")
      .attr("x", w / 2)
      .attr("y", h + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .text("Day");

    container.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -h / 2)
      .attr("y", -margin.left + 15)
      .attr("text-anchor", "middle")
      .text("Average Tip");

    
    container.append("text")
      .attr("x", w / 2)
      .attr("y", -20)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Average Tips by Day");
  }

  render() {
    return (
      <svg className="child2_svg">
        <g className="g_2"></g>
      </svg>
    );
  }
}

export default Child2;
