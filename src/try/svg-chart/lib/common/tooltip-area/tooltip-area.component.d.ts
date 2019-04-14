import { EventEmitter, TemplateRef } from '@angular/core';
export declare class TooltipAreaComponent {
    anchorOpacity: number;
    anchorPos: number;
    anchorValues: any[];
    lastAnchorPos: number;
    dims: any;
    xSet: any;
    xScale: any;
    yScale: any;
    results: any;
    colors: any;
    showPercentage: boolean;
    tooltipDisabled: boolean;
    tooltipTemplate: TemplateRef<any>;
    hover: EventEmitter<{}>;
    tooltipAnchor: any;
    getValues(xVal: any): any[];
    mouseMove(event: any): void;
    findClosestPointIndex(xPos: any): number;
    showTooltip(): void;
    hideTooltip(): void;
    getToolTipText(tooltipItem: any): string;
}
