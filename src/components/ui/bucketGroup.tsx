import { Bucket as BucketType } from "@/types";
import { Dispatch, SetStateAction, FC } from "react";
import { Bucket } from "./bucket";
import { Frequency } from "@/home";

interface BucketGroupProps {
        buckets: BucketType[];
        setBuckets: Dispatch<SetStateAction<BucketType[]>>;
        frequency: Frequency;
};

export const BucketGroup: FC<BucketGroupProps> = ({ frequency, buckets, setBuckets }) => {
        const handleDeleteBucket = (title: string): void => {
                setBuckets(prev => prev.filter(b => b.title !== title));
        };

        const getTotalForPayPeriod = ({ amount, frequency }:
                { amount: number, frequency: Frequency }): number => {
                switch (frequency) {
                        case Frequency.weekly: {
                                return amount;
                        };
                        case Frequency.daily: {
                                return amount / 7;
                        };
                        case Frequency.monthly: {
                                return (52 * amount) / 12;
                        };
                        case Frequency.fortnightly: {
                                return 2 * amount;
                        };
                        default: {
                                return 0;
                        };
                };
        };

        return (<div className="flex gap-4 flex-wrap">
                {buckets.map(({ title, amount, expensesAmount }) =>
                        <Bucket
                                name={title}
                                amount={getTotalForPayPeriod({
                                        amount,
                                        frequency
                                })}
                                handleDelete={handleDeleteBucket}
                                expensesAmount={expensesAmount}
                        />)}
        </div>);
};
