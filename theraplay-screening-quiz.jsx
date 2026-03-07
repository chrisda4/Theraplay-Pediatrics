import { useState, useEffect } from "react";

const COLORS = {
  teal: "#2BBFB3",
  tealDark: "#1A9991",
  tealLight: "#E8FAF9",
  coral: "#FF6B6B",
  yellow: "#FFD166",
  navy: "#1B3A5C",
  navyLight: "#2A5080",
  white: "#FFFFFF",
  offwhite: "#F7FAFA",
  gray: "#8FA5B0",
  lightGray: "#E8F0F2",
};

const questions = [
  {
    id: 1,
    category: "Sensory Processing",
    emoji: "👂",
    text: "How does your child react to loud noises, bright lights, or unexpected touch?",
    options: [
      { label: "No issues — handles it well", score: 0 },
      { label: "Occasionally bothered, but recovers quickly", score: 1 },
      { label: "Often upset, covers ears/eyes frequently", score: 2 },
      { label: "Extreme reactions — meltdowns or total shutdown", score: 3 },
    ],
  },
  {
    id: 2,
    category: "Fine Motor Skills",
    emoji: "✏️",
    text: "How does your child manage tasks like holding a pencil, using scissors, or buttoning clothes?",
    options: [
      { label: "Age-appropriately — no concerns", score: 0 },
      { label: "A little clumsy but getting there", score: 1 },
      { label: "Struggles noticeably compared to peers", score: 2 },
      { label: "Avoids these tasks or gets very frustrated", score: 3 },
    ],
  },
  {
    id: 3,
    category: "Gross Motor Skills",
    emoji: "🏃",
    text: "How is your child's balance, coordination, and ability to navigate physical spaces?",
    options: [
      { label: "Confident and coordinated", score: 0 },
      { label: "Occasionally trips or bumps into things", score: 1 },
      { label: "Frequently unsteady or avoids physical play", score: 2 },
      { label: "Significant difficulty — falls often, avoids movement", score: 3 },
    ],
  },
  {
    id: 4,
    category: "Emotional Regulation",
    emoji: "💛",
    text: "How does your child handle transitions, unexpected changes, or frustration?",
    options: [
      { label: "Adapts with little difficulty", score: 0 },
      { label: "Some resistance but manageable", score: 1 },
      { label: "Frequent meltdowns or emotional outbursts", score: 2 },
      { label: "Transitions are consistently very difficult daily", score: 3 },
    ],
  },
  {
    id: 5,
    category: "Play & Social Skills",
    emoji: "🧩",
    text: "How does your child engage with other children and participate in play?",
    options: [
      { label: "Plays well with peers, age-appropriate social skills", score: 0 },
      { label: "Somewhat shy or prefers solo play occasionally", score: 1 },
      { label: "Difficulty joining play, often isolated", score: 2 },
      { label: "Avoids peers or play interactions consistently", score: 3 },
    ],
  },
  {
    id: 6,
    category: "Daily Living",
    emoji: "🌅",
    text: "How independently can your child handle daily routines — dressing, eating, grooming?",
    options: [
      { label: "Age-appropriately independent", score: 0 },
      { label: "Needs occasional prompting", score: 1 },
      { label: "Needs significant help most days", score: 2 },
      { label: "Refuses or is unable to participate in routines", score: 3 },
    ],
  },
  {
    id: 7,
    category: "Attention & Focus",
    emoji: "🎯",
    text: "How well does your child sustain attention during tasks like play, homework, or mealtime?",
    options: [
      { label: "Focuses well for age", score: 0 },
      { label: "Distracted sometimes but redirects easily", score: 1 },
      { label: "Hard to keep on task, easily overwhelmed", score: 2 },
      { label: "Rarely completes tasks, very impulsive or scattered", score: 3 },
    ],
  },
  {
    id: 8,
    category: "Feeding",
    emoji: "🥄",
    text: "Does your child have challenges with eating — textures, temperatures, or strong food aversions?",
    options: [
      { label: "Eats a variety of foods without much issue", score: 0 },
      { label: "Picky, but manageable", score: 1 },
      { label: "Very limited diet, strong texture/smell aversions", score: 2 },
      { label: "Mealtimes are consistently stressful and difficult", score: 3 },
    ],
  },
];

