export default function MatchesPage() {
  const matches = [
    { home: "Arsenal", away: "Chelsea", time: "17:30" },
    { home: "Man City", away: "Liverpool", time: "20:00" },
    { home: "Barcelona", away: "Real Madrid", time: "21:00" },
  ];

  return (
    <main style={{
      minHeight: "100vh",
      padding: "40px",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        ⚽ Matches Today
      </h1>

      <div style={{ display: "grid", gap: "15px" }}>
        {matches.map((match, i) => (
          <div key={i} style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <span>{match.home} vs {match.away}</span>
            <span>{match.time}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
