import React, { useState, useEffect } from "react";
import "./App.css";

// Icons/images for ocean theme
// Inline SVGs for simplicity
const icons = {
  sun: (
    <svg height="28" width="28" viewBox="0 0 24 24" fill="#FFD700">
      <circle cx="12" cy="12" r="5" />
      <g stroke="#FFD700" strokeWidth="2">
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.2" y1="4.2" x2="7" y2="7" />
        <line x1="17" y1="17" x2="19.8" y2="19.8" />
        <line x1="4.2" y1="19.8" x2="7" y2="17" />
        <line x1="17" y1="7" x2="19.8" y2="4.2" />
      </g>
    </svg>
  ),
  wave: (
    <svg height="28" width="28" viewBox="0 0 24 24" fill="#31bfb3">
      <path d="M2 18c2-4 8-4 10 0s8 4 10 0" stroke="#3eb2df" strokeWidth="2" fill="none" />
      <circle cx="4" cy="18" r="1.2" fill="#3eb2df" />
      <circle cx="12" cy="18" r="1.2" fill="#31bfb3" />
      <circle cx="20" cy="18" r="1.2" fill="#3eb2df" />
    </svg>
  ),
  cloud: (
    <svg height="28" width="28" viewBox="0 0 24 24" fill="#dbefff">
      <ellipse cx="14" cy="16" rx="7" ry="4" />
      <ellipse cx="8" cy="16" rx="4" ry="2.5" />
    </svg>
  ),
  wind: (
    <svg height="28" width="28" viewBox="0 0 24 24" fill="#b2e3ef">
      <path d="M3 15h15a3 3 0 1 0 -.1-6H7a3 3 0 0 0 0 6z" stroke="#31bfb3" strokeWidth="2" fill="none" />
      <line x1="3" y1="20" x2="18" y2="20" stroke="#31bfb3" strokeWidth="2" />
    </svg>
  ),
  surfboard: (
    <svg height="28" width="28" viewBox="0 0 24 24" fill="#f8e8c1">
      <ellipse cx="12" cy="12" rx="3.2" ry="9" stroke="#3eb2df" strokeWidth="2" fill="#f8e8c1" />
      <rect x="11.5" y="3" width="1" height="18" fill="#31bfb3" />
    </svg>
  ),
  edit: (
    <svg height="22" width="22" viewBox="0 0 24 24" fill="#31bfb3">
      <path d="M4 21v-4l13-13a2.828 2.828 0 114 4L8 21H4z" />
    </svg>
  ),
  trash: (
    <svg height="22" width="22" viewBox="0 0 24 24" fill="#e05d5d">
      <path d="M3 6h18" stroke="#e05d5d" strokeWidth="2" />
      <rect x="5" y="6" width="14" height="14" rx="2" fill="#fae0e0" stroke="#e05d5d" strokeWidth="2" />
      <line x1="10" y1="11" x2="10" y2="17" stroke="#e05d5d" strokeWidth="2" />
      <line x1="14" y1="11" x2="14" y2="17" stroke="#e05d5d" strokeWidth="2" />
    </svg>
  ),
  plus: (
    <svg height="22" width="22" viewBox="0 0 24 24" fill="#3eb2df">
      <rect x="10" y="4" width="4" height="16" rx="2" />
      <rect x="4" y="10" width="16" height="4" rx="2" />
    </svg>
  ),
};

// Ocean mood faces
const moodIcons = [
  { emoji: "🏄‍♂️", label: "Stoked" },
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Meh" },
  { emoji: "😟", label: "Tough" },
  { emoji: "🌊", label: "Frothy" },
  { emoji: "😑", label: "Exhausted" },
];

// Sample data for initial app use
const initialSessions = [
  {
    id: 1,
    date: "2024-05-26",
    spot: "Malibu",
    board: "Fish",
    waves: 5,
    mood: "Stoked",
    notes: "Epic glassy morning, sunny and crowded but great waves.",
    swell: "3-4 ft",
    wind: "Light offshore",
    tide: "Mid",
  },
  {
    id: 2,
    date: "2024-05-25",
    spot: "Ocean Beach",
    board: "Shortboard",
    waves: 2,
    mood: "Tough",
    notes: "Choppy and wind-blown, struggled to make the drop.",
    swell: "6 ft", wind: "Onshore", tide: "High",
  },
  {
    id: 3,
    date: "2024-05-24",
    spot: "Trestles",
    board: "Longboard",
    waves: 8,
    mood: "Happy",
    notes: "Easy rollers, lots of long rides.",
    swell: "2-3 ft", wind: "Calm", tide: "Low"
  },
];

