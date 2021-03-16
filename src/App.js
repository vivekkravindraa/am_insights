import { useState, useEffect } from 'react';
import axios from 'axios';
// import ReactTable from "react-table-6";
// import BootstrapSwitchButton from 'bootstrap-switch-button-react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';

function App() {
  const [ teq, setTEQ ] = useState([]);
  // const [ customerNamesAsColumns, setCustomerNamesAsColumns ] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/data/customer_insights.json`)
    .then((res) => {
      // let row1 = [ 'Customer Name' ];
      // res.data && res.data.forEach((customer) => {
      //   row1.push(customer.customerName)
      // });

      // let row2 = [{ 'overallTEQScore': 'Overall TEQ Scores' }];
      // res.data && res.data.forEach((customer) => {
      //   row2.push({ 'overallTEQScore': customer.overallTEQScore })
      // });

      // let row3 = [{ 'customersAffinityTowardsCisco': 'Customers Affinity Towards Cisco' }];
      // res.data && res.data.forEach((customer) => {
      //   row3.push({ 'customersAffinityTowardsCisco': customer.customersAffinityTowardsCisco })
      // });

      // let row4 = [{ 'techAdoption': 'techAdoption' }];
      // res.data && res.data.forEach((customer) => {
      //   row4.push({ 'techAdoption': customer.techAdoption })
      // });

      // let row5 = [{ 'top3InvestmentCategories': 'Top 3 Investment Categories'}];
      // res.data && res.data.forEach((customer) => {
      //   row5.push({ 'top3InvestmentCategories': customer.top3InvestmentCategories })
      // });

      // let row6 = [{ 'spendDistribution': 'Spend Distribution' }];
      // res.data && res.data.forEach((customer) => {
      //   row6.push({ 'spendDistribution': customer.spendDistribution })
      // });

      // let row7 = [{ 'top3PotentialPurchases': 'Top 3 Potential Purchases' }];
      // res.data && res.data.forEach((customer) => {
      //   row7.push({ 'top3PotentialPurchases': customer.top3PotentialPurchases })
      // });

      // let row8 = [{ 'recentDealsClosed': 'Recent Deals Closed' }];
      // res.data && res.data.forEach((customer) => {
      //   row8.push({ 'recentDealsClosed': customer.recentDealsClosed })
      // });

      // let row9 = [{ 'qualifiedUseCases': 'Qualified Use Cases' }];
      // res.data && res.data.forEach((customer) => {
      //   row9.push({ 'qualifiedUseCases': customer.qualifiedUseCases })
      // });

      // console.log('customerName', row1);
      // console.log('overallTEQScore', row2);
      // console.log('customersAffinityTowardsCisco', row3);
      // console.log('techAdoption', row4);
      // console.log('top3InvestmentCategories', row5);
      // console.log('spendDistribution', row6);
      // console.log('top3PotentialPurchases', row7);
      // console.log('recentDealsClosed', row8);
      // console.log('qualifiedUseCases', row9);

      // let row1Obj = {};
      // console.log(row1Obj);

      // let data = [
      //   // row1Obj,
      // ];
      // console.log(data);

      // let customerNamesAsColumns = [{
      //   "dataField": '',
      //   "text": ""
      // }];

      // res.data && res.data.forEach((customer) => {
      //   customerNamesAsColumns.push({
      //     "dataField": `${customer.customerName}`,
      //     "text": `${customer.customerName}`
      //   })
      // });

      // customerNamesAsColumns.push({
      //   "dataField": "",
      //   "text": "Current Account"
      // });

      // setCustomerNamesAsColumns(customerNamesAsColumns);
      setTEQ(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* <pre>{JSON.stringify(customerNamesAsColumns, null, 2)}</pre> */}

      {/* {customerNamesAsColumns.length && <BootstrapTable
        keyField="id"
        striped
        hover
        condensed
        noDataIndication="Table is Empty"
        data={ teq }
        columns={ customerNamesAsColumns }
      />} */}

      {/* <ReactTable
        data={teq}
        // filterable
        columns={[
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}></b>,
            accessor: "customerName",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => props.original.customerName,
            style: { textAlign: 'center' }
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Customer 1</b>,
            accessor: "overallTEQScore",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => props.original.overallTEQScore,
            style: { textAlign: 'center' }
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Customer 2</b>,
            accessor: "customersAffinityTowardsCisco",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => props.original.customersAffinityTowardsCisco,
            style: { textAlign: 'center' }
          },
          {
            Header: <b style={{ 'whiteSpace': 'normal' }}>Customer 3</b>,
            accessor: "techAdoption",
            sortable: true,
            resizable: true,
            filterable: false,
            Cell: props => props.original.techAdoption,
            style: { textAlign: 'center' }
          }
        ]}
        defaultPageSize={10}
        style={{ height: "400px" }}
        className="-striped -highlight"
      /> */}

      <div className="container">
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
                    {/* {JSON.stringify(item.top3InvestmentCategories)} */}
                    {Object.keys(item.top3InvestmentCategories).map((i, index) => {
                      return <span key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 10, fontWeight: 600, textAlign: 'center', height: '-webkit-fill-available', width: `${(item.top3InvestmentCategories[i] / Object.values(item.top3InvestmentCategories).reduce((a,b) => a + b)) * 100}%`
                    }}>{i}</span>
                    // return <span>{(item.top3InvestmentCategories[i] / Object.values(item.top3InvestmentCategories).reduce((a,b) => a + b) * 100)}</span>
                    })}
                  </td>
                  <td style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 4fr)', padding: '4px 10px' }}>
                    {/* {JSON.stringify(item.spendDistribution)} */}
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
