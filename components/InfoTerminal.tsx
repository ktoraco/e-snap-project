import { FC, useState, useEffect, useMemo } from "react";

const InfoTerminal: FC = () => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  // textLinesをuseMemoでコンポーネントの最上位で定義
  const textLines = useMemo(
    () => [
      "[INFO] Photo ID: 10234",
      "[INFO] Title: Sunset Over the Mountains",
      "[INFO] Location: Virtual World - Region 5",
      "[INFO] Captured By: User12345",
      "[INFO] Date Captured: 2023-09-15 18:45:23",
      "[INFO] Resolution: 1920x1080",
      "[INFO] File Size: 2.3MB",
      "[INFO] Format: JPEG",
      "[INFO] Tags: #sunset #mountains #virtualworld",
      "[INFO] Description: A breathtaking view of the sun setting over the mountains in the virtual world.",
      "[INFO] Camera Settings:",
      " - Aperture: f/2.8",
      " - Shutter Speed: 1/250s",
      " - ISO: 100",
      " - Focal Length: 35mm",
      "[INFO] Color Profile: sRGB",
      "[INFO] GPS Coordinates: 35.6895° N, 139.6917° E",
      "[INFO] Weather: Clear Skies",
      "[INFO] Popularity: 4.8/5 (based on 234 ratings)",
      "[INFO] Comments:",
      ' - "Absolutely stunning!"',
      ' - "Feels like I\'m there."',
      ' - "Great composition and colors."',
      "[INFO] Related Photos:",
      " - Photo ID: 10235 (Sunrise in the Valley)",
      " - Photo ID: 10236 (Night Sky Over the Lake)",
    ],
    []
  ); // 空の依存配列で初回レンダリング時のみ生成

  // 最初のuseEffectは削除（textLinesの宣言を上に移動したため）

  useEffect(() => {
    if (!typing) return;

    // 全ての行が表示されたら終了
    if (currentLineIndex >= textLines.length) {
      setTyping(false);
      return;
    }

    // 現在の行の文字を1文字ずつ表示する
    const currentLine = textLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      // タイプライター効果のタイマー
      const typingTimer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          // 最後の行を更新して文字を追加
          newLines[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return newLines;
        });
        // 一度に複数文字を進める（速度アップ）
        setCurrentCharIndex(currentCharIndex + Math.floor(Math.random() * 3) + 1);
      }, 5 + Math.random() * 10); // タイピング速度を上げる

      return () => clearTimeout(typingTimer);
    } else {
      // 行が完成したら次の行へ
      const nextLineTimer = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1);
        setCurrentCharIndex(0);
        setDisplayedLines((prev) => [...prev, ""]); // 新しい空の行を追加
      }, 50 + Math.random() * 150); // 行間の遅延

      return () => clearTimeout(nextLineTimer);
    }
  }, [currentLineIndex, currentCharIndex, typing, textLines]);

  // コンポーネントマウント時に最初の空の行を追加
  useEffect(() => {
    setDisplayedLines([""]);
  }, []);

  return (
    <div className="bg-black text-gray-500 font-mono p-4 h-60 min-h-60 overflow-y-auto p-2 text-xs hidden-scrollbar rounded-lg terminal-scroll" style={{ scrollBehavior: "smooth" }}>
      {displayedLines.map((line, index) => (
        <p key={index} className={index === currentLineIndex && typing ? "typing" : ""}>
          {line}
          {index === currentLineIndex && typing && <span className="cursor">▋</span>}
        </p>
      ))}
      <style jsx>{`
        .cursor {
          animation: blink 0.7s infinite;
        }
        .typing {
          border-right: none;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .terminal-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .terminal-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default InfoTerminal;