function getResult(score) {
  const max = questions.length * 3;
  const pct = score / max;
  if (pct < 0.2) {
    return {
      level: "Developing Well",
      color: "#2BBFB3",
      icon: "🌟",
      headline: "Your child appears to be developing well!",
      body:
        "Based on your responses, your child seems to be meeting most developmental milestones without significant challenges. Keep encouraging play, exploration, and social interaction. If you ever notice new concerns, we're always here.",
      cta: false,
    };
  } else if (pct < 0.45) {
    return {
      level: "Some Areas to Watch",
      color: "#FFD166",
      icon: "🔍",
      headline: "A few areas worth keeping an eye on.",
      body:
        "Your child is doing well in many areas, but you've noted some patterns that could benefit from a professional perspective. An OT consultation can help clarify whether what you're seeing is typical development or something worth addressing early — before it affects school or daily life.",
      cta: true,
    };
  } else if (pct < 0.7) {
    return {
      level: "Evaluation Recommended",
      color: "#FF9A3C",
      icon: "💡",
      headline: "We recommend a professional evaluation.",
      body:
        "Your responses suggest your child may be experiencing challenges in several developmental areas. The good news? Early intervention makes a significant difference. Our team at Theraplay Pediatrics specializes in exactly these concerns — and we currently have no waitlist.",
      cta: true,
    };
  } else {
    return {
      level: "Early Intervention Advised",
      color: "#FF6B6B",
      icon: "❤️",
      headline: "Early support could make a big difference.",
      body:
        "The patterns you've described suggest your child would likely benefit from a comprehensive occupational therapy evaluation as soon as possible. Early intervention leads to the best outcomes — and our Theraplay team is ready to help your family right now, with no waitlist.",
      cta: true,
    };
  }
}

