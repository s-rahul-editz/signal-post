export default function HomePage() {
  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <div className="eyebrow">Skeleton deploy — step 1</div>
      <h1 style={{ fontSize: 34, margin: "8px 0 24px" }}>
        The foundation is live.
      </h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: 520 }}>
        This confirms Vercel, the design system, and Supabase are all wired together
        correctly. The real homepage — pulling published posts from the database —
        comes next.
      </p>

      <div className="ticket-card">
        <div className="ticket-body">
          <h2>Sample: Mumbai Rajdhani, First Class</h2>
          <p>This is a preview of the post-card design. Real posts will replace this once the database is connected.</p>
          <div className="ticket-data">MUM → NDLS · 12 JUL · 6 MIN READ</div>
        </div>
        <div className="ticket-stub">
          <div className="stamp">Journeys</div>
        </div>
      </div>
    </div>
  );
  }
