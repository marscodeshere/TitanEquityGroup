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

  // **Top 3 Watch Stocks (Just for viewing)**
  const watchStocks = [
    { symbol: "GOOGL", lastPrice: "$2,785.15", change: "+1.75%" },
    { symbol: "AMZN", lastPrice: "$3,290.05", change: "-0.58%" },
    { symbol: "MSFT", lastPrice: "$305.22", change: "+0.91%" }
  ];

  // **Purchased Stocks (Your Portfolio)**
  const purchasedStocks = [
    { symbol: "AAPL", quantity: 10, price: "$175.32" },
    { symbol: "TSLA", quantity: 5, price: "$720.12" },
    { symbol: "NVDA", quantity: 8, price: "$498.80" }
  ];

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
                display: true,  // This should be here
                labels: {
        color: "#000000", // Set the legend label color to black
        font: {
          weight: "bold",
          size: 14
        }
      }
    },
    tooltip: { enabled: true }
  },
    scales: {
      x: {
        display: true,
        ticks:{ 
        color: "#000000",font: { weight: "bold", size: 14 } },
        grid: { color: "rgba(0,0,0,0,0)" } 
      },
      y: {
        display: true,
        ticks:{ 
        color: "#000000", font: { weight: "bold", size: 14 } },
        grid: { color: "rgba(0,0,0.3)" }
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
      <Card className="m-3 p-3 bg-secondary text-light" style={{ width: "30%" }}>
        <h5 className="text-center">Portfolio Value Over Time</h5>
        <Line data={data} options={options} />
      </Card>

      {/* Buttons for Navigation */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button>Buy/Sell</Button>
        <Button>Cancel Order</Button>
        <Button>Transactions</Button>
        <Button>Deposit/Withdraw</Button>
      </div>

      {/* Top 3 Watch Stocks */}
      <Card className="m-3 p-3 bg-secondary text-light" style={{ width: "50%" }}>
        <h5 className="text-center">Top 3 Watch Stocks</h5>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Last Price</th>
              <th>% Change</th>
            </tr>
          </thead>
          <tbody>
            {watchStocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.lastPrice}</td>
                <td style={{ color: stock.change.includes("-") ? "red" : "green" }}>{stock.change}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Purchased Stocks */}
      <Card className="m-3 p-3 bg-secondary text-light" style={{ width: "50%" }}>
        <h5 className="text-center">Your Purchased Stocks</h5>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Purchase Price</th>
            </tr>
          </thead>
          <tbody>
            {purchasedStocks.map((stock, index) => (
              <tr key={index}>
                <td>{stock.symbol}</td>
                <td>{stock.quantity}</td>
                <td>{stock.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
