import React, { useState } from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
    const [selectedYear, setSelectedYear] = useState(''); // State to manage the selected year

    const yearChangeHandler = (event) => {
        const selectedYear = event.target.value;
        setSelectedYear(selectedYear);
        props.onChangeFilter(selectedYear); // Pass the selected year to the parent component
    };

    return (
        <div className='expenses-filter'>
            <div className='expenses-filter__control'>
                <label>Filter by year</label>
                <select value={selectedYear} onChange={yearChangeHandler}>
                    <option value=''>All</option>
                    <option value='2022'>2022</option>
                    <option value='2023'>2023</option>
                    <option value='2024'>2024</option>
                    <option value='2025'>2025</option>
                </select>
            </div>
        </div>
    );
};

export default ExpensesFilter;