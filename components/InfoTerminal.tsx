import { FC, useState, useEffect, useMemo } from "react";

interface InfoTerminalProps {
  gameTitle: string;
}

const InfoTerminal: FC<InfoTerminalProps> = ({ gameTitle }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  // textLinesをuseMemoでコンポーネントの最上位で定義
  const textLines = useMemo(() => {
    // ゲームに基づいて異なる情報を生成
    const gameSpecificInfo = (() => {
      const randomId = Math.floor(10000 + Math.random() * 90000);
      
      switch (gameTitle) {
        case "ゴーストオブツシマ":
          return {
            title: ["Feudal Sunset", "Samurai Silhouette", "Path of Honor", "Peaceful Village"][Math.floor(Math.random() * 4)],
            location: ["Tsushima Island", "Omi Village", "Golden Temple", "Komoda Beach"][Math.floor(Math.random() * 4)],
            weather: ["Foggy", "Windy", "Clear with Falling Leaves", "Stormy"][Math.floor(Math.random() * 4)],
            tags: ["#samurai", "#feudal-japan", "#combat", "#nature", "#historic"].sort(() => Math.random() - 0.5).slice(0, 3)
          };
        
        case "原神":
          return {
            title: ["Teyvat Landscape", "Vision Bearer", "Elemental Magic", "Archon's Grace"][Math.floor(Math.random() * 4)],
            location: ["Mondstadt", "Liyue Harbor", "Dragonspine", "Inazuma"][Math.floor(Math.random() * 4)],
            weather: ["Clear Sky", "Rainy", "Thunder", "Windy"][Math.floor(Math.random() * 4)],
            tags: ["#anime", "#fantasy", "#gacha", "#open-world", "#elemental"].sort(() => Math.random() - 0.5).slice(0, 3)
          };
        
        case "ゼルダの伝説ブレスオブザワイルド":
        case "ゼルダの伝説ティアーズオブザキングダム":
          return {
            title: ["Hyrule Adventure", "Wild Exploration", "Ancient Technology", "Divine Beast"][Math.floor(Math.random() * 4)],
            location: ["Hyrule Castle", "Kakariko Village", "Great Plateau", "Gerudo Desert"][Math.floor(Math.random() * 4)],
            weather: ["Sunny", "Stormy", "Blood Moon", "Rainy"][Math.floor(Math.random() * 4)],
            tags: ["#hyrule", "#exploration", "#nature", "#ruins", "#puzzle"].sort(() => Math.random() - 0.5).slice(0, 3)
          };
        
        case "鳴潮":
          return {
            title: ["Ocean Mystery", "Submerged World", "Deep Blue", "Coral Expedition"][Math.floor(Math.random() * 4)],
            location: ["Coral Reef", "Deep Abyss", "Sunken City", "Oceanic Ridge"][Math.floor(Math.random() * 4)],
            weather: ["Clear Waters", "Underwater Storm", "Bioluminescent", "Murky"][Math.floor(Math.random() * 4)],
            tags: ["#underwater", "#mystery", "#ocean", "#exploration", "#sea-life"].sort(() => Math.random() - 0.5).slice(0, 3)
          };
        
        case "ゼンレスゾーンゼロ":
          return {
            title: ["Zone Frontier", "Dimensional Portal", "Zero Gravity", "Time Anomaly"][Math.floor(Math.random() * 4)],
            location: ["New Eridu", "Sixth Street", "Hollow District", "Boundary Zone"][Math.floor(Math.random() * 4)],
            weather: ["Dimensional Distortion", "Clear Sky", "Energy Storm", "Nebula Effect"][Math.floor(Math.random() * 4)],
            tags: ["#sci-fi", "#future", "#combat", "#dimension", "#urban"].sort(() => Math.random() - 0.5).slice(0, 3)
          };
        
        default:
          return {
            title: "Game Screenshot",
            location: "Virtual World",
            weather: ["Clear", "Cloudy", "Rainy", "Foggy", "Stormy"][Math.floor(Math.random() * 5)],
            tags: ["#game", "#screenshot", "#virtual"].sort(() => Math.random() - 0.5).slice(0, 3)
          };
      }
    })();
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    
    // ランダムなカメラ設定
    const aperture = [1.4, 1.8, 2.0, 2.8, 4.0, 5.6][Math.floor(Math.random() * 6)];
    const shutterSpeed = ["1/30", "1/60", "1/125", "1/250", "1/500", "1/1000"][Math.floor(Math.random() * 6)];
    const iso = [100, 200, 400, 800, 1600][Math.floor(Math.random() * 5)];
    const focalLength = [16, 24, 35, 50, 85, 135][Math.floor(Math.random() * 6)];
    
    return [
      `[INFO] Photo ID: ${Math.floor(10000 + Math.random() * 90000)}`,
      `[INFO] Title: ${gameSpecificInfo.title}`,
      `[INFO] Game: ${gameTitle || "Unknown Game"}`,
      `[INFO] Location: ${gameSpecificInfo.location}`,
      `[INFO] Captured By: Player${Math.floor(1000 + Math.random() * 9000)}`,
      `[INFO] Date Captured: ${dateStr} ${timeStr}`,
      `[INFO] Resolution: 1920x1080`,
      `[INFO] Format: JPEG`,
      `[INFO] Tags: ${gameSpecificInfo.tags.map(tag => tag).join(' ')}`,
      `[INFO] Description: An amazing screenshot captured in ${gameSpecificInfo.location} showing the ${gameSpecificInfo.weather.toLowerCase()} weather conditions.`,
      `[INFO] Camera Settings:`,
      ` - Aperture: f/${aperture}`,
      ` - Shutter Speed: ${shutterSpeed}s`,
      ` - ISO: ${iso}`,
      ` - Focal Length: ${focalLength}mm`,
      `[INFO] Weather: ${gameSpecificInfo.weather}`,
      `[INFO] Popularity: ${(3 + Math.random() * 2).toFixed(1)}/5`,
    ];
  }, [gameTitle]);


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
