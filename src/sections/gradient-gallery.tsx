import { motion } from "framer-motion";
import { useState } from "react";
import {
  Copy,
  Check,
  Sparkles,
  Layers,
  Zap,
  Box,
  Circle,
  Triangle,
  Hexagon,
  Square,
  Star,
} from "lucide-react";
import { SpecimenCard } from "../components/specimen-card";
import { SectionHeader } from "../components/section-header";

interface Gradient {
  id: string;
  name: string;
  description: string;
  category:
    | "Mesh"
    | "Aurora"
    | "Neon"
    | "Metallic"
    | "Glass"
    | "Organic"
    | "Brand"
    | "Abstract";
  css: string;
  preview: React.ReactNode;
  usage: string;
}

const gradients: Gradient[] = [
  // Mesh Gradients (8)
  {
    id: "mesh-1",
    name: "Purple Dream",
    description: "Soft multi-point mesh like Apple Music",
    category: "Mesh",
    usage: "Music apps, creative portfolios",
    css: `background: \n  radial-gradient(at 40% 20%, hsla(270,100%,70%,1) 0px, transparent 50%),\n  radial-gradient(at 80% 0%, hsla(320,100%,70%,1) 0px, transparent 50%),\n  radial-gradient(at 0% 50%, hsla(250,100%,70%,1) 0px, transparent 50%),\n  radial-gradient(at 80% 50%, hsla(280,100%,60%,1) 0px, transparent 50%),\n  radial-gradient(at 0% 100%, hsla(300,100%,70%,1) 0px, transparent 50%),\n  hsla(260, 50%, 10%, 1);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: `radial-gradient(at 40% 20%, hsla(270,100%,70%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(320,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(250,100%,70%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(280,100%,60%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(300,100%,70%,1) 0px, transparent 50%), hsla(260, 50%, 10%, 1)`,
        }}
      />
    ),
  },
  {
    id: "mesh-2",
    name: "Ocean Depths",
    description: "Deep sea with cyan and blue tones",
    category: "Mesh",
    usage: "Marine apps, meditation",
    css: `background: \n  radial-gradient(at 0% 0%, hsla(190,100%,50%,0.8) 0px, transparent 50%),\n  radial-gradient(at 100% 0%, hsla(220,100%,60%,0.8) 0px, transparent 50%),\n  radial-gradient(at 100% 100%, hsla(240,100%,50%,0.8) 0px, transparent 50%),\n  radial-gradient(at 0% 100%, hsla(200,100%,40%,0.8) 0px, transparent 50%),\n  hsla(220, 50%, 10%, 1);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: `radial-gradient(at 0% 0%, hsla(190,100%,50%,0.8) 0px, transparent 50%), radial-gradient(at 100% 0%, hsla(220,100%,60%,0.8) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(240,100%,50%,0.8) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(200,100%,40%,0.8) 0px, transparent 50%), hsla(220, 50%, 10%, 1)`,
        }}
      />
    ),
  },
  {
    id: "mesh-3",
    name: "Sunset Blaze",
    description: "Warm orange and red mesh",
    category: "Mesh",
    usage: "Lifestyle, travel apps",
    css: `background: \n  radial-gradient(at 20% 30%, hsla(30,100%,60%,1) 0px, transparent 50%),\n  radial-gradient(at 80% 20%, hsla(0,100%,60%,1) 0px, transparent 50%),\n  radial-gradient(at 40% 80%, hsla(45,100%,50%,1) 0px, transparent 50%),\n  hsla(20, 80%, 20%, 1);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: `radial-gradient(at 20% 30%, hsla(30,100%,60%,1) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(0,100%,60%,1) 0px, transparent 50%), radial-gradient(at 40% 80%, hsla(45,100%,50%,1) 0px, transparent 50%), hsla(20, 80%, 20%, 1)`,
        }}
      />
    ),
  },
  {
    id: "mesh-4",
    name: "Forest Mist",
    description: "Green nature-inspired mesh",
    category: "Mesh",
    usage: "Nature apps, eco brands",
    css: `background: \n  radial-gradient(at 0% 0%, hsla(140,70%,40%,1) 0px, transparent 50%),\n  radial-gradient(at 100% 50%, hsla(160,80%,30%,1) 0px, transparent 50%),\n  radial-gradient(at 50% 100%, hsla(120,60%,35%,1) 0px, transparent 50%),\n  hsla(150, 40%, 15%, 1);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: `radial-gradient(at 0% 0%, hsla(140,70%,40%,1) 0px, transparent 50%), radial-gradient(at 100% 50%, hsla(160,80%,30%,1) 0px, transparent 50%), radial-gradient(at 50% 100%, hsla(120,60%,35%,1) 0px, transparent 50%), hsla(150, 40%, 15%, 1)`,
        }}
      />
    ),
  },
  {
    id: "mesh-5",
    name: "Berry Burst",
    description: "Vibrant pink and berry tones",
    category: "Mesh",
    usage: "Fashion, beauty apps",
    css: `background: \n  radial-gradient(at 30% 20%, hsla(330,100%,60%,1) 0px, transparent 50%),\n  radial-gradient(at 70% 60%, hsla(300,100%,50%,1) 0px, transparent 50%),\n  radial-gradient(at 20% 80%, hsla(350,100%,55%,1) 0px, transparent 50%),\n  hsla(320, 50%, 15%, 1);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: `radial-gradient(at 30% 20%, hsla(330,100%,60%,1) 0px, transparent 50%), radial-gradient(at 70% 60%, hsla(300,100%,50%,1) 0px, transparent 50%), radial-gradient(at 20% 80%, hsla(350,100%,55%,1) 0px, transparent 50%), hsla(320, 50%, 15%, 1)`,
        }}
      />
    ),
  },
  {
    id: "mesh-6",
    name: "Electric Storm",
    description: "Bold electric blues and purples",
    category: "Mesh",
    usage: "Tech, gaming interfaces",
    css: `background: \n  radial-gradient(at 50% 0%, hsla(260,100%,50%,1) 0px, transparent 50%),\n  radial-gradient(at 0% 100%, hsla(220,100%,50%,1) 0px, transparent 50%),\n  radial-gradient(at 100% 100%, hsla(280,100%,45%,1) 0px, transparent 50%),\n  hsla(240, 50%, 10%, 1);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: `radial-gradient(at 50% 0%, hsla(260,100%,50%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(220,100%,50%,1) 0px, transparent 50%), radial-gradient(at 100% 100%, hsla(280,100%,45%,1) 0px, transparent 50%), hsla(240, 50%, 10%, 1)`,
        }}
      />
    ),
  },
  {
    id: "mesh-7",
    name: "Coral Reef",
    description: "Warm coral and aqua mix",
    category: "Mesh",
    usage: "Travel, vacation apps",
    css: `background: \n  radial-gradient(at 60% 30%, hsla(15,100%,65%,1) 0px, transparent 50%),\n  radial-gradient(at 20% 70%, hsla(180,70%,50%,1) 0px, transparent 50%),\n  radial-gradient(at 80% 80%, hsla(25,100%,60%,1) 0px, transparent 50%),\n  hsla(200, 40%, 20%, 1);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: `radial-gradient(at 60% 30%, hsla(15,100%,65%,1) 0px, transparent 50%), radial-gradient(at 20% 70%, hsla(180,70%,50%,1) 0px, transparent 50%), radial-gradient(at 80% 80%, hsla(25,100%,60%,1) 0px, transparent 50%), hsla(200, 40%, 20%, 1)`,
        }}
      />
    ),
  },
  {
    id: "mesh-8",
    name: "Arctic Ice",
    description: "Cool icy blue and white",
    category: "Mesh",
    usage: "Winter themes, cold storage",
    css: `background: \n  radial-gradient(at 40% 40%, hsla(200,100%,80%,0.8) 0px, transparent 50%),\n  radial-gradient(at 80% 20%, hsla(190,90%,70%,0.8) 0px, transparent 50%),\n  radial-gradient(at 20% 80%, hsla(210,80%,65%,0.8) 0px, transparent 50%),\n  hsla(220, 50%, 20%, 1);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: `radial-gradient(at 40% 40%, hsla(200,100%,80%,0.8) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(190,90%,70%,0.8) 0px, transparent 50%), radial-gradient(at 20% 80%, hsla(210,80%,65%,0.8) 0px, transparent 50%), hsla(220, 50%, 20%, 1)`,
        }}
      />
    ),
  },
  // Aurora Gradients (7)
  {
    id: "aurora-1",
    name: "Northern Lights",
    description: "Flowing green aurora borealis",
    category: "Aurora",
    usage: "Nature apps, night mode",
    css: `background: linear-gradient(125deg, #0a1628, #1a3a3a, #0a1628);\nposition: relative;\noverflow: hidden;\n\n&::before {\n  content: '';\n  position: absolute;\n  inset: -50%;\n  background: linear-gradient(45deg, transparent 40%, rgba(50, 255, 100, 0.2) 50%, transparent 60%);\n  animation: aurora 8s linear infinite;\n}\n\n@keyframes aurora {\n  0% { transform: translateX(-50%) rotate(0deg); }\n  100% { transform: translateX(50%) rotate(360deg); }\n}`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden"
        style={{
          background: "linear-gradient(125deg, #0a1628, #1a3a3a, #0a1628)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, transparent 40%, rgba(50, 255, 100, 0.3) 50%, transparent 60%)",
          }}
          animate={{ x: ["-100%", "100%"], rotate: [0, 180] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
  {
    id: "aurora-2",
    name: "Sunset Flow",
    description: "Warm sunset colors flowing",
    category: "Aurora",
    usage: "Lifestyle, warm themes",
    css: `background: linear-gradient(125deg, #2d1b4e, #1a1a2e, #0f0f23);\nposition: relative;\noverflow: hidden;\n\n&::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(90deg, transparent, rgba(255, 100, 50, 0.3), rgba(255, 200, 50, 0.2), transparent);\n  animation: sunset 5s ease-in-out infinite;\n}`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden"
        style={{
          background: "linear-gradient(125deg, #2d1b4e, #1a1a2e, #0f0f23)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255, 100, 50, 0.4), rgba(255, 200, 50, 0.3), transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    ),
  },
  {
    id: "aurora-3",
    name: "Cosmic Dust",
    description: "Space nebula effect",
    category: "Aurora",
    usage: "Space apps, sci-fi themes",
    css: `background: linear-gradient(125deg, #1a0b2e, #2d1b4e, #1a0b2e);\nposition: relative;\noverflow: hidden;\n\n&::before {\n  content: '';\n  position: absolute;\n  inset: -50%;\n  background: linear-gradient(45deg, transparent 30%, rgba(150, 0, 255, 0.2) 50%, transparent 70%);\n  animation: cosmic 10s linear infinite;\n}`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden"
        style={{
          background: "linear-gradient(125deg, #1a0b2e, #2d1b4e, #1a0b2e)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(150, 0, 255, 0.3) 50%, transparent 70%)",
          }}
          animate={{ x: ["-100%", "100%"], rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
  {
    id: "aurora-4",
    name: "Ocean Waves",
    description: "Flowing blue waves",
    category: "Aurora",
    usage: "Marine, water themes",
    css: `background: linear-gradient(125deg, #0f172a, #1e3a5f, #0f172a);\nposition: relative;\noverflow: hidden;\n\n&::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: linear-gradient(90deg, transparent, rgba(0, 150, 255, 0.3), transparent);\n  animation: waves 4s ease-in-out infinite;\n}`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden"
        style={{
          background: "linear-gradient(125deg, #0f172a, #1e3a5f, #0f172a)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0, 150, 255, 0.4), transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    ),
  },
  {
    id: "aurora-5",
    name: "Plasma Flow",
    description: "Electric plasma effect",
    category: "Aurora",
    usage: "Energy, tech themes",
    css: `background: linear-gradient(125deg, #0a0a0a, #1a1a3e, #0a0a0a);\nposition: relative;\noverflow: hidden;\n\n&::before {\n  content: '';\n  position: absolute;\n  inset: -50%;\n  background: linear-gradient(45deg, transparent 40%, rgba(100, 200, 255, 0.3) 50%, rgba(255, 100, 200, 0.3) 60%, transparent 70%);\n  animation: plasma 6s linear infinite;\n}`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden"
        style={{
          background: "linear-gradient(125deg, #0a0a0a, #1a1a3e, #0a0a0a)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, transparent 40%, rgba(100, 200, 255, 0.4) 50%, rgba(255, 100, 200, 0.4) 60%, transparent 70%)",
          }}
          animate={{ x: ["-100%", "100%"], rotate: [0, 180] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
  {
    id: "aurora-6",
    name: "Aurora Pink",
    description: "Pink and purple aurora",
    category: "Aurora",
    usage: "Creative, feminine themes",
    css: `background: linear-gradient(125deg, #2d1b4e, #3d1b3e, #2d1b4e);\nposition: relative;\noverflow: hidden;\n\n&::before {\n  content: '';\n  position: absolute;\n  inset: -50%;\n  background: linear-gradient(45deg, transparent 40%, rgba(255, 100, 200, 0.3) 50%, transparent 60%);\n  animation: auroraPink 7s linear infinite;\n}`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden"
        style={{
          background: "linear-gradient(125deg, #2d1b4e, #3d1b3e, #2d1b4e)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, transparent 40%, rgba(255, 100, 200, 0.4) 50%, transparent 60%)",
          }}
          animate={{ x: ["-100%", "100%"], rotate: [0, 180] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
  {
    id: "aurora-7",
    name: "Molten Core",
    description: "Red and orange flowing",
    category: "Aurora",
    usage: "Gaming, action themes",
    css: `background: linear-gradient(125deg, #1a0a0a, #3a1a0a, #1a0a0a);\nposition: relative;\noverflow: hidden;\n\n&::before {\n  content: '';\n  position: absolute;\n  inset: -50%;\n  background: linear-gradient(45deg, transparent 40%, rgba(255, 100, 50, 0.4) 50%, rgba(255, 200, 50, 0.3) 60%, transparent 70%);\n  animation: molten 5s linear infinite;\n}`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden"
        style={{
          background: "linear-gradient(125deg, #1a0a0a, #3a1a0a, #1a0a0a)",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(45deg, transparent 40%, rgba(255, 100, 50, 0.5) 50%, rgba(255, 200, 50, 0.4) 60%, transparent 70%)",
          }}
          animate={{ x: ["-100%", "100%"], rotate: [0, 180] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
  // Neon Gradients (7)
  {
    id: "neon-1",
    name: "Cyberpunk Neon",
    description: "Pink and cyan neon glow",
    category: "Neon",
    usage: "Cyberpunk, gaming interfaces",
    css: `background: #0a0a0a;\nborder: 2px solid transparent;\nborder-radius: 16px;\nbackground-clip: padding-box;\nposition: relative;\n\n&::before {\n  content: '';\n  position: absolute;\n  inset: -2px;\n  background: linear-gradient(135deg, #ff00ff, #00ffff);\n  border-radius: inherit;\n  z-index: -1;\n}\n\nbox-shadow: 0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3);\nanimation: neonPulse 2s ease-in-out infinite;`,
    preview: (
      <div
        className="w-full h-full rounded-none relative p-[2px]"
        style={{ background: "linear-gradient(135deg, #ff00ff, #00ffff)" }}
      >
        <motion.div
          className="w-full h-full rounded-none flex items-center justify-center text-white font-bold"
          style={{ background: "#0a0a0a" }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)",
              "0 0 40px rgba(255, 0, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.5)",
              "0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          NEON
        </motion.div>
      </div>
    ),
  },
  {
    id: "neon-2",
    name: "Electric Blue",
    description: "Pulsing electric blue",
    category: "Neon",
    usage: "Tech, futuristic UI",
    css: `background: #0a0a0a;\nborder: 2px solid #00ffff;\nborder-radius: 16px;\nbox-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff;\nanimation: electricPulse 2s ease-in-out infinite;`,
    preview: (
      <motion.div
        className="w-full h-full rounded-none flex items-center justify-center text-cyan-400 font-bold"
        style={{ background: "#0a0a0a", border: "2px solid #00ffff" }}
        animate={{
          boxShadow: [
            "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff",
            "0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff",
            "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ELECTRIC
      </motion.div>
    ),
  },
  {
    id: "neon-3",
    name: "Neon Pink",
    description: "Hot pink neon glow",
    category: "Neon",
    usage: "Creative, bold designs",
    css: `background: #0a0a0a;\nborder: 2px solid #ff00ff;\nborder-radius: 16px;\nbox-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff;`,
    preview: (
      <motion.div
        className="w-full h-full rounded-none flex items-center justify-center text-fuchsia-400 font-bold"
        style={{
          background: "#0a0a0a",
          border: "2px solid #ff00ff",
          boxShadow: "0 0 20px #ff00ff",
        }}
        animate={{
          boxShadow: [
            "0 0 10px #ff00ff, 0 0 20px #ff00ff",
            "0 0 30px #ff00ff, 0 0 50px #ff00ff",
            "0 0 10px #ff00ff, 0 0 20px #ff00ff",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        PINK
      </motion.div>
    ),
  },
  {
    id: "neon-4",
    name: "Acid Green",
    description: "Toxic green neon",
    category: "Neon",
    usage: "Gaming, toxic themes",
    css: `background: #0a0a0a;\nborder: 2px solid #39ff14;\nborder-radius: 16px;\nbox-shadow: 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14;`,
    preview: (
      <motion.div
        className="w-full h-full rounded-none flex items-center justify-center text-lime-400 font-bold"
        style={{ background: "#0a0a0a", border: "2px solid #39ff14" }}
        animate={{
          boxShadow: [
            "0 0 10px #39ff14, 0 0 20px #39ff14",
            "0 0 30px #39ff14, 0 0 50px #39ff14",
            "0 0 10px #39ff14, 0 0 20px #39ff14",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ACID
      </motion.div>
    ),
  },
  {
    id: "neon-5",
    name: "Neon Orange",
    description: "Warm orange neon",
    category: "Neon",
    usage: "Energy, action themes",
    css: `background: #0a0a0a;\nborder: 2px solid #ff6600;\nborder-radius: 16px;\nbox-shadow: 0 0 10px #ff6600, 0 0 20px #ff6600, 0 0 40px #ff6600;`,
    preview: (
      <motion.div
        className="w-full h-full rounded-none flex items-center justify-center text-orange-400 font-bold"
        style={{ background: "#0a0a0a", border: "2px solid #ff6600" }}
        animate={{
          boxShadow: [
            "0 0 10px #ff6600, 0 0 20px #ff6600",
            "0 0 30px #ff6600, 0 0 50px #ff6600",
            "0 0 10px #ff6600, 0 0 20px #ff6600",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        ORANGE
      </motion.div>
    ),
  },
  {
    id: "neon-6",
    name: "Neon Red",
    description: "Warning red neon",
    category: "Neon",
    usage: "Alerts, warnings, danger",
    css: `background: #0a0a0a;\nborder: 2px solid #ff0033;\nborder-radius: 16px;\nbox-shadow: 0 0 10px #ff0033, 0 0 20px #ff0033, 0 0 40px #ff0033;`,
    preview: (
      <motion.div
        className="w-full h-full rounded-none flex items-center justify-center text-red-400 font-bold"
        style={{ background: "#0a0a0a", border: "2px solid #ff0033" }}
        animate={{
          boxShadow: [
            "0 0 10px #ff0033, 0 0 20px #ff0033",
            "0 0 30px #ff0033, 0 0 50px #ff0033",
            "0 0 10px #ff0033, 0 0 20px #ff0033",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        DANGER
      </motion.div>
    ),
  },
  {
    id: "neon-7",
    name: "Rainbow Neon",
    description: "Multi-color neon cycling",
    category: "Neon",
    usage: "Pride, colorful themes",
    css: `background: #0a0a0a;\nborder: 2px solid transparent;\nborder-radius: 16px;\nbackground-clip: padding-box;\nposition: relative;\n\n&::before {\n  content: '';\n  position: absolute;\n  inset: -2px;\n  background: linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);\n  border-radius: inherit;\n  z-index: -1;\n  animation: rainbow 3s linear infinite;\n}`,
    preview: (
      <div
        className="w-full h-full rounded-none relative p-[2px]"
        style={{
          background:
            "linear-gradient(135deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082)",
        }}
      >
        <motion.div
          className="w-full h-full rounded-none flex items-center justify-center text-white font-bold"
          style={{ background: "#0a0a0a" }}
          whileHover={{ scale: 1.02 }}
        >
          RAINBOW
        </motion.div>
      </div>
    ),
  },
  // Metallic Gradients (7)
  {
    id: "metal-1",
    name: "Liquid Chrome",
    description: "Chrome metallic shine",
    category: "Metallic",
    usage: "Luxury, premium products",
    css: `background: linear-gradient(\n  135deg,\n  #8e8e8e 0%,\n  #d4d4d4 20%,\n  #ffffff 40%,\n  #8e8e8e 60%,\n  #d4d4d4 80%,\n  #8e8e8e 100%\n);\nbackground-size: 200% 100%;\nanimation: shimmer 3s ease-in-out infinite;\nposition: relative;`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #8e8e8e 0%, #d4d4d4 20%, #ffffff 40%, #8e8e8e 60%, #d4d4d4 80%, #8e8e8e 100%)",
          backgroundSize: "200% 100%",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ),
  },
  {
    id: "metal-2",
    name: "Rose Gold",
    description: "Elegant rose mist",
    category: "Metallic",
    usage: "Fashion, jewelry, luxury",
    css: `background: linear-gradient(\n  135deg,\n  #b76e79 0%,\n  #e8c4c4 25%,\n  #f4e4e4 50%,\n  #e8c4c4 75%,\n  #b76e79 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none relative"
        style={{
          background:
            "linear-gradient(135deg, #b76e79 0%, #e8c4c4 25%, #f4e4e4 50%, #e8c4c4 75%, #b76e79 100%)",
        }}
      >
        <div
          className="absolute inset-0 rounded-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)",
          }}
        />
      </div>
    ),
  },
  {
    id: "metal-3",
    name: "Brushed Steel",
    description: "Brushed metal texture",
    category: "Metallic",
    usage: "Industrial, automotive",
    css: `background: linear-gradient(\n  180deg,\n  #a0a0a0 0%,\n  #c0c0c0 50%,\n  #808080 100%\n);\nposition: relative;`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(180deg, #a0a0a0 0%, #c0c0c0 50%, #808080 100%)",
        }}
      />
    ),
  },
  {
    id: "metal-4",
    name: "Gold Bar",
    description: "Pure mist gradient",
    category: "Metallic",
    usage: "Finance, premium services",
    css: `background: linear-gradient(\n  135deg,\n  #bf953f 0%,\n  #fcf6ba 25%,\n  #b38728 50%,\n  #fbf5b7 75%,\n  #aa771c 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)",
        }}
      />
    ),
  },
  {
    id: "metal-5",
    name: "Titanium",
    description: "Dark titanium metal",
    category: "Metallic",
    usage: "Tech, aerospace",
    css: `background: linear-gradient(\n  135deg,\n  #4a4a4a 0%,\n  #6a6a6a 25%,\n  #5a5a5a 50%,\n  #7a7a7a 75%,\n  #4a4a4a 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #4a4a4a 0%, #6a6a6a 25%, #5a5a5a 50%, #7a7a7a 75%, #4a4a4a 100%)",
        }}
      />
    ),
  },
  {
    id: "metal-6",
    name: "Copper",
    description: "Warm copper tone",
    category: "Metallic",
    usage: "Vintage, steampunk",
    css: `background: linear-gradient(\n  135deg,\n  #b87333 0%,\n  #e6a65d 25%,\n  #d4956a 50%,\n  #f4c586 75%,\n  #b87333 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #b87333 0%, #e6a65d 25%, #d4956a 50%, #f4c586 75%, #b87333 100%)",
        }}
      />
    ),
  },
  {
    id: "metal-7",
    name: "Platinum",
    description: "Cool platinum silver",
    category: "Metallic",
    usage: "Luxury, premium",
    css: `background: linear-gradient(\n  135deg,\n  #e5e4e2 0%,\n  #ffffff 25%,\n  #d3d3d3 50%,\n  #f5f5f5 75%,\n  #e5e4e2 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #e5e4e2 0%, #ffffff 25%, #d3d3d3 50%, #f5f5f5 75%, #e5e4e2 100%)",
        }}
      />
    ),
  },
  // Glass Gradients (7)
  {
    id: "glass-1",
    name: "Frosted Glass",
    description: "Classic glass morphism",
    category: "Glass",
    usage: "Modern UI, overlays",
    css: `background: rgba(255, 255, 255, 0.1);\nbackdrop-filter: blur(16px);\nborder: 1px solid rgba(255, 255, 255, 0.2);\nborder-radius: 16px;\nbox-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          className="w-4/5 h-4/5 rounded-none flex items-center justify-center text-white font-bold"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          GLASS
        </div>
      </div>
    ),
  },
  {
    id: "glass-2",
    name: "Dark Crystal",
    description: "Dark purple glass",
    category: "Glass",
    usage: "Dark mode, dashboards",
    css: `background: rgba(147, 51, 234, 0.1);\nbackdrop-filter: blur(16px);\nborder: 1px solid rgba(147, 51, 234, 0.2);\nborder-radius: 16px;\nbox-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <div
          className="w-4/5 h-4/5 rounded-none flex items-center justify-center text-purple-300 font-bold"
          style={{
            background: "rgba(147, 51, 234, 0.1)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(147, 51, 234, 0.2)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          CRYSTAL
        </div>
      </div>
    ),
  },
  {
    id: "glass-3",
    name: "Blue Ice",
    description: "Cool blue glass effect",
    category: "Glass",
    usage: "Tech, cold themes",
    css: `background: rgba(59, 130, 246, 0.1);\nbackdrop-filter: blur(16px);\nborder: 1px solid rgba(59, 130, 246, 0.2);\nborder-radius: 16px;`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
        }}
      >
        <div
          className="w-4/5 h-4/5 rounded-none flex items-center justify-center text-blue-300 font-bold"
          style={{
            background: "rgba(59, 130, 246, 0.1)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
          }}
        >
          ICE
        </div>
      </div>
    ),
  },
  {
    id: "glass-4",
    name: "Emerald Glass",
    description: "Green emerald glass",
    category: "Glass",
    usage: "Nature, finance",
    css: `background: rgba(16, 185, 129, 0.1);\nbackdrop-filter: blur(16px);\nborder: 1px solid rgba(16, 185, 129, 0.2);\nborder-radius: 16px;`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
        }}
      >
        <div
          className="w-4/5 h-4/5 rounded-none flex items-center justify-center text-emerald-300 font-bold"
          style={{
            background: "rgba(16, 185, 129, 0.1)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
          }}
        >
          EMERALD
        </div>
      </div>
    ),
  },
  {
    id: "glass-5",
    name: "Ruby Glass",
    description: "Red ruby glass effect",
    category: "Glass",
    usage: "Premium, warning",
    css: `background: rgba(239, 68, 68, 0.1);\nbackdrop-filter: blur(16px);\nborder: 1px solid rgba(239, 68, 68, 0.2);\nborder-radius: 16px;`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
        }}
      >
        <div
          className="w-4/5 h-4/5 rounded-none flex items-center justify-center text-red-300 font-bold"
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
          }}
        >
          RUBY
        </div>
      </div>
    ),
  },
  {
    id: "glass-6",
    name: "Amber Glass",
    description: "Warm amber glass",
    category: "Glass",
    usage: "Warm themes, alerts",
    css: `background: rgba(245, 158, 11, 0.1);\nbackdrop-filter: blur(16px);\nborder: 1px solid rgba(245, 158, 11, 0.2);\nborder-radius: 16px;`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #78350f 0%, #92400e 100%)",
        }}
      >
        <div
          className="w-4/5 h-4/5 rounded-none flex items-center justify-center text-amber-300 font-bold"
          style={{
            background: "rgba(245, 158, 11, 0.1)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
          }}
        >
          AMBER
        </div>
      </div>
    ),
  },
  {
    id: "glass-7",
    name: "Diamond Glass",
    description: "Crystal clear diamond",
    category: "Glass",
    usage: "Luxury, premium",
    css: `background: rgba(255, 255, 255, 0.05);\nbackdrop-filter: blur(20px);\nborder: 1px solid rgba(255, 255, 255, 0.3);\nborder-radius: 16px;`,
    preview: (
      <div
        className="w-full h-full rounded-none relative overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <div
          className="w-4/5 h-4/5 rounded-none flex items-center justify-center text-white font-bold"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          DIAMOND
        </div>
      </div>
    ),
  },
  // Organic Gradients (7)
  {
    id: "organic-1",
    name: "Candy Floss",
    description: "Soft pastel pink and blue",
    category: "Organic",
    usage: "Kids, playful apps",
    css: `background: linear-gradient(\n  135deg,\n  #ff9a9e 0%,\n  #fecfef 50%,\n  #a8edea 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #a8edea 100%)",
        }}
      />
    ),
  },
  {
    id: "organic-2",
    name: "Tropical Sunset",
    description: "Warm tropical colors",
    category: "Organic",
    usage: "Travel, vacation",
    css: `background: linear-gradient(\n  135deg,\n  #f6d365 0%,\n  #fda085 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        }}
      />
    ),
  },
  {
    id: "organic-3",
    name: "Mint Breeze",
    description: "Fresh mint and white",
    category: "Organic",
    usage: "Health, wellness",
    css: `background: linear-gradient(\n  135deg,\n  #a8edea 0%,\n  #fed6e3 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        }}
      />
    ),
  },
  {
    id: "organic-4",
    name: "Peach Perfect",
    description: "Soft peach tones",
    category: "Organic",
    usage: "Beauty, fashion",
    css: `background: linear-gradient(\n  135deg,\n  #ffecd2 0%,\n  #fcb69f 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        }}
      />
    ),
  },
  {
    id: "organic-5",
    name: "Lavender Mist",
    description: "Soft purple lavender",
    category: "Organic",
    usage: "Relaxation, spa",
    css: `background: linear-gradient(\n  135deg,\n  #e0c3fc 0%,\n  #8ec5fc 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        }}
      />
    ),
  },
  {
    id: "organic-6",
    name: "Coral Reef",
    description: "Living coral gradient",
    category: "Organic",
    usage: "Nature, marine",
    css: `background: linear-gradient(\n  135deg,\n  #ff6b6b 0%,\n  #feca57 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
        }}
      />
    ),
  },
  {
    id: "organic-7",
    name: "Spring Bloom",
    description: "Fresh spring colors",
    category: "Organic",
    usage: "Nature, renewal",
    css: `background: linear-gradient(\n  135deg,\n  #d4fc79 0%,\n  #96e6a1 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
        }}
      />
    ),
  },
  // Brand Gradients (7)
  {
    id: "brand-1",
    name: "Instagram",
    description: "Instagram brand colors",
    category: "Brand",
    usage: "Social media, photos",
    css: `background: linear-gradient(\n  45deg,\n  #f09433 0%,\n  #e6683c 25%,\n  #dc2743 50%,\n  #cc2366 75%,\n  #bc1888 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        }}
      />
    ),
  },
  {
    id: "brand-2",
    name: "Spotify",
    description: "Spotify green vibe",
    category: "Brand",
    usage: "Music, audio apps",
    css: `background: linear-gradient(\n  135deg,\n  #1db954 0%,\n  #1ed760 50%,\n  #1db954 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #1db954 0%, #1ed760 50%, #1db954 100%)",
        }}
      />
    ),
  },
  {
    id: "brand-3",
    name: "Netflix",
    description: "Netflix red drama",
    category: "Brand",
    usage: "Video, streaming",
    css: `background: linear-gradient(\n  135deg,\n  #e50914 0%,\n  #b20710 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
        }}
      />
    ),
  },
  {
    id: "brand-4",
    name: "Slack",
    description: "Slack colorful stripes",
    category: "Brand",
    usage: "Communication, teams",
    css: `background: linear-gradient(\n  135deg,\n  #4a154b 0%,\n  #611f69 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #4a154b 0%, #611f69 100%)",
        }}
      />
    ),
  },
  {
    id: "brand-5",
    name: "Discord",
    description: "Discord blurple",
    category: "Brand",
    usage: "Gaming, community",
    css: `background: linear-gradient(\n  135deg,\n  #5865f2 0%,\n  #7289da 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #5865f2 0%, #7289da 100%)",
        }}
      />
    ),
  },
  {
    id: "brand-6",
    name: "Twitter",
    description: "Twitter blue sky",
    category: "Brand",
    usage: "Social, news",
    css: `background: linear-gradient(\n  135deg,\n  #1da1f2 0%,\n  #0d8ecf 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #1da1f2 0%, #0d8ecf 100%)",
        }}
      />
    ),
  },
  {
    id: "brand-7",
    name: "Twitch",
    description: "Twitch purple",
    category: "Brand",
    usage: "Streaming, gaming",
    css: `background: linear-gradient(\n  135deg,\n  #9146ff 0%,\n  #772ce8 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #9146ff 0%, #772ce8 100%)",
        }}
      />
    ),
  },
  // Abstract Gradients (7)
  {
    id: "abstract-1",
    name: "Quantum",
    description: "Deep space quantum",
    category: "Abstract",
    usage: "Sci-fi, tech",
    css: `background: linear-gradient(\n  135deg,\n  #0f0c29 0%,\n  #302b63 50%,\n  #24243e 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      />
    ),
  },
  {
    id: "abstract-2",
    name: "Neon Dreams",
    description: "Retro neon wave",
    category: "Abstract",
    usage: "Retro, synthwave",
    css: `background: linear-gradient(\n  135deg,\n  #2d1b4e 0%,\n  #1a1a2e 50%,\n  #16213e 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 50%, #16213e 100%)",
        }}
      />
    ),
  },
  {
    id: "abstract-3",
    name: "Matrix",
    description: "Green matrix code",
    category: "Abstract",
    usage: "Coding, tech",
    css: `background: linear-gradient(\n  135deg,\n  #000000 0%,\n  #0f380f 50%,\n  #306230 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #000000 0%, #0f380f 50%, #306230 100%)",
        }}
      />
    ),
  },
  {
    id: "abstract-4",
    name: "Void",
    description: "Deep dark void",
    category: "Abstract",
    usage: "Dark themes, mystery",
    css: `background: linear-gradient(\n  135deg,\n  #0a0a0a 0%,\n  #1a1a1a 50%,\n  #0a0a0a 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        }}
      />
    ),
  },
  {
    id: "abstract-5",
    name: "Prism",
    description: "Color spectrum",
    category: "Abstract",
    usage: "Creative, art",
    css: `background: linear-gradient(\n  135deg,\n  #ff0000 0%,\n  #ff7f00 17%,\n  #ffff00 33%,\n  #00ff00 50%,\n  #0000ff 67%,\n  #4b0082 83%,\n  #9400d3 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #ff0000 0%, #ff7f00 17%, #ffff00 33%, #00ff00 50%, #0000ff 67%, #4b0082 83%, #9400d3 100%)",
        }}
      />
    ),
  },
  {
    id: "abstract-6",
    name: "Magma",
    description: "Volcanic magma flow",
    category: "Abstract",
    usage: "Energy, power",
    css: `background: linear-gradient(\n  135deg,\n  #ff416c 0%,\n  #ff4b2b 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
        }}
      />
    ),
  },
  {
    id: "abstract-7",
    name: "Arctic",
    description: "Frozen arctic ice",
    category: "Abstract",
    usage: "Cold, ice themes",
    css: `background: linear-gradient(\n  135deg,\n  #e0f7fa 0%,\n  #b2ebf2 50%,\n  #80deea 100%\n);`,
    preview: (
      <div
        className="w-full h-full rounded-none"
        style={{
          background:
            "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)",
        }}
      />
    ),
  },
];

function GradientCard({
  gradient,
  index,
}: {
  gradient: Gradient;
  index: number;
}) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const copyGradient = async () => {
    await navigator.clipboard.writeText(gradient.css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = () => {
    switch (gradient.category) {
      case "Mesh":
        return <Layers className="w-3 h-3" />;
      case "Aurora":
        return <Zap className="w-3 h-3" />;
      case "Neon":
        return <Sparkles className="w-3 h-3" />;
      case "Metallic":
        return <Box className="w-3 h-3" />;
      case "Glass":
        return <Circle className="w-3 h-3" />;
      case "Organic":
        return <Triangle className="w-3 h-3" />;
      case "Brand":
        return <Square className="w-3 h-3" />;
      case "Abstract":
        return <Hexagon className="w-3 h-3" />;
      default:
        return <Star className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.02 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <SpecimenCard className="h-full overflow-hidden">
        <div className="h-40 relative">
          {gradient.preview}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-black/50 backdrop-blur-sm text-white">
              {getCategoryIcon()}
              {gradient.category}
            </span>
          </div>
          <motion.button
            onClick={copyGradient}
            className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 backdrop-blur-sm text-white opacity-0 hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {copied ? (
              <Check className="w-4 h-4 text-[hsl(48,100%,50%)]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </motion.button>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display text-lg font-bold">{gradient.name}</h3>
            <motion.button
              onClick={() => setShowCode(!showCode)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showCode ? "Hide" : "Code"}
            </motion.button>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {gradient.description}
          </p>
          <p className="text-xs text-[hsl(48,100%,50%)]">{gradient.usage}</p>

          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-3 overflow-hidden"
            >
              <pre className="text-xs font-mono text-foreground bg-secondary/30 p-3 rounded-lg overflow-x-auto">
                <code>{gradient.css}</code>
              </pre>
            </motion.div>
          )}
        </div>
      </SpecimenCard>
    </motion.div>
  );
}

export default function GradientGallery() {
  return (
    <section id="gradients" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeader
          index="02 / Gradients"
          title="Colour fields, plated."
          lede="Mesh, aurora, neon, metallic, glass, organic and brand blends — every swatch ships with the exact CSS behind it."
          meta="50 swatches"
        />
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gradients.map((gradient, index) => (
            <GradientCard key={gradient.id} gradient={gradient} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
