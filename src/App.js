import { useState, useEffect } from 'react';
// import c3 from 'c3';
import d3 from 'd3';
// import axios from 'axios';
// import ReactTable from "react-table-6";
import { Button } from 'react-bootstrap';
import C3Chart from 'react-c3js';
import { competitorInsightsData } from './competitor_insights';
// import { Table } from "antd";
// import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
// import BootstrapSwitchButton from 'bootstrap-switch-button-react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'rsuite-table/dist/css/rsuite-table.css';
// import 'antd/dist/antd.css';
import 'c3/c3.css';
import './App.css';

// require.config({
//   baseUrl: '/js',
//   paths: {
//     d3: "http://d3js.org/d3.v5.min"
//   }
// });

// require(["d3", "c3"], function(d3, c3) {
//   c3.generate({
//     bindto: '#chart',
//     data: {
//       columns: [
//         ['data1', 30, 200, 100, 400, 150, 250],
//         ['data2', 50, 20, 10, 40, 15, 25]
//       ]
//     }
//   });
// });

function App() {
  // const [ teq, setTEQ ] = useState([]);
  // const [ result, setResult ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [ competitorSpends, setCompetitorSpends ] = useState([]);
  const [ totalEstimatedSpend, setTotalEstimatedSpend ] = useState("");

  useEffect(() => {
    // getTEQ();
    getOverallSpends();
  }, []);

  // useEffect(() => {
  //   const reducer = (a, item) => {
  //     return { ...a, ...item };
  //   };
  //   const result = teq && teq[0] && Object.keys(teq[0]).map((key) => {
  //     return {
  //       propertyName: key,
  //       ...teq
  //         .map((a, i) => {
  //           return {
  //             [`customer${i}`]: a[key]
  //           };
  //         })
  //         .reduce(reducer)
  //     };
  //   });
  //   setResult(result);
  // }, [teq]);

  // const getTEQ = () => {
  //   axios.get(`${process.env.PUBLIC_URL}/data/customer_insights.json`)
  //   .then((res) => {
  //     setTEQ(res.data);
  //   })
  //   .catch((err) => console.log(err));
  // }

  // const capitalizePropertyNames = (propertyName) => {
  //   switch(propertyName) {
  //     case 'customerName':
  //       return 'Customer Name';
  //     case 'overallTEQScore':
  //       return 'Overall TEQ Score';
  //     case 'customersAffinityTowardsCisco':
  //       return `Customer's Affinity Towards Cisco`;
  //     case 'techAdoption':
  //       return 'Tech Adoption';
  //     case 'top3InvestmentCategories':
  //       return 'Top 3 Investment Categories';
  //     case 'spendDistribution':
  //       return 'Spend Distribution';
  //     case 'top3PotentialPurchases':
  //       return 'Top 3 Potential Purchases';
  //     case 'recentDealsClosed':
  //       return 'Recent Deals Closed';
  //     case 'qualifiedUseCases':
  //       return 'Qualified Use Cases';
  //     default:
  //       return;
  //   }
  // }

  const getOverallSpends = () => {
    setSelectedCategory("Overall");

    const result = competitorInsightsData[0].vendors["Overall"].map((a) => {
      return {
        categoryName: "Overall",
        estimatedSpend: a.estimated_spend,
        categoryEstimatedSpend: a.category_estimated_spend,
        competitorName: a.competitor_name
      };
    });

    const chartArray = result.map((obj) => {
      return [ obj.competitorName, obj.estimatedSpend ]
    });

    setCompetitorSpends([ ...chartArray ]);

    let total = competitorInsightsData[0].vendors["Overall"][0].category_estimated_spend;
    let value = total.toLocaleString("en-US", { style: "currency", currency: "USD" });
    setTotalEstimatedSpend(value);
  }

  const getSpends = (e, category) => {
    const result = competitorInsightsData[0].vendors[category].map((a) => {
      return {
        categoryName: category,
        estimatedSpend: a.estimated_spend,
        categoryEstimatedSpend: a.category_estimated_spend,
        competitorName: a.competitor_name
      };
    });

    let chartArray = result.map((obj) => {
      return [ obj.competitorName, obj.estimatedSpend ]
    });

    // const others = competitorInsightsData[0].vendors[category][0].estimated_spend - competitorInsightsData[0].vendors[category].map((item) => item.category_estimated_spend).reduce((b,c) => b + c);
    // chartArray.push([ "Others", others ]);

    setCompetitorSpends([ ...chartArray ]);

    const total = competitorInsightsData[0].vendors[category][0].category_estimated_spend;
    let value = total.toLocaleString("en-US", { style: "currency", currency: "USD" });
    setTotalEstimatedSpend(value);
  }

  const donutChart = {
    data: {
      type: 'donut',
      columns: competitorSpends,
      labels: true,
      unload: true,
      onmouseover: function (d, i) {
        d3.select(i).attr("transform", "scale(1.1)")
      },
      onmouseout: function (d, i) {
        d3.select(i).attr("transform", "scale(1)")
      }
    },
    donut: {
      // title: totalEstimatedSpend,
      label: {
        show: true
      }
    },
    tooltip: {
      show: true,
      format: {
        value: function (value, ratio, id, index) {
          return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
        }
      }
    },
    legend: {
      hide: true
    },
    size: {
      height: 420
    },
    pie: {
      expand: true
    }
  }

  return (
    <div style={{ margin: '0 40px' }}>
      <div className="container">

        <div className="d-flex justify-content-between align-items-center" style={{ paddingTop: 10 }}>
          {Object.keys(competitorInsightsData[0].vendors)
            .filter((item) => item !== 'Overall')
            .map((category) => {
              return <Button key={category} variant="primary" onClick={(e) => {
                setSelectedCategory(category);
                getSpends(e, category);
              }}>{category}</Button>
            })
          }
        </div>

        {/* {renderChart()} */}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 6fr)' }}>
          <pre style={{ paddingTop: 10 }}>
            <b>
              {JSON.stringify({
                selectedCategory,
                competitorSpends,
                totalEstimatedSpend
              }, null, '\t')}
            </b>
          </pre>

          <div style={{ position: 'relative' }}>
            <b
              className="d-flex justify-content-center"
              style={{ position: 'absolute', top: 180, right: '50%', marginRight: -20 }}
            >
              {totalEstimatedSpend}
            </b>
            <C3Chart
              data={donutChart.data}
              donut={donutChart.donut}
              tooltip={donutChart.tooltip}
              legend={donutChart.legend}
              size={donutChart.size}
              pie={donutChart.pie}
            />
          </div>

          {/* <div id="chart"></div> */}
        </div>

        {/* <p>All three tables below are constructed with the same JSON.</p>

        <p><h1 style={{ fontFamily: 'Times New Roman' }}>T.E.Q.</h1>Built with HTML and Transposed in CSS</p>
        <table className="table" border="0" style={{ borderBottom: '0.1px solid lightgray', boxShadow: '5px 10px 18px #888888' }}>
          <tbody>
            <tr style={{ borderRight: '0.1px solid lightgray', borderLeft: '0.1px solid lightgray' }} key="-1">
              <td></td>
              <td>Overall TEQ Score</td>
              <td>Customer's Affinity Towards Cisco</td>
              <td>Tech Adoption</td>
              <td>Top 3 Investment Categories</td>
              <td>Spend Distribution (SW, HW, Subs)</td>
              <td></td>
              <td>Top 3 Potential Purchases</td>
              <td>Recent Deals Closed</td>
              <td>Qualified Use Cases</td>
            </tr>
            {teq.map((item, index) => {
              return (
                <tr key={index} style={{ borderRight: '0.1px solid lightgray' }}>
                  <td>{item.customerName}</td>
                  <td>{item.overallTEQScore}</td>
                  <td>{item.customersAffinityTowardsCisco}</td>
                  <td>{item.techAdoption}</td>
                  <td style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 4fr)', padding: '4px 10px' }}>
                    {Object.keys(item.top3InvestmentCategories).map((i, index) => {
                      return <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 10, fontWeight: 600, textAlign: 'center', height: '-webkit-fill-available', width: `${(item.top3InvestmentCategories[i] / Object.values(item.top3InvestmentCategories).reduce((a,b) => a + b)) * 100}%`
                    }}>{i}</span>
                    })}
                  </td>
                  <td style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 4fr)', padding: '4px 10px' }}>
                    {Object.keys(item.spendDistribution).map((i, index) => {
                      return <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 10, fontWeight: 600, textAlign: 'center', height: '-webkit-fill-available', width: `${item.spendDistribution[i]}%`
                      }}>{i}</span>
                    })}
                  </td>
                  <td></td>
                  <td>{item.top3PotentialPurchases}</td>
                  <td><span style={{ backgroundColor: 'yellow' }}>{item.recentDealsClosed}</span></td>
                  <td>{item.qualifiedUseCases}</td>
                </tr>
              )
            })}
            <tr style={{ borderRight: '0.1px solid lightgray' }} key={teq.length}>
              <td>Current Account</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table> */}

        {/*
          {customerNamesAsColumns.length && <BootstrapTable
            keyField="id"
            striped
            hover
            condensed
            noDataIndication="Table is Empty"
            data={ teq }
          />}
        */}

        {/* <p style={{ display: 'flex', alignItems: 'baseline', margin: 0 }}><h1 style={{ marginRight: 8 }}><u>T.E.Q.</u></h1></p>
        <ReactTable
          data={result}
          // filterable
          columns={[
            {
              accessor: "propertyName",
              sortable: true,
              resizable: true,
              filterable: false,
              Cell: props => <span style={{ 'whiteSpace': 'normal' }}>{capitalizePropertyNames(props.original.propertyName)}</span>,
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                verticalAlign: 'middle'
              },
            },
            {
              accessor: "customer0",
              sortable: true,
              resizable: true,
              filterable: false,
              Cell: props => typeof props.original.customer0 === "object" ? 
                <span className="top3InvestmentCategories" style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  {Object.keys(props.original.customer0).map((i, index) => {
                    return <span
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: 10,
                        whiteSpace: 'normal',
                        padding: '8px 0',
                        height: 40,
                        width: `${(props.original.customer0[i] / Object.values(props.original.customer0).reduce((a,b) => a + b)) * 100}%`
                      }}
                    >
                      {i}
                    </span>
                  })}
                </span>
              : <span style={{ 'whiteSpace': 'normal' }}>{props.original.customer0}</span>
            },
            {
              accessor: "customer1",
              sortable: true,
              resizable: true,
              filterable: false,
              Cell: props => typeof props.original.customer1 === "object" ?
                <span className="top3InvestmentCategories" style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  {Object.keys(props.original.customer1).map((i, index) => {
                    return <span
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: 10,
                        whiteSpace: 'normal',
                        padding: '8px 0',
                        height: 40,
                        width: `${(props.original.customer1[i] / Object.values(props.original.customer1).reduce((a,b) => a + b)) * 100}%`
                      }}
                    >
                      {i}
                    </span>
                  })}
                </span>
              : <span style={{ 'whiteSpace': 'normal' }}>{props.original.customer1}</span>
            },
            {
              accessor: "customer2",
              sortable: true,
              resizable: true,
              filterable: false,
              Cell: props => typeof props.original.customer2 === "object" ?
                <span className="top3InvestmentCategories" style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  {Object.keys(props.original.customer2).map((i, index) => {
                    return <span
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: 10,
                        whiteSpace: 'normal',
                        padding: '8px 0',
                        height: 40,
                        width: `${(props.original.customer2[i] / Object.values(props.original.customer2).reduce((a,b) => a + b)) * 100}%`
                      }}
                    >
                      {i}
                    </span>
                  })}
                </span>
              : <span style={{ 'whiteSpace': 'normal' }}>{props.original.customer2}</span>
            },
          ]}
          defaultPageSize={9}
          className="-striped -highlight"
        /> */}

      </div>
    </div>
  )
}

