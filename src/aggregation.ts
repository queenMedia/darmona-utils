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
      sums[key] =
        typeof sums[key] !== "undefined" ? sums[key] + item[key] : item[key];
    }
  }

  return sums;
}

export const COMMON_METRICS = [
  "TOTAL_CLICKS",
  "GOT_TO_WP",
  "GOT_TO_BP",
  "UNIQUE_IP_GOT_TO_BP",
  "CLICKED_ON_BP",
  "UNIQUE_IP_CLICKED_ON_BP",
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
  console.log("calc aggregations");

  const aggregatedMetrics = calcSums(rows, metrics);

  return {
    CMP: "Totals",
    aggregationRow: true,
    ...aggregatedMetrics,
    epc: aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"]
      ? aggregatedMetrics["revUsd"] /
        aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"]
      : 0,
    "LP CTR": aggregatedMetrics["GOT_TO_WP"]
      ? (aggregatedMetrics["CLICKED_ON_BP"] / aggregatedMetrics["GOT_TO_WP"]) *
        100
      : 0,
    CONV_TO_LPCLICK: aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"]
      ? (aggregatedMetrics["CONV"] /
          aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"]) *
        100
      : 0,
    FTD_TO_LPCLICK: aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"]
      ? (aggregatedMetrics["FTD"] /
          aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"]) *
        100
      : 0,
    FTD_TO_CONV: aggregatedMetrics["CONV"]
      ? (aggregatedMetrics["FTD"] / aggregatedMetrics["CONV"]) * 100
      : 0,
  };
}
