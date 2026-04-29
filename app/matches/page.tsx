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

  // ✅ Simple prediction logic
  const getPrediction = (match: any) => {
    const home = match.goals.home ?? 0;
    const away = match.goals.away ?? 0;

    if (home > away) return "Home Win";
    if (away > home) return "Away Win";
    return "Draw";
  };

  return (
    <main
      style={{
        padding: "20px",
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        🔥 Live Matches
      </h1>

      {matches.length === 0 && <p>No live matches right now</p>}

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
          {/* Teams */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <img src={match.teams.home.logo} width={25} />
            <span>{match.teams.home.name}</span>

            <span style={{ opacity: 0.5 }}>vs</span>

            <img src={match.teams.away.logo} width={25} />
            <span>{match.teams.away.name}</span>
          </div>

          {/* Score */}
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color:
                match.goals.home > match.goals.away
                  ? "lime"
                  : match.goals.away > match.goals.home
                  ? "red"
                  : "orange",
            }}
          >
            ⚽ {match.goals.home} - {match.goals.away}
          </p>

          {/* Status */}
          <p style={{ color: "#38bdf8" }}>
            ⏱️ {match.fixture.status.elapsed}' ({match.fixture.status.short})
          </p>

          {/* Live badge */}
          <p style={{ color: "red", fontWeight: "bold" }}>🔴 LIVE</p>

          {/* Prediction */}
          <p style={{ color: "lime" }}>
            Prediction: {getPrediction(match)}
          </p>

          {/* League */}
          <p style={{ opacity: 0.6, marginTop: "5px" }}>
            {match.league.name}
          </p>
        </div>
      ))}
    </main>
  );
}
