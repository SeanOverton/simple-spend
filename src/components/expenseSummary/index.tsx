import { Bucket } from "@/types";
import { FC } from "react";
import { CustomCard } from "../ui/customCard";

interface ExpenseSummaryProps {
        totalBudget: number;
        buckets: Bucket[];
};

export const ExpenseSummary: FC<ExpenseSummaryProps> = ({ totalBudget, buckets }) => {
        const totalSpend = buckets.reduce((acc, cur) => acc + cur.amount, 0);

        return (
                <CustomCard>
                        <h1>Expense Summary</h1>
                        <div>Total spend this pay: {totalSpend}</div>
                        <div>Total left pay: {totalBudget}</div>
                        <div>Days before next pay: { }</div>
                </CustomCard>
        )
};
