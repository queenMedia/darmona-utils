type CommonMetricsAggregation = {
    CMP: "Totals";
    aggregationRow: true;
    [key: string]: any;
};
type Inputs = {
    lpcuCost: number;
};
export declare const COMMON_METRICS: string[];
export declare const REVENUES: string[];
export declare const SKIP_REASONS: string[];
export declare function aggregateMetrics(rows: any[], metrics?: string[], inputs?: Inputs): CommonMetricsAggregation;
export {};
