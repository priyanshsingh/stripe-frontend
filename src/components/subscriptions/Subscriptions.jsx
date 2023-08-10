import React from 'react';
import { useState } from 'react';
import './subscriptions.css';


const Subscriptions = () => {
    const [showYearly, setShowYearly] = useState(false);

    const togglePrices = () => {
        setShowYearly(!showYearly);
    };
    return (
        <div className="subscriptions-container">
            <h2>Choose the right plan for you</h2>

            <table className="subscriptions-table">
                <thead>
                    <tr>
                        <th>
                            <div className="toggle-container">
                                <button
                                    className={`toggle-button ${showYearly ? 'active' : ''}`}
                                    onClick={togglePrices}
                                >
                                    Yearly
                                </button>
                                <button
                                    className={`toggle-button ${showYearly ? '' : 'active'}`}
                                    onClick={togglePrices}
                                >
                                    Monthly
                                </button>
                            </div>
                        </th>
                        <th>Basic</th>
                        <th>Standard</th>
                        <th>Premium</th>
                        <th>Regular</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Price</td>
                        <td>{showYearly ? '₹1000' : '₹100'}</td>
                        <td>{showYearly ? '₹2000' : '₹200'}</td>
                        <td>{showYearly ? '₹5000' : '₹500'}</td>
                        <td>{showYearly ? '₹7000' : '₹700'}</td>
                    </tr>
                    <tr>
                        <td>Video quality</td>
                        <td>Good</td>
                        <td>Good</td>
                        <td>Better</td>
                        <td>Best</td>
                    </tr>
                    <tr>
                        <td>Resolution</td>
                        <td>480p</td>
                        <td>720p</td>
                        <td>1080p</td>
                        <td>4K+HDR</td>
                    </tr>
                    <tr>
                        <td>Devices you can use to watch</td>
                        <td>Phone</td>
                        <td>Phone<br />Tablet</td>
                        <td>Phone<br />Tablet<br />Computer</td>
                        <td>Phone<br />Tablet<br />TV</td>
                    </tr>
                    <tr>
                        <td>Number of active screens at one time</td>
                        <td>1</td>
                        <td>3</td>
                        <td>5</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
};

export default Subscriptions;
