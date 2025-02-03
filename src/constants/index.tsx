import { Currency } from "@/types";

export const CURRENCIES: Record<Currency["type"], Currency> = {
        "AUD": {
                type: "AUD",
                symbol: "$",
                format: (amount: number) => `AUD $${isNaN(amount) ? 0 : amount}`,
        }
} as const;
