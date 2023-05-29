import Image from "next/image";
import styles from "./page.module.css";

const mainPageStyle = {
  backgroundContainer: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `linear-gradient(rgba(19, 19, 27, 0.8), rgba(19, 19, 27, 0.8)),url('artwork.png')`,
    backgroundSize: "150% 300%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundPosition: "center",
  },
  mainText: {
    fontSize: "4.5rem",
    textAlign: "center",
  },
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div style={mainPageStyle.backgroundContainer}>
        <h1 style={mainPageStyle.mainText}>
          Google Analytics 4 <br /> Notion Connector
        </h1>
      </div>
    </main>
  );
}
