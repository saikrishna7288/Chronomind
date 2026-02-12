import { useState } from "react";
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
  Music2
} from "lucide-react";

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState(null);

  const features = [
    {
      icon: Upload,
      title: "Upload Any Content",
      description: "Upload PDFs, DOCX, TXT or paste any topic to convert into audio.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Sparkles,
      title: "AI Smart Structuring",
      description: "AI converts your material into engaging stories and revision chunks.",
      color: "from-violet-400 to-purple-500"
    },
    {
      icon: Headphones,
      title: "Listen Anywhere",
      description: "Stream or download and learn during commute or workouts.",
      color: "from-amber-400 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* NAVIGATION */}
      <nav className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
  
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

    <a href="#how" className="text-slate-300 hover:text-cyan-400">
      How It Works
    </a>

    {/* Profile */}
    <div className="relative">
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold"
      >
        SK
      </button>

      {showProfile && (
        <div className="absolute right-0 mt-3 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-xl p-3 space-y-2">
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition">
            My Profile
          </button>

          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 transition">
            Dashboard
          </button>

          <button
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
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
            Upload any topic and get engaging audio lessons instantly. Learn while driving, walking, or relaxing.
          </p>

          <div className="flex gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition">
              <Upload className="w-5 h-5" />
              Upload & Convert
            </button>

            <button className="px-8 py-4 bg-white/10 border border-white/20 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/20 transition">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6">Quick Convert</h3>

          <div className="space-y-6">

  {/* Upload Section */}
  <label className="border-2 border-dashed border-slate-600 rounded-2xl p-12 text-center hover:border-cyan-500 transition cursor-pointer block">
    <input
      type="file"
      className="hidden"
      onChange={(e) => setFile(e.target.files[0])}
    />

    <FileText className="w-10 h-10 mx-auto mb-4 text-cyan-400" />
    <p className="font-semibold">
      {file ? file.name : "Drop your document here"}
    </p>
    <p className="text-sm text-slate-400">
      PDF, DOCX, TXT
    </p>
  </label>

  {/* OR Divider */}
  <div className="flex items-center gap-4">
    <div className="flex-1 h-px bg-slate-700"></div>
    <span className="text-slate-400 text-sm">OR</span>
    <div className="flex-1 h-px bg-slate-700"></div>
  </div>

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
            <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition text-left">
              <BookOpen className="w-6 h-6 mb-2 text-amber-400" />
              Story Mode
            </button>
            <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition text-left">
              <Zap className="w-6 h-6 mb-2 text-cyan-400" />
              Quick Chunks
            </button>
          </div>

          <button className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition">
            <Mic2 className="w-5 h-5" />
            Generate Audio
          </button>
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

                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center bg-gradient-to-r from-cyan-500 to-blue-600">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Learn Smarter?
        </h2>
        <button className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:scale-105 transition flex items-center gap-3 mx-auto">
          Start Free Trial
          <Clock className="w-5 h-5" />
        </button>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 text-center text-slate-400 border-t border-white/10">
        © 2026 SonicLearn. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;