import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title);

export default function Portfolio() {
  const userName = "John Doe";
  const totalPortfolioValue = "$125,782.35";

  // Mock historical portfolio data (e.g., last 7 days)
  const portfolioHistory = [120000, 121500, 123000, 124200, 125000, 126500, 125782];

  // Generate mock dates for X-axis
  const labels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString();
  });

  // Top 3 Watch Stocks
  const watchStocks = [
    { symbol: "GOOGL", lastPrice: "$2,785.15", change: "+1.75%" },
    { symbol: "AMZN", lastPrice: "$3,290.05", change: "-0.58%" },
    { symbol: "MSFT", lastPrice: "$305.22", change: "+0.91%" }
  ];

  // Purchased Stocks
  const purchasedStocks = [
    { symbol: "AAPL", quantity: 10, price: "$175.32" },
    { symbol: "TSLA", quantity: 5, price: "$720.12" },
    { symbol: "NVDA", quantity: 8, price: "$498.80" }
  ];

  // Graph Data
  const data = {
    labels,
    datasets: [
      {
        label: "Portfolio Value ($)",
        data: portfolioHistory,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
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
            weight: "bold",
            size: 14
          }
        }
      },
      tooltip: { enabled: true },
      title: {
        display: true,
        text: "7-Day Portfolio Trend",
        color: "#000000",
        font: {
          size: 18,
          weight: "bold"
        }
      }
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: "#000000",
          font: { weight: "bold", size: 14 }
        },
        grid: { color: "rgba(0,0,0,0)" }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Portfolio Value ($)",
          color: "#000000",
          font: { weight: "bold", size: 16 }
        },
        ticks: {
          color: "#000000",
          font: { weight: "bold", size: 14 }
        },
        grid: { color: "rgba(0,0,0,0.3)" }
      }
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      {/* Portfolio Card */}
      <Card className="m-3 p-3 bg-dark text-light w-100" style={{ maxWidth: "400px" }}>
        <div className="text-center">
          <h2 className="fw-bold">{userName}'s Portfolio</h2>
          <h4>
            Total Value: <span className="text-success">{totalPortfolioValue}</span>
          </h4>
        </div>
      </Card>

      {/* Portfolio Graph */}
      <Card className="m-3 p-3 bg-secondary text-light w-100" style={{ maxWidth: "700px" }}>
        <h5 className="text-center">Portfolio Value Over Time</h5>
        <Line data={data} options={options} />
      </Card>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
        <Button variant="success">Buy/Sell</Button>
        <Button variant="danger">Cancel Order</Button>
        <Button variant="info">Transactions</Button>
        <Button variant="warning">Deposit/Withdraw</Button>
      </div>

      {/* Watch Stocks */}
      <Card className="m-3 p-3 bg-secondary text-light w-100" style={{ maxWidth: "800px" }}>
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
                <td style={{ color: stock.change.includes("-") ? "red" : "limegreen" }}>{stock.change}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Purchased Stocks */}
      <Card className="m-3 p-3 bg-secondary text-light w-100" style={{ maxWidth: "800px" }}>
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
    </Container>
  );
}
