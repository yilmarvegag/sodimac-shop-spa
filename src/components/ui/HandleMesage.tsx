import { Search, SearchAlert, CheckCircle } from "lucide-react";
import styles from "./HandleMesage.module.css";
import { useRouter } from "next/router";

interface HandleMessageProps {
  message: string;
  type?: "error" | "info" | "success";
}

const HandleMessage = ({ message, type = "info" }: HandleMessageProps) => {
  const router = useRouter();

  if (!message) return null;

  const config = {
    error: {
      icon: <SearchAlert size={28} />,
      text: "Volver al inicio",
    },
    info: {
      icon: <Search size={28} />,
      text: "Volver al inicio",
    },
    success: {
      icon: <CheckCircle size={28} />,
      text: "Continuar",
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.card} ${styles[type]}`}>
        <div className={styles.icon}>{config[type].icon}</div>

        <p className={styles.message}>{message}</p>

        <button
          className={styles.button}
          onClick={() => router.push("/")}
        >
          {config[type].text}
        </button>
      </div>
    </div>
  );
};

export default HandleMessage;