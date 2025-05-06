import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StocksPage = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [stockData, setStockData] = useState({ books: [], equipment: [], materials: [] });
  const [showDescription, setShowDescription] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/stocks`);
      console.log("Fetched stock data:", response.data);

      const categorized = { books: [], equipment: [], materials: [] };
      response.data.forEach((item) => {
        if (!item.category) return;
        const cat = item.category.toLowerCase();
        if (categorized[cat]) {
          categorized[cat].push(item);
        }
      });

      setStockData(categorized);
    } catch (err) {
      console.error('Failed to fetch stock:', err);
    }
  };

  const handleRequest = async (item) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/stocks/request`, {
        userId,
        stockId: item._id,
      });
      alert(`Request for "${item.title}" sent to admin.`);
    } catch (err) {
      alert('Failed to send request');
    }
  };

  const handleDescription = (item) => {
    setSelectedItem(item);
    setShowDescription(true);
  };

  const handleGoBack = () => {
    setShowDescription(false);
    setSelectedItem(null);
  };

  const renderTable = (items) => (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={idx}>
            <td>{item.title}</td>
            <td>{item.quantity ?? 'N/A'}</td>
            <td>{parseInt(item.quantity) > 0 ? 'Available' : 'Out of Stock'}</td>
            <td className="action-btns">
              <button className="request" onClick={() => handleRequest(item)}>Request</button>
              <button className="description" onClick={() => handleDescription(item)}>Description</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (showDescription && selectedItem) {
    return (
      <div className="description-container">
        <h2>Item Description</h2>
        <br />
        <p>{selectedItem.description || 'No description available.'}</p>
        <button className="back-button" onClick={handleGoBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="stocks-container" id="stocksPage">
      <h2>Stocks Management</h2>
      <div className="tabs">
        {['books', 'equipment', 'materials'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'active-tab' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content active">
        {renderTable(stockData[activeTab])}
      </div>
    </div>
  );
};

export default StocksPage;
