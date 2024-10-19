import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const data = this.props.data1;
    const margin = { top: 30, right: 10, bottom: 50, left: 50 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    const container = d3.select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x_data = data.map(item => item.total_bill);
    const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([0, w]);

    container.selectAll(".x_axis_g")
      .data([0])
      .join('g')
      .attr("class", 'x_axis_g')
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    const y_data = data.map(item => item.tip);
    const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);

    container.selectAll(".y_axis_g")
      .data([0])
      .join('g')
      .attr("class", 'y_axis_g')
      .call(d3.axisLeft(y_scale));

    container.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x_scale(d.total_bill))
      .attr("cy", d => y_scale(d.tip))
      .attr("r", 3)
      .style("fill", "orange");

    
    container.append("text")
      .attr("x", w / 2)
      .attr("y", h + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .text("Total Bill");

    container.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -h / 2)
      .attr("y", -margin.left + 16)
      .attr("text-anchor", "middle")
      .text("Tips");

    
    container.append("text")
      .attr("x", w / 2)
      .attr("y", -12)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Total Bill vs Tip");
  }

  render() {
    return (
      <svg className="child1_svg">
        <g className="g_1"></g>
      </svg>
    );
  }
}

export default Child1;
