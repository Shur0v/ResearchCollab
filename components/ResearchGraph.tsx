
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { COLORS } from '../constants';
import { MindMapData, ResearchNode } from '../types';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  label: string;
  type: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  value: number;
}

interface ResearchGraphProps {
  interactive?: boolean;
  data?: MindMapData | null;
}

export const ResearchGraph: React.FC<ResearchGraphProps> = ({ interactive = false, data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Data Processing
    let nodes: Node[] = [];
    let links: Link[] = [];

    if (data && data.nodes) {
      // Flatten hierarchical data
      const processNode = (node: ResearchNode, parentId?: string) => {
        nodes.push({
          id: node.id,
          group: node.type === 'core' ? 1 : node.type === 'supporting' ? 2 : 3,
          label: node.label,
          type: node.type,
          x: width / 2 + (Math.random() - 0.5) * 50,
          y: height / 2 + (Math.random() - 0.5) * 50
        } as any);

        if (parentId) {
          links.push({
            source: parentId,
            target: node.id,
            value: 1
          } as any);
        }

        if (node.children) {
          node.children.forEach(child => processNode(child, node.id));
        }
      };

      data.nodes.forEach(root => processNode(root));
    } else {
      // Idle Animation Data
      nodes = Array.from({ length: 50 }, (_, i) => ({
        id: `node-${i}`,
        group: Math.floor(Math.random() * 4),
        label: i === 0 ? "CORE" : `N_${i}`,
        type: i === 0 ? 'core' : (Math.random() > 0.7 ? 'supporting' : 'idle'),
        x: width / 2 + (Math.random() - 0.5) * 50,
        y: height / 2 + (Math.random() - 0.5) * 50
      } as any));

      links = Array.from({ length: 40 }, () => ({
        source: `node-${Math.floor(Math.random() * 10)}`,
        target: `node-${Math.floor(Math.random() * 50)}`,
        value: Math.random()
      } as any));
    }

    // Visualization
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
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(d => interactive ? 100 : 40))
      .force("charge", d3.forceManyBody().strength(interactive ? -300 : -50))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.08))
      .force("y", d3.forceY(height / 2).strength(0.08))
      .force("collision", d3.forceCollide().radius(20));

    const link = container.append("g")
      .attr("stroke", COLORS.STRUCTURAL)
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1);

    const nodeGroup = container.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    // Node Glow for core
    nodeGroup.filter(d => d.type === 'core').append("circle")
      .attr("r", 20)
      .attr("fill", COLORS.PRIMARY)
      .attr("opacity", 0.15)
      .attr("class", "animate-pulse");

    nodeGroup.append("circle")
      .attr("r", d => d.type === 'core' ? 12 : d.type === 'supporting' ? 8 : 4)
      .attr("fill", d => {
        if (d.type === 'core') return COLORS.PRIMARY;
        if (d.type === 'supporting') return COLORS.ACCENT;
        return COLORS.STRUCTURAL;
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("class", "transition-all duration-300 shadow-sm");

    // Labels
    nodeGroup.append("text")
      .attr("dx", 14)
      .attr("dy", 4)
      .text(d => d.label)
      .attr("font-size", d => d.type === 'core' ? "12px" : "10px")
      .attr("font-weight", d => d.type === 'core' ? "bold" : "normal")
      .attr("fill", "#555")
      .style("opacity", d => d.type === 'source' ? 0.6 : 1)
      .style("display", d => (!interactive && d.type === 'idle') ? 'none' : 'block');

    simulation.on("tick", () => {
      // Constrain nodes to be inside the SVG
      nodes.forEach(d => {
        d.x = Math.max(20, Math.min(width - 20, d.x as number));
        d.y = Math.max(20, Math.min(height - 20, d.y as number));
      });

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
  }, [interactive, data]);

  return <svg ref={svgRef} className="w-full h-full" style={{ cursor: interactive ? 'grab' : 'default' }} />;
};
