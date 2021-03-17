import { useState, useEffect } from 'react';
import axios from 'axios';
import C3Chart from 'react-c3js';
import ReactTable from "react-table-6";
// import BootstrapSwitchButton from 'bootstrap-switch-button-react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'c3/c3.css';
import './App.css';

function App() {
  const [ teq, setTEQ ] = useState([]);

  useEffect(() => {
    getTEQ();
  }, []);

  const getTEQ = () => {
    axios.get(`${process.env.PUBLIC_URL}/data/customer_insights.json`)
    .then((res) => {
      setTEQ(res.data);
    })
    .catch((err) => console.log(err));
  }

  return (
    <div style={{ margin: '0 40px' }}>

      {/* {customerNamesAsColumns.length && <BootstrapTable
        keyField="id"
        striped
        hover
        condensed
        noDataIndication="Table is Empty"
        data={ teq }
      />} */}

      <p style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', margin: 0 }}><h1 style={{ margin: '0px 8px 0px 0px' }}>T.E.Q.</h1>w/o Graphs</p>
      <ReactTable
        data={teq}
        // filterable
        columns={[
          {
            Header: <p style={{ 'whiteSpace': 'normal' }}>Customer Name</p>,
            accessor: "customerName",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ 'whiteSpace': 'normal' }}>{props.original.customerName}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Overall TEQ Score</b>,
            accessor: "overallTEQScore",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span id="overallTEQScore" className="overallTEQScore">{props.original.overallTEQScore}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Customers Affinity Towards Cisco</b>,
            accessor: "customersAffinityTowardsCisco",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span>{props.original.customersAffinityTowardsCisco}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Tech Adoption</b>,
            accessor: "techAdoption",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ 'whiteSpace': 'normal' }}>{props.original.techAdoption}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Top 3 Investment Categories</b>,
            accessor: "top3InvestmentCategories",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span className="top3InvestmentCategories" style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: '0 10px'
            }}>
              {Object.keys(props.original.top3InvestmentCategories).map((i, index) => {
                return <span
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '-webkit-fill-available',
                    width: `${(props.original.top3InvestmentCategories[i] / Object.values(props.original.top3InvestmentCategories).reduce((a,b) => a + b)) * 100}%`
                  }}
                >
                  {i}
                </span>
              })}
            </span>,
            // Cell: props => <div>
            //   <C3Chart
            //     data={{
            //       type: 'pie',
            //       columns: Object.entries(props.original.top3InvestmentCategories)
            //     }}
            //   />
            //   </div>,
            style: { textAlign: 'center' },
            width: 400
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Spend Distribution</b>,
            accessor: "spendDistribution",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span className="spendDistribution" style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 10px'
            }}>
              {Object.keys(props.original.spendDistribution).map((i, index) => {
                return <span
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '-webkit-fill-available',
                    width: `${(props.original.spendDistribution[i] / Object.values(props.original.spendDistribution).reduce((a,b) => a + b)) * 100}%`
                  }}
                >
                  {i}
                </span>
              })}
            </span>,
            // Cell: props => <div>
            //   <C3Chart
            //     data={{
            //       type : 'pie',
            //       columns: Object.entries(props.original.spendDistribution)
            //     }}
            //   />
            //   </div>,
            style: { textAlign: 'center' },
            width: 250
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Top 3 Potential Purchases</b>,
            accessor: "top3PotentialPurchases",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ 'whiteSpace': 'normal' }}>{props.original.top3PotentialPurchases}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
            width: 150
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Recent Deals Closed</b>,
            accessor: "recentDealsClosed",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ backgroundColor: '#FFFF00', padding: '1px 4px' }}>{props.original.recentDealsClosed}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Qualified Use Cases</b>,
            accessor: "qualifiedUseCases",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ 'whiteSpace': 'normal' }}>{props.original.qualifiedUseCases}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
        ]}
        defaultPageSize={5}
        onPageChange={() => getTEQ()}
        style={{ }}
        className="-striped -highlight"
      />

      <p style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 160 }}><h1 style={{ margin: '0px 8px 0px 0px' }}>T.E.Q.</h1>w/ Graphs</p>
      <ReactTable
        data={teq}
        // filterable
        columns={[
          {
            Header: <p style={{ 'whiteSpace': 'normal' }}>Customer Name</p>,
            accessor: "customerName",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ 'whiteSpace': 'normal' }}>{props.original.customerName}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Overall TEQ Score</b>,
            accessor: "overallTEQScore",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span id="overallTEQScore" className="overallTEQScore">{props.original.overallTEQScore}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Customers Affinity Towards Cisco</b>,
            accessor: "customersAffinityTowardsCisco",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span>{props.original.customersAffinityTowardsCisco}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Tech Adoption</b>,
            accessor: "techAdoption",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ 'whiteSpace': 'normal' }}>{props.original.techAdoption}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Top 3 Investment Categories</b>,
            accessor: "top3InvestmentCategories",
            sortable: true,
            resizable: true,
            filterable: false,
            // Cell: props => <span className="top3InvestmentCategories" style={{
            //   display: 'flex', justifyContent: 'center', alignItems: 'center',
            //   padding: '0 10px'
            // }}>
            //   {Object.keys(props.original.top3InvestmentCategories).map((i, index) => {
            //     return <span
            //       key={index}
            //       style={{
            //         display: 'flex',
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         textAlign: 'center',
            //         height: '-webkit-fill-available',
            //         width: `${(props.original.top3InvestmentCategories[i] / Object.values(props.original.top3InvestmentCategories).reduce((a,b) => a + b)) * 100}%`
            //       }}
            //     >
            //       {i}
            //     </span>
            //   })}
            // </span>,
            Cell: props => <div>
              <C3Chart
                data={{
                  type: 'pie',
                  columns: Object.entries(props.original.top3InvestmentCategories)
                }}
              />
              </div>,
            style: { textAlign: 'center' },
            width: 400
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Spend Distribution</b>,
            accessor: "spendDistribution",
            sortable: true,
            resizable: true,
            filterable: false,
            // Cell: props => <span className="spendDistribution" style={{
            //   display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 10px'
            // }}>
            //   {Object.keys(props.original.spendDistribution).map((i, index) => {
            //     return <span
            //       key={index}
            //       style={{
            //         display: 'flex',
            //         justifyContent: 'center',
            //         alignItems: 'center',
            //         textAlign: 'center',
            //         height: '-webkit-fill-available',
            //         width: `${(props.original.spendDistribution[i] / Object.values(props.original.spendDistribution).reduce((a,b) => a + b)) * 100}%`
            //       }}
            //     >
            //       {i}
            //     </span>
            //   })}
            // </span>,
            Cell: props => <div>
              <C3Chart
                data={{
                  type : 'pie',
                  columns: Object.entries(props.original.spendDistribution)
                }}
              />
              </div>,
            style: { textAlign: 'center' },
            width: 250
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Top 3 Potential Purchases</b>,
            accessor: "top3PotentialPurchases",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ 'whiteSpace': 'normal' }}>{props.original.top3PotentialPurchases}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
            width: 150
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Recent Deals Closed</b>,
            accessor: "recentDealsClosed",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ backgroundColor: '#FFFF00', padding: '1px 4px' }}>{props.original.recentDealsClosed}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Qualified Use Cases</b>,
            accessor: "qualifiedUseCases",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => <span style={{ 'whiteSpace': 'normal' }}>{props.original.qualifiedUseCases}</span>,
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              verticalAlign: 'middle'
            },
          },
        ]}
        defaultPageSize={2}
        onPageChange={() => getTEQ()}
        style={{ }}
        className="-striped -highlight"
      />

      {/* <div className="container">
        <h1 style={{ fontFamily: 'Times New Roman' }}>T.E.Q.</h1>
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
        </table>
      </div> */}
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
