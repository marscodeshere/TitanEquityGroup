import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const marketData = [
  { time: "9AM", value: 4500 },
  { time: "10AM", value: 4550 },
  { time: "11AM", value: 4525 },
  { time: "12PM", value: 4600 },
  { time: "1PM", value: 4625 },
  { time: "2PM", value: 4590 },
];

const stockTickerData = [
  { symbol: "AAPL", price: 150.25, change: "+1.5%" },
  { symbol: "GOOGL", price: 2803.55, change: "-0.8%" },
  { symbol: "TSLA", price: 720.22, change: "+2.1%" },
  { symbol: "AMZN", price: 3500.99, change: "-1.2%" },
  { symbol: "MSFT", price: 305.15, change: "+0.6%" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      {/* Stock Ticker */}
      <div className="w-full bg-gray-900 text-white overflow-hidden whitespace-nowrap py-2">
        <div className="inline-block animate-marquee">
          {stockTickerData.map((stock, index) => (
            <span key={index} className="mx-4">
              {stock.symbol}: ${stock.price} <span className={stock.change.includes("-") ? "text-red-500" : "text-green-500"}>({stock.change})</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Smarter Trading, Simplified.</h1>
        <p className="text-gray-600 mb-4">Minimalistic, fast, and powerful stock trading.</p>
        <Button className="px-6 py-2 text-lg">Get Started</Button>
      </div>

      {/* Market Overview */}
      <Card className="w-full max-w-3xl p-4 mb-8">
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Market Snapshot</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={marketData}>
              <XAxis dataKey="time" stroke="#888" />
              <YAxis domain={[4400, 4700]} stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Features Section */}
      <div className="grid grid-cols-1 md-grid-cols-3 gap-4 max-w-4xl">
        {[
          { title: "Real-Time Trading", desc: "Instant market access." },
          { title: "Portfolio Tracking", desc: "Manage your investments." },
          { title: "Market Insights", desc: "AI-driven analytics." },
        ].map((feature, index) => (
          <Card key={index} className="p-4 text-center">
            <CardContent>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-8 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Titan Equity Group. All rights reserved.</p>
      </footer>
    </div>
  );
}