// function App() {
//   const [ data, setData ] = useState([]);
//   const [ filteredData, setFilteredData ] = useState([]);
//   const [ selectedAccount, setSelectedAccount ] = useState("");
//   const [ selectedVendor, setSelectedVendor ] = useState("");
//   const [ isRenewal, setIsRenewal ] = useState(false);

//   useEffect(() => {
//     axios.get(`${process.env.PUBLIC_URL}/data/competitor_insights.json`)
//     .then((res) => {
//       let filteredOverallData = []

//       Object.keys(res.data[0].accounts).map((account) => {
//         return Object.values(res.data[0].accounts[account]).map((item) => item.renewal_flag === "No" && filteredOverallData.push(item));
//       });

//       console.log(filteredOverallData);
//       setFilteredData(filteredOverallData);
//       setData(res.data);
//     })
//     .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     getDataAfterToggle();
//   }, [isRenewal]);

//   useEffect(() => {
//     getDataAfterSelectedVendor();
//   }, [selectedVendor]);

//   useEffect(() => {
//     getDataAfterSelectedAccount();
//   }, [selectedAccount]);

//   const handleSelectedAccount = (e, account) => {
//     setSelectedVendor("");
//     setSelectedAccount(account);
//   }

//   const getDataAfterSelectedAccount = () => {
//     let filteredSelectedAccountData = []

