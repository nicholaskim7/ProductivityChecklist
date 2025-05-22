"use client"
import React, { useState, use, useEffect } from 'react'
import styles from '../../css/productivity.module.css';

export default function productivity({ params }: { params: Promise<{ month: string }> }) {
  const { month } = use(params);

  const rows = Array.from({ length: 31 }, (_, i) => i+1); // 31 days for typical month will fix later

  const months = ["january", "febuary", "march","april", "may", "june", "july", "august", "september", "october", "november", "december"];

  const columns = ['apps', 'leet', 'system', 'read', 'cardio'];

  const [isChecked, setIsChecked] = useState<{ [key: string]: boolean }>({}); // mapping keys to booleans to keep track of multiple checkbox states 
  // Example: ("2-leet" : False) This represents day 2 of column leetcode and it is currently False meaning it is not checked off.

  const [storedData, setStoredData] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
      const localData = localStorage.getItem(`checkedBoxes-${month.toLowerCase()}`); // grab all stored checkedBox states for the month that is passed through url. (month specific localstorage)
      if (localData) {
        const parsedData = JSON.parse(localData); 
        setIsChecked(parsedData); // set the checked states too whatever is in localstorage if we have it
      }
    }, []);

  const handleCheck = (row: number, col: string) => {
    const key = `${row}-${col}`; // compute the checkbox that was clicked unique key
    setIsChecked(prev => {
      const updated = { ...prev, [key]: !prev[key] }; // coppies the prev state and flips the value for just that checkbox key. logs the entire isChecked object when a checkbox is clicked
      console.log("Updated checked state: ", updated);
      localStorage.setItem(`checkedBoxes-${month.toLowerCase()}`, JSON.stringify(updated)); // after any change to any check boxes state update local storage to month specific localstorage
      return updated;
    });
    // only the clicked checkbox updates
  };

  if (months.includes(month.toLowerCase())) {
  return (
    <div className={styles.container}>
      <h1>{month}</h1>
      <div className={styles.grid}>
        {/* column headers */}
        <div className={styles.header}>Date</div>
      
        {columns.map(col => (
          <div key={col} className={styles.header}>{col.charAt(0).toUpperCase() + col.slice(1)}</div>
        ))}

        {rows.map((day) => (
          <React.Fragment key={day}>
            <div className={styles.container}>
              <label className={styles.dateLabel}>{day}</label>
            </div>
            {columns.map((col) => { // each checkbox gets its own unique key created with the date and the column task. Ex: "4-read"
              const key = `${day}-${col}`;
              return (
                <input
                  key={key}
                  type="checkbox"
                  checked={!!isChecked[key]} // !! ensures that the result is either true or false. Undefined, or not checked off boxes will defualt to False
                  onChange={() => handleCheck(day, col)} // individually updated
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
else {
  return (
    <h1>Please visit a valid month</h1>
  )
}
}

