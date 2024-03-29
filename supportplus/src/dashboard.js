// Dashboard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'; 

const Dashboard = () => {
  // State variables to store ticket data and feedback data
  const [tickets, setTickets] = useState([]);
  const [feedback, setFeedback] = useState([]);

  // Function to fetch ticket data from the backend
  const fetchTickets = async () => {
    try {
      // Make API call to fetch ticket data from the server
      const response = await fetch('/api/tickets');
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    }
  };

  // Function to fetch feedback data from the backend
  const fetchFeedback = async () => {
    try {
      // Make API call to fetch feedback data from the server
      const response = await fetch('/api/feedback');
      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error('Error fetching feedback data:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchFeedback();
  }, []); // Empty dependency array ensures this effect runs only once the component mounts

  return (
    <div className="dashboard-container">
      <div className="nav-menu">
        <ul>
          <li><a href="./openTickets">Tickets</a></li>
          <li><a href="./feedback">Feedback</a></li>
          <li><a href="./closedTickets">Closed</a></li>
          <li><a href="./admin">Admin</a></li>
        </ul>
        <Link to="/createNewTicket" className="new-ticket-button">New Ticket</Link>
      </div>
      <div className="open-tickets-container">
        <h2>Open Tickets</h2>
        <div className="ticket-list">
          {/* Display ticket data */}
          {tickets.map(ticket => (
            <div key={ticket.id} className="ticket">
              {/* Display ticket details */}
              <p>Ticket ID: {ticket.id}</p>
              <p>Raised By: {ticket.raisedBy}</p>
              <p>Description: {ticket.description}</p>
              <p>Priority: {ticket.priority}</p>
              <p>Area: {ticket.area}</p>
              <p>Allocated to: {ticket.allocatedTo}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="feedback-container">
        <h2>Recent Feedback</h2>
        <div className="feedback-list">
          {/* Display feedback data */}
          {feedback.map(item => (
            <div key={item.id} className="feedback">
              {/* Display feedback details */}
              <p>Ticket ID: {item.ticketId}</p>
              <p>Raised By: {item.raisedBy}</p>
              <p>Description: {item.description}</p>
              <p>Feedback: {item.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
