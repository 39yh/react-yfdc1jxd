import React, { useState, useEffect, useCallback } from "react";

// ─── DATA：TOEIC Part5 頻出単語 網羅版 ────────────────────────
const SUFFIX_DATA = [
  // ══ 名詞 ══
  { suffix: "-tion/-ation", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "information", meaning: "情報" },
    { word: "organization", meaning: "組織" },
    { word: "presentation", meaning: "プレゼン" },
    { word: "reservation", meaning: "予約" },
    { word: "confirmation", meaning: "確認" },
    { word: "recommendation", meaning: "推薦" },
    { word: "compensation", meaning: "報酬・補償" },
    { word: "consideration", meaning: "検討" },
    { word: "implementation", meaning: "実施" },
    { word: "administration", meaning: "管理・運営" },
    { word: "collaboration", meaning: "協力" },
    { word: "concentration", meaning: "集中" },
    { word: "communication", meaning: "コミュニケーション" },
    { word: "appreciation", meaning: "感謝・評価" },
    { word: "satisfaction", meaning: "満足" },
    { word: "qualification", meaning: "資格" },
    { word: "renovation", meaning: "改装" },
    { word: "regulation", meaning: "規制" },
    { word: "negotiation", meaning: "交渉" },
    { word: "application", meaning: "応募・申請" },
    { word: "participation", meaning: "参加" },
    { word: "demonstration", meaning: "実演・デモ" },
    { word: "position", meaning: "職・位置" },
  ]},
  { suffix: "-sion", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "decision", meaning: "決定" },
    { word: "extension", meaning: "内線・延長" },
    { word: "permission", meaning: "許可" },
    { word: "expansion", meaning: "拡大" },
    { word: "discussion", meaning: "議論" },
    { word: "impression", meaning: "印象" },
    { word: "submission", meaning: "提出" },
    { word: "admission", meaning: "入場・入学" },
    { word: "commission", meaning: "手数料・委員会" },
    { word: "revision", meaning: "改訂" },
    { word: "division", meaning: "部門・分割" },
    { word: "profession", meaning: "職業" },
  ]},
  { suffix: "-ment", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "management", meaning: "経営・管理" },
    { word: "agreement", meaning: "合意・契約" },
    { word: "payment", meaning: "支払い" },
    { word: "department", meaning: "部門" },
    { word: "document", meaning: "書類" },
    { word: "requirement", meaning: "要件" },
    { word: "improvement", meaning: "改善" },
    { word: "achievement", meaning: "達成・業績" },
    { word: "announcement", meaning: "発表" },
    { word: "assignment", meaning: "業務・課題" },
    { word: "establishment", meaning: "設立" },
    { word: "adjustment", meaning: "調整" },
    { word: "engagement", meaning: "関与・予約" },
    { word: "employment", meaning: "雇用" },
    { word: "development", meaning: "開発・発展" },
    { word: "investment", meaning: "投資" },
    { word: "movement", meaning: "動き・運動" },
    { word: "shipment", meaning: "発送" },
    { word: "replacement", meaning: "交換・後任" },
    { word: "appointment", meaning: "予約・任命" },
    { word: "reimbursement", meaning: "払い戻し" },
    { word: "assessment", meaning: "評価・査定" },
  ]},
  { suffix: "-ance/-ence", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "performance", meaning: "業績・公演" },
    { word: "maintenance", meaning: "保守・整備" },
    { word: "assistance", meaning: "援助" },
    { word: "confidence", meaning: "自信" },
    { word: "difference", meaning: "違い" },
    { word: "attendance", meaning: "出席・参加" },
    { word: "experience", meaning: "経験" },
    { word: "importance", meaning: "重要性" },
    { word: "appearance", meaning: "外観・登場" },
    { word: "acceptance", meaning: "受け入れ" },
    { word: "compliance", meaning: "遵守" },
    { word: "preference", meaning: "好み" },
    { word: "reference", meaning: "参照・参考文献" },
    { word: "guidance", meaning: "指導" },
    { word: "insurance", meaning: "保険" },
    { word: "clearance", meaning: "通関・許可" },
    { word: "allowance", meaning: "手当・許容量" },
    { word: "conference", meaning: "会議" },
    { word: "distance", meaning: "距離" },
    { word: "evidence", meaning: "証拠" },
    { word: "influence", meaning: "影響" },
    { word: "residence", meaning: "居住地" },
  ]},
  { suffix: "-ty/-ity", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "opportunity", meaning: "機会" },
    { word: "community", meaning: "地域・共同体" },
    { word: "facility", meaning: "施設" },
    { word: "priority", meaning: "優先事項" },
    { word: "capacity", meaning: "収容力・能力" },
    { word: "quality", meaning: "品質" },
    { word: "activity", meaning: "活動" },
    { word: "availability", meaning: "利用可能性" },
    { word: "productivity", meaning: "生産性" },
    { word: "responsibility", meaning: "責任" },
    { word: "possibility", meaning: "可能性" },
    { word: "ability", meaning: "能力" },
    { word: "authority", meaning: "権限・当局" },
    { word: "publicity", meaning: "宣伝・知名度" },
    { word: "creativity", meaning: "創造性" },
    { word: "flexibility", meaning: "柔軟性" },
    { word: "reliability", meaning: "信頼性" },
    { word: "popularity", meaning: "人気" },
    { word: "profitability", meaning: "収益性" },
    { word: "visibility", meaning: "視認性・知名度" },
    { word: "diversity", meaning: "多様性" },
    { word: "security", meaning: "安全・警備" },
    { word: "majority", meaning: "大多数" },
  ]},
  { suffix: "-ness", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "business", meaning: "事業・会社" },
    { word: "awareness", meaning: "意識・認識" },
    { word: "effectiveness", meaning: "効果・有効性" },
    { word: "fitness", meaning: "健康・適性" },
    { word: "kindness", meaning: "親切" },
    { word: "readiness", meaning: "準備態勢" },
    { word: "openness", meaning: "開放性" },
    { word: "timeliness", meaning: "適時性" },
    { word: "weakness", meaning: "弱点" },
    { word: "promptness", meaning: "迅速さ" },
  ]},
  { suffix: "-er/-or/-ist", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "supplier", meaning: "供給業者" },
    { word: "employer", meaning: "雇用主" },
    { word: "consumer", meaning: "消費者" },
    { word: "investor", meaning: "投資家" },
    { word: "contractor", meaning: "請負業者" },
    { word: "competitor", meaning: "競合他社" },
    { word: "supervisor", meaning: "上司・監督者" },
    { word: "applicant", meaning: "応募者" },
    { word: "specialist", meaning: "専門家" },
  ]},
  { suffix: "-cy", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "policy", meaning: "方針・規則" },
    { word: "emergency", meaning: "緊急事態" },
    { word: "agency", meaning: "代理店" },
    { word: "efficiency", meaning: "効率" },
    { word: "accuracy", meaning: "正確さ" },
    { word: "vacancy", meaning: "空き・欠員" },
    { word: "currency", meaning: "通貨" },
    { word: "frequency", meaning: "頻度" },
    { word: "privacy", meaning: "プライバシー" },
    { word: "urgency", meaning: "緊急性" },
  ]},
  { suffix: "-al (名詞)", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "approval", meaning: "承認" },
    { word: "arrival", meaning: "到着" },
    { word: "proposal", meaning: "提案" },
    { word: "renewal", meaning: "更新" },
    { word: "referral", meaning: "紹介・照会" },
    { word: "withdrawal", meaning: "撤退・引き出し" },
    { word: "disposal", meaning: "処理・廃棄" },
  ]},
  { suffix: "-sis", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "analysis", meaning: "分析" },
    { word: "emphasis", meaning: "強調" },
    { word: "basis", meaning: "基盤・根拠" },
  ]},
  { suffix: "-ee", pos: "名詞", posEn: "Noun", hue: "#FF5C87", words: [
    { word: "employee", meaning: "従業員" },
    { word: "trainee", meaning: "研修生" },
    { word: "attendee", meaning: "参加者" },
  ]},

  // ══ 動詞 ══
  { suffix: "-ify/-fy", pos: "動詞", posEn: "Verb", hue: "#FFB800", words: [
    { word: "identify", meaning: "特定する" },
    { word: "notify", meaning: "通知する" },
    { word: "modify", meaning: "変更する" },
    { word: "simplify", meaning: "簡略化する" },
    { word: "clarify", meaning: "明確にする" },
    { word: "verify", meaning: "確認する" },
    { word: "qualify", meaning: "資格を得る" },
    { word: "justify", meaning: "正当化する" },
    { word: "satisfy", meaning: "満足させる" },
    { word: "specify", meaning: "指定する" },
    { word: "classify", meaning: "分類する" },
    { word: "certify", meaning: "証明する" },
    { word: "diversify", meaning: "多様化する" },
  ]},
  { suffix: "-ize/-ise", pos: "動詞", posEn: "Verb", hue: "#FFB800", words: [
    { word: "organize", meaning: "整理する" },
    { word: "realize", meaning: "実感する・実現する" },
    { word: "specialize", meaning: "専門にする" },
    { word: "standardize", meaning: "標準化する" },
    { word: "maximize", meaning: "最大化する" },
    { word: "minimize", meaning: "最小化する" },
    { word: "prioritize", meaning: "優先する" },
    { word: "finalize", meaning: "完成させる" },
    { word: "authorize", meaning: "承認する" },
    { word: "utilize", meaning: "活用する" },
    { word: "recognize", meaning: "認識する・表彰する" },
    { word: "customize", meaning: "カスタマイズする" },
    { word: "summarize", meaning: "要約する" },
    { word: "analyze", meaning: "分析する" },
    { word: "emphasize", meaning: "強調する" },
    { word: "synchronize", meaning: "同期する" },
  ]},
  { suffix: "-ate", pos: "動詞", posEn: "Verb", hue: "#FFB800", words: [
    { word: "create", meaning: "創造する" },
    { word: "indicate", meaning: "示す" },
    { word: "donate", meaning: "寄付する" },
    { word: "evaluate", meaning: "評価する" },
    { word: "negotiate", meaning: "交渉する" },
    { word: "communicate", meaning: "伝える" },
    { word: "collaborate", meaning: "協力する" },
    { word: "participate", meaning: "参加する" },
    { word: "demonstrate", meaning: "実演する" },
    { word: "accommodate", meaning: "収容する・対応する" },
    { word: "renovate", meaning: "改装する" },
    { word: "allocate", meaning: "割り当てる" },
    { word: "coordinate", meaning: "調整する" },
    { word: "anticipate", meaning: "予期する" },
    { word: "estimate", meaning: "見積もる" },
    { word: "facilitate", meaning: "促進する" },
    { word: "generate", meaning: "生み出す" },
    { word: "incorporate", meaning: "組み込む" },
  ]},
  { suffix: "-en", pos: "動詞", posEn: "Verb", hue: "#FFB800", words: [
    { word: "broaden", meaning: "広げる" },
    { word: "strengthen", meaning: "強化する" },
    { word: "shorten", meaning: "短くする" },
    { word: "sharpen", meaning: "研ぐ・鋭くする" },
    { word: "widen", meaning: "広げる" },
    { word: "tighten", meaning: "締める・厳しくする" },
    { word: "lessen", meaning: "減らす" },
    { word: "quicken", meaning: "速める" },
  ]},

  // ══ 形容詞 ══
  { suffix: "-able/-ible", pos: "形容詞", posEn: "Adj", hue: "#00C9A7", words: [
    { word: "available", meaning: "利用可能な" },
    { word: "reasonable", meaning: "手ごろな・合理的な" },
    { word: "flexible", meaning: "柔軟な" },
    { word: "noticeable", meaning: "目立つ" },
    { word: "comfortable", meaning: "快適な" },
    { word: "reliable", meaning: "信頼できる" },
    { word: "suitable", meaning: "適切な" },
    { word: "capable", meaning: "能力がある" },
    { word: "responsible", meaning: "責任ある" },
    { word: "remarkable", meaning: "注目に値する" },
    { word: "acceptable", meaning: "受け入れられる" },
    { word: "applicable", meaning: "適用可能な" },
    { word: "considerable", meaning: "かなりの" },
    { word: "favorable", meaning: "好意的な" },
    { word: "preferable", meaning: "より好ましい" },
    { word: "sustainable", meaning: "持続可能な" },
    { word: "eligible", meaning: "資格がある" },
    { word: "valuable", meaning: "価値のある" },
    { word: "knowledgeable", meaning: "知識豊かな" },
  ]},
  { suffix: "-ful", pos: "形容詞", posEn: "Adj", hue: "#00C9A7", words: [
    { word: "successful", meaning: "成功している" },
    { word: "careful", meaning: "慎重な" },
    { word: "useful", meaning: "役に立つ" },
    { word: "helpful", meaning: "役立つ" },
    { word: "powerful", meaning: "強力な" },
    { word: "meaningful", meaning: "意義深い" },
    { word: "skillful", meaning: "熟練した" },
    { word: "thoughtful", meaning: "思慮深い・親切な" },
    { word: "resourceful", meaning: "機転が利く" },
    { word: "grateful", meaning: "感謝している" },
  ]},
  { suffix: "-ive/-sive/-tive", pos: "形容詞", posEn: "Adj", hue: "#00C9A7", words: [
    { word: "effective", meaning: "効果的な" },
    { word: "competitive", meaning: "競争力のある" },
    { word: "creative", meaning: "創造的な" },
    { word: "expensive", meaning: "値段が高い" },
    { word: "productive", meaning: "生産的な" },
    { word: "attractive", meaning: "魅力的な" },
    { word: "innovative", meaning: "革新的な" },
    { word: "responsive", meaning: "反応が早い" },
    { word: "extensive", meaning: "広範な" },
    { word: "impressive", meaning: "印象的な" },
    { word: "exclusive", meaning: "独占的な" },
    { word: "consecutive", meaning: "連続した" },
    { word: "comprehensive", meaning: "包括的な" },
    { word: "tentative", meaning: "暫定的な" },
    { word: "constructive", meaning: "建設的な" },
    { word: "representative", meaning: "代表的な" },
  ]},
  { suffix: "-ous", pos: "形容詞", posEn: "Adj", hue: "#00C9A7", words: [
    { word: "serious", meaning: "深刻な・本気の" },
    { word: "previous", meaning: "以前の" },
    { word: "famous", meaning: "有名な" },
    { word: "various", meaning: "様々な" },
    { word: "continuous", meaning: "継続的な" },
    { word: "numerous", meaning: "多数の" },
    { word: "generous", meaning: "寛大な" },
    { word: "rigorous", meaning: "厳格な" },
    { word: "ambitious", meaning: "野心的な" },
    { word: "prestigious", meaning: "名声のある" },
    { word: "advantageous", meaning: "有利な" },
    { word: "courteous", meaning: "礼儀正しい" },
  ]},
  { suffix: "-al/-nal/-cal/-cial", pos: "形容詞", posEn: "Adj", hue: "#00C9A7", words: [
    { word: "additional", meaning: "追加の" },
    { word: "professional", meaning: "プロの" },
    { word: "international", meaning: "国際的な" },
    { word: "personal", meaning: "個人的な" },
    { word: "operational", meaning: "運用上の" },
    { word: "seasonal", meaning: "季節の" },
    { word: "optional", meaning: "任意の" },
    { word: "functional", meaning: "機能的な" },
    { word: "exceptional", meaning: "例外的な・優れた" },
    { word: "promotional", meaning: "宣伝の" },
    { word: "financial", meaning: "財政の" },
    { word: "special", meaning: "特別な" },
    { word: "official", meaning: "公式な" },
    { word: "beneficial", meaning: "有益な" },
    { word: "commercial", meaning: "商業的な" },
    { word: "technical", meaning: "技術的な" },
    { word: "practical", meaning: "実用的な" },
    { word: "economical", meaning: "経済的な" },
    { word: "historical", meaning: "歴史的な" },
    { word: "local", meaning: "地元の" },
    { word: "annual", meaning: "年間の" },
    { word: "global", meaning: "世界的な" },
    { word: "mutual", meaning: "相互の" },
    { word: "critical", meaning: "重要な・批判的な" },
  ]},
  { suffix: "-less", pos: "形容詞", posEn: "Adj", hue: "#00C9A7", words: [
    { word: "flawless", meaning: "完璧な" },
    { word: "effortless", meaning: "楽な" },
    { word: "countless", meaning: "無数の" },
    { word: "wireless", meaning: "無線の" },
    { word: "careless", meaning: "不注意な" },
    { word: "endless", meaning: "終わりのない" },
  ]},
  { suffix: "-ic", pos: "形容詞", posEn: "Adj", hue: "#00C9A7", words: [
    { word: "economic", meaning: "経済的な" },
    { word: "specific", meaning: "具体的な" },
    { word: "strategic", meaning: "戦略的な" },
    { word: "systematic", meaning: "組織的な" },
    { word: "automatic", meaning: "自動的な" },
    { word: "domestic", meaning: "国内の・家庭の" },
    { word: "realistic", meaning: "現実的な" },
    { word: "enthusiastic", meaning: "熱心な" },
  ]},
  { suffix: "-ing (形容詞)", pos: "形容詞", posEn: "Adj", hue: "#00C9A7", words: [
    { word: "promising", meaning: "有望な" },
    { word: "outstanding", meaning: "優秀な・未払いの" },
    { word: "existing", meaning: "既存の" },
    { word: "remaining", meaning: "残りの" },
    { word: "leading", meaning: "主要な" },
    { word: "demanding", meaning: "要求の厳しい" },
    { word: "rewarding", meaning: "やりがいのある" },
    { word: "challenging", meaning: "困難な・やりがいある" },
  ]},
  { suffix: "-ed (形容詞)", pos: "形容詞", posEn: "Adj", hue: "#00C9A7", words: [
    { word: "experienced", meaning: "経験豊かな" },
    { word: "qualified", meaning: "資格のある" },
    { word: "dedicated", meaning: "献身的な" },
    { word: "established", meaning: "確立された" },
    { word: "satisfied", meaning: "満足した" },
    { word: "detailed", meaning: "詳細な" },
    { word: "advanced", meaning: "高度な" },
    { word: "limited", meaning: "限定的な" },
  ]},

  // ══ 副詞 ══
  { suffix: "例外（-less）", pos: "副詞", posEn: "Adv", hue: "#845EF7", words: [
    { word: "regardless", meaning: "〜にかかわらず・それでも" },
  ]},
  { suffix: "-ly (副詞)", pos: "副詞", posEn: "Adv", hue: "#845EF7", words: [
    { word: "recently", meaning: "最近" },
    { word: "currently", meaning: "現在" },
    { word: "immediately", meaning: "すぐに" },
    { word: "efficiently", meaning: "効率的に" },
    { word: "effectively", meaning: "効果的に" },
    { word: "successfully", meaning: "うまく" },
    { word: "previously", meaning: "以前に" },
    { word: "approximately", meaning: "おおよそ" },
    { word: "specifically", meaning: "具体的に" },
    { word: "significantly", meaning: "大幅に" },
    { word: "consistently", meaning: "一貫して" },
    { word: "accordingly", meaning: "それゆえに" },
    { word: "consequently", meaning: "その結果" },
    { word: "promptly", meaning: "迅速に" },
    { word: "directly", meaning: "直接に" },
    { word: "carefully", meaning: "慎重に" },
    { word: "thoroughly", meaning: "徹底的に" },
    { word: "largely", meaning: "主に・大部分は" },
    { word: "closely", meaning: "密接に" },
    { word: "highly", meaning: "非常に" },
    { word: "frequently", meaning: "頻繁に" },
    { word: "primarily", meaning: "主に" },
    { word: "temporarily", meaning: "一時的に" },
    { word: "regularly", meaning: "定期的に" },
    { word: "additionally", meaning: "さらに" },
    { word: "eventually", meaning: "最終的に" },
    { word: "necessarily", meaning: "必ずしも" },
    { word: "professionally", meaning: "プロとして" },
    { word: "ideally", meaning: "理想的には" },
    { word: "mutually", meaning: "相互に" },
  ]},
];

