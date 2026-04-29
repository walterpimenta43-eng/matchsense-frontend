export default async function MatchesPage() {
  const API_KEY = process.env.API_KEY;

  const res = await fetch(
    "https://v3.football.api-sports.io/fixtures?live=all",
    {
      headers: {
        "x-apisports-key": API_KEY as string,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  const matches = data.response || [];

  return (
    <main
      style={{
        padding: "20px",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        🔥 Live Matches
      </h1>

      {matches.map((match: any) => (
        <div
          key={match.fixture.id}
          style={{
            background: "#1e293b",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            {match.teams.home.name} vs {match.teams.away.name}
          </p>

          <p>
            ⚽ {match.goals.home} - {match.goals.away}
          </p>

          <p style={{ color: "#38bdf8" }}>
            ⏱️ {match.fixture.status.short}
          </p>
        </div>
      ))}
    </main>
  );
}
