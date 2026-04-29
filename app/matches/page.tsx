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
      display: "flex",
      flexDirection: "column",
      gap: "20px"
    }}>
      <h1>⚽ Matches</h1>

      {matches.map((match, index) => (
        <div key={index} style={{
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "10px"
        }}>
          <h3>{match.home} vs {match.away}</h3>
          <p>Prediction: <strong>{match.prediction}</strong></p>
        </div>
      ))}
    </main>
  );
}