const boardsList = ["Shortboard", "Fish", "Longboard", "Funboard", "Bodyboard", "SUP"];
const spotsList = ["Malibu", "Ocean Beach", "Trestles", "Santa Cruz", "Huntington", "Pipeline"];

const statsSample = {
  // sample count per board for chart
  boardCounts: { Shortboard: 8, Fish: 12, Longboard: 15, Funboard: 5, Bodyboard: 3, SUP: 2 },
  spotCounts: { Malibu: 10, "Ocean Beach": 7, Trestles: 15, "Santa Cruz": 6, Huntington: 3, Pipeline: 1 },
  moodTrend: [
    { date: "2024-05-20", mood: "Happy" },
    { date: "2024-05-21", mood: "Frothy" },
    { date: "2024-05-22", mood: "Meh" },
    { date: "2024-05-23", mood: "Happy" },
    { date: "2024-05-24", mood: "Happy" },
    { date: "2024-05-25", mood: "Tough" },
    { date: "2024-05-26", mood: "Stoked" },
  ]
};

function getMoodColor(mood) {
  switch (mood) {
    case "Stoked": return "#3eb2df";
    case "Happy": return "#31bfb3";
    case "Frothy": return "#5ad8fd";
    case "Meh": return "#babfad";
    case "Tough": return "#ffc57f";
    case "Exhausted": return "#9bb3b9";
    default: return "#babfad";
  }
}

