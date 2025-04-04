<<<<<<< Updated upstream
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
=======
import React, { useState } from "react";
import { Link } from "react-router-dom";

>>>>>>> Stashed changes
import logo from "../assets/G1Logo.png";
import "../styles/journal.css";

function Journal() {
<<<<<<< Updated upstream
  const { state } = useLocation();
  const routine = state?.routine;
  const entryIdFromState = state?.entryId;
  const navigate = useNavigate();

  const [entryId, setEntryId] = useState(null);
  const [entryName, setEntryName] = useState("");
  const [mood, setMood] = useState("Neutral");
  const [exerciseData, setExerciseData] = useState([]);
  const [routineName, setRoutineName] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasLoadedEntry, setHasLoadedEntry] = useState(false); // to track if we have loaded an entry
  const [journalEntries, setJournalEntries] = useState([]); // to store journal history
  const [hovered, setHovered] = useState(null); // to track hovered entry to dispPlay edit btn

  useEffect(() => {
    const forceNew = state?.forceNew; //checks if creating a new entry

    if (routine?.id && routine.exercises && forceNew) {
      const defaultData = routine.exercises.map((name) => ({
        name,
        sets: "",
        reps: "",
        weight: "",
      }));
      setExerciseData(defaultData);
      setRoutineName(routine.name);
      setHasLoadedEntry(true); 
      setLoading(false);
      return;
    }

    if (routine?.id && routine.exercises && !forceNew) {
      fetch(`http://localhost:8080/api/journal/${routine.id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(({ entry }) => {
          if (entry) {
            setEntryId(entry.id);
            setEntryName(entry.entry_name);
            setMood(entry.mood);
            setExerciseData(entry.data);
          } else {
            const defaultData = routine.exercises.map((name) => ({
              name,
              sets: "",
              reps: "",
              weight: "",
            }));
            setExerciseData(defaultData);                               //plenty of AI use here
          }
          setRoutineName(routine.name);
          setHasLoadedEntry(true); 
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading journal:", err);
          setLoading(false);
        });
      return;
    }

    if (entryIdFromState) {
      fetch(`http://localhost:8080/api/journal/entry/${entryIdFromState}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((entry) => {
          setEntryId(entry.id);
          setEntryName(entry.entry_name);
          setMood(entry.mood);
          setExerciseData(entry.data);
          setRoutineName(entry.routine_name);
          setHasLoadedEntry(true); 
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading specific entry:", err);
          setLoading(false);
        });
      return;
    }

    // load previous journals
    fetch("http://localhost:8080/api/journal", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((entries) => {
        setJournalEntries(entries);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading journal entries:", err);
        setLoading(false);
      });
  }, [routine, entryIdFromState, state]);

  function handleChange(index, field, value) {
    const updated = [...exerciseData];
    updated[index][field] = value;
    setExerciseData(updated);
  }

  function handleSave() {
    const method = entryId ? "PUT" : "POST";
    const url = entryId
      ? `http://localhost:8080/api/journal/${entryId}`
      : `http://localhost:8080/api/journal`;

    fetch(url, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",               //AI use here
      },
      body: JSON.stringify({
        routine_id: routine?.id ?? null,
        entry_name: entryName,
        mood,
        data: exerciseData,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save");
        return res.json();
      })
      .then(() => {
        alert("Journal entry saved!");
        navigate("/journal", { replace: true, state: null });
        setEntryId(null);
        setHasLoadedEntry(false);
      })
      .catch((err) => {
        console.error("Save error:", err);
        alert("Failed to save journal entry.");
      });
  }

  if (loading) return <p>Loading journal...</p>;

  //  loads journals by default
  if (!hasLoadedEntry) {
    return (
      <div className="container">
        <div className="header">
          <img src={logo} alt="G1 Fitness Logo" className="logo" />
          <h1 className="title">Journal History</h1>
          <Link to="/">
            <button className="nav-button">Return Home</button>
          </Link>
        </div>

        <hr className="divider" />

        {journalEntries.length === 0 ? (
          <p>You haven't created any journal entries yet.</p>
        ) : (
          <div className="journal-history">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="routine-card"
                onMouseEnter={() => setHovered(entry.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <h3>{entry.entry_name}</h3>
                <p>Routine: {entry.routine_name}</p>
                <p>Mood: {entry.mood}</p>
                <p>Date: {entry.date_created}</p>

                {hovered === entry.id && (
                  <button
                    className="edit-button"
                    onClick={() =>
                      navigate("/journal", { state: { entryId: entry.id } })
                    }
                  >
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <Link to="/workout-library">
          <button className="nav-button">New Entry</button>
        </Link>
      </div>
    );
  }

  // form for creating/editing journal entries
=======
  // State variables to manage journal entries and their count
  const [entries, setEntries] = useState([]);
  const [entryCount, setEntryCount] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const[selectedExercise, setSelectedExercise] = useState(null);

  const handleCreateEntry = () => {
    const newEntry = `Entry #${entryCount}`;
    setEntries([...entries, newEntry]);
    setEntryCount(entryCount + 1);
    setSelectedEntry(newEntry);
  };

  const handleViewEntry = (entry) => {
    setSelectedEntry(entry);
    //alert(`Viewing details for ${entry}`);
  };

  const handleToggleExerise = (exerciseName) => {
    setSelectedExercise((prev) =>
      prev === exerciseName ? null : exerciseName
    );
  };

  const workoutData = [
    {
      exercise: "Bench Press",
      setsReps: "5 x 5",
      weight: "135 - 200",
      comments: "Focus on exploding up",
    },

    {
      exercise: "Incline Press",
      setsReps: "10 x 3",
      weight: "135 - 165",
      comments: "Hypertrophy based",
    },

    {
      exercise: "Cable Chest Flies",
      setsReps: "3 x 15",
      weight: "50 - 80",
      comments: "Slow and concentrated, feel the pump",
    },

  ];

  const setDetails = {
    "Bench Press": [
      { set: 1, reps: 5, weight: 135, complete: false },
      { set: 2, reps: 5, weight: 165, complete: false },
      { set: 3, reps: 5, weight: 175, complete: false },
      { set: 4, reps: 5, weight: 185, complete: false },
      { set: 5, reps: 5, weight: 200, complete: false },
    ],

    "Incline Press": [
      { set: 1, reps: 10, weight: 135, complete: false },
      { set: 2, reps: 10, weight: 145, complete: false },
      { set: 3, reps: 10, weight: 165, complete: false },
    ],

    "Cable Chest Flies": [
      { set: 1, reps: 15, weight: 50, complete: false },
      { set: 2, reps: 15, weight: 65, complete: false },
      { set: 3, reps: 15, weight: 80, complete: false },

    ],
  };

>>>>>>> Stashed changes
  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="G1 Fitness Logo" className="logo" />
<<<<<<< Updated upstream
        <h1 className="title">Journal Entry</h1>
=======
        <h1 className="title">Journal</h1>
>>>>>>> Stashed changes
        <Link to="/">
          <button className="nav-button">Return Home</button>
        </Link>
      </div>

      <hr className="divider" />

      <p className="description">
<<<<<<< Updated upstream
        {entryId ? "Editing entry for:" : "Logging workout:"}{" "}
        <strong>{routineName}</strong>
      </p>

      <input
        type="text"
        placeholder="Entry Name"
        value={entryName}
        onChange={(e) => setEntryName(e.target.value)}
        className="input-field"
      />

      <label>Mood:</label>
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="input-field"
      >
        <option value="Great">Great</option>
        <option value="Alright">Alright</option>
        <option value="Neutral">Neutral</option>   
        <option value="Tired">Tired</option>
        <option value="Fail">Fail</option>
      </select>

      {exerciseData.map((ex, i) => (
        <div key={i} className="exercise-entry">
          <h4>{ex.name}</h4>
          <input
            placeholder="Sets"
            value={ex.sets}
            onChange={(e) => handleChange(i, "sets", e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Reps"
            value={ex.reps}
            onChange={(e) => handleChange(i, "reps", e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Weight"
            value={ex.weight}
            onChange={(e) => handleChange(i, "weight", e.target.value)}
            className="input-field"
          />
        </div>
      ))}

      <button className="nav-button" onClick={handleSave}>
        {entryId ? "Update Entry" : "Save Entry"}
      </button>
=======
        Here you can log, track, and review your workouts and nutrition as you
        continue your fitness journey.
      </p>

      <div className="entry-wrapper">
        <div className="entry-layout">
          <button className="entry-button" onClick={handleCreateEntry}>
            + Create New Entry
          </button>

          <button
            className="entry-button"
            onClick={() => handleViewEntry("Sample Entry")}
          >
            Sample Entry
          </button>

          {entries.map((entry, index) => (
            <button
              key={index}
              className="entry-button"
              onClick={() => handleViewEntry(entry)}
            >
              {entry}
            </button>
          ))}
        </div>

        {selectedEntry && (
          <div>
            <h2>{selectedEntry} - Workout Deatils:</h2>
            
            <table className="entry-table">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Sets x Reps</th>
                  <th>Weight Range</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {workoutData.map((workout, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleToggleExerise(workout.exercise)}>
                      <td>{workout.exercise}</td>
                      <td>{workout.setsReps}</td>
                      <td>{workout.weight}</td>
                      <td>{workout.comments}</td>
                    </tr>

                    {selectedEntry === "Sample Entry" && selectedExercise === workout.exercise && (
                      <tr>
                        <td colSpan="4">
                          <table className="entry-table">
                            <thead>
                              <th>Sets</th>
                              <th>Reps</th>
                              <th>Weight</th>
                              <th>Completed</th>
                            </thead>

                            <tbody>
                              {setDetails[workout.exercise].map((set,i) => (
                                <tr key={i}>
                                  <td>{set.set}</td>
                                  <td>{set.reps}</td>
                                  <td>{set.weight}</td>
                                  <td>
                                    <input type="checkbox" />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

export default Journal;
