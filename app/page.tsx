export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px"
    }}>
      <h1 style={{ fontSize: "2rem" }}>⚽ Matchsense</h1>

      <p>AI-powered football predictions</p>

      <button style={{
        padding: "10px 20px",
        fontSize: "1rem",
        cursor: "pointer"
      }}>
        Get Started
      </button>
    </main>
  )
}