//     if(isRenewal && selectedAccount) {
//       // console.log('called at first condition');
//       data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "Yes" && filteredSelectedAccountData.push(item));
//       setFilteredData(filteredSelectedAccountData);

//     } else if(!isRenewal && selectedAccount) {
//       // console.log('called at second condition');
//       data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "No" && filteredSelectedAccountData.push(item));
//       setFilteredData(filteredSelectedAccountData);
//     }
//   }

//   const handleRemoveSelectedAccount = (e) => {
//     setIsRenewal(false);
//     setSelectedAccount("");
//     setSelectedVendor("");

//     let filteredOverallData = []

//     Object.keys(data[0].accounts).map((account) => {
//       return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "No" && filteredOverallData.push(item));
//     });

//     setFilteredData(filteredOverallData);
//   }

//   const handleSelectedVendor = (e, vendor) => {
//     setSelectedVendor(vendor);
//   }

//   const getDataAfterSelectedVendor = () => {
//     let filteredSelectedVendorData = []

//     if(isRenewal && selectedAccount && selectedVendor) {
//       // console.log('called at first condition');
//       data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "Yes" && item.vendor === selectedVendor && filteredSelectedVendorData.push(item));
//       setFilteredData(filteredSelectedVendorData);

//     } else if(isRenewal && !selectedAccount && selectedVendor) {
//       // console.log('called at third condition');
//       Object.keys(data[0].accounts).map((account) => {
//         return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "Yes" && item.vendor === selectedVendor && filteredSelectedVendorData.push(item));
//       });
//       setFilteredData(filteredSelectedVendorData);

