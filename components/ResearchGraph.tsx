
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { COLORS } from '../constants';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  label: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  value: number;
}

export const ResearchGraph: React.FC<{ interactive?: boolean }> = ({ interactive = false }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const nodes: Node[] = Array.from({ length: 50 }, (_, i) => ({
      id: `node-${i}`,
      group: Math.floor(Math.random() * 4),
      label: i === 0 ? "CORE DOMAIN" : `ENTITY_${i}`
    }));

    const links: Link[] = Array.from({ length: 65 }, () => ({
      source: `node-${Math.floor(Math.random() * 10)}`, // Connect more to the first few nodes
      target: `node-${Math.floor(Math.random() * 50)}`,
      value: Math.random()
    }));

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create a container group for zooming
    const container = svg.append("g");

    if (interactive) {
       const zoom = d3.zoom<SVGSVGElement, unknown>()
         .scaleExtent([0.1, 4])
         .on("zoom", (event) => {
           container.attr("transform", event.transform);
         });
       svg.call(zoom);
    }

    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(d => 80 + (1 - d.value) * 100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    // Links with gradients or opacity
    const link = container.append("g")
      .attr("stroke", COLORS.STRUCTURAL)
      .attr("stroke-opacity", 0.2)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => 0.5 + d.value * 2);

    // Nodes as sophisticated elements
    const nodeGroup = container.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    // Node Circle
    nodeGroup.append("circle")
      .attr("r", d => d.id === 'node-0' ? 12 : 5)
      .attr("fill", d => {
        if (d.id === 'node-0') return COLORS.PRIMARY;
        if (d.group === 1) return COLORS.ACCENT;
        return COLORS.STRUCTURAL;
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("class", "transition-all duration-300");

    // Node Glow for core
    nodeGroup.filter(d => d.id === 'node-0').append("circle")
      .attr("r", 20)
      .attr("fill", COLORS.PRIMARY)
      .attr("opacity", 0.15)
      .attr("class", "animate-pulse");

    // Labels for specific nodes
    if (interactive) {
      nodeGroup.append("text")
        .attr("dx", 12)
        .attr("dy", 4)
        .text(d => d.label)
        .attr("font-size", "8px")
        .attr("font-weight", "bold")
        .attr("fill", "#666")
        .attr("text-transform", "uppercase")
        .attr("letter-spacing", "0.1em");
    }

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    if (!interactive) {
       const interval = setInterval(() => {
          simulation.alpha(0.1).restart();
       }, 3000);
       return () => clearInterval(interval);
    }

  }, [interactive]);

  return <svg ref={svgRef} className="w-full h-full cursor-move" />;
};
