import React from "react";
import RegistrationTrendChart from "../components/RegistrationTrendChart"; // adjust path if needed

const Dashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>📊 Analytics Dashboard</h1>
      <p>Track user registrations by role and month.</p>

      <div style={{ marginTop: "2rem" }}>
        <RegistrationTrendChart />
        <MonthlySalesTrendChart
          startDate={startDate}
          endDate={endDate}
          category={category}
        />
        <CategoryRevenuePieChart startDate={startDate} endDate={endDate} />
        <TopProductsBarChart startDate={startDate} endDate={endDate} />
        <DailySalesLineChart startDate={startDate} endDate={endDate} />
        <CustomerFrequencyChart startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default Dashboard;