//     } else if(!isRenewal && selectedAccount && selectedVendor) {
//       // console.log('called at second condition');
//       data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "No" && item.vendor === selectedVendor && filteredSelectedVendorData.push(item));
//       setFilteredData(filteredSelectedVendorData);

//     } else if(!isRenewal && !selectedAccount && selectedVendor) {
//       // console.log('called at third condition');
//       Object.keys(data[0].accounts).map((account) => {
//         return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "No" && item.vendor === selectedVendor && filteredSelectedVendorData.push(item));
//       });
//       setFilteredData(filteredSelectedVendorData);
//     }
//   }

//   const handleRenewalToggle = (e) => {
//     setIsRenewal((prevState) => !prevState);
//   }

//   const getDataAfterToggle = () => {
//     let filteredRenewalData = []

//     if(!isRenewal && !selectedAccount && selectedVendor) {
//       // console.log('called at first condition');
//       data[0] && Object.keys(data[0].accounts).map((account) => {
//         return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "No" && item.vendor === selectedVendor && filteredRenewalData.push(item));
//       });
//       setFilteredData(filteredRenewalData);

//     } else if(isRenewal && !selectedAccount && selectedVendor) {
//       // console.log('called at second condition');
//       data[0] && Object.keys(data[0].accounts).map((account) => {
//         return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "Yes" && item.vendor === selectedVendor && filteredRenewalData.push(item));
//       });
//       setFilteredData(filteredRenewalData);

//     } else if(isRenewal && selectedAccount && selectedVendor) {
//       // console.log('called at third condition');
//       data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "Yes" && item.vendor === selectedVendor && filteredRenewalData.push(item));
//       setFilteredData(filteredRenewalData);
    
//     } else if(!isRenewal && selectedAccount && selectedVendor) {
//       // console.log('called at fourth condition');
//       data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "No" && item.vendor === selectedVendor && filteredRenewalData.push(item));
//       setFilteredData(filteredRenewalData);

//     } else if (isRenewal && selectedAccount) {
//       // console.log('called at fifth condition');
//       filteredRenewalData = Object.values(data[0].accounts[selectedAccount]).filter((item) => {
//         return item.renewal_flag === "Yes"
//       })
//       setFilteredData(filteredRenewalData);

