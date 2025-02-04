import { useState, useCallback } from "react";

const useCardsData = (requiredCards) => {
  const [cardsData, setCardsData] = useState(
    requiredCards.reduce((acc, card) => {
      acc[card.name] = null;
      return acc;
    }, {}),
  );

  const updateCard = useCallback((name, data) => {
    setCardsData((prev) => ({
      ...prev,
      [name]: data,
    }));
  }, []);

  const removeCard = useCallback((name) => {
    setCardsData((prev) => ({
      ...prev,
      [name]: null,
    }));
  }, []);

  return { cardsData, updateCard, removeCard };
};

export default useCardsData;
