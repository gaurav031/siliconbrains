"use client";

import { motion } from "framer-motion";

export default function SpaceBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="star-field" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(79,124,255,0.15),transparent_70%)]" />

      {/* Orbit rings */}
      {[280, 420, 560].map((size, i) => (
        <motion.div
          key={size}
          className="orbit-ring left-1/2 top-1/2"
          style={{
            width: size,
            height: size,
            marginLeft: -size / 2,
            marginTop: -size / 2,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40 + i * 20, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-[var(--color-cyan)] shadow-[0_0_10px_var(--color-cyan)]"
            style={{ top: -4, left: "50%" }}
          />
        </motion.div>
      ))}

      {/* Central "Earth" glow orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 180,
          height: 180,
          background:
            "radial-gradient(circle at 35% 35%, #4f7cff, #1a2a6c 55%, var(--color-bg) 100%)",
          boxShadow: "0 0 80px 10px rgba(79,124,255,0.35)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--color-text)] opacity-60"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: 4 + (i % 5),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