//     } else if(isRenewal && !selectedAccount) {
//       // console.log('called at sixth condition');
//       data[0] && Object.keys(data[0].accounts).map((account) => {
//         return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "Yes" && filteredRenewalData.push(item));
//       });
//       setFilteredData(filteredRenewalData);

//     } else if(!isRenewal && selectedAccount) {
//       // console.log('called at seventh condition');
//       filteredRenewalData = Object.values(data[0].accounts[selectedAccount]).filter((item) => {
//         return item.renewal_flag === "No"
//       })
//       setFilteredData(filteredRenewalData);

//     } else {
//       // console.log('called at eighth condition');
//       data[0] && Object.keys(data[0].accounts).map((account) => {
//         return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "No" && filteredRenewalData.push(item));
//       });
//       setFilteredData(filteredRenewalData);
//     }
//   }

//   const columns = [{
//       dataField: 'vendor',
//       text: 'Vendor'
//     }, {
//       dataField: 'product',
//       text: 'Product Name'
//     }, {
//       dataField: 'renewal_flag',
//       text: 'Renewal Flag'
//     }
//   ]

//   const paginationOption = {
//     sizePerPage: 5
//   }

//   // console.log("filteredData", filteredData);

//   return (
//     <div className="App">
//       <div className="counts">
//         <div>
//           <p>ACTIVE COMPETITORS</p>
//           {data[0] && data[0].active_competitors}
//         </div>
//         <div>
//           <p>ACTIVE CONTRACTS</p>
//           {data[0] && data[0].active_contracts}
//         </div>
//         <div>
//           <p>RENEWAL CONTRACTS</p>
//           {data[0] && data[0].renewal_contracts}
//         </div>
//       </div>
    
//       <div className="accounts">
//         {data[0] && Object.keys(data[0].accounts).filter((account) => account !== "Overall").map((account, index) => {
//           return (
//             <div key={index}>
//               <button className="accountsAdd" onClick={(e) => handleSelectedAccount(e, account)}
//                 style={{ backgroundColor: account === selectedAccount ? '#049fd9' : '#808080' }}
//               >{account}</button>
//               {account === selectedAccount && <button className="accountsRemove" onClick={(e) => handleRemoveSelectedAccount(e)}>x</button>}
//             </div>
//           );
//         })}
//       </div>

//       <div className="vendors">
//         {data[0] && !selectedAccount && Object.values(data[0].vendors["Overall"]).map((vendor, index) => {
//           return (
//             <div key={index} onClick={(e) => vendor.competitor_name === "Cisco Systems, Inc." ? null :
//               handleSelectedVendor(e, vendor.competitor_name)}
//               style={{ backgroundColor: vendor.competitor_name === selectedVendor ? '#049fd9' : '#808080' }}
//             >
//               <p>{vendor.competitor_name}</p>
//             </div>
//           )
//         })}
//         {data[0] && selectedAccount && Object.values(data[0].vendors[selectedAccount]).map((vendor, index) => {
//           return (
//             <div key={index} onClick={(e) => vendor.competitor_name === "Cisco Systems, Inc." ? null : handleSelectedVendor(e, vendor.competitor_name)}
//               style={{ backgroundColor: vendor.competitor_name === selectedVendor ? '#049fd9' : '#808080' }}
//             >
//               <p>{vendor.competitor_name}</p>
//             </div>
//           )
//         })}
//       </div>

//       <div className="toggle">
//         <div>
//           <BootstrapSwitchButton
//             checked={isRenewal}
//             onstyle="success"
//             offstyle="danger"
//             onlabel='Renewal'
//             offlabel='Non-renewal'
//             size="xs"
//             width={120}
//             onChange={handleRenewalToggle}
//           />
//         </div>
//         <p>No. of filtered Records: {filteredData && filteredData.length}</p>
//       </div>

//       {/* <pre>{JSON.stringify({
//         filteredData: JSON.stringify(filteredData, null, 2),
//         filteredDataLength: filteredData.length,
//         isRenewal,
//         selectedAccount,
//         selectedVendor
//       }, null, 2)}</pre> */}
    
//       <div className="table">
//         <BootstrapTable
//           keyField="id"
//           striped
//           hover
//           condensed
//           noDataIndication="Table is Empty"
//           data={ filteredData }
//           columns={ columns }
//           pagination={ paginationFactory(paginationOption) }
//         />
//       </div>
//     </div>
//   );
// }

export default App;
