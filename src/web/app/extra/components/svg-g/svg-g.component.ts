import {
  Component,
  AfterContentInit,
  OnChanges,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter
} from '@angular/core';
import * as d3Shape from 'd3-shape';
// import * as d3Zoom from 'd3-zoom';
// import * as d3Selection from 'd3-selection';
import { map, forEach } from 'lodash';

import { SvgMargin } from '../svg-svg';

@Component({
  selector: '[svg-g]',
  templateUrl: 'template.html',
  preserveWhitespaces: false
})
export class SvgGComponent  implements AfterContentInit, OnChanges {
  @ViewChild('svgG', { read: ElementRef }) svgG: ElementRef;
  @Input() tree: any;
  @Input() w: number;
  @Input() h: number;
  @Input() currentSelection: any;
  @Output() selected = new EventEmitter<boolean>();
  @Input() showLevel = false;
  @Input() showId = false;
  @Input() showBlocked = false;
  @Input() showPathToRoot = false;
  @Input() margin: SvgMargin;
  svgWidth = 0;
  svgHeight  = 0;
  mHeight = 0;
  mWidth = 0;
  viewMode = 'vertical';
  nodesClassL: string;
  getBgTransformT: string;
  getViewBoxV: string;

  clickCircle(e: any) {
    this.selected.emit(e);
  }

  ngOnChanges() {
    this.getViewBoxV = this.getViewBox();
    this.getBgTransformT = this.getBgTransform();
    this.nodesClassL = this.nodesClass();
    this.svgHeight = this.getSvgHeight();
    this.svgWidth = this.getSvgWidth();
    this.mHeight = this.getHeight();
    this.mWidth = this.getWidth();

    map(this.tree, (node) => {
      node.classes = this.nodeClass(node);
      node.pathLink = [];
      node.pathElbow = [];
      node.pathToRoot = [];
      node.pathElbowCombine = this.combinedElbow(node);
      node.ttLvl = this.getTextTransform(node);
      node.ttId = this.getTextTransform2(node);
      node.pathToRoot = this.pathToRootC(node);
      forEach(node.children, (child) => {
        node.pathLink.push({
          classes: this.linkClass(child),
          d: this.getLink(child)
        });
        node.pathElbow.push({
          classes: 'elbow',
          d: this.getElbow(child)
        });

      });
    });
  }

  pathToRootC(d: any) {
    const ancestors = d.ancestors();
    const dL = [];
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < ancestors.length; index++) {
      const element = ancestors[index];
      if (element.parent === null) { continue; }
      const x = element.x;
      const y = element.y;
      const px = element.parent.x;
      const py = element.parent.y;
      dL.push(`M${x},${y - 15}, V${py + 35} H${px} V${py + 15}`);
    }
    return dL.join(' ');
  }

  ngAfterContentInit() {
  }

  nodesClass() {
    let classL = 'nodes';
    if (this.showId) { classL = `${classL} show-id`; }
    if (this.showLevel) { classL = `${classL} show-level`; }
    if (this.showBlocked) { classL = `${classL} show-blocked`; }
    if (this.showPathToRoot) { classL = `${classL} show-ptr`; }
    return classL;
  }

  nodeClass(node: any) {
    const id = node.data.id;
    const level = node.data.lvl;
    let classStr = `node node-id-${id} node-level-${level}`;
    if (id === this.currentSelection) { classStr = `${classStr} selected`; }
    return classStr;
  }

  linkClass(link: any) {
    let linkClass = '';
    const sourceLvl = link.parent.data.lvl;
    const targetLvl = link.data.lvl;
    if (sourceLvl <= targetLvl) { linkClass = `${linkClass} blocked`; }
    return linkClass;
  }

  getViewBox() {
    return `0 0 ${this.getSvgWidth()} ${this.getSvgHeight()}`;
  }

  getTextTransform(node: any) {
    return `translate(${node.x},${node.y - 17})`;
  }

  getTextTransform2(node: any) {
    return `translate(${node.x + 14},${node.y - 7})`;
  }

  getBgTransform() {
    return `translate(${this.margin.left},${this.margin.bottom})`;
  }

  getCenterHorizontal() {
    return this.getWidth() / 2;
  }

  getCenterVertical() {
    return this.getHeight() / 2;
  }

  getHeight() {
    return this.h;
  }

  getSvgHeight() {
    return this.h + this.margin.top + this.margin.bottom;
  }

  getWidth() {
    return this.w;
  }

  getSvgWidth() {
    return this.w + this.margin.left + this.margin.right;
  }

  getLink(link: any) {
    return this.diagonal(
      {
        source: {
          x: link.parent.x,
          y: link.parent.y
        },
        target: {
          x: link.x,
          y: link.y
        }
      }
    );
  }

  getElbow(link: any) {
    return this.elbow(
      this.getElbow2(link),
      link.parent === null,
      link.children === null
    );
  }

  getElbow2(link: any) {
    return {
      source: {
        x: link.parent.x,
        y: link.parent.y
      },
      target: {
        x: link.x,
        y: link.y
      }
    };
  }

  diagonal(st: any) {
    const mode = (this.viewMode === 'vertical') ? d3Shape.linkVertical : d3Shape.linkHorizontal;
    return mode().x((d: any) => d.x).y((d: any) =>  d.y)(st);
  }

  elbow(st: any, root: boolean, hasChild: boolean) {
    let d = `M${st.source.x},${(st.source.y)} V${st.source.y + 35} H${st.target.x}`;
    d = hasChild ? `${d} V${st.target.y + 35}` : `${d} V${st.target.y}`;
    return d;
  }

  combinedElbow(node: any) {
    const d = {
      a: '',
      b: ''
    };
    const children = node.children;
    let index = 1;
    let hl1 = '';
    let hl2 = '';
    let vl = '';
    const tr = [];
    forEach(children, (child) => {
      const e = this.getElbow2(child);

      if (index === 1) {
        vl = `M${e.source.x},${(e.source.y + 15)} V${e.target.y - 35}`;
        hl1 = `M${e.target.x},${e.target.y - 35}`;
      }
      if (index === children.length) {
        hl2 = `H${e.target.x}`;
      }
      tr.push(`M${e.target.x},${e.target.y - 35.5} V${e.target.y - 15}`);
      index++;
    });
    const x = tr.join(' ');
    d.b = `${vl} ${hl1} ${hl2} ${x}`;
    return d;
  }
}
