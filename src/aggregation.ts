type CommonMetricsAggregation = {
  CMP: "Totals";
  aggregationRow: true;
  [key: string]: any;
};

type Inputs = {
  lpcuCost: number;
};

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
export const REVENUES = ["USD_REV", "EUR_REV"];
export const SKIP_REASONS = [
  "QUERY_RULES_SKIP",
  "IP_BLOCKED",
  "FIRST_IMPRESSIONS_SKIP",
  "NO_ENDPOINT_TO_DELIVER",
];

export function aggregateMetrics(
  rows: any[],
  metrics: string[] = COMMON_METRICS /*options: AggregateCommonMetricsOptions = defaultAggregateCommonMetricsOptions*/,
  inputs: Inputs = { lpcuCost: 0 }
): CommonMetricsAggregation {
  console.log("calc aggregations");

  const aggregatedMetrics = calcSums(rows, metrics);
  let clickCost = 0;
  let profit = 0;
  let epc = aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"]
    ? aggregatedMetrics["USD_REV"] /
      aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"]
    : 0;

  if (inputs.lpcuCost) {
    clickCost = inputs.lpcuCost * aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"];
    profit = aggregatedMetrics["USD_REV"] - clickCost;
    epc = epc && profit / aggregatedMetrics["UNIQUE_IP_CLICKED_ON_BP"];
  }

  return {
    CMP: "Totals",
    aggregationRow: true,
    ...aggregatedMetrics,
    epc,
    clickCost,
    profit,
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
