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

  // 🔥 AI Prediction
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

      if (homeTeam && awayTeam) {
        const homePoints = homeTeam.points;
        const awayPoints = awayTeam.points;

        const total = homePoints + awayPoints;

        const homeProb = Math.round((homePoints / total) * 100);
        const awayProb = Math.round((awayPoints / total) * 100);

        if (homeProb > awayProb)
          return { type: "home", prob: homeProb };

        if (awayProb > homeProb)
          return { type: "away", prob: awayProb };

        return { type: "draw", prob: 50 };
      }

      // fallback
      const home = match.goals.home ?? 0;
      const away = match.goals.away ?? 0;

      if (home > away) return { type: "home", prob: 65 };
      if (away > home) return { type: "away", prob: 65 };

      return { type: "draw", prob: 50 };
    } catch {
      return { type: "draw", prob: 50 };
    }
  };

  // 🎯 Convert probability → odds
  const getOdds = (prob: number) => {
    return (100 / prob).toFixed(2);
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

      {await Promise.all(
        matches.map(async (match: any) => {
          const prediction = await getPrediction(match);

          const homeOdds = getOdds(
            prediction.type === "home" ? prediction.prob : 30
          );
          const drawOdds = getOdds(
            prediction.type === "draw" ? prediction.prob : 30
          );
          const awayOdds = getOdds(
            prediction.type === "away" ? prediction.prob : 30
          );

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
              <p>
                {match.teams.home.name} vs {match.teams.away.name}
              </p>

              {/* Score */}
              <p>
                ⚽ {match.goals.home} - {match.goals.away}
              </p>

              {/* Live */}
              <p style={{ color: "red" }}>🔴 LIVE</p>

              {/* Odds Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#22c55e",
                    border: "none",
                    borderRadius: "8px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Home {homeOdds}
                </button>

                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#eab308",
                    border: "none",
                    borderRadius: "8px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  Draw {drawOdds}
                </button>

                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    background: "#ef4444",
                    border: "none",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Away {awayOdds}
                </button>
              </div>
            </div>
          );
        })
      )}
    </main>
  );
}
