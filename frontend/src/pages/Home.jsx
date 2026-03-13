import React, { useState, useRef, useEffect } from "react";
import {
  Headphones,
  Upload,
  Sparkles,
  Play,
  FileText,
  BookOpen,
  Zap,
  Mic2,
  Clock,
  Music2,
  UserCircle,
  LogOut,
} from "lucide-react";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [topic, setTopic] = useState("");
  //const [file, setFile] = useState(null);
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [mode, setMode] = useState("story");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const utteranceRef = useRef(null);
  const [user, setUser] = useState(null);

  const features = [
    {
      icon: Sparkles,
      title: "AI Smart Structuring",
      description:
        "AI converts your material into engaging stories and revision chunks.",
      color: "from-violet-400 to-purple-500",
    },
    {
      icon: Headphones,
      title: "Listen Anywhere",
      description: "Stream and learn during commute or workouts.",
      color: "from-amber-400 to-orange-500",
    },
    {
      icon: Play,
      title: "Audio Control",
      description: "You can control the audio speed according to your wish",
      color: "from-cyan-400 to-blue-500",
    },
  ];
  // 🚀 Generate Content from Backend
  const generateContent = async () => {
    if (!topic) {
      alert("Please enter a topic");
      return;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);

    setSections([]);
    setGeneratedText("");
    setCurrentIndex(0);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch("https://chronomind-3oma.onrender.com/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic: topic,
          mode: mode,
        }),
      });

      const data = await response.json();

      console.log("Backend Response:", data);

      if (response.ok) {
        // ✅ Set full generated text
        setGeneratedText(data.generatedText);

        // ✅ Clean special symbols
        const cleaned = data.generatedText.replace(/[#*_`-]/g, "");

        // ✅ Split into sections
        setSections([cleaned]);
        setCurrentIndex(0);
      } else {
        alert(data.message || "Error generating content");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const cleanTextForSpeech = (text) => {
    return (
      text
        // Remove HTML tags completely
        .replace(/<[^>]*>/g, "")

        // Remove markdown symbols
        .replace(/[#*_`~>-]/g, "")

        // Remove URLs
        .replace(/https?:\/\/\S+/g, "")

        // Replace underscores with space
        .replace(/_/g, " ")

        // Remove extra symbols
        .replace(/[{}[\]()]/g, "")

        // Replace multiple new lines with pause
        .replace(/\n+/g, ". ")

        // Remove extra spaces
        .replace(/\s+/g, " ")

        .trim()
    );
  };

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:", voices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);
  useEffect(() => {
  window.speechSynthesis.cancel();
  setIsPlaying(false);
}, [topic]);
  const speakSection = (index) => {
    if (!sections[index]) return;

    const text = sections[index];

    console.log("Speaking text length:", text.length);

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

    let i = 0;
    const speakNext = () => {
      if (i >= sentences.length) {
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(sentences[i]);
      utterance.rate = speed;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices[0];
      }

      utterance.onend = () => {
        i++;
        speakNext();
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
    setIsPlaying(true);
  };
  const togglePlay = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
    } else {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    }
  };
  const restartSection = () => {
    window.speechSynthesis.cancel();
    speakSection(currentIndex);
  };
  const prevSection = () => {
    if (currentIndex > 0) {
      const prev = currentIndex - 1;
      setCurrentIndex(prev);
      speakSection(prev);
    }
  };
  const nextSection = () => {
    if (currentIndex < sections.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      speakSection(next);
    }
  };
  const changeSpeed = (rate) => {
    setSpeed(rate);

    if (isPlaying) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(sections[currentIndex]);
      utterance.rate = rate;

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };
  const handlePlayPause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        speakSection(currentIndex);
      }
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("https://chronomind-3oma.onrender.com/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* NAVIGATION */}
      <nav className="px-1 py-10 flex justify-between items-center max-w-7xl mx-auto">
        {/* LEFT SIDE - Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-2xl">
            <Headphones className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Chronomind
          </span>
        </div>

        {/* RIGHT SIDE - Navigation + Profile */}
        <div className="hidden md:flex items-center gap-8 relative">
          <a href="#features" className="text-slate-300 hover:text-cyan-400">
            Features
          </a>

          {/* Profile */}
          <div className="relative">
            {/* Avatar Button */}
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-10 h-10 rounded-full 
               bg-gradient-to-r from-cyan-500 to-blue-600 
               flex items-center justify-center 
               text-white font-semibold 
               hover:scale-105 transition-all duration-200 shadow-lg"
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </button>

            {showProfile && (
              <div
                className="absolute right-0 mt-3 w-60 
                    bg-slate-900 border border-white/10 
                    rounded-xl shadow-2xl p-3 
                    animate-in fade-in zoom-in-95 
                    duration-150 z-50"
              >
                {/* User Info Section */}
                <div className="flex items-center gap-3 px-3 pb-3">
                  <UserCircle className="w-10 h-10 text-cyan-400" />

                  <div className="flex flex-col">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-semibold text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-2"></div>

                {/* Logout */}
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 
                   rounded-lg hover:bg-red-500/20 
                   text-red-400 transition-all duration-200"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-20 pb-32 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
            <Music2 className="w-4 h-4" />
            Turn Dead Time Into Learning Time
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Turn Your
            <span className="block bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Commute Into
            </span>
            A Classroom 🎧
          </h1>

          <p className="text-xl text-slate-300 max-w-xl">
            Upload any topic and get engaging audio lessons instantly. Learn
            while driving, walking, or relaxing.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl p-9 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6">Start Learning</h3>

          <div className="space-y-2">
            {/* Topic Input */}
            <input
              type="text"
              placeholder="Enter topic name (e.g., Machine Learning Basics)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 focus:border-cyan-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => setMode("story")}
              className={`p-4 rounded-xl text-left transition ${
                mode === "story"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <BookOpen className="w-6 h-6 mb-2 text-amber-400" />
              Story Mode
            </button>

            <button
              onClick={() => setMode("chunks")}
              className={`p-4 rounded-xl text-left transition ${
                mode === "chunks"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              <Zap className="w-6 h-6 mb-2 text-cyan-400" />
              Quick Chunks
            </button>
          </div>

          <p className="text-sm text-slate-400 mt-2">
            Selected Mode: <span className="text-cyan-400">{mode}</span>
          </p>

          <button
            onClick={generateContent}
            disabled={loading}
            className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition disabled:opacity-50"
          >
            <Mic2 className="w-5 h-5" />
            {loading ? "Generating..." : "Generate Audio"}
          </button>

          {/* Listen & Stop */}
          {sections.length > 0 && (
            <div className="mt-6 bg-slate-900 p-6 rounded-2xl border border-white/10">
              {/* Main Controls */}
              <div className="flex items-center justify-center gap-10">
                {/* Previous */}
                <button
                  onClick={prevSection}
                  className="text-2xl hover:text-cyan-400 transition"
                >
                  ⏮
                </button>

                {/* Big Play / Pause Toggle */}
                <button
                  onClick={handlePlayPause}
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-600 transition text-2xl shadow-lg"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                {/* Restart */}
                <button
                  onClick={restartSection}
                  className="text-2xl hover:text-cyan-400 transition"
                >
                  🔄
                </button>

                {/* Next */}
                <button
                  onClick={nextSection}
                  className="text-2xl hover:text-cyan-400 transition"
                >
                  ⏭
                </button>
              </div>

              {/* Speed Controls */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-400 mb-3">Playback Speed</p>

                <div className="flex justify-center gap-3">
                  {[0.75, 1, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => changeSpeed(rate)}
                      className={`px-4 py-2 rounded-xl text-sm transition ${
                        speed === rate
                          ? "bg-cyan-500 text-white"
                          : "bg-slate-800 hover:bg-slate-700"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-24 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                onMouseEnter={() => setActiveFeature(i)}
                className={`p-8 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeFeature === i
                    ? "border-cyan-500 shadow-xl shadow-cyan-500/20"
                    : "border-white/10"
                }`}
              >
                <div
                  className={`w-14 h-14 mb-6 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 text-center text-slate-400 border-t border-white/10">
        © 2026 Chronomind. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
