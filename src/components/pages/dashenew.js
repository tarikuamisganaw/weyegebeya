import React, { useState,useEffect } from "react";
import '../css/dash.css'
import Chart from "chart.js/auto";
import { SupabaseClient } from '../../config/supabase';
import { Bar, Pie } from "react-chartjs-2";
import { Table } from "antd";
import { FiUser, FiBarChart2, FiSettings,FiLogOut,  } from "react-icons/fi";
import { Line } from "react-chartjs-2";
const Dashboarder = () => {
  // Sample data for the charts
  const [labels,setLabels]=useState([])
  const [salesData,setsalesData]=useState([])
  const [seatsData,setSeatsData]=useState([])
  const [data,setData]=useState([])
  const [busNames, setBusNames] = useState([]);
  const [busSales,setBusSales]=useState([])
  const [busBranch,setbusBranch]=useState([])
  const [totalSales, setTotalSales] = useState(0);
const [numBranches, setNumBranches] = useState(0);
  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const { data: branchData, error } = await SupabaseClient
          .from('branch_table')
          .select('*');
        if (error) {
          console.log('Error retrieving branch data:', error);
        } else {
          setLabels(branchData.map((branch) => branch.branch_name));
          setsalesData(branchData.map((branch) => branch.no_of_sales));
          setSeatsData(branchData.map((branch) => branch.no_of_seats));
          setBusNames(branchData.map((branch) => branch.buses))
          const updatedData = branchData.map((branch) => ({
            id: branch.id,
            name: branch.branch_name,
            st_route: branch.start_route,
            end_route: branch.end_route,
            start_time:branch.start_time,
            no_of_sales:branch.no_of_sales,
            no_of_seats:branch.no_of_seats,
            bus_type:branch.buses

          }));
          let salesCount = 0;
          branchData.forEach((branch) => {
            salesCount += parseInt(branch.no_of_sales);
          });
          const uniqueBuses = [];
          const salesCountPerBus = [];  
          const salebusbranch=[]; 
          branchData.forEach((branch) => {
            const index = uniqueBuses.findIndex((bus) => bus === branch.buses);
            salebusbranch.push(parseInt(branch.no_of_sales));
            if (index === -1) {
              uniqueBuses.push(branch.buses);
              salesCountPerBus.push(parseInt(branch.no_of_sales));
             
            } else {
              salesCountPerBus[index] += parseInt(branch.no_of_sales);
            }
          });

          setBusNames(uniqueBuses);
          console.log(uniqueBuses)
          setBusSales(salesCountPerBus);
          console.log(salesCountPerBus)
        setbusBranch(salebusbranch)
        console.log(salebusbranch)
          setData(updatedData);
          setNumBranches(updatedData.length);
          setTotalSales(salesCount);
        
        
        }
      } catch (error) {
        console.log('Error retrieving branch data:', error);
      }
    };
    fetchBranchData();
  }, []);
  // const gradientColors = (ctx) => {
  //   const gradient = ctx.canvas.getContext('2d').createLinearGradient(0, 0, 0, 300);
  //   gradient.addColorStop(0, 'rgba(75,192,192,1)');
  //   gradient.addColorStop(1, 'rgba(75,192,192,0)');
  //   return gradient;
  // };
  
  const barChartData = {
    labels,
    datasets: [
      {
        label: 'number of ticket sales in each branch',
        data: salesData,
        backgroundColor: 'rgba(75,192,192,0.6)',
        // Decrease the width of each bar
        barThickness: 30,
        
       
        borderWidth: 2,
      },
      {
        label: 'number of seats available per branch',
        data: seatsData,
        backgroundColor:'rgba(255,99,132,0.6)',
        // Decrease the width of each bar
        barThickness: 30,
      
        borderSkipped: 'bottom',
     
      },
    ],
    
  };
  
  const threedata = {
    labels: busNames,
    datasets: [
      {
        label: 'Sales per Bus per Branch',
        data: data.map((branch) => ({
          x: busNames.indexOf(branch.bus_type) + 1,
          y: branch.no_of_sales,
          z: branch.no_of_sales,
        })),
        fill: true,
        borderColor: 'red',
        tension: 0.4,
      },
    ],
  };
  const optiont = {
    scales: {
      x: {
        type: 'category',
        position: 'bottom',
        labels: busNames,
      },
      y: {
        type: 'linear',
        position: 'left',
      },
      z: {
        type: 'category',
        position: 'right',
        labels: labels,
      },
    },
  };
  
  const lineChartData = {
    labels: busNames,
    datasets: [
      {
        label: 'Number of ticket sales in each bus',
        data: busSales,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        fill: true,
        tension: 0.4, // Make the line more curvy
        pointRadius: 0, // Hide the points on the line
       
      },
    ],
    
  };
  const options = {
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: true
        },border:{
          display:false
        }
       
      }
    },
    barPercentage: 0.4,
    categoryPercentage: 0.5
  };
  
  
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alex Johnson", email: "alex@example.com" },
  ];
  const columns = [
    {
      title: "Branch_id",
      dataIndex: "id",
    },
    
    
    {
      title: "branch_name",
      dataIndex: "name",
    },
    {
      title: "starting-route",
      dataIndex: "st_route",
    },
    {
      title: "end_route",
      dataIndex: "end_route",
    },
    {
      title: "start_time",
      dataIndex: "start_time",
    }, 
   
    {
      title: "no_of_sales",
      dataIndex: "no_of_sales",
    },
    {
      title: "no_of_seats",
      dataIndex: "no_of_seats",
    },
    {
      title: "bus_type",
      dataIndex: "bus_type",
    },
  ];

  
 // }
 const statistics = [
  { label: "Total number of Sales in all branch", value: totalSales },
  { label: "Total number of branches", value: numBranches },
];
  const pieChartData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };

  return (
    <div className="container">
      <div className="sidebar">
      
     
      <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
          <p>Role: Admin</p>
        <div className="menu">
          <div className="menuItem">
            <FiUser className="menuIcon"/> Users
          </div>
          <div className="menuItem">
            <FiBarChart2 className="menuIcon" /> Statistics
          </div>
          <div className="menuItem">
            <FiSettings className="menuIcon" /> Settings
          </div>
          </div>
          </div>

      {/* Main Content */}
      <div className="content">
      <h3>Statistics</h3>
      <div className="statistics" style={{display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
    marginTop: "20px",}}>
          {statistics.map((stat) => (
            <div className="stat-item" style={{ background: "#e3e3e3",
            padding: "20px",
            borderRadius: "5px",
            textAlign: "center",
            color: "#333",}} key={stat.label}>
              <div>{stat.label}</div>
              <div>{stat.value}</div>
              
            </div>
            ))}
              </div>
              <h3>comparison in number of sales and seat availability for each branch</h3>
        <div className="charts">
        <div className="bar-chart">
  <Bar data={barChartData} options={options} />
</div>
          <div className="line-chart">
      <Line data={lineChartData} options={options}/>
          </div>
          

        </div>
        <div>
          <Line data={threedata} options={optiont} className="pie-chart"/>
          </div>
        <h3>full brach information</h3>
        <Table columns={columns} dataSource={data} />
        <div>
        
        </div>
        {/*  */}
      </div>
    
    </div>
  );
};

export default Dashboarder;