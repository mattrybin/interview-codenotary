"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "../../components/ui/chart"
import { TransactionType } from "../../types/transaction"

export const description = "An interactive bar chart"

const chartConfig = {
  receiving: {
    label: "Receiving",
    color: "hsl(var(--chart-1))"
  },
  sending: {
    label: "Sending",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig

export function ExampleChart({ transactions }: { transactions: TransactionType[] }) {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("receiving")

  const filteredData = React.useMemo(() => {
    return transactions.filter((t) => t.transactionType === activeChart)
  }, [activeChart, transactions])

  const total = React.useMemo(
    () => ({
      receiving: transactions
        .filter((t) => t.transactionType === "receiving")
        .reduce((acc, curr) => acc + curr.amount, 0),
      sending: transactions
        .filter((t) => t.transactionType === "sending")
        .reduce((acc, curr) => acc + curr.amount, 0)
    }),
    [transactions]
  )

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>from {transactions.length} transactions</CardDescription>
        </div>
        <div className="flex">
          {["receiving", "sending"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="amount"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })
                  }}
                />
              }
            />
            <Bar
              dataKey="amount"
              fill={chartConfig[activeChart].color}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
