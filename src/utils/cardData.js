export const cards = [
    {
      title: "GSTR-1 & 3B",
      checkedItems: [
        "Capital gains",
        "More than one house property",
        "Foreign income/Foreign Asset",
        "Other investment income",
      ],
      showRevalidateButton: false,
      amount: "Rs 599",
      dueDate: "15/12/2024",
      cardNumber: "5678",
      cardExpiry: "09/2025",
    },
    {
      title: "GSTR-4",
      checkedItems: ["Rental income", "Crypto trading"],
      showRevalidateButton: true,
      amount: "Rs 399",
      dueDate: "25/12/2024",
      cardNumber: "1234",
      cardExpiry: "06/2025",
    },
    {
      title: "GSTR-9",
      checkedItems: ["International business", "Crypto", "Capital gains"],
      showRevalidateButton: false,
      amount: "Rs 799",
      dueDate: "10/01/2025",
      cardNumber: "9876",
      cardExpiry: "04/2025",
    },
  ];
  
  export function getActiveCards() {
    return cards.filter((card) => !card.showRevalidateButton);
  }
  