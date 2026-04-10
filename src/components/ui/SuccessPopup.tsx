import React from "react";
import styles from "./SuccessPopup.module.css";
import { Check } from "lucide-react";

interface Props {
  message: string;
  onClose: () => void;
}

const SuccessPopup = ({ message, onClose }: Props) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
      <div className={styles.icon}><Check size={16} /></div>
      <p className={styles.description}>{message}</p>
      <button onClick={onClose}>Aceptar</button>
    </div>
  </div>
);

export default SuccessPopup;