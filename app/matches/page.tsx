export default function MatchesPage() {
  const matches = [
    { home: "Arsenal", away: "Chelsea", prediction: "Arsenal Win" },
    { home: "Man City", away: "Liverpool", prediction: "Draw" },
    { home: "Barcelona", away: "Real Madrid", prediction: "Real Madrid Win" }
  ];

  return (
    <main style={{
      minHeight: "100vh",
      padding: "40px",
      background: "#0f172a",
      color: "white",
      fontFamily: "Arial"
    }}>
      <h1 style={{ marginBottom: "30px" }}>⚽ Match Predictions</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {matches.map((match, index) => (
          <div key={index} style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>
            <h3 style={{ marginBottom: "10px" }}>
              {match.home} vs {match.away}
            </h3>

            <p style={{ opacity: 0.8 }}>Prediction</p>

            <p style={{
              marginTop: "5px",
              fontWeight: "bold",
              color: "#22c55e"
            }}>
              {match.prediction}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
