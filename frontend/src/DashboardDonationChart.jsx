import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function DashboardDonationChart({ dataByCurrency, totalsByCurrency, isMonthly }) {
    const currencies = ["INR", "USD"];
    const availableCurrencies = currencies.filter(
        (currency) => dataByCurrency[currency]?.length
    );

    const [selectedCurrency, setSelectedCurrency] = useState(
        availableCurrencies[0] || "INR"
    );

    const formatAmount = (value, currency) => {
        const symbol = currency === "USD" ? "$" : "₹";
        const locale = currency === "USD" ? "en-US" : "en-IN";

        return `${symbol}${Number(value || 0).toLocaleString(locale)}`;
    };

    const chartData = dataByCurrency[selectedCurrency] || [];
    const total = totalsByCurrency[selectedCurrency] || 0;
    const hasData = chartData.length > 0;

    return (
        <div className="dashboard-donation-chart">

            {/* Chart header */}
            <div className="dashboard-chart-summary">
                <div>
                    <span>
                        {isMonthly
                            ? "Monthly donation totals"
                            : "Recorded donations"}
                    </span>

                    <div className="dashboard-chart-currency-selector">
                        <label htmlFor="dashboard-currency">
                            Currency
                        </label>

                        <select
                            id="dashboard-currency"
                            value={selectedCurrency}
                            onChange={(event) =>
                                setSelectedCurrency(event.target.value)
                            }
                        >
                            <option value="INR">Indian Rupee (₹)</option>
                            <option value="USD">US Dollar ($)</option>
                        </select>
                    </div>
                </div>

                <strong>
                    {selectedCurrency}:{" "}
                    {formatAmount(total, selectedCurrency)}
                </strong>
            </div>

            {/* Chart */}
            {hasData ? (
                <div className="dashboard-chart-currency">
                    <div className="dashboard-chart-currency-label">
                        {selectedCurrency === "INR"
                            ? "Indian Rupee (₹)"
                            : "US Dollar ($)"}
                    </div>

                    <div className="dashboard-chart-plot">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{
                                    top: 8,
                                    right: 10,
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <CartesianGrid
                                    stroke="#e7ede9"
                                    strokeDasharray="3 3"
                                    vertical={false}
                                />

                                <XAxis
                                    dataKey="label"
                                    axisLine={{ stroke: "#d7e0db" }}
                                    tickLine={false}
                                    tick={{
                                        fill: "#65736e",
                                        fontSize: 10,
                                    }}
                                    tickMargin={8}
                                    minTickGap={8}
                                />

                                <YAxis
                                    width={76}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "#65736e",
                                        fontSize: 10,
                                    }}
                                    tickFormatter={(value) =>
                                        formatAmount(
                                            value,
                                            selectedCurrency
                                        )
                                    }
                                />

                                <Tooltip
                                    cursor={{
                                        fill: "rgba(8, 126, 116, 0.06)",
                                    }}
                                    formatter={(value) => [
                                        formatAmount(
                                            value,
                                            selectedCurrency
                                        ),
                                        "Donation amount",
                                    ]}
                                    contentStyle={{
                                        border: "1px solid #e1e8e4",
                                        borderRadius: 7,
                                        boxShadow:
                                            "0 5px 18px rgba(20, 39, 32, 0.08)",
                                        fontSize: 12,
                                    }}
                                />

                                <Bar
                                    dataKey="amount"
                                    name="Donation amount"
                                    fill={
                                        selectedCurrency === "USD"
                                            ? "#3d6f8c"
                                            : "#087e74"
                                    }
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={38}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ) : (
                <div className="dashboard-chart-empty">
                    <strong>
                        No donations recorded in{" "}
                        {selectedCurrency === "INR"
                            ? "Indian Rupee (₹)"
                            : "US Dollar ($)"}
                    </strong>

                    <p>
                        Select another currency to view its donation activity.
                    </p>
                </div>
            )}

            {!isMonthly && hasData && (
                <p className="dashboard-chart-note">
                    Showing actual dated transactions; monthly comparisons need
                    records from multiple months.
                </p>
            )}
        </div>
    );
}

export default DashboardDonationChart;