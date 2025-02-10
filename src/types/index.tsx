export interface Currency {
        symbol: string;
        type: string;
        format: (amount: number) => string;
};

export interface Bucket {
        amount: number;
        title: string;
        expensesAmount?: number;
};

export interface Transaction {
        category: string; // bucket title
        amount: number;
        date: number;
};