const ALL_WORDS = SUFFIX_DATA.flatMap(s =>
  s.words.map(w => ({ ...w, suffix: s.suffix, pos: s.pos, posEn: s.posEn, hue: s.hue }))
);

const POS_CONFIG = {
  "名詞":  { sub: "Noun", hue: "#FF5C87", emoji: "📦", light: "#FFF0F4" },
  "動詞":  { sub: "Verb", hue: "#FFB800", emoji: "⚡", light: "#FFFBEA" },
  "形容詞":{ sub: "Adj",  hue: "#00C9A7", emoji: "✨", light: "#EDFAF6" },
  "副詞":  { sub: "Adv",  hue: "#845EF7", emoji: "💨", light: "#F3EEFF" },
};

const TIME_LIMIT = 5;
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// ─── SUB COMPONENTS ───────────────────────────────────────────

function PosTag({ pos, size = "md" }) {
  const cfg = POS_CONFIG[pos];
  const sz = { sm: { p: "3px 9px", fs: 10 }, md: { p: "5px 13px", fs: 13 }, lg: { p: "10px 22px", fs: 18 } }[size];
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      background:cfg.hue, color:"#fff", borderRadius:100,
      padding:sz.p, fontSize:sz.fs, fontWeight:800, letterSpacing:".02em",
      boxShadow:`0 2px 10px ${cfg.hue}55`,
    }}>
      {cfg.emoji} {pos} <span style={{ opacity:.7, fontSize:sz.fs*.8 }}>({cfg.sub})</span>
    </span>
  );
}

