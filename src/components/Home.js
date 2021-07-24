import { useState, useEffect } from 'react';
import ReactExport from "react-export-excel";
import { CSVLink } from "react-csv";
import c3 from 'c3';
import ReactTable from "react-table-6";
import { Button, Modal } from 'react-bootstrap';
import BuyerPersona from './BuyerPersona';
import Insights from './Insights';
import { competitorInsightsData } from '../data/competitor_insights';
import { teq } from '../data/customer_insights';
import { displaceable } from '../data/displaceable';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'c3/c3.css';
import './Home.scss';

export default function Home() {
  const [ result, setResult ] = useState([]);
  console.log(result);
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [ competitorSpends, setCompetitorSpends ] = useState([]);
  const [ totalEstimatedSpend, setTotalEstimatedSpend ] = useState("");
  const [ showDeepDive, setShowDeepDive ] = useState(false);
  const [ newTeq, setNewTeq ] = useState([]);
  const [ deepDiveTableData, setDeepDiveTableData ] = useState([]);
  const [ categoryBarChartData, setCategoryBarChartData ] = useState([]);
  const [ vendorBarChartData, setVendorBarChartData ] = useState([]);

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const handleCloseDeepDive = () => {
    resetDeepDiveTable();
    resetVendorChart();
    setShowDeepDive(false);
  }
  const handleShowDeepDive = () => setShowDeepDive(true);

  const resetDeepDiveTable = () => {
    const deepDiveTableData = []
    Object.keys(displaceable).map((item) => {
      displaceable[item].forEach((i) => {
        deepDiveTableData.push({
          vendor: i.competitor,
          product: i.product.map((prod) => <li>{prod.product_name}</li>),
          category: item
        })
      })
    });
    setDeepDiveTableData(deepDiveTableData);
  }

  const resetVendorChart = () => {
    let vendorSpends = [];
    Object.keys(displaceable).map((item) => {
      displaceable[item].map((i) => {
        console.log(i);
        vendorSpends.push({
          vendorName: i.competitor,
          value: displaceable[item][0] ? Math.ceil(displaceable[item][0].competitor_spend / 1000000) : 0
        })
      })
    })
    setVendorBarChartData(vendorSpends);
  }

  useEffect(() => {
    const deepDiveTableData = []
    Object.keys(displaceable).map((item) => {
      displaceable[item].forEach((i) => {
        deepDiveTableData.push({
          vendor: i.competitor,
          product: i.product.map((prod) => <li>{prod.product_name}</li>),
          category: item
        })
      })
    });
    setDeepDiveTableData(deepDiveTableData);

    let categorySpends = [];
    Object.keys(displaceable).map((item) => {
      categorySpends.push({
        categoryName: item,
        value: displaceable[item][0] ? Math.ceil(displaceable[item][0].category_spend / 1000000) : 0
      })
    })
    setCategoryBarChartData(categorySpends);

    let vendorSpends = [];
    Object.keys(displaceable).map((item) => {
      displaceable[item].map((i) => {
        vendorSpends.push({
          vendorName: i.competitor,
          value: displaceable[item][0] ? Math.ceil(displaceable[item][0].competitor_spend / 1000000) : 0
        })
      })
    })
    setVendorBarChartData(vendorSpends);

    const newTeq = teq.map((item) => {
      return  {
        customerName: item.customerName,
        overallTEQScore: item.overallTEQScore,
        customersAffinityTowardsCisco: item.customersAffinityTowardsCisco,
        techAdoption: item.techAdoption,
        top3InvestmentCategories: Object.entries(item.top3InvestmentCategories).map((i, idx) => `[${idx+1}] ${i.join(": ")}`).join(', '),
        spendDistribution: Object.entries(item.spendDistribution).map((i, idx) => `[${idx+1}] ${i.join(": ")}`).join(', '),
        top3PotentialPurchases: item.top3PotentialPurchases.map((i,idx) => `[${idx+1}] ${i.potential_purchase}`).join(', '),
        recentDealsClosed: item.recentDealsClosed,
        qualifiedUseCases: item.qualifiedUseCases
      }
    })

    console.log(newTeq);
    setNewTeq(newTeq);

    loadChart();  
  }, []);

  useEffect(() => {
    loadChart();
  }, [ competitorSpends ]);

  const loadChart = () => {
    c3.generate({
      bindto: "#chart",
      data: {
        columns: competitorSpends,
        type: "donut",
        colors: {
          'Others': '#808080',
          "Cisco Systems, Inc.": '#049AD2'
        },
        unload: true
      },
      size: {
        height: 300
      },
      donut: {
        title: totalEstimatedSpend
      }
    });
  }

  useEffect(() => {
    const reducer = (a, item) => {
      return { ...a, ...item };
    };
    const result = teq && teq[0] && Object.keys(teq[0]).map((key) => {
      return {
        propertyName: key,
        ...teq
          .map((a, i) => {
            return {
              [`customer${i}`]: a[key]
            };
          })
          .reduce(reducer)
      };
    });
    setResult(result);
  }, []);

  const capitalizePropertyNames = (propertyName) => {
    switch(propertyName) {
      case 'customerName':
        return 'Customer Name';
      case 'overallTEQScore':
        return 'Overall TEQ Score';
      case 'customersAffinityTowardsCisco':
        return `Customer's Affinity Towards Cisco`;
      case 'techAdoption':
        return 'Tech Adoption';
      case 'top3InvestmentCategories':
        return 'Top 3 Investment Categories';
      case 'spendDistribution':
        return 'Spend Distribution';
      case 'top3PotentialPurchases':
        return 'Top 3 Potential Purchases';
      case 'recentDealsClosed':
        return 'Recent Deals Closed';
      case 'qualifiedUseCases':
        return 'Qualified Use Cases';
      default:
        return;
    }
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

    const others = competitorInsightsData[0].vendors[category].map((item) => item.estimated_spend).reduce((b,c) => b + c);
    chartArray.push([ "Others", others ]);

    setCompetitorSpends([ ...chartArray ]);

    const total = competitorInsightsData[0].vendors[category][0].category_estimated_spend;
    let value = total.toLocaleString("en-US", { style: "currency", currency: "USD" });
    setTotalEstimatedSpend(value);

    // const colors = chartArray.map((item) => {
    //   return {
    //     "vendor": item[0],
    //     "color": item[0] === "Cisco Systems, Inc." ? "#1A65B0" :
    //       item[0] === "Others" ? "#d9d9d9"
    //       : item[0] !== ( "Cisco Systems, Inc." || "Others") ? pickRandomColor() : pickRandomColor()
    //   }
    // })

    // ISSUE:
    // let allColors = [
    //   "#C8F4FF",
    //   "#C8F4FF",
    //   "#C8F4FF",
    //   "#1A65B0",
    //   "#d9d9d9"
    // ];

    // const repeatedColors = [
    //   {vendor: "HCL Technologies,Ltd.", color: "#00BCEB"},
    //   {vendor: "Microsoft Corporation", color: "#00BCEB"},
    //   {vendor: "Cisco Systems, Inc.", color: "#1A65B0"},
    //   {vendor: "Others", color: "#d9d9d9"}
    // ];
    // console.log(repeatedColors);

    // let final = Object.values(repeatedColors.reduce((acc,cur)=>Object.assign(acc,{[cur.color]:cur}),{}));
    // console.log(final);

    // const colorCodesObj = colors.reduce((obj, item) => Object.assign(obj, { [item.vendor]: item.color }), {});
    // setColorCodesObj(colorCodesObj);
  }

  useEffect(() => {
    let sortedCategories = categoryBarChartData.sort(function(a, b){ return b.value - a.value});
    let listOfCategories = sortedCategories.map((item) => item.categoryName);
    let listOfCategoryRelatedValues = sortedCategories.map((item) => item.value);

    c3.generate({
      bindto: "#displacebaleMarketCategory",
      data: {
        x: 'x',
        columns: [
          [ 'x', ...listOfCategories ],
          [ 'data1', ...listOfCategoryRelatedValues ]
        ],
        onclick: function (d) {
          console.log(this.internal.config.axis_x_categories[d.x]);
          let label = this.internal.config.axis_x_categories[d.x];
          callVendorChartUpdate(label)
          callDeepDiveTableUpdate(label)
        },
        type: "bar",
        labels: true,
        unload: true
      },
      bar: {
        width: {
          ratio: 0.3
        }
      },
      size: {
        height: 200
      },
      axis: {
        rotated: true,
        x: {
          type: 'category'
        },
        y: {
          show: false
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false
      }
    });

    let sortedVendors = vendorBarChartData.sort(function(a, b){ return b.value - a.value });
    let listOfVenodrs = sortedVendors.map((item) => item.vendorName);
    let listOfVendorRelatedValues = sortedVendors.map((item) => item.value);

    c3.generate({
      bindto: "#vendorWiseEstimatedSpend",
      data: {
        x: 'x',
        columns: [
          [ 'x', ...listOfVenodrs ],
          [ 'data1', ...listOfVendorRelatedValues ]
        ],
        type: "bar",
        labels: true,
        unload: true
      },
      bar: {
        width: {
          ratio: 0.3
        }
      },
      size: {
        height: 200
      },
      axis: {
        rotated: true,
        x: {
          type: 'category'
        },
        y: {
          show: false
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false
      }
    });
  }, [ showDeepDive ])

  const callVendorChartUpdate = (label) => {
    let vendorSpends = [];
    displaceable[label].map((i) => {
      console.log(i);
      vendorSpends.push({
        vendorName: i.competitor,
        value: displaceable[label][0] ? Math.ceil(displaceable[label][0].competitor_spend / 1000000) : 0
      })
    })
    setVendorBarChartData(vendorSpends);
  }

  useEffect(() => {
    let sortedVendors = vendorBarChartData.sort(function(a, b){ return b.value - a.value });
    let listOfVenodrs = sortedVendors.map((item) => item.vendorName);
    let listOfVendorRelatedValues = sortedVendors.map((item) => item.value);

    c3.generate({
      bindto: "#vendorWiseEstimatedSpend",
      data: {
        x: 'x',
        columns: [
          [ 'x', ...listOfVenodrs ],
          [ 'data1', ...listOfVendorRelatedValues ]
        ],
        type: "bar",
        labels: true,
        unload: true
      },
      bar: {
        width: {
          ratio: 0.3
        }
      },
      size: {
        height: 200
      },
      axis: {
        rotated: true,
        x: {
          type: 'category'
        },
        y: {
          show: false
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false
      }
    });
  }, [ vendorBarChartData ]);

  const columns = [
    {
      dataField: 'vendor',
      text: 'Vendor'
    }, {
      dataField: 'product',
      text: 'Product'
    }, {
      dataField: 'category',
      text: 'Category'
    }
  ];

  const paginationOption = {
    sizePerPage: 5
  };

  const callDeepDiveTableUpdate = (label) => {
    const deepDiveTableData = [];
    displaceable[label].forEach((i) => {
      deepDiveTableData.push({
        vendor: i.competitor,
        product: i.product.map((prod) => <li>{prod.product_name}</li>),
        category: label
      })
    })
    setDeepDiveTableData(deepDiveTableData);
  }

  useEffect(() => {
    renderDeepDiveTable();
  }, [ deepDiveTableData ]);

  const renderDeepDiveTable = () => {
    return (
      <BootstrapTable
        keyField="id"
        striped
        hover
        condensed
        noDataIndication="Table is Empty"
        data={ deepDiveTableData }
        columns={ columns }
        pagination={ paginationFactory(paginationOption) }
      />
    )
  }

  return (
    <div style={{ margin: '0 40px' }}>
      <div>

        {/* Deep Dive Modal */}
        <>
          <Modal dialogClassName="deepDiveModal" show={showDeepDive} onHide={handleCloseDeepDive}>
            <Modal.Header closeButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto' }}>
              <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: '#808080' }}>displaceable market - deep dive</p>
            </Modal.Header>
            <Modal.Body>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 6fr)' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 0 34px', color: '#808080' }}>displaceable market – category</p>
                  <div id="displacebaleMarketCategory"></div>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 0 34px', color: '#808080' }}>Vendor wise estimated spend</p>
                  <div id="vendorWiseEstimatedSpend"></div>
                </div>
              </div>
              <div className="deepDive" style={{ paddingTop: 20 }}>
                {renderDeepDiveTable()}
              </div>
            </Modal.Body>
          </Modal>
        </>

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 6fr)', position: 'relative' }}>
          <div>
            <pre style={{ paddingTop: 10 }}>
              <b>
                {JSON.stringify({
                  selectedCategory,
                  competitorSpends,
                  totalEstimatedSpend
                }, null, '\t')}
              </b>
            </pre>
          </div>
          <div>
            <Button variant="info" style={{ marginTop: 20 }} onClick={handleShowDeepDive}>Deep Dive</Button>
            <div id="chart"></div>
          </div>
        </div>

        <div className="teq">
          <div className="d-flex justify-content-between align-items-center" style={{ paddingBottom: 10 }}>
            <div>
              <p style={{ display: 'flex', alignItems: 'baseline', margin: 0, color: '#005073', fontSize: 24 }}><b style={{ marginRight: 8 }}>T.E.Q.</b></p>
            </div>
            <div>
              <CSVLink data={teq}>
                <Button className="export" color="primary" style={{ marginRight: 10 }}>Export T.E.Q. in .csv</Button>
              </CSVLink>
              <ExcelFile
                filename="T.E.Q"
                element={<Button className="export" color="primary">Export T.E.Q. in .xlsx</Button>}
              >
                <ExcelSheet data={newTeq} name="T.E.Q">
                  <ExcelColumn label="Customer Name" value="customerName"/>
                  <ExcelColumn label="Overall TEQ Score" value="overallTEQScore" />
                  <ExcelColumn label="Customers Affinity Towards Cisco" value="customersAffinityTowardsCisco" />
                  <ExcelColumn label="Tech Adoption" value="techAdoption" />
                  <ExcelColumn label="Top 3 Investment Categories" value={(col) => col.top3InvestmentCategories} />
                  <ExcelColumn label="Spend Distribution" value={(col) => col.spendDistribution} />
                  <ExcelColumn label="Top 3 Potential Purchases" value={(col) => col.top3PotentialPurchases} />
                  <ExcelColumn label="Recent Deals Closed" value="recentDealsClosed" bgColor='yellow' />
                  <ExcelColumn label="Qualified Use Cases" value="qualifiedUseCases"/>
                </ExcelSheet>
              </ExcelFile>
            </div>
          </div>
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
                Cell: props => Array.isArray(props.original.customer0) ?
                  <span className={`${props.original.propertyName}`} style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    {props.original.customer0.map((i, index) => {
                      return <li
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          fontSize: 10,
                          whiteSpace: 'normal',
                          padding: '8px 0',
                        }}
                      >
                        {i.potential_purchase}
                      </li>
                    })}
                  </span>
                : typeof props.original.customer0 === "object" ? 
                  <span className={`${props.original.propertyName}`} style={{
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
                  <span className={`${props.original.propertyName}`} style={{
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
                  <span className={`${props.original.propertyName}`} style={{
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
              }
            ]}
            defaultPageSize={9}
            style={{ marginBottom: 25 }}
            className="-highlight"
          />
        </div>
      </div>
      <BuyerPersona />
      <Insights />
    </div>
  )
}
