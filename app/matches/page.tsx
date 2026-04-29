export default async function MatchesPage() {
  const res = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    headers: {
      "x-apisports-key": process.env.API_KEY,
    },
    cache: "no-store",
  });

  const data = await res.json();

  const matches = data.response || [];

  return (
    <main style={{ padding: "20px" }}>
      <h1>⚽ Live Matches</h1>

      {matches.length === 0 && <p>No live matches right now</p>}

      {matches.map((match) => (
        <div key={match.fixture.id} style={{
          padding: "15px",
          margin: "10px 0",
          border: "1px solid #ccc",
          borderRadius: "10px"
        }}>
          <p>
            {match.teams.home.name} vs {match.teams.away.name}
          </p>
          <p>
            Score: {match.goals.home} - {match.goals.away}
          </p>
          <p>Status: {match.fixture.status.short}</p>
        </div>
      ))}
    </main>
  );
}
