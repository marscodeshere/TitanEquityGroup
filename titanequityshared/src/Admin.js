import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    ticker: "",
    companyName: "",
    price: "",
    volume: "",
  });
  const [editingStockId, setEditingStockId] = useState(null);
  const [editedStock, setEditedStock] = useState({});

  const [marketHours, setMarketHours] = useState({ open: "09:30", close: "16:00" });
  const [editingHours, setEditingHours] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(true);

  const [logs, setLogs] = useState([]);
  const [logSearch, setLogSearch] = useState("");

  const apiBase = "http://localhost:3001";

  const editingEnabled = true; // Set to false to disable stock editing

  const logAdminAction = async (action, details = "") => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      user: adminEmail,
      details,
    };
    try {
      await fetch(`${apiBase}/adminLogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logEntry),
      });
    } catch (error) {
      console.error("Failed to log admin action:", error);
    }
  };

  const fetchStocks = async () => {
    try {
      const res = await fetch(`${apiBase}/stocks`);
      const data = await res.json();
      setStocks(data);
    } catch (error) {
      console.error("Failed to fetch stocks:", error);
    }
  };

  const fetchMarketHours = async () => {
    try {
      const res = await fetch(`${apiBase}/marketHours`);
      const data = await res.json();
      setMarketHours(data);
    } catch (error) {
      console.error("Failed to fetch market hours:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${apiBase}/adminLogs`);
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStocks();
      fetchMarketHours();
      fetchLogs();
      logAdminAction("Logged in");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const now = new Date();
    const currentTime = now.getHours() + now.getMinutes() / 60;
    const [openH, openM] = marketHours.open.split(":").map(Number);
    const [closeH, closeM] = marketHours.close.split(":").map(Number);
    const openTime = openH + openM / 60;
    const closeTime = closeH + closeM / 60;
    setIsMarketOpen(currentTime >= openTime && currentTime <= closeTime);
  }, [marketHours]);

  const handleLogin = (e) => {
    e.preventDefault();
    const allowedAdmins = ["caleb@titan.com", "marley@titan.com", "ryan@titan.com"];
    if (allowedAdmins.includes(adminEmail) && adminPassword === "admin123") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Access denied. Invalid admin credentials.");
    }
  };

  const handleLogout = () => {
    logAdminAction("Logged out");
    setIsAuthenticated(false);
    setAdminEmail("");
    setAdminPassword("");
  };

  const handleAddStock = async () => {
    const stock = {
      ...newStock,
      price: parseFloat(newStock.price),
      volume: parseInt(newStock.volume),
    };
    try {
      await fetch(`${apiBase}/stocks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stock),
      });
      fetchStocks();
      setNewStock({ ticker: "", companyName: "", price: "", volume: "" });
      logAdminAction(`Added stock ${stock.ticker}`);
    } catch (error) {
      console.error("Failed to add stock:", error);
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      const stock = stocks.find((s) => s.id === id);
      await fetch(`${apiBase}/stocks/${id}`, { method: "DELETE" });
      fetchStocks();
      logAdminAction(`Deleted stock ${stock?.ticker}`);
    } catch (error) {
      console.error("Failed to delete stock:", error);
    }
  };

  const handleEditStock = (id) => {
    const stock = stocks.find((s) => s.id === id);
    setEditingStockId(id);
    setEditedStock(stock);
  };

  const handleSaveEdit = async () => {
    try {
      const original = stocks.find((s) => s.id === editingStockId);
      const updated = {
        ...editedStock,
        price: parseFloat(editedStock.price),
        volume: parseInt(editedStock.volume),
      };

      await fetch(`${apiBase}/stocks/${editingStockId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      const changes = [];
      ["ticker", "companyName", "price", "volume"].forEach((key) => {
        if (original[key] !== updated[key]) {
          changes.push(`${key}: \"${original[key]}\" ➜ \"${updated[key]}\"`);
        }
      });

      const changeDetails = changes.join("; ");
      logAdminAction(`Edited stock ${updated.ticker}`, changeDetails);

      setEditingStockId(null);
      setEditedStock({});
      fetchStocks();
    } catch (error) {
      console.error("Failed to save edited stock:", error);
    }
  };

  const handleSaveMarketHours = async () => {
    try {
      await fetch(`${apiBase}/marketHours`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(marketHours),
      });
      setEditingHours(false);
      logAdminAction("Updated market hours");
    } catch (error) {
      console.error("Failed to update market hours:", error);
    }
  };

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(logSearch.toLowerCase()) ||
    log.user.toLowerCase().includes(logSearch.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow-sm p-4" style={{ width: "350px" }}>
          <div className="text-center mb-3">
            <img src="/logo3.png" alt="Titan Equity Group Admin" className="img-fluid" style={{ maxWidth: "180px" }} />
          </div>
          {authError && <Alert variant="danger">{authError}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Admin Email</Form.Label>
              <Form.Control type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
            </Form.Group>
            <Button type="submit" className="btn btn-primary w-100">Admin Login</Button>
          </Form>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛠️ Admin Dashboard</h2>
        <div>
          <span className="me-3">Welcome, {adminEmail}</span>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <Card className="mb-5">
        <Card.Header><h4>📈 Stock Management</h4></Card.Header>
        <Card.Body>
          <Form className="mb-4">
            <Row>
              <Col md={2}><Form.Control placeholder="Ticker" value={newStock.ticker} onChange={(e) => setNewStock({ ...newStock, ticker: e.target.value })} /></Col>
              <Col md={3}><Form.Control placeholder="Company" value={newStock.companyName} onChange={(e) => setNewStock({ ...newStock, companyName: e.target.value })} /></Col>
              <Col md={2}><Form.Control type="number" placeholder="Price" value={newStock.price} onChange={(e) => setNewStock({ ...newStock, price: e.target.value })} /></Col>
              <Col md={2}><Form.Control type="number" placeholder="Volume" value={newStock.volume} onChange={(e) => setNewStock({ ...newStock, volume: e.target.value })} /></Col>
              <Col md={3}><Button className="w-100" onClick={handleAddStock} disabled={!isMarketOpen || !editingEnabled}>Add Stock</Button></Col>
            </Row>
          </Form>
          <Table striped bordered hover responsive>
            <thead><tr><th>Ticker</th><th>Company</th><th>Price</th><th>Volume</th><th>Actions</th></tr></thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id}>
                  {editingStockId === stock.id ? (
                    <>
                      <td><Form.Control value={editedStock.ticker} onChange={(e) => setEditedStock({ ...editedStock, ticker: e.target.value })} /></td>
                      <td><Form.Control value={editedStock.companyName} onChange={(e) => setEditedStock({ ...editedStock, companyName: e.target.value })} /></td>
                      <td><Form.Control type="number" value={editedStock.price} onChange={(e) => setEditedStock({ ...editedStock, price: e.target.value })} /></td>
                      <td><Form.Control type="number" value={editedStock.volume} onChange={(e) => setEditedStock({ ...editedStock, volume: e.target.value })} /></td>
                      <td><Button size="sm" variant="success" onClick={handleSaveEdit}>Save</Button></td>
                    </>
                  ) : (
                    <>
                      <td>{stock.ticker}</td>
                      <td>{stock.companyName}</td>
                      <td>${stock.price.toFixed(2)}</td>
                      <td>{stock.volume.toLocaleString()}</td>
                      <td>
                        <Button 
                          size="sm" 
                          variant="outline-primary" 
                          onClick={() => editingEnabled && handleEditStock(stock.id)} 
                          className="me-2" 
                          disabled={!isMarketOpen || !editingEnabled}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline-danger" 
                          onClick={() => editingEnabled && handleDeleteStock(stock.id)} 
                          disabled={!isMarketOpen || !editingEnabled}
                        >
                          Delete
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="mb-5">
        <Card.Header><h4>🕒 Market Hours</h4></Card.Header>
        <Card.Body>
          {editingHours ? (
            <Row className="align-items-end">
              <Col md={4}><Form.Group><Form.Label>Open Time</Form.Label><Form.Control type="time" value={marketHours.open} onChange={(e) => setMarketHours({ ...marketHours, open: e.target.value })} /></Form.Group></Col>
              <Col md={4}><Form.Group><Form.Label>Close Time</Form.Label><Form.Control type="time" value={marketHours.close} onChange={(e) => setMarketHours({ ...marketHours, close: e.target.value })} /></Form.Group></Col>
              <Col md={4}><Button className="w-100" onClick={handleSaveMarketHours}>Save Hours</Button></Col>
            </Row>
          ) : (
            <Row className="align-items-center">
              <Col md={8}><p className="fs-5">Market is open from <strong>{marketHours.open}</strong> to <strong>{marketHours.close}</strong>{!isMarketOpen && <span className="text-danger ms-3">Market is currently closed</span>}</p></Col>
              <Col md={4}><Button className="w-100" onClick={() => setEditingHours(true)}>Edit Hours</Button></Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-5">
        <Card.Header><h4>📜 Admin Activity Logs</h4></Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search logs by user or action..."
              value={logSearch}
              onChange={(e) => setLogSearch(e.target.value)}
            />
          </Form.Group>
          <Table striped bordered hover responsive>
            <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Details</th></tr></thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.user}</td>
                  <td>{log.action}</td>
                  <td>{log.details || "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