function CircleTimer({ timeLeft, total = TIME_LIMIT }) {
  const r = 22, circ = 2 * Math.PI * r;
  const danger = timeLeft <= 2;
  return (
    <div style={{ position:"relative", width:64, height:64, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width="64" height="64" style={{ position:"absolute", transform:"rotate(-90deg)" }}>
        <circle cx="32" cy="32" r={r} fill="none" stroke="#E8E8F0" strokeWidth="5" />
        <circle cx="32" cy="32" r={r} fill="none"
          stroke={danger ? "#FF5C87" : "#00C9A7"} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - timeLeft / total)}
          style={{ transition:"stroke-dashoffset .9s linear, stroke .3s" }} strokeLinecap="round"
        />
      </svg>
      <span style={{ fontFamily:"'Nunito',sans-serif", fontSize:20, fontWeight:900,
        color: danger ? "#FF5C87" : "#1A1A2E",
        animation: danger ? "timerPulse .4s infinite alternate" : "none" }}>
        {timeLeft}
      </span>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState("menu");
  // flash
  const [fGroup, setFGroup] = useState(0);
  const [fCard, setFCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [fFilter, setFFilter] = useState("全て");
  // quiz settings
  const [qCount, setQCount] = useState(10);
  const [qFilter, setQFilter] = useState("全て");
  // quiz state
  const [words, setWords] = useState([]);
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [phase, setPhase] = useState("question");
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState([]);
  const [timerOn, setTimerOn] = useState(false);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);

  const shareApp = async () => {
    const shareData = {
      title: "品詞スナイパー",
      text: "語尾を見た瞬間に品詞を答えるTOEIC千本ノック",
      url: "https://part-of-speech-sniper.vercel.app/"
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(shareData.url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 1800);
    } catch (error) {
      if (error.name !== "AbortError") window.prompt("このURLをコピーしてください", shareData.url);
    }
  };

  const filteredGroups = fFilter === "全て" ? SUFFIX_DATA : SUFFIX_DATA.filter(s => s.pos === fFilter);
  const cg = filteredGroups[Math.min(fGroup, filteredGroups.length - 1)] || filteredGroups[0];
  const cw = cg?.words[fCard];

  const startQuiz = () => {
    const pool = qFilter === "全て" ? ALL_WORDS : ALL_WORDS.filter(w => w.pos === qFilter);
    const w = shuffle(pool).slice(0, qCount);
    setWords(w); setQi(0); setScore(0); setCombo(0); setMaxCombo(0);
    setResults([]); setSelected(null); setPhase("question");
    setTimeLeft(TIME_LIMIT); setTimerOn(true); setMode("quiz");
  };

  useEffect(() => {
    if (mode !== "quiz" || !timerOn || phase !== "question") return;
    if (timeLeft <= 0) { commitAnswer(null); return; }
    const t = setTimeout(() => setTimeLeft(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [mode, timerOn, timeLeft, phase]);

  const commitAnswer = useCallback((pos) => {
    if (phase !== "question") return;
    setTimerOn(false); setSelected(pos); setPhase("reveal");
    const cur = words[qi];
    const ok = pos === cur.pos;
    setResults(r => [...r, { ...cur, selected: pos, ok }]);
    if (ok) { setScore(s => s + 1); setCombo(c => { const n = c + 1; setMaxCombo(m => Math.max(m, n)); return n; }); }
    else setCombo(0);
  }, [phase, words, qi]);

  const goNext = () => {
    if (qi + 1 >= words.length) { setMode("result"); return; }
    setQi(i => i + 1);
    setSelected(null); setPhase("question");
    setTimeLeft(TIME_LIMIT); setTimerOn(true);
  };

  const cur = words[qi];
  const isCorrect = selected === cur?.pos;
  const prog = words.length ? ((qi + (phase === "reveal" ? 1 : 0)) / words.length) * 100 : 0;
  const wrongResults = results.filter(r => !r.ok);

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#FFF7FB 0%,#F0F4FF 50%,#F5FFF9 100%)",
      fontFamily:"'Nunito','Noto Sans JP',sans-serif",
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"flex-start",
      padding:mode==="quiz"
        ? "calc(env(safe-area-inset-top, 0px) + 26px) 16px 28px"
        : "calc(env(safe-area-inset-top, 0px) + 42px) 16px 28px",
      position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Noto+Sans+JP:wght@400;700;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .btn{cursor:pointer;border:none;outline:none;transition:transform .13s,box-shadow .13s;}
        .btn:active{transform:scale(.93)!important;}
        .btn:disabled{opacity:.38;cursor:default!important;transform:none!important;}
        @keyframes popIn{0%{transform:scale(.65) rotate(-5deg);opacity:0}65%{transform:scale(1.08) rotate(1deg)}100%{transform:scale(1) rotate(0);opacity:1}}
        @keyframes shakeIt{0%,100%{transform:translateX(0)}20%{transform:translateX(-10px)}40%{transform:translateX(9px)}60%{transform:translateX(-6px)}80%{transform:translateX(5px)}}
        @keyframes slideUp{from{transform:translateY(26px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes flipCard{from{transform:rotateY(65deg) scale(.95);opacity:0}to{transform:rotateY(0) scale(1);opacity:1}}
        @keyframes bounceIn{0%{transform:scale(0);opacity:0}60%{transform:scale(1.22)}80%{transform:scale(.94)}100%{transform:scale(1);opacity:1}}
        @keyframes timerPulse{from{transform:scale(1)}to{transform:scale(1.25)}}
        @keyframes revealSlide{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}}
        .pop{animation:popIn .35s cubic-bezier(.36,.07,.19,.97) both;}
        .shake{animation:shakeIt .4s both;}
        .up{animation:slideUp .36s ease both;}
        .flip{animation:flipCard .3s ease both;}
        .bounce{animation:bounceIn .4s cubic-bezier(.36,.07,.19,.97) both;}
        .reveal{animation:revealSlide .28s ease both;}
        ::-webkit-scrollbar{width:0;}
      `}</style>

      {/* Blobs */}
      <div style={{position:"fixed",top:-80,right:-60,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,#FF5C8728,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:-100,left:-80,width:320,height:320,borderRadius:"50%",background:"radial-gradient(circle,#845EF728,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",top:"40%",left:-60,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,#00C9A71A,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"fixed",bottom:"20%",right:-40,width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,#FFB80020,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:430 }}>

        {/* ════ MENU ════ */}
        {mode === "menu" && (
          <div className="up">
            <div style={{textAlign:"center",marginBottom:22}}>
              <div style={{fontSize:56,marginBottom:6,filter:"drop-shadow(0 4px 16px #FF5C8755)"}}>🎯</div>
              <h1 style={{fontFamily:"'Nunito',sans-serif",fontSize:27,fontWeight:900,color:"#1A1A2E",letterSpacing:"-.02em",lineHeight:1.2,marginBottom:5}}>品詞スナイパー</h1>
              <p style={{color:"#8888AA",fontSize:12,fontWeight:600}}>語尾を見た瞬間に品詞を答えろ！</p>
            </div>

            <div className="pos-overview">
              {Object.entries(POS_CONFIG).map(([pos,cfg]) => (
                <div key={pos} className="pos-overview-item">
                  <span className="pos-overview-emoji">{cfg.emoji}</span>
                  <span className="pos-overview-name">{pos}</span>
                  <span className="pos-overview-sub">{cfg.sub}</span>
                </div>
              ))}
            </div>

            <div style={{background:"#fff",borderRadius:20,padding:16,boxShadow:"0 4px 22px #0000000E",marginBottom:13}}>
              <div style={{fontSize:11,fontWeight:800,color:"#AAAACC",letterSpacing:".1em",marginBottom:12,textTransform:"uppercase"}}>クイズ設定</div>
              <div style={{marginBottom:11}}>
                <div style={{fontSize:12,fontWeight:700,color:"#555570",marginBottom:6}}>問題数</div>
                <div style={{display:"flex",gap:6}}>
                  {[5,10,15,20].map(n => (
                    <button key={n} className="btn" onClick={()=>setQCount(n)} style={{
                      flex:1, padding:"9px 0", borderRadius:10, fontSize:14, fontWeight:800,
                      background:qCount===n?"#1A1A2E":"#F4F4FA",
                      color:qCount===n?"#fff":"#8888AA",
                      boxShadow:qCount===n?"0 4px 12px #1A1A2E44":"none",
                    }}>{n}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:"#555570",marginBottom:6}}>品詞フィルター</div>
                <div className="pos-filter-grid">
                  {["全て",...Object.keys(POS_CONFIG)].map(p => {
                    const cfg = POS_CONFIG[p];
                    return (
                      <button key={p} className="btn pos-filter-button" onClick={()=>setQFilter(p)} style={{
                        borderRadius:9, fontWeight:800,
                        background:qFilter===p?(cfg?.hue||"#1A1A2E"):"#F4F4FA",
                        color:qFilter===p?"#fff":"#8888AA",
                        boxShadow:qFilter===p?`0 3px 10px ${cfg?.hue||"#333"}55`:"none",
                      }}><span className="pos-filter-emoji">{cfg?.emoji || "🌐"}</span><span>{p}</span></button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <button className="btn" onClick={startQuiz} style={{
                background:"linear-gradient(135deg,#FF5C87,#E8004D)", color:"#fff",
                padding:"16px 24px", borderRadius:15, fontFamily:"'Nunito',sans-serif",
                fontWeight:900, fontSize:16, boxShadow:"0 6px 22px #FF5C8750",
              }}>⚡ 瞬間判別クイズ START！</button>
              <button className="btn" onClick={()=>{setMode("flash");setFGroup(0);setFCard(0);setFlipped(false);}} style={{
                background:"linear-gradient(135deg,#00C9A7,#009070)", color:"#fff",
                padding:"16px 24px", borderRadius:15, fontFamily:"'Nunito',sans-serif",
                fontWeight:900, fontSize:16, boxShadow:"0 6px 22px #00C9A750",
              }}>📚 フラッシュカードで確認</button>
            </div>
            <p style={{textAlign:"center",color:"#CCCCDD",fontSize:11,fontWeight:600,marginTop:11}}>
              全 {ALL_WORDS.length} 単語収録 · 語尾 {SUFFIX_DATA.length} パターン
            </p>
            <button className="btn" onClick={shareApp} aria-label="品詞スナイパーを共有する" style={{
              display:"block", margin:"7px auto 0", padding:"8px 14px", background:"transparent",
              color:"#AAAACC", fontSize:11, fontWeight:700, letterSpacing:".04em"
            }}>{shareCopied ? "✓ URLをコピーしました" : "↗ 共有する"}</button>
          </div>
        )}

        {/* ════ FLASH ════ */}
        {mode === "flash" && (
          <div className="up">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:11}}>
              <button className="btn" onClick={()=>setMode("menu")} style={{background:"#fff",color:"#8888AA",padding:"7px 13px",borderRadius:10,fontSize:13,fontWeight:700,boxShadow:"0 2px 8px #0000000D"}}>← 戻る</button>
              <span style={{fontSize:11,fontWeight:700,color:"#AAAACC"}}>{fGroup+1}/{filteredGroups.length}グループ · {fCard+1}/{cg?.words.length}</span>
            </div>

            <div style={{display:"flex",gap:5,marginBottom:11,overflowX:"auto",paddingBottom:4}}>
              {["全て",...Object.keys(POS_CONFIG)].map(p => {
                const cfg = POS_CONFIG[p];
                return (
                  <button key={p} className="btn" onClick={()=>{setFFilter(p);setFGroup(0);setFCard(0);setFlipped(false);}} style={{
                    whiteSpace:"nowrap", padding:"5px 10px", borderRadius:9, fontSize:11, fontWeight:800,
                    background:fFilter===p?(cfg?.hue||"#1A1A2E"):"#fff",
                    color:fFilter===p?"#fff":"#8888AA",
                    boxShadow:fFilter===p?`0 3px 10px ${cfg?.hue||"#333"}55`:"0 2px 6px #0000000A",
                  }}>{cfg?`${cfg.emoji} ${p}`:"🌐 全て"}</button>
                );
              })}
            </div>

            <div style={{background:"#fff",borderRadius:13,padding:"9px 14px",marginBottom:9,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 2px 10px #0000000A"}}>
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <span style={{fontSize:10,fontWeight:700,color:"#CCCCDD"}}>語尾</span>
                <span style={{fontFamily:"'Nunito',sans-serif",fontSize:20,fontWeight:900,color:cg?.hue}}>{cg?.suffix}</span>
              </div>
              <PosTag pos={cg?.pos} size="sm"/>
            </div>

            <div className="btn flip" key={`${fGroup}-${fCard}-${flipped}`}
              onClick={()=>setFlipped(f=>!f)}
              style={{
                background:flipped?`linear-gradient(135deg,${cg?.hue}1A,${cg?.hue}08)`:"#fff",
                border:`3px solid ${flipped?cg?.hue:"#F0F0FA"}`,
                borderRadius:22, padding:"36px 22px", textAlign:"center",
                minHeight:182, display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:11,
                marginBottom:13, boxShadow:flipped?`0 8px 28px ${cg?.hue}30`:"0 4px 18px #0000000A",
                transition:"background .22s,border .22s,box-shadow .22s",
              }}>
              {!flipped ? (
                <>
                  <div style={{fontSize:10,fontWeight:700,color:"#CCCCDD",letterSpacing:".12em",textTransform:"uppercase"}}>単語</div>
                  <div style={{fontFamily:"'Nunito',sans-serif",fontSize:32,fontWeight:900,color:"#1A1A2E"}}>{cw?.word}</div>
                  <div style={{fontSize:12,fontWeight:600,color:"#CCCCDD",marginTop:3}}>👆 タップして意味を確認</div>
                </>
              ) : (
                <>
                  <div style={{fontSize:10,fontWeight:700,color:cg?.hue,letterSpacing:".12em",textTransform:"uppercase"}}>意味</div>
                  <div style={{fontFamily:"'Nunito',sans-serif",fontSize:28,fontWeight:900,color:cg?.hue}}>{cw?.meaning}</div>
                  <div style={{background:"#fff",borderRadius:10,padding:"5px 14px",fontSize:12,fontWeight:700,color:"#555570",display:"flex",alignItems:"center",gap:6}}>
                    <span style={{color:cg?.hue}}>{cg?.suffix}</span>
                    <span style={{color:"#CCCCDD"}}>→</span>
                    <PosTag pos={cg?.pos} size="sm"/>
                  </div>
                </>
              )}
            </div>

            <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:12}}>
              {cg?.words.map((_,i) => (
                <button key={i} className="btn" onClick={()=>{setFCard(i);setFlipped(false);}} style={{
                  width:8, height:8, borderRadius:4, padding:0, border:"none",
                  background:fCard===i?cg?.hue:"#E0E0EE",
                }}/>
              ))}
            </div>

            <div style={{display:"flex",gap:10}}>
              <button className="btn" disabled={fGroup===0&&fCard===0}
                onClick={()=>{if(fCard>0){setFCard(c=>c-1);}else if(fGroup>0){const g=fGroup-1;setFGroup(g);setFCard(filteredGroups[g].words.length-1);}setFlipped(false);}}
                style={{flex:1,background:"#fff",color:"#8888AA",padding:12,borderRadius:12,fontSize:20,fontWeight:700,boxShadow:"0 2px 8px #0000000D"}}>←</button>
              <button className="btn"
                onClick={()=>{if(fCard+1<cg.words.length){setFCard(c=>c+1);}else if(fGroup+1<filteredGroups.length){setFGroup(g=>g+1);setFCard(0);}else{setMode("menu");return;}setFlipped(false);}}
                style={{
                  flex:3,padding:12,borderRadius:12,fontSize:14,fontWeight:800,border:"none",
                  background:fGroup+1>=filteredGroups.length&&fCard+1>=cg?.words.length?"linear-gradient(135deg,#00C9A7,#009070)":"#1A1A2E",
                  color:"#fff",boxShadow:"0 4px 14px #00000020",
                }}>
                {fGroup+1>=filteredGroups.length&&fCard+1>=cg?.words.length?"✅ 完了！":"次へ →"}
              </button>
            </div>
          </div>
        )}

        {/* ════ QUIZ ════ */}
        {mode === "quiz" && cur && (
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}>
                <div style={{background:"#1A1A2E",color:"#fff",borderRadius:9,padding:"4px 11px",fontSize:12,fontWeight:800}}>
                  Q{qi+1}<span style={{opacity:.4}}>/{words.length}</span>
                </div>
                {combo>=2&&(
                  <div className="bounce" style={{background:"linear-gradient(135deg,#FFB800,#FF8C00)",color:"#fff",borderRadius:9,padding:"4px 11px",fontSize:12,fontWeight:800,boxShadow:"0 3px 10px #FFB80060"}}>
                    🔥 {combo} COMBO!
                  </div>
                )}
              </div>
              <div style={{background:"#fff",borderRadius:9,padding:"4px 12px",fontSize:13,fontWeight:800,color:"#1A1A2E",boxShadow:"0 2px 8px #0000000D"}}>
                {score}pt ⭐
              </div>
            </div>

            <div style={{height:5,background:"#E8E8F0",borderRadius:3,marginBottom:14,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${prog}%`,background:"linear-gradient(90deg,#FF5C87,#845EF7,#00C9A7)",borderRadius:3,transition:"width .4s ease"}}/>
            </div>

            {/* Timer + word */}
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:13}}>
              {phase==="question" ? (
                <CircleTimer timeLeft={timeLeft}/>
              ) : (
                <div style={{width:64,height:64,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <div className="bounce" style={{fontSize:36}}>{isCorrect?"✅":"❌"}</div>
                </div>
              )}
              <div className={phase==="reveal"?(isCorrect?"pop":"shake"):"flip"} key={qi+phase} style={{
                flex:1, background:"#fff", borderRadius:18, padding:"16px 18px",
                boxShadow:phase==="reveal"
                  ? isCorrect?"0 6px 26px #00C9A755":"0 6px 26px #FF5C8755"
                  : "0 4px 16px #0000000E",
                border:phase==="reveal"
                  ? `3px solid ${isCorrect?"#00C9A7":"#FF5C87"}`
                  : "3px solid transparent",
                transition:"border .2s,box-shadow .2s",
              }}>
                <div style={{fontFamily:"'Nunito',sans-serif",fontSize:26,fontWeight:900,color:"#1A1A2E",letterSpacing:"-.02em"}}>{cur.word}</div>
                <div className={phase==="reveal"?"reveal":""} style={{marginTop:4,fontSize:12,fontWeight:700,color:"#8888AA"}}>
                  この意味で判定：{cur.meaning}
                </div>
              </div>
            </div>

            {/* ─ QUESTION PHASE ─ */}
            {phase==="question"&&(
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {Object.entries(POS_CONFIG).map(([pos,cfg])=>(
                  <button key={pos} className="btn" onClick={()=>commitAnswer(pos)} style={{
                    background:"#fff", border:`3px solid ${cfg.hue}30`,
                    borderRadius:16, padding:"15px 10px",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                    boxShadow:`0 3px 12px ${cfg.hue}18`,
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow=`0 6px 20px ${cfg.hue}44`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow=`0 3px 12px ${cfg.hue}18`;}}
                  >
                    <span style={{fontSize:24}}>{cfg.emoji}</span>
                    <span style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:17,color:cfg.hue}}>{pos}</span>
                    <span style={{fontSize:10,fontWeight:700,color:"#CCCCDD",letterSpacing:".1em"}}>{cfg.sub}</span>
                  </button>
                ))}
              </div>
            )}

            {/* ─ REVEAL PHASE ─ */}
            {phase==="reveal"&&(
              <div className="reveal">
                {/* Result banner */}
                <div style={{
                  borderRadius:20, padding:"18px 18px 15px",
                  background:isCorrect?"linear-gradient(135deg,#00C9A7,#009070)":"linear-gradient(135deg,#FF5C87,#E8004D)",
                  boxShadow:isCorrect?"0 8px 30px #00C9A760":"0 8px 30px #FF5C8760",
                  marginBottom:11,
                }}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
                    <span style={{fontSize:30}}>{isCorrect?"🎉":"😢"}</span>
                    <div>
                      <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:19,color:"#fff"}}>
                        {isCorrect?"正解！":"不正解…"}
                      </div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,.75)",fontWeight:600}}>
                        {isCorrect?"その調子！":selected?`あなたの回答：${selected}`:"時間切れ！"}
                      </div>
                    </div>
                  </div>

                  {/* Explanation box */}
                  <div style={{background:"rgba(255,255,255,.18)",borderRadius:13,padding:"11px 13px"}}>
                    <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.65)",letterSpacing:".1em",marginBottom:6,textTransform:"uppercase"}}>この意味・用法での解答</div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
                      <div>
                        <span style={{fontFamily:"'Nunito',sans-serif",fontSize:21,fontWeight:900,color:"#fff"}}>{cur.word}</span>
                        <span style={{fontSize:13,color:"rgba(255,255,255,.75)",marginLeft:7,fontWeight:600}}>「{cur.meaning}」</span>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
                        <div style={{background:"rgba(255,255,255,.25)",borderRadius:7,padding:"3px 10px",fontSize:12,fontWeight:800,color:"#fff"}}>
                          語尾：{cur.suffix}
                        </div>
                        <div style={{background:"#fff",borderRadius:8,padding:"4px 11px",display:"inline-flex",alignItems:"center",gap:5}}>
                          <span style={{fontSize:13}}>{POS_CONFIG[cur.pos]?.emoji}</span>
                          <span style={{fontSize:14,fontWeight:900,color:POS_CONFIG[cur.pos]?.hue}}>{cur.pos}</span>
                          <span style={{fontSize:11,color:"#AAAACC",fontWeight:600}}>({cur.posEn})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 choices recap */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:13}}>
                  {Object.entries(POS_CONFIG).map(([pos,cfg])=>{
                    const isAns = pos===cur.pos;
                    const isWrong = pos===selected&&!isAns;
                    return (
                      <div key={pos} style={{
                        borderRadius:13, padding:"11px 10px",
                        background:isAns?cfg.hue:isWrong?"#FFF0F3":"#F8F8FC",
                        border:`2.5px solid ${isAns?cfg.hue:isWrong?"#FF5C87":"#F0F0FA"}`,
                        display:"flex", alignItems:"center", gap:8,
                        boxShadow:isAns?`0 4px 16px ${cfg.hue}55`:"none",
                        opacity:(!isAns&&!isWrong)?.5:1,
                      }}>
                        <span style={{fontSize:18}}>{cfg.emoji}</span>
                        <div>
                          <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:14,
                            color:isAns?"#fff":isWrong?"#FF5C87":"#8888AA"}}>{pos}</div>
                          <div style={{fontSize:9,fontWeight:600,color:isAns?"rgba(255,255,255,.7)":"#CCCCDD"}}>{cfg.sub}</div>
                        </div>
                        {isAns&&<span style={{marginLeft:"auto",fontSize:16,color:"#fff",fontWeight:900}}>✓</span>}
                        {isWrong&&<span style={{marginLeft:"auto",fontSize:16,color:"#FF5C87"}}>✗</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Next button */}
                <button className="btn" onClick={goNext} style={{
                  width:"100%", padding:"16px", borderRadius:15, border:"none",
                  background:qi+1>=words.length?"linear-gradient(135deg,#845EF7,#5C35D9)":"linear-gradient(135deg,#1A1A2E,#333355)",
                  color:"#fff", fontFamily:"'Nunito',sans-serif", fontWeight:900, fontSize:16,
                  boxShadow:qi+1>=words.length?"0 6px 22px #845EF755":"0 6px 18px #1A1A2E44",
                }}>
                  {qi+1>=words.length?"🏁 結果を見る！":"次の問題へ →"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ════ RESULT ════ */}
        {mode==="result"&&(
          <div className="up" style={{textAlign:"center"}}>
            <div style={{fontSize:60,marginBottom:7,filter:"drop-shadow(0 4px 18px #FFB80080)"}}>
              {score/words.length>=.9?"🏆":score/words.length>=.7?"🌟":score/words.length>=.5?"👍":"💪"}
            </div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:56,fontWeight:900,lineHeight:1,marginBottom:5}}>
              <span style={{color:score/words.length>=.7?"#00C9A7":score/words.length>=.5?"#FFB800":"#FF5C87"}}>{score}</span>
              <span style={{color:"#CCCCDD",fontSize:24}}> / {words.length}</span>
            </div>
            <p style={{color:"#8888AA",fontSize:14,fontWeight:700,marginBottom:maxCombo>=3?7:18}}>
              {score/words.length>=.9?"完璧！TOEIC満点コース🚀":score/words.length>=.7?"いい感じ！あと一歩！":score/words.length>=.5?"もう一回チャレンジ！":"フラッシュカードで復習しよう！"}
            </p>
            {maxCombo>=3&&(
              <div className="bounce" style={{display:"inline-block",background:"linear-gradient(135deg,#FFB800,#FF8C00)",color:"#fff",borderRadius:12,padding:"5px 16px",fontSize:13,fontWeight:800,marginBottom:16,boxShadow:"0 4px 14px #FFB80066"}}>
                🔥 最大 {maxCombo} COMBO達成！
              </div>
            )}

            {wrongResults.length>0&&(
              <div style={{background:"#fff",borderRadius:18,padding:15,marginBottom:15,textAlign:"left",boxShadow:"0 4px 18px #0000000D"}}>
                <div style={{fontSize:11,fontWeight:800,color:"#AAAACC",letterSpacing:".08em",textTransform:"uppercase",marginBottom:9}}>📋 要復習リスト ({wrongResults.length}問)</div>
                {wrongResults.map((r,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 10px",borderRadius:10,background:"#FFF5F7",border:"1.5px solid #FFCDD8",marginBottom:5}}>
                    <div>
                      <span style={{fontSize:13,fontWeight:800,color:"#FF5C87"}}>{r.word}</span>
                      <span style={{fontSize:10,color:"#AAAACC",marginLeft:6,fontWeight:600}}>{r.meaning}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0,marginLeft:6}}>
                      <span style={{fontSize:10,color:"#CCCCDD",fontWeight:600}}>{r.suffix}</span>
                      <PosTag pos={r.pos} size="sm"/>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              <button className="btn" onClick={startQuiz} style={{
                background:"linear-gradient(135deg,#FF5C87,#E8004D)",color:"#fff",
                padding:15,borderRadius:14,fontFamily:"'Nunito',sans-serif",
                fontWeight:900,fontSize:15,boxShadow:"0 6px 20px #FF5C8760",border:"none"
              }}>⚡ もう一度チャレンジ！</button>
              <button className="btn" onClick={()=>setMode("menu")} style={{
                background:"#fff",color:"#8888AA",padding:13,borderRadius:14,
                fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,
                boxShadow:"0 2px 10px #0000000D",border:"none"
              }}>← メニューへ</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
