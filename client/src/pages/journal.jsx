import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/G1Logo.png";
import "../styles/journal.css";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Journal() {
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
  const [hovered, setHovered] = useState(null); // to track hovered entry to display edit btn
  const [selectedDate, setSelectedDate] = useState(null);
  const filteredEntries = selectedDate
  ? journalEntries.filter((entry) =>
      entry.date_created.startsWith(selectedDate.toISOString().split("T")[0])
    )
  : journalEntries;

  
  // Choose date of workout
  const [entryDate, setEntryDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

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
        date: entryDate,
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

        <Link to="/workout-library">
          <button className="nav-button">New Entry</button>
        </Link>
        
        <div className="calendar-view">
  <h3>Select a Day to View Logged Entries</h3>

  <Calendar
    onChange={setSelectedDate}
    value={selectedDate}
  />

  {selectedDate && (
    <p>
      Showing entries for:{" "}
      <strong>{selectedDate.toISOString().split("T")[0]}</strong>
    </p>
  )}
</div>

{filteredEntries.length === 0 ? (
  <p>No entries found for the selected date.</p>
) : (
  <div className="journal-history">
    {filteredEntries.map((entry) => (
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

      </div>
    );
  }

  

  // form for creating/editing journal entries
  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="G1 Fitness Logo" className="logo" />
        <h1 className="title">Journal Entry</h1>
        <Link to="/">
          <button className="nav-button">Return Home</button>
        </Link>
      </div>

      <hr className="divider" />
      
      <p className="description">
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

      <label>Date:</label>
      <input
        type="date"
        className="input-field"
        value={entryDate}
        onChange={(e) => setEntryDate(e.target.value)}
      />

      <table className="exercise-data-table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight</th>
          </tr>
        </thead>

        <tbody>
          {exerciseData.map((ex, i) => (
            <tr key={i}>
              <td>{ex.name}</td>

              <td>
              <input
                type="number"
                placeholder="Sets"
                value={ex.sets}
                min="0"
                onChange={(e) => handleChange(i, "sets", e.target.value)}
                className="table-inputs"
              />
              </td>

              <td>
                <input
                  type="number"
                  placeholder="Reps"
                  Value={ex.reps}
                  min="0"
                  onChange={(e) => handleChange(i, "reps", e.target.value)}
                  className="table-inputs"
                />
              </td>

              <td>
                <input
                  type="number"
                  placeholder="Weight"
                  step="10"
                  min="0"
                  Value={ex.weight}
                  onChange={(e) => handleChange(i, "weight", e.target.value)}
                  className="table-inputs"
                />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <button className="nav-button" onClick={handleSave}>
        {entryId ? "Update Entry" : "Save Entry"}
      </button>
    </div>
  );
}

export default Journal;
