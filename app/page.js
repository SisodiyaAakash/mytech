"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/json/dashboard.json");
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return (
      <div className="p-6">
        <h2 className="text-center">Loading...</h2>
      </div>
    );
  }

  // Chart Data for Semi-Circular Progress Chart
  const doughnutData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [
          dashboardData.target.graph.value,
          100 - dashboardData.target.graph.value,
        ],
        backgroundColor: ["#2086BF", "#E0E2E7"],
        hoverBackgroundColor: ["#2086BF", "#EAF8FF"],
        borderWidth: 0,
      },
    ],
  };

  // Chart Options for Semi-Circular Chart
  const doughnutOptions = {
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    cutout: "80%", // Adjust inner radius for the progress appearance
  };

  // Chart Data for Dual-Line Chart
  const lineData = {
    labels: dashboardData.statistics.graph.labels,
    datasets: [
      {
        label: "Revenue",
        data: dashboardData.statistics.graph.revenue,
        borderColor: "#2086BF",
        backgroundColor: "#2086BF",
        tension: 0.3,
        fill: false,
        pointStyle: "circle",
      },
      {
        label: "Sales",
        data: dashboardData.statistics.graph.sales,
        borderColor: "#F86624",
        backgroundColor: "#F86624",
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const lineOptions = {
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 12,
          boxHeight: 12,
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: { enabled: true },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  // Utility to format total sales value
  const formatTotalSales = (value) => {
    return value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${value}`;
  };

  // Sales Source Data for Doughnut Chart
  const salesSourceData = {
    labels: dashboardData.salesSource.graph.sources.map((source) => {
      const amount = Math.round(
        (source.percentage / 100) * dashboardData.salesSource.graph.totalSales
      );
      return `${source.name} ($${amount.toLocaleString()})`;
    }),
    datasets: [
      {
        data: dashboardData.salesSource.graph.sources.map(
          (source) => source.percentage
        ),
        backgroundColor: dashboardData.salesSource.graph.sources.map(
          (source) => source.color
        ),
        hoverBackgroundColor: dashboardData.salesSource.graph.sources.map(
          (source) => source.color
        ),
        borderWidth: 0,
      },
    ],
  };

  const salesSourceOptions = {
    plugins: {
      legend: {
        position: "bottom",
        display: false,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 10,
          padding: 10,
          boxWidth: 10,
          font: {
            size: 14,
          },
          generateLabels: (chart) => {
            const data = chart.data;
            return data.labels.map((label, index) => {
              const dataset = data.datasets[0];
              return {
                text: label,
                fillStyle: dataset.backgroundColor[index],
                hidden: chart.getDatasetMeta(0).data[index].hidden,
                index: index,
              };
            });
          },
        },
      },
      tooltip: { enabled: true },
    },
    cutout: "90%",
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard for MyTech" />
      </Head>

      <div className="px-6">
        {/* Heading Area */}
        <div className="flex items-center mb-6">
          <div className="flex-grow">
            <h1 className="mb-2">Welcome Back Jenil</h1>
            <p>Lorem ipsum dolor sit amet, welcome back Jenil!</p>
          </div>

          <label className="group cursor-pointer flex items-center gap-2 relative text-sm text-[#4A4C56]">
            <Image
              src="/icons/calendar.svg"
              className="group-hover:brightness-0 duration-500"
              alt="Calendar Icon"
              width={20}
              height={20}
            />
            Select Dates
            <input
              className="invisible absolute w-full h-full"
              id="datepicker"
              name="datepicker"
              type="date"
              placeholder="Select Dates"
            />
          </label>
        </div>

        {/* Cards and Charts */}
        <div className="flex flex-col gap-6">
          {/* First Row */}
          <div className="grid grid-cols-4 gap-6">
            {dashboardData.overview.map((item, index) => (
              <div
                key={index}
                className="card bg-white p-6 shadow-shadow2 rounded-xl flex flex-col items-start"
              >
                <div className="flex items-start justify-between w-full mb-4">
                  <div>
                    <h1 className="text-base text-[#777980] font-medium mb-2">
                      {item.title}
                    </h1>
                    <h3 className="text-[32px] font-semibold mb-1">
                      {item.value}
                    </h3>
                  </div>

                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="mb-3"
                  />
                </div>

                <div className="flex items-center gap-1 w-full">
                  <p
                    className={`flex items-center gap-1 text-sm font-bold ${
                      item.meta.percentage > 0
                        ? "text-[#1A9882]"
                        : "text-[#EB3D4D]"
                    }`}
                  >
                    {item.meta.percentage}%
                    <Image
                      src={
                        item.meta.percentage > 0
                          ? "/custom-icons/up.svg"
                          : "/custom-icons/down.svg"
                      }
                      alt={item.meta.percentage > 0 ? "Up" : "Down"}
                      width={16}
                      height={16}
                    />
                  </p>
                  <p className="text-sm font-medium text-[#858D9D]">
                    {item.meta.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Target Card */}
            <div className="col-span-1 bg-white p-6 shadow-shadow2 rounded-xl flex flex-col">
              <h3 className="text-xl font-semibold mb-0.5">
                {dashboardData.target.title}
              </h3>
              <p className="text-sm">{dashboardData.target.description}</p>
              <div className="w-full mb-2">
                <div className="w-4/5 mx-auto relative">
                  <Doughnut data={doughnutData} options={doughnutOptions} />

                  <div className="absolute text-center top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                    <h2 className="text-[28px] font-semibold">
                      {dashboardData.target.graph.value}%
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-[#667085] text-center">
                  {dashboardData.target.graph.description}
                </p>
              </div>
              {/* Meta Data */}
              <div className="w-full flex items-center justify-center gap-[18px]">
                {Object.entries(dashboardData.target.meta).map(
                  ([key, value], index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1 items-center"
                    >
                      <p className="text-xs font-medium text-[#667085]">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </p>
                      <h3>{value}</h3>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Statistics Card */}
            <div className="col-span-2 bg-white p-6 shadow-shadow2 rounded-xl">
              <h3 className="text-xl font-semibold mb-0.5">
                {dashboardData.statistics.title}
              </h3>
              <p className="text-sm">{dashboardData.statistics.description}</p>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Sales Source */}
            <div className="bg-white p-6 shadow-shadow2 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Sales Source</h3>
              <div>
                <div className="relative w-4/5 mx-auto">
                  <Doughnut
                    data={salesSourceData}
                    options={salesSourceOptions}
                  />

                  <div className="absolute text-center top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
                    <h2 className="text-[28px] font-semibold">
                      {formatTotalSales(
                        dashboardData.salesSource.graph.totalSales
                      )}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-wrap justify-between mt-[14px]">
                  {dashboardData.salesSource.graph.sources.map(
                    (source, index) => (
                      <div
                        key={index}
                        className="w-full flex items-center gap-2"
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: source.color }}
                        ></span>
                        <span className="text-sm font-medium text-[#4A4C56]">
                          {source.name}
                        </span>
                        <h5 className="font-medium ml-auto">
                          $
                          {Math.round(
                            (source.percentage / 100) *
                              dashboardData.salesSource.graph.totalSales
                          ).toLocaleString()}
                        </h5>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Top Product */}
            <div className="bg-white p-6 shadow-shadow2 rounded-xl">
              <h3 className="text-xl font-semibold mb-0.5">Top Product</h3>
              <p className="text-sm">Top Product in This Month</p>
            </div>

            {/* Top Category */}
            <div className="bg-white p-6 shadow-shadow2 rounded-xl">
              <h3 className="text-xl font-semibold mb-0.5">Top Category</h3>
              <p className="text-sm">Top Category in This Month</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
