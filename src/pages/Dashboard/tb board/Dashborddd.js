import React from 'react';
import './Dashborddd.css';
import image from '../../../assets/image.png';
import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import image3 from '../../../assets/image3.png';
import { FaUmbrellaBeach, FaUserShield, FaBriefcaseMedical, FaExclamationTriangle } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
    // Sample data for charts
    const leaveUsageData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            { label: 'Approved', data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120], borderColor: 'green', fill: false },
            { label: 'Rejected', data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60], borderColor: 'red', fill: false },
            { label: 'WaitingForApproval', data: [15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125], borderColor: 'orange', fill: false },
        ],
    };

    const leaveTypeDistributionData = {
        labels: ['Sick Leave', 'Personal Leave', 'Vacation Leave', 'Casual Leave'], // Updated labels
        datasets: [
            {
                label: 'Distribution of Holidays System',
                data: [15, 20, 25, 10], // Adjusted data for the selected leave types
                backgroundColor: ['#ff9800', '#4caf50', '#2196f3', '#f44336'], // Updated colors
            },
        ],
    };

    const employeeDepartmentData = {
        labels: ['Design', 'Software Developer', 'Marketing'], // Removed Tester
        datasets: [
            {
                label: 'Distribution of Employees by Department',
                data: [10, 40, 30], // Adjusted data to match the filtered departments
                backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0'],
            },
        ],
    };

    return (
        <div className="dashboard">
            {/* Statistics Cards */}
            <div className="statistics-cards">
                <div className="card">
                    <h3>Approved Leaves</h3>
                    <p>33</p>
                </div>
                <div className="card">
                    <h3>Rejected Leaves</h3>
                    <p>12</p>
                </div>
                <div className="card">
                    <h3>Total Leave Requests</h3>
                    <p>45</p>
                </div>
                <div className="card">
                    <h3>Total Employees</h3>
                    <p>70</p>
                </div>
            </div>

            {/* Latest Recording Section */}
            <div className="latest-recording">
                <h2>Latest Recording</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Hours Spent</th>
                            <th>Extra Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>51540</td>
                            <td>Olivia Rhye</td>
                            <td>Marketing</td>
                            <td>Full-Time</td>
                            <td>8 hours</td>
                            <td>8 hours</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                    
                    <tbody>
                        <tr>
                            <td>51550</td>
                            <td>Alex rang</td>
                            <td>Design</td>
                            <td>Full-Time</td>
                            <td>8 hours</td>
                            <td>8 hours</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                    <tbody>
                        <tr>
                            <td>51560</td>
                            <td>Maria alin</td>
                            <td>Design</td>
                            <td>Full-Time</td>
                            <td>8 hours</td>
                            <td>8 hours</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>

            {/* Leave Balance Section */}
            <div className="leave-balance">
                <h2>My Leave Balance</h2>
                <div className="leave-cards">
                    <div className="leave-card">
                        <img src={image2} alt="Casual Leave Icon" className="leave-icon" />
                        <h4>Casual Leave</h4>
                        <p>5/12 Days</p>
                    </div>
                    <div className="leave-card">
                        <img src={image} alt="Sick Leave Icon" className="leave-icon" />
                        <h4>Sick Leave</h4>
                        <p>7/12 Days</p>
                    </div>
                    <div className="leave-card">
                        <img src={image1} alt="Personal Leave Icon" className="leave-icon" />
                        <h4>Personal Leave</h4>
                        <p>9/12 Days</p>
                    </div>
                    <div className="leave-card">
                        <img src={image3} alt="Vacation Leave Icon" className="leave-icon" />
                        <h4>Vacation Leave</h4>
                        <p>4/12 Days</p>
                    </div>
                </div>
            </div>

            {/* Data Analytics Section */}
            <div className="data-analytics">
                <h2>Data Analytics</h2>
                <div className="analytics-charts">
                    <div className="chart-container">
                        <h3>Number of Leave Requests by Month</h3>
                        <Line data={leaveUsageData} />
                    </div>
                    <div className="chart-container">
                        <h3>Distribution of Holidays System</h3>
                        <Bar data={leaveTypeDistributionData} />
                    </div>
                    <div className="chart-container">
                        <h3>Distribution of Employees by Department</h3>
                        <Doughnut 
                            data={employeeDepartmentData} 
                            options={{
                                maintainAspectRatio: false,
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                },
                            }}
                            width={200} // Adjust width
                            height={200} // Adjust height
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
