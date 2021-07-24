import React, { useState, useEffect } from 'react';
import { Accordion, Button, Card, Form, Row, Toggle } from 'react-bootstrap';
import c3 from 'c3';
import d3 from 'd3';
import 'c3/c3.css';
import './BuyerPersona.scss';

export default function BuyerPersona() {
    const [ buyerPersonas ] = useState([
        'Historical Purchase Data',
        'Buying Center: Minneapolis',
        'Existing AM Relationships',
        'CX Level Decision Maker'
    ]);
    const [ companies ] = useState([
        'Sears, Roebuck and Co.',
        'Siemens USA',
        'The Pepsi Bottling Group',
        'Aloca',
        'Harman International',
        'Colgate - Palmolive'
    ]);
    const [ identifiedCompetitors ] = useState([
        {
            'company': 'IBM Corporation',
            'accounts': [
                'Collaboration',
                'Data Center'
            ]
        },{
            'company': 'Broadcom',
            'accounts': [
                'Network Computing'
            ]
        },{
            'company': 'IBM Corporation',
            'accounts': [
                'Data Center',
                'Cloud'
            ]
        }
    ]);
    const [ selectedCompany, setSelectedCompany ] = useState("");

    useEffect(() => {
        loadBookingsEntity();
        loadBookingsSubEntity();
    }, []);

    const loadBookingsEntity = () => {
        const listOfCategories = [
            'Enterprise Networking',
            'Services',
            'Wireless',
            'Data Center',
            'Security',
            'Collaboration',
            'Analytics',
            'Services ASS_L1',
            'SP Routing',
            'Merak',
            'Enterprise Routing'
        ];

        const listOfCategoryRelatedValues = [
            1.79,
            0.82,
            0.48,
            1.14,
            0.11,
            0.09,
            0.04,
            0.03,
            0.02,
            0.01,
            0.00
        ];

        
        let maxLabelWidth = 0;
        let totalDataValue = 0;

        listOfCategoryRelatedValues.forEach(function(d){
            totalDataValue += d[1];
        });

        const font = '10px sans-serif'
        listOfCategoryRelatedValues.forEach(function(d){
            const label = d[0] + ": " + d3.format(",.0f")(d[1]) + " ["+d3.format(".2%")(d[1]/totalDataValue)+"]"; 
            maxLabelWidth = Math.max(maxLabelWidth, getWidth(label, font));
        });

        c3.generate({
            bindto: "#bookingsEntity",
            data: {
                x: 'x',
                columns: [
                    [ 'x', ...listOfCategories ],
                    [ 'data1', ...listOfCategoryRelatedValues ]
                ],
                onclick: function (d) {
                    console.log(this.internal.config.axis_x_categories[d.x]);
                    let label = this.internal.config.axis_x_categories[d.x];
                },
                type: "bar",
                labels: {
                    show: true,
                    format: {
                      data1: function (v, id, i, j) { return `$${v}M`; },
                    }
                },
                unload: true,
            },
            bar: {
                width: {
                    ratio: 0.4
                }
            },
            size: {
                height: '100vh'
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category',
                    tick: {
                        rotate: 75,
                        multiline: false
                    }
                },
                y: {
                    show: false,
                    padding : {
                        top: Math.ceil(maxLabelWidth)
                    }
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: false
            }
        });
    }

    const loadBookingsSubEntity = () => {
        const listOfCategories = [
            'Enterprise Switch',
            'Services TS',
            'Wireless',
            'Enterprise Switches',
            'Optics-Enterprise',
            'Optics DC Allocation',
            'Conference',
            'APM',
            'AMP',
            'ISE',
            'Next Gen'
        ];

        const listOfCategoryRelatedValues = [
            1.48,
            0.82,
            0.48,
            1.14,
            0.11,
            0.09,
            0.04,
            0.03,
            0.02,
            0.01,
            0.00
        ];

        let maxLabelWidth = 0;
        let totalDataValue = 0;

        listOfCategoryRelatedValues.forEach(function(d){
            totalDataValue += d[1];
        });

        const font = '10px sans-serif'
        listOfCategoryRelatedValues.forEach(function(d){
            const label = d[0] + ": " + d3.format(",.0f")(d[1]) + " ["+d3.format(".2%")(d[1]/totalDataValue)+"]"; 
            maxLabelWidth = Math.max(maxLabelWidth, getWidth(label, font));
        });

        c3.generate({
            bindto: "#bookingsSubEntity",
            data: {
                x: 'x',
                columns: [
                    [ 'x', ...listOfCategories ],
                    [ 'data1', ...listOfCategoryRelatedValues ]
                ],
                onclick: function (d) {
                    console.log(this.internal.config.axis_x_categories[d.x]);
                    let label = this.internal.config.axis_x_categories[d.x];
                },
                type: "bar",
                labels: {
                    show: true,
                    format: {
                      data1: function (v, id, i, j) { return `$${v}M`; },
                    }
                },
                unload: true,
            },
            bar: {
                width: {
                    ratio: 0.4
                }
            },
            size: {
                height: '100vh'
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category',
                    tick: {
                        rotate: 75,
                        multiline: false
                    }
                },
                y: {
                    show: false,
                    padding : {
                        top: Math.ceil(maxLabelWidth)
                    }
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: false
            }
        });
    }

    const getWidth = (text, font) => {
        const canvas = document.createElement('canvas'),
              context = canvas.getContext('2d');
        context.font = font;
        return context.measureText(text).width;
    }

    return (
        <div className="mt-4 mb-4">
            <Card className="p-2 mr-4 ml-4" style={{ backgroundColor: '#f5f5f5' }}>
                <p style={{ margin: 0, color: '#000000', fontWeight: 500, fontSize: 20 }}>Company Leader Buyer Persona</p>
                <p style={{ margin: 0, color: '#005073', fontWeight: 500, fontSize: 16 }}>Paula Davis</p>
                <p style={{ margin: 0, color: '#7a7a7a', fontWeight: 500, fontSize: 12 }}>Chief Communications Officers | Colgate - Palmolive</p>
                <div className="pt-2">
                    {buyerPersonas.map((item, index) => {
                        return (
                            <Button className="mr-3" key={index} style={{ backgroundColor: '#005073', fontSize: 10 }}>{item}</Button>
                        )
                    })}
                </div>
            </Card>

            <div className="w-50 mx-auto mt-4 mb-4">
                <p style={{ margin: 0 }}>Buyer Full Name</p>
                <Form.Group>
                    <Form.Control as="select" size="sm">
                        <option>Paula Davis</option>
                    </Form.Control>
                </Form.Group>
            </div>

            <div style={{ backgroundColor: '#f5f5f5' }}>
                <div className="row m-0 p-4">
                    <div className="col-md-3" style={{ borderRight: '1px solid #005073' }}>
                        <p style={{ margin: 0, fontWeight: 500, fontSize: 28, color: '#005073' }}>Paula Davis</p>
                        <p style={{ margin: 0, height: 2, borderBottom: '4px solid #005073', borderRadius: 4 }}></p>
                        <p className="mt-2" style={{ margin: 0, color: '#7a7a7a', fontWeight: 500, fontSize: 12 }}>Chief Communications Officers</p>
                        <p style={{ margin: 0, color: '#7a7a7a', fontWeight: 500, fontSize: 12 }}>Colgate - Palmolive</p>
                        <p style={{ margin: 0, color: '#7a7a7a', fontWeight: 500, fontSize: 12 }}>City: New York</p>
                    </div>
                    <div className="col-md-9" style={{ paddingLeft: 60 }}>
                        <ul style={{ listStyleType: "decimal", paddingInlineStart: 20 }}>
                            <li style={{ color: '#7a7a7a' }}>Undergraduate degree from university of Michigan</li>
                            <li style={{ color: '#7a7a7a' }}>MBA from Kellogg</li>
                            <li style={{ color: '#7a7a7a' }}>Have served awesome companies, including Sara Lee Corporation, Sears, Roebuck and Co., e-commerce startup MVP.com, Siemens, Pepsi, Aloca, Harman (now a division of Samsung) and Colgate-Palmolive</li>
                        </ul>
                        <p>Specialities:</p>
                        <p style={{ margin: 0, color: '#7a7a7a' }}>Transformation and Change Management, Reputation Management, Media Relations, Internet Communications, Corporate Social Responsibility, Financial Communications, Issues and Crisis Management, Sustainability</p>
                    </div>
                </div>

                <div className="companies d-flex justify-content-start align-items-center pt-2 pb-2" style={{ backgroundColor: '#ffffff', overflowX: 'scroll' }}>
                    {companies.map((item, index) => {
                        return (
                            <div className="w-100">
                                <div style={{ backgroundColor: '#f5f5f5' }}>
                                    <p
                                        key={index}
                                        className="company d-flex justify-content-center align-items-center pl-4 pr-4 pb-2"
                                        onClick={(e) => setSelectedCompany(item)}
                                        style={{ margin: 0, fontSize: 16, color: '#0a5779', backgroundColor: '#ffffff', whiteSpace: 'nowrap', borderBottom: item === selectedCompany ? "6px solid #005073" : "6px solid #f5f5f5" }}
                                    >
                                        {item}
                                    </p>
                                </div>
                                {item === selectedCompany ? <p className="d-flex justify-content-center align-items-center" style={{ margin: 0, whiteSpace: 'nowrap', backgroundColor: '#ffffff' }}>Jan 2017 to Till Date</p> : <p style={{ margin: 0, color: '#ffffff', visibility: 'hidden' }}>&nbsp;</p>}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="mt-4 mr-4 ml-4">
                <p style={{ fontSize: 22 }}>Occupation Summary</p>
                <Accordion defaultActiveKey="0">
                    <Card className="rounded-0">
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <p style={{ margin: 0, fontSize: 14, color: '#005073' }}>Chief Communications Officer</p>
                            <p style={{ margin: 0, fontSize: 11, color: '#b6b6b6' }}>Aug 2018 to Till Date</p>
                            <p style={{ margin: 0, fontSize: 11, color: '#7a7a7a', fontWeight: 600 }}>AM with the account during time period : Leslie Witkowski</p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <p className="d-flex justify-content-center align-items-center" style={{ fontSize: 16, color: '#005073' }}>Below is the summary of Bookings from Aug 2018 till date in Colgate Palmolive - New York</p>
                                <div className="row">
                                    <div className="col-md-6 pt-4 pb-4 pl-3">
                                        <Card className="rounded-0">
                                            <div className="p-2">
                                                <p className="d-flex justify-content-center align-items-center" style={{ fontSize: 16 }}>Total Bookings</p>
                                                <Card className="rounded-0">
                                                    <Card.Header className="d-flex justify-content-center align-items-center" style={{ fontSize: 16 }}>$3.54M</Card.Header>
                                                    <Card.Body>
                                                        <p className="d-flex justify-content-center align-items-center">Bookings Entity</p>
                                                        <div id="bookingsEntity"></div>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        </Card>
                                    </div>
                                    <div className="col-md-6 pt-4 pb-4 pr-3">
                                        <Card className="rounded-0">
                                            <div className="p-2">
                                                <p className="d-flex justify-content-center align-items-center" style={{ fontSize: 16 }}>Software %</p>
                                                <Card className="rounded-0">
                                                    <Card.Header className="d-flex justify-content-center align-items-center" style={{ fontSize: 16 }}>20.4%</Card.Header>
                                                    <Card.Body>
                                                        <p className="d-flex justify-content-center align-items-center">Bookings Sub Entity</p>
                                                        <div id="bookingsSubEntity"></div>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                                <div className="pt-2 pb-2">
                                    <Card className="pt-2 pr-4 pb-2 pl-4" style={{ backgroundColor: '#f5f5f5' }}>
                                        <p style={{ fontSize: 16 }}>Competitors identified in New York with Colgate Palmolive from Aug 2018 till date</p>
                                        {identifiedCompetitors.map((item, index) => {
                                            return (
                                                <div className="d-flex justify-content-start align-items-baseline pb-2">
                                                    <div style={{ width: 200 }}>
                                                        <p style={{ margin: 0, color: '#005073' }}>{item.company}</p>
                                                    </div>
                                                    <div>
                                                        {item.accounts.map((i, idx) => {
                                                            return (
                                                                <Button key={idx} className="mr-3" style={{ backgroundColor: '#005073', fontSize: 10 }}>{i}</Button>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </Card>
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <p style={{ margin: 0, fontSize: 14, color: '#005073' }}>Communications Officer</p>
                            <p style={{ margin: 0, fontSize: 11, color: '#b6b6b6' }}>Jan 2017 to Aug 2018</p>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Button style={{ height: 24, fontSize: 10 }} size="sm" variant="outline-danger">Coming soon..</Button>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    )
}
