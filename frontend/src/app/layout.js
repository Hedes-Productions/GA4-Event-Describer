"use client";
import "./globals.css";
import { KoHo } from "next/font/google";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";

const koho = KoHo({
  weight: ["200", "400"],
  subsets: ["latin"],
  preload: true,
  fallback: "Inter",
});

const navStyle = {
  navBackground: {
    backgroundColor: "#D9D9D9",
    display: "flex",
    flexDirection: "row",
    width: "5vw",
    padding: "0.5vw",
    margin: "1vw",
    position: "fixed",
    right: "0",
    borderRadius: "40px",
    zIndex: "10",
    alignItems: "center",
    overflow: "hidden",
  },
  navTitles: {
    overflow: "hidden",
    margin: "0 0.5vw",
    padding: "0.5vw",
    borderRadius: "40px",
    color: "black",
  },
};

export default function RootLayout({ children }) {
  const hoverValue = useMotionValue(0);
  const height = useTransform(hoverValue, [0, 1], [35, 35]);
  const opacity = useTransform(hoverValue, [0, 1], [0, 1]);
  const reversedOpacity = useTransform(hoverValue, [0, 1], [1, 0]);
  const width = useTransform(hoverValue, [0, 1], [0, 35]);
  const reverseWidth = useTransform(hoverValue, [0, 1], [35, 0]);

  const navTitlesCommonStyles = navStyle.navTitles;

  return (
    <html lang="en">
      <body className={koho.className}>
        <motion.div
          initial={{ width: "4vw" }}
          whileHover={{ width: "30vw" }}
          transition={{ duration: 0.3 }}
          onHoverStart={() => hoverValue.set(1)}
          onHoverEnd={() => hoverValue.set(0)}
          style={navStyle.navBackground}
        >
          <motion.img
            style={{ opacity, width }}
            src="/leftarrow.svg"
            width={35}
            height={35}
            alt="Picture of the author"
          />
          <motion.img
            style={{ opacity: reversedOpacity, width: reverseWidth }}
            src="/rightarrow.svg"
            width={35}
            height={35}
            alt="Picture of the author"
          />
          <motion.a
            style={{ height, opacity, ...navTitlesCommonStyles }}
            href="/allgaevents"
          >
            Get All GA Events
          </motion.a>
          <motion.a
            style={{ height, opacity, ...navTitlesCommonStyles }}
            href="/allgaeventsnotion"
          >
            Add GA events to notion
          </motion.a>
        </motion.div>
        {children}
      </body>
    </html>
  );
}
