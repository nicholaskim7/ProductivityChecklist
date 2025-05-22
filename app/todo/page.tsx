"use client"
import { useState, useEffect } from "react";
import styles from "../css/todo.module.css";

export default function Todo() {
  const [formData, setFormData] = useState({ task: "", completed: false });
  const [storedData, setStoredData] = useState<{ task: string, completed: boolean }[] | null>(null);

  useEffect(() => {
    const localData = localStorage.getItem("tasks"); // grab all tasks from local storage
    if (localData) {
      setStoredData(JSON.parse(localData));
    }
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // upon changing input the formData will be updated
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.task){ // dont allow empty submission
      alert('Please enter a task');
      return;
    }
    const updatedData = [...(storedData || []), formData]; // append the new addition to the most up to date data we have
    localStorage.setItem("tasks", JSON.stringify(updatedData)); // update local storage with the new most up to date data
    setStoredData(updatedData); // set the stored data to the most up to date data
    setFormData({ task: '', completed: false }); // reset form entry
  };

  const handleDelete = (indexToRemove: number) => {
    if (!storedData) return; // handle empty local storage on delete
    const updatedData = storedData.filter((_, i) => i !== indexToRemove); // update the storedData to filter out the li with the index we want to remove
    localStorage.setItem("tasks", JSON.stringify(updatedData)); // then update local storage so we have the list without the li we deleted
    setStoredData(updatedData); // update stored data to most up to date list
  }

  const handleComplete = (indexToComplete: number) => {
    if (!storedData) return; // handle empty local storage
  
    const updatedData = storedData.map((task, index) => {
      if (index === indexToComplete) {
        return { ...task, completed: true };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedData)); // then update local storage
    setStoredData(updatedData); // update stored data to most up to date list
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="task" className={styles.label}>
          Task:
        </label>
        <input
          type="text"
          id="task"
          name="task"
          value={formData.task}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>

      {storedData == null ? ( // display loading... instead of initial empty state
        <p>Nothing yet</p>
      ) : (
        <ul className={styles.ul}>
        {storedData.map((item, index) => ( // we go through our array of tasks and render them to the frontend
        // conditionally style based on whether task is complete or not
          <li key={index} className={`${styles.li} ${item.completed ? styles.completed : ''}`}> 
            {item.task}
            {/* pass the index of the li that delete button was clicked */}
            <button onClick={() => handleDelete(index)} className={styles.delete}> 
              Delete
            </button>
            <button onClick={() => handleComplete(index)} className={styles.complete}> 
              Complete
            </button>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}

// what we learned:
// --DOM Manipulation
// --Local storage
// --From inputs
// --Event listeners
// --Manipulating arrays and re-rendering
// --persist data and get data from local storage
