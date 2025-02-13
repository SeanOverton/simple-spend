import { FC } from "react";
import { Card } from "./card";
import { Button } from "./button";

interface BucketProps {
        name: string;
        amount: number;
        handleDelete: (title: string) => void;
        expensesAmount?: number;
};

export const Bucket: FC<BucketProps> = ({ expensesAmount = 0, handleDelete, name, amount }) => {
        const daysLeftInPayPeriod = 5;
        const payPeriodDays = 30;
        const expectedRemainder = daysLeftInPayPeriod / payPeriodDays * amount;

        return (
                <Card className="p-2 flex flex-col gap-1 items-center">
                        <div>{name}</div>
                        <div>Amount per pay period: {Math.round(amount)}</div>
                        <div>Spent this pay period: {expensesAmount}</div>
                        <div>Actual remainder this pay: {amount - expensesAmount}</div>
                        <div>Expected remainder this pay: {expectedRemainder}</div>
                        <Button onClick={() => handleDelete(name)}>
                                Remove
                        </Button>
                </Card>
        )
}