function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: COLORS.gray, fontFamily: "'DM Sans', sans-serif" }}>
          Question {current} of {total}
        </span>
        <span style={{ fontSize: 12, color: COLORS.teal, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div style={{ height: 6, background: COLORS.lightGray, borderRadius: 99, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${COLORS.teal}, #4EDDD7)`,
            borderRadius: 99,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState("intro"); // intro | quiz | loading | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [aiInsight, setAiInsight] = useState("");
  const [childAge, setChildAge] = useState("");
  const [childName, setChildName] = useState("");
  const [animating, setAnimating] = useState(false);

  const totalScore = answers.reduce((a, b) => a + b, 0);

  async function fetchAiInsight(score, age) {
    const categoryScores = questions.map((q, i) => ({
      category: q.category,
      score: answers[i] ?? 0,
    }));
    const concerns = categoryScores.filter((c) => c.score >= 2).map((c) => c.category);
    const mild = categoryScores.filter((c) => c.score === 1).map((c) => c.category);

    const prompt = `You are a warm, empathetic pediatric occupational therapist at Theraplay Pediatrics in Covington, Louisiana. A parent just completed a developmental screening for their child${age ? ` (age ${age})` : ""}.

Screening results:
- Total score: ${score} out of ${questions.length * 3}
- Areas with significant concerns (score 2-3): ${concerns.length ? concerns.join(", ") : "None"}
- Areas with mild concerns (score 1): ${mild.length ? mild.join(", ") : "None"}

Write a 3-sentence personalized, compassionate summary for this parent. Be specific to the areas flagged. Be warm and encouraging — never alarmist. End with one sentence about how Theraplay Pediatrics can help. Do not use bullet points. Write in plain paragraph form.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map((c) => c.text || "").join("") || "";
      setAiInsight(text);
    } catch (e) {
      setAiInsight("");
    }
  }

  function handleSelect(score) {
    setSelected(score);
  }

  function handleNext() {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
      } else {
        const total = newAnswers.reduce((a, b) => a + b, 0);
        setResult(getResult(total));
        setStage("loading");
        fetchAiInsight(total, childAge).then(() => setStage("result"));
      }
    }, 300);
  }

  function restart() {
    setStage("intro");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setAiInsight("");
    setChildAge("");
    setChildName("");
  }

  const q = questions[current];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `radial-gradient(ellipse at 20% 0%, #d4f5f3 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, #fff0d4 0%, transparent 50%), ${COLORS.offwhite}`,
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />

      <div style={{ width: "100%", maxWidth: 560 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: COLORS.white, border: `2px solid ${COLORS.tealLight}`, borderRadius: 99, padding: "6px 16px", marginBottom: 16 }}>
            <span style={{ fontSize: 18 }}>🧡</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.teal, letterSpacing: 1 }}>THERAPLAY PEDIATRICS</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 900, color: COLORS.navy, margin: "0 0 6px", lineHeight: 1.2 }}>
            Does My Child Need OT?
          </h1>
          <p style={{ color: COLORS.gray, fontSize: 14, margin: 0 }}>A free 2-minute developmental screening for parents</p>
        </div>

        {/* Card */}
        <div
          style={{
            background: COLORS.white,
            borderRadius: 24,
            boxShadow: "0 4px 40px rgba(27,58,92,0.10)",
            padding: 32,
            border: `1px solid ${COLORS.lightGray}`,
          }}
        >
          {/* INTRO */}
          {stage === "intro" && (
            <div>
              <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>👶</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: COLORS.navy, fontSize: 22, margin: "0 0 12px", textAlign: "center" }}>
                Let's check in on your child's development
              </h2>
              <p style={{ color: "#5A7080", fontSize: 14, lineHeight: 1.7, textAlign: "center", marginBottom: 24 }}>
                Answer 8 quick questions about your child. We'll give you a personalized, AI-powered assessment and let you know if an OT evaluation might help.
              </p>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 6 }}>Child's first name (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Liam"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  style={{
                    width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 12,
                    border: `2px solid ${COLORS.lightGray}`, fontSize: 15, color: COLORS.navy,
                    outline: "none", fontFamily: "'DM Sans', sans-serif",
                  }}
                />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: COLORS.navy, marginBottom: 6 }}>Child's age</label>
                <select
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  style={{
                    width: "100%", padding: "12px 14px", borderRadius: 12, border: `2px solid ${COLORS.lightGray}`,
                    fontSize: 15, color: childAge ? COLORS.navy : COLORS.gray, fontFamily: "'DM Sans', sans-serif", outline: "none",
                  }}
                >
                  <option value="">Select age</option>
                  {["Under 1", "1 year", "2 years", "3 years", "4 years", "5 years", "6–8 years", "9–12 years", "13–17 years"].map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setStage("quiz")}
                style={{
                  width: "100%", padding: "16px", borderRadius: 14, border: "none",
                  background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                  color: COLORS.white, fontSize: 16, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", boxShadow: `0 4px 20px ${COLORS.teal}55`,
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 28px ${COLORS.teal}66`; }}
                onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 4px 20px ${COLORS.teal}55`; }}
              >
                Start Free Screening →
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: COLORS.gray, marginTop: 12, marginBottom: 0 }}>
                🔒 Completely private — no email required
              </p>
            </div>
          )}

          {/* QUIZ */}
          {stage === "quiz" && (
            <div style={{ opacity: animating ? 0 : 1, transition: "opacity 0.3s ease" }}>
              <ProgressBar current={current + 1} total={questions.length} />
              <div style={{
                display: "inline-block", background: COLORS.tealLight, color: COLORS.tealDark,
                fontSize: 11, fontWeight: 700, letterSpacing: 1, padding: "4px 10px",
                borderRadius: 99, marginTop: 20, marginBottom: 10
              }}>
                {q.emoji} {q.category.toUpperCase()}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: COLORS.navy, fontSize: 20, lineHeight: 1.4, margin: "0 0 24px" }}>
                {childName ? `${childName}: ` : ""}{q.text}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {q.options.map((opt, i) => {
                  const isSelected = selected === opt.score;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt.score)}
                      style={{
                        textAlign: "left", padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                        border: isSelected ? `2px solid ${COLORS.teal}` : `2px solid ${COLORS.lightGray}`,
                        background: isSelected ? COLORS.tealLight : COLORS.white,
                        color: isSelected ? COLORS.tealDark : COLORS.navy,
                        fontSize: 14, fontWeight: isSelected ? 700 : 500,
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.18s ease",
                        display: "flex", alignItems: "center", gap: 12,
                      }}
                    >
                      <span style={{
                        width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                        border: isSelected ? `2px solid ${COLORS.teal}` : `2px solid ${COLORS.lightGray}`,
                        background: isSelected ? COLORS.teal : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {isSelected && <span style={{ color: "white", fontSize: 12 }}>✓</span>}
                      </span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={selected === null}
                style={{
                  marginTop: 24, width: "100%", padding: "15px", borderRadius: 12, border: "none",
                  background: selected !== null
                    ? `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`
                    : COLORS.lightGray,
                  color: selected !== null ? COLORS.white : COLORS.gray,
                  fontSize: 15, fontWeight: 700, cursor: selected !== null ? "pointer" : "not-allowed",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease",
                }}
              >
                {current < questions.length - 1 ? "Next Question →" : "See My Results →"}
              </button>
            </div>
          )}

          {/* LOADING */}
          {stage === "loading" && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🧠</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: COLORS.navy, marginBottom: 10 }}>
                Analyzing your responses...
              </h3>
              <p style={{ color: COLORS.gray, fontSize: 14 }}>Our OT-trained AI is preparing a personalized summary for you.</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{
                    width: 10, height: 10, borderRadius: "50%", background: COLORS.teal,
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
              <style>{`@keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }`}</style>
            </div>
          )}

          {/* RESULT */}
          {stage === "result" && result && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 52, marginBottom: 8 }}>{result.icon}</div>
                <div style={{
                  display: "inline-block", padding: "6px 18px", borderRadius: 99,
                  background: result.color + "22", color: result.color,
                  fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 12,
                }}>
                  {result.level.toUpperCase()}
                </div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: COLORS.navy, fontSize: 22, margin: "0 0 8px", lineHeight: 1.3 }}>
                  {result.headline}
                </h2>
              </div>

              {/* Score breakdown */}
              <div style={{ background: COLORS.offwhite, borderRadius: 14, padding: "16px 20px", marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray, letterSpacing: 1, margin: "0 0 12px" }}>AREA BREAKDOWN</p>
                {questions.map((q, i) => {
                  const s = answers[i] ?? 0;
                  const colors = ["#2BBFB3", "#FFD166", "#FF9A3C", "#FF6B6B"];
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 14, width: 22 }}>{q.emoji}</span>
                      <span style={{ fontSize: 12, color: COLORS.navy, flex: 1, fontWeight: 500 }}>{q.category}</span>
                      <div style={{ display: "flex", gap: 3 }}>
                        {[0, 1, 2, 3].map((dot) => (
                          <div key={dot} style={{
                            width: 10, height: 10, borderRadius: "50%",
                            background: dot <= s ? colors[s] : COLORS.lightGray,
                          }} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 14, color: "#5A7080", lineHeight: 1.75, margin: 0 }}>
                  {result.body}
                </p>
              </div>

              {/* AI Insight */}
              {aiInsight && (
                <div style={{
                  background: `linear-gradient(135deg, ${COLORS.tealLight}, #fff8e8)`,
                  border: `1px solid ${COLORS.teal}33`, borderRadius: 14, padding: 18, marginBottom: 20,
                }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: COLORS.teal, letterSpacing: 1, margin: "0 0 8px" }}>✨ PERSONALIZED AI INSIGHT</p>
                  <p style={{ fontSize: 14, color: COLORS.navy, lineHeight: 1.75, margin: 0 }}>{aiInsight}</p>
                </div>
              )}

              {/* CTA */}
              {result.cta ? (
                <div>
                  <a
                    href="https://theraplayot.com/lets-get-started"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block", textAlign: "center", textDecoration: "none",
                      padding: "16px", borderRadius: 14,
                      background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.tealDark})`,
                      color: COLORS.white, fontSize: 15, fontWeight: 700,
                      boxShadow: `0 4px 20px ${COLORS.teal}44`, marginBottom: 10,
                    }}
                  >
                    📅 Book a Free Consultation at Theraplay
                  </a>
                  <p style={{ textAlign: "center", fontSize: 12, color: COLORS.gray, marginBottom: 16 }}>
                    No waitlist • Covington, Louisiana • OT & Speech Therapy
                  </p>
                </div>
              ) : (
                <div style={{
                  background: COLORS.tealLight, borderRadius: 14, padding: "14px 18px",
                  textAlign: "center", marginBottom: 16,
                }}>
                  <p style={{ fontSize: 14, color: COLORS.tealDark, margin: 0, fontWeight: 500 }}>
                    🌟 Keep doing what you're doing! If anything changes, <a href="https://theraplayot.com" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.teal }}>we're always here</a>.
                  </p>
                </div>
              )}

              <button
                onClick={restart}
                style={{
                  width: "100%", padding: "13px", borderRadius: 12, border: `2px solid ${COLORS.lightGray}`,
                  background: "transparent", color: COLORS.gray, fontSize: 14, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                ↺ Start Over
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 12, color: COLORS.gray, marginTop: 16 }}>
          This screening is not a clinical diagnosis. Please consult a licensed OT for a full evaluation.<br />
          <a href="https://theraplayot.com" target="_blank" rel="noopener noreferrer" style={{ color: COLORS.teal }}>TheraplayOT.com</a> • Theraplay Pediatrics LLC
        </p>
      </div>
    </div>
  );
}
