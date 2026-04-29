export default async function MatchesPage() {
  const API_KEY = process.env.API_KEY;

  // 🔹 Get live matches
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

  // 🔥 AI prediction (standings + fallback)
  const getPrediction = async (match: any) => {
    try {
      const league = match.league.id;
      const season = match.league.season;

      const standingsRes = await fetch(
        `https://v3.football.api-sports.io/standings?league=${league}&season=${season}`,
        {
          headers: {
            "x-apisports-key": API_KEY as string,
          },
          cache: "no-store",
        }
      );

      const standingsData = await standingsRes.json();
      const table = standingsData.response[0]?.league?.standings[0] || [];

      const homeTeam = table.find(
        (t: any) => t.team.id === match.teams.home.id
      );
      const awayTeam = table.find(
        (t: any) => t.team.id === match.teams.away.id
      );

      // ✅ If standings exist → AI logic
      if (homeTeam && awayTeam) {
        const homePoints = homeTeam.points;
        const awayPoints = awayTeam.points;

        const total = homePoints + awayPoints;

        const homeProb = Math.round((homePoints / total) * 100);
        const awayProb = Math.round((awayPoints / total) * 100);

        if (homeProb > awayProb)
          return { text: "Home Win", prob: homeProb };

        if (awayProb > homeProb)
          return { text: "Away Win", prob: awayProb };

        return { text: "Draw", prob: 50 };
      }

      // 🔥 Fallback (live score based)
      const home = match.goals.home ?? 0;
      const away = match.goals.away ?? 0;

      if (home > away) return { text: "Home Win", prob: 65 };
      if (away > home) return { text: "Away Win", prob: 65 };

      return { text: "Draw", prob: 50 };
    } catch {
      return { text: "Error", prob: 0 };
    }
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

      {await Promise.all(
        matches.map(async (match: any) => {
          const prediction = await getPrediction(match);

          return (
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
                  marginBottom: "8px",
                }}
              >
                <img src={match.teams.home.logo} width={20} />
                <span>{match.teams.home.name}</span>

                <span style={{ opacity: 0.5 }}>vs</span>

                <img src={match.teams.away.logo} width={20} />
                <span>{match.teams.away.name}</span>
              </div>

              {/* Score */}
              <p
                style={{
                  fontSize: "16px",
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

              {/* Time */}
              <p style={{ color: "#38bdf8" }}>
                ⏱ {match.fixture.status.elapsed}' ({match.fixture.status.short})
              </p>

              {/* Live */}
              <p style={{ color: "red", fontWeight: "bold" }}>
                🔴 LIVE
              </p>

              {/* Prediction */}
              <p style={{ color: "lime", fontWeight: "bold" }}>
                Prediction: {prediction.text} ({prediction.prob}%)
              </p>

              {/* League */}
              <p style={{ opacity: 0.6, marginTop: "5px" }}>
                {match.league.name}
              </p>
            </div>
          );
        })
      )}
    </main>
  );
}
