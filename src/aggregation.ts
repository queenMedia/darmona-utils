type AggregateCommonMetricsOptions = { withReasons: boolean };
type CommonMetricsAggregation = {
  CMP: "Totals";
  aggregationRow: true;
  [key: string]: any;
};
const defaultAggregateCommonMetricsOptions = { withReasons: false };

//export function aggregateRevenue

function calcSums(items: any[], keys: string[]) {
  const sums = Object.create({});

  for (const item of items) {
    for (const key of keys) {
      sums[key] = sums[key] ? sums[key] + item[key] : 0;
    }
  }

  return sums;
}

export const COMMON_METRICS = [
  "TOTAL_CLICKS",
  "GOT_TO_WP",
  "GOT_TO_BP",
  "CLICKED_ON_BP",
  "CONV",
  "FTD",
];
export const REVENUES = ["revUsd", "revEur"];
export const SKIP_REASONS = [
  "QUERY_RULES_SKIP",
  "IP_BLOCKED",
  "FIRST_IMPRESSIONS_SKIP",
  "NO_ENDPOINT_TO_DELIVER",
];

export function aggregateMetrics(
  rows: any[],
  metrics: string[] = COMMON_METRICS /*options: AggregateCommonMetricsOptions = defaultAggregateCommonMetricsOptions*/
): CommonMetricsAggregation {
  const aggregatedMetrics = calcSums(rows, metrics);

  return {
    CMP: "Totals",
    aggregationRow: true,
    ...aggregatedMetrics,
  };
}
