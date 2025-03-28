import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DashboardsPage.css';

const dashboardsData = [
  {
    title: 'NPE RFC Dashboard',
    description: 'Track and monitor RFC requests and their statuses in real-time. Get detailed insights into request flows, approvals, and current status of all RFCs across the platform.',
    labels: ['RFC', 'Monitoring', 'NPE'],
    link: '#',
    lastUpdated: '2024-03-20',
    status: 'Active',
    icon: 'fas fa-clipboard-check'
  },
  {
    title: 'NPE Executive Incident Dashboard',
    description: 'High-level view of incidents and their impact on business operations. Monitor critical metrics, response times, and resolution status with executive-focused KPIs.',
    labels: ['Incidents', 'Executive', 'NPE'],
    link: '#',
    lastUpdated: '2024-03-19',
    status: 'Active',
    icon: 'fas fa-chart-pie'
  },
  {
    title: 'NPE Sanity Dashboard',
    description: 'Comprehensive system health monitoring and sanity test results. Track test coverage, success rates, and identify potential issues before they impact production.',
    labels: ['Sanity', 'Testing', 'NPE'],
    link: '#',
    lastUpdated: '2024-03-20',
    status: 'Maintenance',
    icon: 'fas fa-vial'
  },
  {
    title: 'TDR Dashboard',
    description: 'Advanced analytics for Test Data Reservation system. Monitor data usage patterns, reservation conflicts, and resource utilization across all testing environments.',
    labels: ['TDR', 'Analytics', 'Data'],
    link: '#',
    lastUpdated: '2024-03-18',
    status: 'Active',
    icon: 'fas fa-database'
  }
];

const DashboardsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [labelFilter, setLabelFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredDashboards = dashboardsData.filter(dashboard => {
    const matchesSearch = dashboard.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLabel = labelFilter === '' || dashboard.labels.some(label => 
      label.toLowerCase().includes(labelFilter.toLowerCase())
    );
    const matchesStatus = statusFilter === '' || dashboard.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesLabel && matchesStatus;
  });

  return (
    <div className="dashboards-page">
      <div className="page-header">
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
        <div className="header-content">
          <h1>Platform Dashboards</h1>
          <p className="header-description">Access and monitor all NPE platform metrics and analytics in one place</p>
        </div>
      </div>

      <div className="search-container">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search dashboards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="search-box">
          <i className="fas fa-tag"></i>
          <input
            type="text"
            placeholder="Filter by label..."
            value={labelFilter}
            onChange={(e) => setLabelFilter(e.target.value)}
          />
        </div>
        <select 
          className="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      <div className="dashboards-grid">
        {filteredDashboards.map((dashboard, index) => (
          <a href={dashboard.link} key={index} className="dashboard-card">
            <div className="card-header">
              <i className={`${dashboard.icon} card-icon`}></i>
              <span className={`status-badge ${dashboard.status.toLowerCase()}`}>
                {dashboard.status}
              </span>
            </div>
            <h3>{dashboard.title}</h3>
            <p>{dashboard.description}</p>
            <div className="card-footer">
              <div className="labels">
                {dashboard.labels.map((label, labelIndex) => (
                  <span key={labelIndex} className="label">{label}</span>
                ))}
              </div>
              <div className="last-updated">
                Updated: {dashboard.lastUpdated}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DashboardsPage; 