import React, { useEffect, useState } from "react";

const BorrowList = () => {
  const [borrowList, setBorrowList] = useState([]);

  useEffect(() => {
    const storedBorrowList = JSON.parse(localStorage.getItem("borrowList")) || [];
    setBorrowList(storedBorrowList);
  }, []);

  const handleRemove = (indexToRemove) => {
    const updatedList = borrowList.filter((_, index) => index !== indexToRemove);
    setBorrowList(updatedList);
    localStorage.setItem("borrowList", JSON.stringify(updatedList));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Borrowed Requests</h2>
      {borrowList.length === 0 ? (
        <p style={styles.emptyMessage}>No items borrowed yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableRow}>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Department</th>
              <th style={styles.tableHeader}>Category</th>
              <th style={styles.tableHeader}>Manage</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {borrowList.map((item, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableData}>{item.id}</td>
                <td style={styles.tableData}>{item.name}</td>
                <td style={styles.tableData}>{item.department}</td>
                <td style={styles.tableData}>{item.category}</td>
                <td style={styles.tableData}>
                  <button
                    style={styles.removeButton}
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "250px",
    padding: "80px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  heading: {
    textAlign: "center",
    color: "#4a148c",
    fontSize: "24px",
    marginBottom: "20px"
  },
  table: {
    width: "100%",
    margin: "20px 0",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
  },
  tableHeader: {
    backgroundColor: "#4a148c",
    color: "#fff",
    padding: "12px",
    fontSize: "16px",
    textAlign: "left"
  },
  tableRow: {
    borderBottom: "1px solid #ddd"
  },
  tableData: {
    padding: "12px",
    fontSize: "14px",
    textAlign: "left",
    color: "#333"
  },
  emptyMessage: {
    textAlign: "center",
    color: "#999",
    fontSize: "18px"
  },
  removeButton: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default BorrowList;
