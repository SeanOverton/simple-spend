import { Transaction } from "@/types/index";
import { FC } from "react";
import { CustomCard } from "@/components/ui/customCard";

interface TransactionsProps {
        transactions: Transaction[];
};

export const Transactions: FC<TransactionsProps> = ({ transactions }) => {
        return (
                <CustomCard>
                        <div>Transactions:</div>
                        {transactions.map(({ category, amount, date }) => (
                                <div>${amount} on {new Date(date).toLocaleString()} ({category})</div>
                        ))}
                </CustomCard>
        )
}

