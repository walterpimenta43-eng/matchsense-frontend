export default async function MatchesPage() {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) throw new Error("Missing API key");

  const res = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    headers: {
      "x-apisports-key": API_KEY,
    },
    cache: "no-store",
  });

  const data = await res.json();
  const matches = data.response || [];

  return (
    <main style={{
      padding: "20px",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1 style={{ marginBottom: "20px" }}>⚽ Live Matches</h1>

      {matches.length === 0 && <p>No live matches right now</p>}

      {matches.map((match: any) => {
        const home = match.teams.home.name;
        const away = match.teams.away.name;
        const homeGoals = match.goals.home ?? 0;
        const awayGoals = match.goals.away ?? 0;

        let prediction = "Draw";
        let color = "#facc15"; // yellow

        if (homeGoals > awayGoals) {
          prediction = ${home} Win;
          color = "#22c55e"; // green
        } else if (awayGoals > homeGoals) {
          prediction = ${away} Win;
          color = "#ef4444"; // red
        }

        return (
          <div key={match.fixture.id} style={{
            background: "#1e293b",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>
            <h3>{home} vs {away}</h3>

            <p style={{ fontSize: "18px", margin: "8px 0" }}>
              {homeGoals} - {awayGoals}
            </p>

            <p>Status: {match.fixture.status.short}</p>

            <p style={{
              marginTop: "10px",
              fontWeight: "bold",
              color
            }}>
              Prediction: {prediction}
            </p>
          </div>
        );
      })}
    </main>
  );
}
