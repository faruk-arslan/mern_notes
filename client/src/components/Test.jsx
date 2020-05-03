import React, { useState, useEffect } from 'react';

function Test() {
    const [testData, setTestData] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        // same as setCars({cars: cars}) with setCars({cars})
        fetch('/api/test').then(res => res.json()).then(test => setTestData(test));
    });

    return (
        <div>
            <h2>Test Data</h2>
            <ul>
                {testData.map((item, index) => {
                    return <li key={index}>{item.data}</li>
                })}
            </ul>
        </div>
    );
}

export default Test;
