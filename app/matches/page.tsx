"use client";

import { useEffect, useState } from "react";

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => setMatches(data));
  }, []);

  const placeBet = (team: string, odds: string) => {
    alert(`Bet placed on ${team} @ ${odds}`);
  };

  return (
    <main
      style={{
        padding: "20px",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1>🔥 Live Matches</h1>

      {matches.length === 0 && <p>No live matches</p>}

      {matches.map((match: any) => {
        const homeGoals = match.goals.home ?? 0;
        const awayGoals = match.goals.away ?? 0;

        let prediction = "Draw";
        if (homeGoals > awayGoals) prediction = "Home Win";
        if (awayGoals > homeGoals) prediction = "Away Win";

        const homeOdds = (1.5 + Math.random()).toFixed(2);
        const drawOdds = (2 + Math.random()).toFixed(2);
        const awayOdds = (1.5 + Math.random()).toFixed(2);

        return (
          <div
            key={match.fixture.id}
            style={{
              background: "#1e293b",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "12px",
            }}
          >
            {/* Teams */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={match.teams.home.logo} width={25} />
              <span>{match.teams.home.name}</span>

              <span>vs</span>

              <img src={match.teams.away.logo} width={25} />
              <span>{match.teams.away.name}</span>
            </div>

            {/* Score */}
            <p>⚽ {homeGoals} - {awayGoals}</p>

            {/* Live */}
            <p style={{ color: "red" }}>
              🔴 {match.fixture.status.short}
            </p>

            {/* Prediction */}
            <p style={{ color: "lime" }}>
              Prediction: {prediction}
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => placeBet("Home", homeOdds)}>
                Home {homeOdds}
              </button>

              <button onClick={() => placeBet("Draw", drawOdds)}>
                Draw {drawOdds}
              </button>

              <button onClick={() => placeBet("Away", awayOdds)}>
                Away {awayOdds}
              </button>
            </div>
          </div>
        );
      })}
    </main>
  );
}
