import React, { useState } from "react";

const PendingList = () => {
  const [pendingRequests, setPendingRequests] = useState([
    { id: "1", name: "John Doe", department: "Computer Science", category: "Books" },
    { id: "2", name: "Jane Smith", department: "Mathematics", category: "Laptop" },
    { id: "3", name: "Alice Johnson", department: "Physics", category: "Books" },
    { id: "4", name: "Bob Brown", department: "Biology", category: "Laptop" },
    { id: "5", name: "Charlie Black", department: "Chemistry", category: "Projector" },
    { id: "6", name: "Emily White", department: "English", category: "Tablet" },
    { id: "7", name: "David Green", department: "History", category: "Camera" },
    { id: "8", name: "Grace Miller", department: "Art", category: "Drawing Kit" },
    { id: "9", name: "Ethan Gray", department: "Economics", category: "Microphone" },
    { id: "10", name: "Hannah Blue", department: "Philosophy", category: "Whiteboard" }
  ]);

  const handleApprove = (id) => {
    const approvedItem = pendingRequests.find((req) => req.id === id);
    const updatedPending = pendingRequests.filter((req) => req.id !== id);
    setPendingRequests(updatedPending);

    const currentBorrowed = JSON.parse(localStorage.getItem("borrowList")) || [];
    localStorage.setItem("borrowList", JSON.stringify([...currentBorrowed, approvedItem]));
  };

  const handleReject = (id) => {
    const updatedPending = pendingRequests.filter((req) => req.id !== id);
    setPendingRequests(updatedPending);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Pending Requests</h2>
      {pendingRequests.length === 0 ? (
        <p style={styles.emptyMessage}>No pending requests.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableRow}>
              <th style={styles.tableHeader}>ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Department</th>
              <th style={styles.tableHeader}>Category</th>
              <th style={styles.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((req) => (
              <tr key={req.id} style={styles.tableRow}>
                <td style={styles.tableData}>{req.id}</td>
                <td style={styles.tableData}>{req.name}</td>
                <td style={styles.tableData}>{req.department}</td>
                <td style={styles.tableData}>{req.category}</td>
                <td style={styles.tableData}>
                  <button
                    style={styles.approveButton}
                    onClick={() => handleApprove(req.id)}
                  >
                    Approve
                  </button>
                  <button
                    style={styles.rejectButton}
                    onClick={() => handleReject(req.id)}
                  >
                    Reject
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
    padding: "60px 80px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "1200px",
    margin: "50px auto"
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
  approveButton: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: "6px 12px",
    marginRight: "8px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  rejectButton: {
    backgroundColor: "#e53935",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default PendingList;
