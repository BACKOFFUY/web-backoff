export default function Home() {
  return (
    <main style={{ margin: 0, padding: 0 }}>
      <iframe
        src="/index.html"
        title="BACKOFF"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          display: "block",
        }}
      />
    </main>
  );
}
