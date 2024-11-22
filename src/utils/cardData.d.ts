declare module "@/utils/cardData" {
    export interface Card {
      title: string;
      checkedItems: string[];
      showRevalidateButton: boolean;
      amount: string;
      dueDate: string;
      cardNumber: string;
      cardExpiry: string;
    }
  
    export const cards: Card[];
  
    export function getActiveCards(): Card[];
  }
  