// PUBLIC_INTERFACE
function App() {
  // UI state
  const [theme, setTheme] = useState("light");
  const [screen, setScreen] = useState("home"); // home | log | detail | stats
  const [sessions, setSessions] = useState(() => {
    // Load from localStorage, or fall back to initial sample data
    try {
      const stored = JSON.parse(localStorage.getItem("surfsession-log"));
      if (stored && Array.isArray(stored)) return stored;
    } catch (e) { /* ignore */ }
    return initialSessions;
  });
  const [current, setCurrent] = useState(null); // For detail/edit screen
  const [filter, setFilter] = useState({ spot: "", board: "", mood: "" });

  // Reminder logic
  useEffect(() => {
    const reminderKey = "surfsync-reminder";
    if (!localStorage.getItem(reminderKey)) {
      localStorage.setItem(reminderKey, "set");
      setTimeout(() => {
        alert("🌊 Daily SurfSync: Don't forget to log your surf session today!");
      }, 3000);
    }
  }, []);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem("surfsession-log", JSON.stringify(sessions));
  }, [sessions]);

  // Theme (light/dark/auto)
  useEffect(() => {
    if (theme === "auto") {
      // Pick based on system preference
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(mq.matches ? "dark" : "light");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Filtering
  const visibleSessions = sessions
    .filter(s =>
      (!filter.spot || s.spot === filter.spot) &&
      (!filter.board || s.board === filter.board) &&
      (!filter.mood || s.mood === filter.mood)
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  // Add/edit session
  function saveSession(session) {
    if (session.id) {
      // Edit
      setSessions(sessions =>
        sessions.map(s => (s.id === session.id ? session : s))
      );
    } else {
      // Add
      const newId = sessions.length ? Math.max(...sessions.map(s => s.id)) + 1 : 1;
      setSessions(sessions => [{ ...session, id: newId }, ...sessions]);
    }
    setScreen("home");
    setCurrent(null);
  }

  // Delete session
  function deleteSession(id) {
    if (window.confirm("Delete this surf session?")) {
      setSessions(sessions => sessions.filter(s => s.id !== id));
      setScreen("home");
    }
  }

  // UI rendering helpers
  function renderAppBar() {
    return (
      <nav className="ss-appbar">
        <div className="ss-logo"><span style={{fontWeight:"bold", color:"#3eb2df", fontSize:"1.5em"}}>Surf</span><span style={{color:"#31bfb3",fontWeight:700}}>Sync</span> {icons.wave}</div>
        <div className="ss-actions">
          <button className="ss-btn" onClick={() => setScreen("stats")}>Stats</button>
          <button className="ss-btn" onClick={() => setScreen("log")}>{icons.plus} Log Session</button>
          <button className="ss-theme-toggle" onClick={() => setTheme(t => t === "light" ? "dark" : (t === "dark" ? "light" : "auto"))}>
            {theme === "light" ? "🌙" : theme === "dark" ? "☀️" : "🌓"} Theme
          </button>
        </div>
      </nav>
    );
  }

  // PUBLIC_INTERFACE
  function renderHome() {
    return (
      <div className="ss-bg-ocean">
        <section className="ss-home">
          <div className="ss-header-row">
            <h1 className="ss-title">Surf Sessions</h1>
            <button onClick={() => setScreen("log")} className="ss-bigbtn">{icons.plus} Log New Session</button>
          </div>
          <div className="ss-filterbar">
            <label>
              <span>Spot</span>
              <select value={filter.spot} onChange={e => setFilter(f => ({ ...f, spot: e.target.value }))}>
                <option value="">All</option>
                {spotsList.map(spot => <option key={spot} value={spot}>{spot}</option>)}
              </select>
            </label>
            <label>
              <span>Board</span>
              <select value={filter.board} onChange={e => setFilter(f => ({ ...f, board: e.target.value }))}>
                <option value="">All</option>
                {boardsList.map(board => <option key={board} value={board}>{board}</option>)}
              </select>
            </label>
            <label>
              <span>Mood</span>
              <select value={filter.mood} onChange={e => setFilter(f => ({ ...f, mood: e.target.value }))}>
                <option value="">All</option>
                {moodIcons.map(m => <option key={m.label} value={m.label}>{m.emoji + " " + m.label}</option>)}
              </select>
            </label>
            <button className="ss-btn" onClick={() => setFilter({ spot: "", board: "", mood: "" })}>Clear</button>
          </div>
          <div className="ss-cards">
            {visibleSessions.length === 0 && (
              <div className="ss-nothing">No sessions found. Try logging one!</div>
            )}
            {visibleSessions.map(s => (
              <div key={s.id} className="ss-card" tabIndex={0} onClick={() => { setCurrent(s); setScreen("detail"); }}>
                <div className="ss-card-row">
                  <div className="ss-card-date">{s.date}</div>
                  <div className="ss-card-spot">{icons.wave} <b>{s.spot}</b></div>
                  <div className="ss-card-board">{icons.surfboard} {s.board}</div>
                  <div className="ss-card-mood" style={{ background: getMoodColor(s.mood) }}>
                    {moodIcons.find(m => m.label === s.mood)?.emoji || "😐"}
                  </div>
                </div>
                <div className="ss-card-notes">{s.notes}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  function LogForm({ current, spotsList, boardsList, moodIcons, getMoodColor, saveSession, setScreen, setCurrent }) {
    const [form, setForm] = useState(
      current ? { ...current } : {
        date: new Date().toISOString().slice(0, 10),
        spot: "",
        board: "",
        waves: 1,
        mood: "Happy",
        notes: "",
        swell: "",
        wind: "",
        tide: "",
      }
    );

    useEffect(() => {
      // When editing, update local form if current changes (like after switching detail→edit)
      if (current) setForm({ ...current });
    }, [current]);

    function handleChange(field, value) {
      setForm(f => ({ ...f, [field]: value }));
    }

    // Do not allow empty spot/board/waves
    function handleSubmit(e) {
      e.preventDefault();
      if (!form.spot || !form.board || !form.waves) {
        alert("Please fill out all main fields.");
        return;
      }
      saveSession(form);
    }

    return (
      <div className="ss-bg-ocean">
        <section className="ss-formwrap">
          <h2>{form.id ? "Edit Surf Session" : "Log New Surf Session"}</h2>
          <form className="ss-form" onSubmit={handleSubmit}>
            <label>
              <span>Date</span>
              <input type="date" value={form.date} onChange={e => handleChange("date", e.target.value)} />
            </label>
            <label>
              <span>Spot</span>
              <input type="text" value={form.spot} onChange={e => handleChange("spot", e.target.value)} list="spots" />
              <datalist id="spots">
                {spotsList.map(s => <option key={s} value={s} />)}
              </datalist>
            </label>
            <label>
              <span>Board</span>
              <select value={form.board} onChange={e => handleChange("board", e.target.value)}>
                <option value="">Select board...</option>
                {boardsList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label>
              <span># Waves Caught</span>
              <input type="number" min={0} max={99} value={form.waves} onChange={e => handleChange("waves", e.target.value)} />
            </label>
            <label>
              <span>Mood</span>
              <div className="ss-mood-picker">
                {moodIcons.map(m => (
                  <button
                    key={m.label}
                    type="button"
                    aria-label={m.label}
                    className={"ss-mood-btn" + (form.mood === m.label ? " active" : "")}
                    style={{ background: form.mood === m.label ? getMoodColor(m.label) : "#f3faff" }}
                    onClick={() => handleChange("mood", m.label)}
                  >{m.emoji}</button>
                ))}
              </div>
            </label>
            <label>
              <span>Notes</span>
              <textarea value={form.notes} rows={2} maxLength={200}
                onChange={e => handleChange("notes", e.target.value)}
                placeholder="Vibe, crowd, memorable ride..."
              />
            </label>
            <div className="ss-field-row">
              <label>
                <span>Swell Size</span>
                <input type="text" value={form.swell} onChange={e => handleChange("swell", e.target.value)} placeholder="e.g. 2-4 ft" />
              </label>
              <label>
                <span>Wind</span>
                <input type="text" value={form.wind} onChange={e => handleChange("wind", e.target.value)} placeholder="e.g. Calm, offshore" />
              </label>
              <label>
                <span>Tide</span>
                <input type="text" value={form.tide} onChange={e => handleChange("tide", e.target.value)} placeholder="Low/Mid/High" />
              </label>
            </div>
            <div className="ss-formbtns">
              <button className="ss-bigbtn" type="submit" style={{ background: "#31bfb3" }}>Save</button>
              <button className="ss-btn" type="button" onClick={() => { setScreen("home"); setCurrent(null); }}>Cancel</button>
            </div>
          </form>
        </section>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  function renderDetail() {
    if (!current) return null;

    return (
      <div className="ss-bg-ocean">
        <section className="ss-detail">
          <button className="ss-btn" style={{ float: "right" }} onClick={() => setScreen("home")}>Back</button>
          <h2>{current.spot} <span style={{ fontWeight: 400, fontSize: "1rem", color: "#babfad" }}>({current.date})</span></h2>
          <div className="ss-detail-row">
            <div className="ss-detail-mood" style={{ background: getMoodColor(current.mood) }}>
              {moodIcons.find(m => m.label === current.mood)?.emoji || ""} {current.mood}
            </div>
            <div className="ss-detail-chip">{icons.surfboard} {current.board} board</div>
            <div className="ss-detail-chip">{icons.wave} {current.waves} waves caught</div>
          </div>
          <div className="ss-detail-row">
            <div className="ss-detail-cond">{icons.sun} Swell: <b>{current.swell || "--"}</b></div>
            <div className="ss-detail-cond">{icons.wind} Wind: <b>{current.wind || "--"}</b></div>
            <div className="ss-detail-cond">{icons.cloud} Tide: <b>{current.tide || "--"}</b></div>
          </div>
          <div className="ss-detail-notes">
            <span style={{ color: "#babfad", fontSize: "0.95em", fontWeight: 700 }}>Notes:</span>
            <p>{current.notes}</p>
          </div>
          <div className="ss-detail-actions">
            <button className="ss-btn" style={{ marginRight: 8 }} onClick={() => { setScreen("log"); }}> {icons.edit} Edit</button>
            <button className="ss-btn danger" onClick={() => deleteSession(current.id)}>{icons.trash} Delete</button>
          </div>
        </section>
      </div>
    );
  }

  // PUBLIC_INTERFACE
  function renderStats() {
    // Using sample data for the charts, will use minimal inline svg for "charts"
    const boardUsage = statsSample.boardCounts;
    const spotUsage = statsSample.spotCounts;
    const moodTrend = statsSample.moodTrend;

    // Board usage pie chart
    const totalBoards = Object.values(boardUsage).reduce((a, b) => a + b, 0);
    let angles = [];
    let start = 0;
    Object.values(boardUsage).forEach((count, i, arr) => {
      angles.push([start, start + (count / totalBoards) * 2 * Math.PI]);
      start += (count / totalBoards) * 2 * Math.PI;
    });
    const boardColors = [
      "#3eb2df", "#31bfb3", "#f8e8c1", "#b2e3ef", "#babfad", "#ffc57f"
    ];

    // Spot usage bars
    const spots = Object.keys(spotUsage);
    const maxSpot = Math.max(...Object.values(spotUsage));

    // Mood trend: dots/line
    const moodToY = {
      "Stoked": 10, "Happy": 30, "Frothy": 50, "Meh": 70, "Tough": 90, "Exhausted": 110
    };
    return (
      <div className="ss-bg-ocean">
        <section className="ss-stats">
          <button className="ss-btn" onClick={() => setScreen("home")}>Back</button>
          <h2>Surf Stats Dashboard</h2>
          <div className="ss-stats-charts">
            {/* Board usage (pie) */}
            <div className="ss-chart-card">
              <h3>Board Usage</h3>
              <svg viewBox="0 0 100 100" width={120} height={120}>
                {Object.values(boardUsage).map((count, i) => {
                  const [start, end] = angles[i];
                  const x1 = 50 + 45 * Math.cos(start - Math.PI / 2);
                  const y1 = 50 + 45 * Math.sin(start - Math.PI / 2);
                  const x2 = 50 + 45 * Math.cos(end - Math.PI / 2);
                  const y2 = 50 + 45 * Math.sin(end - Math.PI / 2);
                  const largeArc = end - start > Math.PI ? 1 : 0;
                  return (
                    <path
                      key={i}
                      d={`M50,50 L${x1},${y1} A45,45 0 ${largeArc},1 ${x2},${y2} z`}
                      fill={boardColors[i % boardColors.length]}
                    />
                  );
                })}
              </svg>
              <ul className="ss-chart-legend">
                {Object.keys(boardUsage).map((b, i) => (
                  <li key={b}><span style={{
                    display: "inline-block", width: 14, height: 14,
                    background: boardColors[i % boardColors.length],
                    borderRadius: "50%", marginRight: 3
                  }} />{b}: {boardUsage[b]}</li>
                ))}
              </ul>
            </div>
            {/* Most visited spot (bar) */}
            <div className="ss-chart-card">
              <h3>Most Surfed Spots</h3>
              <svg viewBox="0 0 180 80" height={80} width={180}>
                {spots.map((spot, i) => (
                  <rect key={spot}
                    x={4 + i * 27}
                    y={80 - (spotUsage[spot] / maxSpot) * 70}
                    width={18}
                    height={(spotUsage[spot] / maxSpot) * 70}
                    fill="#3eb2df"
                  />
                ))}
                {spots.map((spot, i) => (
                  <text key={spot+"-label"} x={4 + i * 27 + 9} y={78}
                    fontSize="8" fill="#888" textAnchor="middle"
                    style={{ writingMode: "vertical-lr", fontFamily: "system-ui" }}>
                    {spot}
                  </text>
                ))}
              </svg>
              <ul className="ss-chart-legend">
                {spots.map((spot) => (
                  <li key={spot}>{spot}: {spotUsage[spot]}</li>
                ))}
              </ul>
            </div>
            {/* Mood trend */}
            <div className="ss-chart-card">
              <h3>Mood Trend</h3>
              <svg viewBox="0 0 180 120" width={180} height={120} style={{ background: "#f1fafd", borderRadius: 12 }}>
                {moodTrend.map((pt, i, arr) => {
                  if (i === 0) return null;
                  return (
                    <line
                      key={"line-" + i}
                      x1={24 * (i - 1) + 16} y1={moodToY[arr[i - 1].mood]}
                      x2={24 * i + 16} y2={moodToY[pt.mood]}
                      stroke="#31bfb3" strokeWidth={2}
                    />
                  );
                })}
                {moodTrend.map((pt, i) => (
                  <circle key={i}
                    cx={24 * i + 16}
                    cy={moodToY[pt.mood]}
                    r={7}
                    fill={getMoodColor(pt.mood)}
                    stroke="#3eb2df"
                    strokeWidth={2}
                  />
                ))}
                {moodTrend.map((pt, i) => (
                  <text key={i + "-lbl"}
                    x={24 * i + 16} y={moodToY[pt.mood] - 13}
                    fontSize="10" textAnchor="middle">{pt.mood}</text>
                ))}
                {/* X-Axis dates */}
                {moodTrend.map((pt, i) => (
                  <text key={i + "-date"} x={24 * i + 16} y={114}
                    fontSize="8" textAnchor="middle">{pt.date.slice(5)}</text>
                ))}
              </svg>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Main SPA router
  return (
    <div className={`App ss-root`}>
      {renderAppBar()}
      <main>
        {screen === "home" && renderHome()}
        {screen === "log" &&
          <LogForm
            current={current}
            spotsList={spotsList}
            boardsList={boardsList}
            moodIcons={moodIcons}
            getMoodColor={getMoodColor}
            saveSession={saveSession}
            setScreen={setScreen}
            setCurrent={setCurrent}
          />}
        {screen === "detail" && renderDetail()}
        {screen === "stats" && renderStats()}
      </main>
      <footer className="ss-footer">
        <span>
          &copy; 2024 SurfSync | <span style={{ color: "#31bfb3" }}>Breathe Deep. Surf Often. Log Memories.</span>
        </span>
      </footer>
    </div>
  );
}

export default App;
