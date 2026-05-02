import { useState } from "react";

const DAYS = ["日", "月", "火", "水", "木", "金", "土"];

const generateEmail = ({ name, month, day, dayOfWeek, hour, minute, concern }) => {
  const concernLine = concern
    ? `${name}様の場合ですと${concern}などのお悩みあるとのことなので、体の状態に合わせた"完全オーダーメイドのストレッチ"で、初回から変化をご体感いただけるよう、全力でサポートさせていただきます！`
    : `当日は${name}様のお悩みをヒアリングさせていただき、お体の状態に合わせた"完全オーダーメイドのストレッチ"で、初回から変化をご体感いただけるよう、全力でサポートさせていただきます！`;

  return `${name}様

この度は、NOBIRU Stretch九品仏店にご予約いただき誠にありがとうございます。

ご予約内容を下記の通り確認させていただきます。


【ご予約内容】

●日時：${month}月${day}日（${dayOfWeek}）${hour}時${minute}分〜

●メニュー：初回体験コース（60分）


当日は、以下の内容をご確認のうえご来店いただけますと幸いです。


【ご案内事項】

・動きやすい服装でお越しください（貸出のお着替えもございます）

・ご予約の5分前を目安にお越しください

・お身体の状態やお悩みについて、簡単なカウンセリングからスタートします


${concernLine}

ご不明点やご都合の変更がある場合は、前日までにご連絡をお願いいたします。


それでは、${name}様にお会いできることを楽しみにしております！

NOBIRU Stretch
TEL：070-8422-7758

所在地：東京都世田谷区奥沢８丁目13-8 メゾン奥沢`;
};

export default function App() {
  const [form, setForm] = useState({
    name: "",
    month: "",
    day: "",
    dayOfWeek: "水",
    hour: "",
    minute: "00",
    concern: "",
  });
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [emailText, setEmailText] = useState("");

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleGenerate = () => {
    if (!form.name || !form.month || !form.day || !form.hour) return;
    const text = generateEmail(form);
    setEmailText(text);
    setGenerated(true);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(emailText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleReset = () => {
    setForm({ name: "", month: "", day: "", dayOfWeek: "水", hour: "", minute: "00", concern: "" });
    setGenerated(false);
    setEmailText("");
    setCopied(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f0f",
      fontFamily: "'Noto Sans JP', sans-serif",
      padding: "32px 16px",
      color: "#f0ede8",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Playfair+Display:ital@1&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "#a0906e",
            textTransform: "uppercase",
            marginBottom: 8,
          }}>NOBIRU Stretch 九品仏店</div>
          <h1 style={{
            fontSize: 22,
            fontWeight: 700,
            margin: 0,
            letterSpacing: "0.05em",
          }}>リマインドメール 生成</h1>
          <div style={{
            width: 40,
            height: 2,
            background: "#a0906e",
            margin: "14px auto 0",
          }} />
        </div>

        {/* Form Card */}
        <div style={{
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: 12,
          padding: "28px 24px",
          marginBottom: 20,
        }}>

          {/* Name */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>お客様のお名前 *</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                placeholder="山田 太郎"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                style={inputStyle}
              />
              <span style={{ color: "#888", fontSize: 14, whiteSpace: "nowrap" }}>様</span>
            </div>
          </div>

          {/* Date */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>予約日時 *</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <input
                placeholder="5"
                value={form.month}
                onChange={(e) => update("month", e.target.value)}
                style={{ ...inputStyle, width: 56, textAlign: "center" }}
                maxLength={2}
              />
              <span style={unitStyle}>月</span>
              <input
                placeholder="10"
                value={form.day}
                onChange={(e) => update("day", e.target.value)}
                style={{ ...inputStyle, width: 56, textAlign: "center" }}
                maxLength={2}
              />
              <span style={unitStyle}>日</span>
              <select
                value={form.dayOfWeek}
                onChange={(e) => update("dayOfWeek", e.target.value)}
                style={{ ...inputStyle, width: 72 }}
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>{d}曜日</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
              <input
                placeholder="14"
                value={form.hour}
                onChange={(e) => update("hour", e.target.value)}
                style={{ ...inputStyle, width: 56, textAlign: "center" }}
                maxLength={2}
              />
              <span style={unitStyle}>時</span>
              <select
                value={form.minute}
                onChange={(e) => update("minute", e.target.value)}
                style={{ ...inputStyle, width: 72 }}
              >
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <span style={unitStyle}>分〜</span>
            </div>
          </div>

          {/* Concern */}
          <div style={{ marginBottom: 8 }}>
            <label style={labelStyle}>
              お悩み・目的
              <span style={{ color: "#666", fontWeight: 400, marginLeft: 8, fontSize: 11 }}>（任意）</span>
            </label>
            <input
              placeholder="例：肩こりと腰痛"
              value={form.concern}
              onChange={(e) => update("concern", e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!form.name || !form.month || !form.day || !form.hour}
          style={{
            width: "100%",
            padding: "14px",
            background: (!form.name || !form.month || !form.day || !form.hour)
              ? "#2a2a2a"
              : "linear-gradient(135deg, #a0906e, #c8b08a)",
            color: (!form.name || !form.month || !form.day || !form.hour) ? "#555" : "#0f0f0f",
            border: "none",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.08em",
            cursor: (!form.name || !form.month || !form.day || !form.hour) ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
            marginBottom: 20,
          }}
        >
          メールを生成する
        </button>

        {/* Generated Email */}
        {generated && (
          <div style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 12,
            overflow: "hidden",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom: "1px solid #2a2a2a",
            }}>
              <span style={{ fontSize: 12, color: "#888", letterSpacing: "0.1em" }}>生成されたメール</span>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleReset}
                  style={{
                    padding: "6px 14px",
                    background: "transparent",
                    border: "1px solid #333",
                    borderRadius: 6,
                    color: "#888",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  リセット
                </button>
                <button
                  onClick={handleCopy}
                  style={{
                    padding: "6px 16px",
                    background: copied ? "#3a5a3a" : "linear-gradient(135deg, #a0906e, #c8b08a)",
                    border: "none",
                    borderRadius: 6,
                    color: copied ? "#8fc88f" : "#0f0f0f",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    letterSpacing: "0.05em",
                  }}
                >
                  {copied ? "✓ コピー済み" : "コピー"}
                </button>
              </div>
            </div>
            <pre style={{
              margin: 0,
              padding: "20px",
              fontSize: 13,
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
              color: "#d4cfc8",
              fontFamily: "'Noto Sans JP', sans-serif",
              maxHeight: 420,
              overflowY: "auto",
            }}>
              {emailText}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 12,
  color: "#a0906e",
  letterSpacing: "0.1em",
  marginBottom: 8,
  fontWeight: 500,
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  background: "#111",
  border: "1px solid #2e2e2e",
  borderRadius: 6,
  color: "#f0ede8",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Noto Sans JP', sans-serif",
};

const unitStyle = {
  color: "#888",
  fontSize: 13,
  whiteSpace: "nowrap",
};
