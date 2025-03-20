import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function Portfolio() {
  const userName = "John Doe";
  const totalPortfolioValue = "$125,782.35";

  // Mock historical portfolio data (e.g., last 7 days)
  const portfolioHistory = [120000, 121500, 123000, 124200, 125000, 126500, 125782];

  // Graph Data
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Today"], // X-axis labels
    datasets: [
      {
        label: "Portfolio Value ($)",
        data: portfolioHistory,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4, // Smooth curve
        pointRadius: 5,
        pointBackgroundColor: "rgba(75,192,192,1)"
      }
    ]
  };

// Graph Options
const options = {
  responsive: true,
  plugins: {
    legend: { 
      display: true,
      labels: {
        color: "#000000", 
        font: {
          weight: "bold"
        }
      }
    },
    tooltip: { enabled: true }
  },
  scales: {
    x: {
      display: true,
      ticks: {
        color: "#000000",
        font: {
          weight: "bold",
          size: 14
        }
      },
      grid: {
        color: "rgba(0,0,0,0.3)" 
      }
    },
    y: {
      display: true,
      ticks: {
        color: "#000000", 
        font: {
          weight: "bold",
          size: 14 
        }
      },
      grid: {
        color: "rgba(0,0,0.3)" 
      }
    }
  }
};



  return (
    <div className="d-flex flex-column align-items-center">
      {/* Portfolio Card */}
      <Card className="m-3 p-3 bg-dark text-light" style={{ width: "25%" }}>
        <div className="text-center">
          <h2 className="font-bold">{userName}'s Portfolio</h2>
          <h4>Total Value: <span className="text-success">{totalPortfolioValue}</span></h4>
        </div>
      </Card>

      {/* Portfolio Value Graph */}
      <Card className="m-3 p-3 bg-secondary text-light d-flex justify-content-center" style={{ width: "30%" }}>
        <h5 className="text-center">Portfolio Value Over Time</h5>
        <div style={{ width: "100%", height: "300px" }}>
          <Line data={data} options={options} />
        </div>
      </Card>

      {/* Buttons for Navigation */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button className="px-6 py-2 text-lg my-4">Buy/Sell</Button>
        <Button className="px-6 py-2 text-lg my-4">Cancel Order</Button>
        <Button className="px-6 py-2 text-lg my-4">Transactions</Button>
        <Button className="px-6 py-2 text-lg my-4">Deposit/Withdraw</Button>
      </div>

      {/* Stock and Market Data */}
      <div className="d-flex justify-content-center flex-wrap gap-3 mt-4 w-100">
        {/* Market Indices */}
        <Card className="m-2 p-3 bg-secondary text-light" style={{ width: "30%" }}>
          <h5>Market Indices</h5>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr><th>Index</th><th>Value</th><th>% Change</th><th>Day Change</th></tr>
            </thead>
            <tbody>
              {[
                { name: "S&P 500", value: "4,500.32", change: "+1.23%", dayChange: "+55.60" },
                { name: "NASDAQ", value: "14,120.67", change: "-0.98%", dayChange: "-140.50" },
                { name: "Dow Jones", value: "35,200.12", change: "+0.45%", dayChange: "+180.22" }
              ].map((index) => (
                <tr key={index.name}>
                  <td>{index.name}</td>
                  <td>{index.value}</td>
                  <td style={{ color: index.change.includes("-") ? "red" : "green" }}>{index.change}</td>
                  <td>{index.dayChange}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        {/* Market Movers */}
        <Card className="m-2 p-3 bg-secondary text-light" style={{ width: "30%" }}>
          <h5>Market Movers</h5>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr><th>Symbol</th><th>Last</th><th>% Change</th><th>Volume</th></tr>
            </thead>
            <tbody>
              {[
                { symbol: "AAPL", last: "$175.32", change: "+3.45%", volume: "78M" },
                { symbol: "TSLA", last: "$720.12", change: "-5.20%", volume: "105M" },
                { symbol: "NVDA", last: "$498.80", change: "+2.12%", volume: "92M" }
              ].map((mover) => (
                <tr key={mover.symbol}>
                  <td>{mover.symbol}</td>
                  <td>{mover.last}</td>
                  <td style={{ color: mover.change.includes("-") ? "red" : "green" }}>{mover.change}</td>
                  <td>{mover.volume}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        {/* Trending Stocks */}
        <Card className="m-2 p-3 bg-secondary text-light" style={{ width: "30%" }}>
          <h5 className="text-center">Trending Stocks</h5>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Last Price</th>
                <th>Mentions</th>
              </tr>
            </thead>
            <tbody>
              {[ 
                { symbol: "AMC", last: "$14.50", mentions: "45K" },
                { symbol: "GME", last: "$22.80", mentions: "55K" },
                { symbol: "TSLA", last: "$720.12", mentions: "60K" }
              ].map((stock) => (
                <tr key={stock.symbol}>
                  <td>{stock.symbol}</td>
                  <td>{stock.last}</td>
                  <td>{stock.mentions}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
