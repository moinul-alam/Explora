import PersonNotFound from "@src/assets/PersonNotFound.png";

const Credit = ({ credits, mediaType }) => {
  const crew =
    mediaType === "movie"
      ? credits.filter((c) => c.type === "director")
      : credits.filter((c) => c.type === "creator");

  const cast = credits.filter((c) => c.type === "cast");

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px", color: "#fff" }}>
      {/* Crew Section */}
      <h2>
        {mediaType === "movie"
          ? crew.length === 1
            ? "Director"
            : "Directors"
          : crew.length === 1
          ? "Creator"
          : "Creators"}
      </h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        {crew.map((person) => (
          <div
            key={person.id}
            style={{ textAlign: "center", cursor: "pointer" }}
            onClick={() => {
              window.location.href = `/person/${person.id}`;
            }}
          >
            <img
              src={person.image || PersonNotFound}
              alt={person.name || "No Name Available"}
              style={{
                width: "100px",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              }}
            />
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>{person.name || "Unknown"}</p>
          </div>
        ))}
      </div>

      {/* Top Cast Section */}
      <h2>Top Cast</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cast.map((c) => (
          <div
            key={c.id}
            style={{ textAlign: "center", cursor: "pointer", maxWidth: "120px" }}
            onClick={() => {
              window.location.href = `/person/${c.id}`;
            }}
          >
            <img
              src={c.image || PersonNotFound} // Use imported image as fallback
              alt={c.name || "No Name Available"}
              style={{
                width: "100px",
                height: "150px",
                borderRadius: "8px",
                objectFit: "cover",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              }}
            />
            <p style={{ marginTop: "10px", fontWeight: "bold", fontSize: "14px" }}>{c.name || "Unknown"}</p>
            <p style={{ fontSize: "12px", color: "#aaa" }}>as {c.character || "Unknown Role"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credit;
