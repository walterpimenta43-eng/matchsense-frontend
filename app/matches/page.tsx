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

  // 🔥 AI-style prediction using team stats
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

      if (!homeTeam || !awayTeam) return { text: "Unknown", prob: 50 };

      // 🧠 Simple AI formula
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
      }}
    >
      <h1>🔥 Live Matches</h1>

      {matches.map(async (match: any) => {
        const prediction = await getPrediction(match);

        return (
          <div
            key={match.fixture.id}
            style={{
              background: "#1e293b",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <p>
              {match.teams.home.name} vs {match.teams.away.name}
            </p>

            <p>
              ⚽ {match.goals.home} - {match.goals.away}
            </p>

            <p>🔴 LIVE</p>

            {/* 🔥 AI Prediction */}
            <p style={{ color: "lime" }}>
              Prediction: {prediction.text} ({prediction.prob}%)
            </p>
          </div>
        );
      })}
    </main>
  );
}
