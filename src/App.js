import { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.css';

function App() {
  const [ data, setData ] = useState([]);
  const [ filteredData, setFilteredData ] = useState([]);
  const [ selectedAccount, setSelectedAccount ] = useState("");
  const [ selectedVendor, setSelectedVendor ] = useState("");
  const [ isRenewal, setIsRenewal ] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/data/competitor_insights.json`)
    .then((res) => {
      let filteredOverallData = []

      Object.keys(res.data[0].accounts).map((account) => {
        return Object.values(res.data[0].accounts[account]).map((item) => item.renewal_flag === "No" && filteredOverallData.push(item));
      });

      console.log(filteredOverallData);
      setFilteredData(filteredOverallData);
      setData(res.data);
    })
    .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getDataAfterToggle();
  }, [isRenewal]);

  useEffect(() => {
    getDataAfterSelectedVendor();
  }, [selectedVendor]);

  useEffect(() => {
    getDataAfterSelectedAccount();
  }, [selectedAccount]);

  const handleSelectedAccount = (e, account) => {
    setSelectedVendor("");
    setSelectedAccount(account);
  }

  const getDataAfterSelectedAccount = () => {
    let filteredSelectedAccountData = []

    if(isRenewal && selectedAccount) {
      // console.log('called at first condition');
      data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "Yes" && filteredSelectedAccountData.push(item));
      setFilteredData(filteredSelectedAccountData);

    } else if(!isRenewal && selectedAccount) {
      // console.log('called at second condition');
      data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "No" && filteredSelectedAccountData.push(item));
      setFilteredData(filteredSelectedAccountData);
    }
  }

  const handleRemoveSelectedAccount = (e) => {
    setIsRenewal(false);
    setSelectedAccount("");
    setSelectedVendor("");

    let filteredOverallData = []

    Object.keys(data[0].accounts).map((account) => {
      return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "No" && filteredOverallData.push(item));
    });

    setFilteredData(filteredOverallData);
  }

  const handleSelectedVendor = (e, vendor) => {
    setSelectedVendor(vendor);
  }

  const getDataAfterSelectedVendor = () => {
    let filteredSelectedVendorData = []

    if(isRenewal && selectedAccount && selectedVendor) {
      // console.log('called at first condition');
      data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "Yes" && item.vendor === selectedVendor && filteredSelectedVendorData.push(item));
      setFilteredData(filteredSelectedVendorData);

    } else if(isRenewal && !selectedAccount && selectedVendor) {
      // console.log('called at third condition');
      Object.keys(data[0].accounts).map((account) => {
        return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "Yes" && item.vendor === selectedVendor && filteredSelectedVendorData.push(item));
      });
      setFilteredData(filteredSelectedVendorData);

    } else if(!isRenewal && selectedAccount && selectedVendor) {
      // console.log('called at second condition');
      data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "No" && item.vendor === selectedVendor && filteredSelectedVendorData.push(item));
      setFilteredData(filteredSelectedVendorData);

    } else if(!isRenewal && !selectedAccount && selectedVendor) {
      // console.log('called at third condition');
      Object.keys(data[0].accounts).map((account) => {
        return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "No" && item.vendor === selectedVendor && filteredSelectedVendorData.push(item));
      });
      setFilteredData(filteredSelectedVendorData);
    }
  }

  const handleRenewalToggle = (e) => {
    setIsRenewal((prevState) => !prevState);
  }

  const getDataAfterToggle = () => {
    let filteredRenewalData = []

    if(!isRenewal && !selectedAccount && selectedVendor) {
      // console.log('called at first condition');
      data[0] && Object.keys(data[0].accounts).map((account) => {
        return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "No" && item.vendor === selectedVendor && filteredRenewalData.push(item));
      });
      setFilteredData(filteredRenewalData);

    } else if(isRenewal && !selectedAccount && selectedVendor) {
      // console.log('called at second condition');
      data[0] && Object.keys(data[0].accounts).map((account) => {
        return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "Yes" && item.vendor === selectedVendor && filteredRenewalData.push(item));
      });
      setFilteredData(filteredRenewalData);

    } else if(isRenewal && selectedAccount && selectedVendor) {
      // console.log('called at third condition');
      data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "Yes" && item.vendor === selectedVendor && filteredRenewalData.push(item));
      setFilteredData(filteredRenewalData);
    
    } else if(!isRenewal && selectedAccount && selectedVendor) {
      // console.log('called at fourth condition');
      data[0] && Object.values(data[0].accounts[selectedAccount]).map((item) => item.renewal_flag === "No" && item.vendor === selectedVendor && filteredRenewalData.push(item));
      setFilteredData(filteredRenewalData);

    } else if (isRenewal && selectedAccount) {
      // console.log('called at fifth condition');
      filteredRenewalData = Object.values(data[0].accounts[selectedAccount]).filter((item) => {
        return item.renewal_flag === "Yes"
      })
      setFilteredData(filteredRenewalData);

    } else if(isRenewal && !selectedAccount) {
      // console.log('called at sixth condition');
      data[0] && Object.keys(data[0].accounts).map((account) => {
        return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "Yes" && filteredRenewalData.push(item));
      });
      setFilteredData(filteredRenewalData);

    } else if(!isRenewal && selectedAccount) {
      // console.log('called at seventh condition');
      filteredRenewalData = Object.values(data[0].accounts[selectedAccount]).filter((item) => {
        return item.renewal_flag === "No"
      })
      setFilteredData(filteredRenewalData);

    } else {
      // console.log('called at eighth condition');
      data[0] && Object.keys(data[0].accounts).map((account) => {
        return Object.values(data[0].accounts[account]).map((item) => item.renewal_flag === "No" && filteredRenewalData.push(item));
      });
      setFilteredData(filteredRenewalData);
    }
  }

  const columns = [{
      dataField: 'vendor',
      text: 'vendor'
    }, {
      dataField: 'product',
      text: 'Product Name'
    }, {
      dataField: 'renewal_flag',
      text: 'Renewal Flag'
    }
  ]

  const paginationOption = {
    sizePerPage: 5
  }

  // console.log("filteredData", filteredData);

  return (
    <div className="App">
      <div className="counts">
        <div>
          <p>ACTIVE COMPETITORS</p>
          {data[0] && data[0].active_competitors}
        </div>
        <div>
          <p>ACTIVE CONTRACTS</p>
          {data[0] && data[0].active_contracts}
        </div>
        <div>
          <p>RENEWAL CONTRACTS</p>
          {data[0] && data[0].renewal_contracts}
        </div>
      </div>
    
      <div className="accounts">
        {data[0] && Object.keys(data[0].accounts).filter((account) => account !== "Overall").map((account, index) => {
          return (
            <div key={index}>
              <button className="accountsAdd" onClick={(e) => handleSelectedAccount(e, account)}
                style={{ backgroundColor: account === selectedAccount ? '#049fd9' : '#808080' }}
              >{account}</button>
              {account === selectedAccount && <button className="accountsRemove" onClick={(e) => handleRemoveSelectedAccount(e)}>x</button>}
            </div>
          );
        })}
      </div>

      <div className="vendors">
        {data[0] && !selectedAccount && Object.values(data[0].vendors["Overall"]).map((vendor, index) => {
          return (
            <div key={index} onClick={(e) => vendor.competitor_name === "Cisco Systems, Inc." ? null :
              handleSelectedVendor(e, vendor.competitor_name)}
              style={{ backgroundColor: vendor.competitor_name === selectedVendor ? '#049fd9' : '#808080' }}
            >
              <p>{vendor.competitor_name}</p>
            </div>
          )
        })}
        {data[0] && selectedAccount && Object.values(data[0].vendors[selectedAccount]).map((vendor, index) => {
          return (
            <div key={index} onClick={(e) => vendor.competitor_name === "Cisco Systems, Inc." ? null : handleSelectedVendor(e, vendor.competitor_name)}
              style={{ backgroundColor: vendor.competitor_name === selectedVendor ? '#049fd9' : '#808080' }}
            >
              <p>{vendor.competitor_name}</p>
            </div>
          )
        })}
      </div>

      <BootstrapSwitchButton
        checked={isRenewal}
        onstyle="success"
        offstyle="danger"
        onlabel='Renewal'
        offlabel='Non-renewal'
        size="xs"
        width={120}
        onChange={handleRenewalToggle}
      />

      {/* <pre>{JSON.stringify({
        filteredData: JSON.stringify(filteredData, null, 2),
        filteredDataLength: filteredData.length,
        isRenewal,
        selectedAccount,
        selectedVendor
      }, null, 2)}</pre> */}
    
      <div className="table">
        <p>No. of filtered Records: {filteredData && filteredData.length}</p>
        <BootstrapTable
          keyField="id"
          striped
          hover
          condensed
          noDataIndication="Table is Empty"
          data={ filteredData }
          columns={ columns }
          pagination={ paginationFactory(paginationOption) }
        />
      </div>
    </div>
  );
}

export default App;
