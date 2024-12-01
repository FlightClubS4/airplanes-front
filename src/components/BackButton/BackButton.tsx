"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../Button/Button";
import { useGameStore } from "../../store/gameStore";
import styles from "./BackButton.module.css";

export const BackButton: React.FC = () => {
  const router = useRouter();
  const { resetGame } = useGameStore();

  const handleBack = () => {
    resetGame();
    router.push("/");
  };

  return (
    <div className={styles.backButton}>
      <Button onClick={handleBack} variant="secondary">
        返回
      </Button>
    </div>
  );
};
