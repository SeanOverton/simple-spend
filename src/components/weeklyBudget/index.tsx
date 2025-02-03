import { Currency, Bucket as BucketType } from "@/types";
import { useState, FC } from "react";
import { Bucket } from "@/components/ui/bucket";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WeeklyBudgetProps {
        annualSalary: number;
        currency: Currency;
}

const WeeklyBudget: FC<WeeklyBudgetProps> = ({ annualSalary, currency }) => {
        const { format: formatLocalCurrency } = currency;
        const weeklyTotal = Math.round(annualSalary / 52);

        const [buckets, setBuckets] = useState<BucketType[]>([]);

        const { register, reset, watch } = useForm<BucketType>();

        const handleAddBucket = () => {
                const title = watch("title");
                const amount = parseInt(watch("amount"));

                if (!title || isNaN(amount) || amount === 0) return;

                const newBucket = {
                        title,
                        amount,
                };
                setBuckets(prev => [...prev, newBucket]);

                // clear inputs
                reset();
        };

        const totalSum = buckets.reduce((acc, cur) => acc + cur.amount, 0);

        const handleDeleteBucket = (title: string): void => {
                setBuckets(prev => prev.filter(b => b.title !== title));
        };

        return (
                <Card className="p-6 m-6 flex flex-col gap-4 items-center">
                        <h3 className="text-3xl font-medium">Weekly Budget</h3>
                        <h2>{`Weekly total: ${formatLocalCurrency(weeklyTotal)}`}</h2>
                        <div>Now lets decide how to split this for weekly spending?</div>

                        <div>{`Total amount in buckets: ${totalSum}`}</div>
                        <div>{`Total amount left for buckets: ${weeklyTotal - totalSum}`}</div>

                        <div className="flex flex-col gap-4 w-[50%]">
                                <Input {...register("title")} placeholder="My new bucket!" />
                                <Input {...register("amount")} placeholder="100" type="number" />
                        </div>
                        <Button onClick={handleAddBucket}>Add bucket</Button>
                        <div className="flex gap-4 flex-wrap">
                                {buckets.map(({ title, amount }) =>
                                        <Bucket
                                                name={title}
                                                amount={amount}
                                                handleDelete={handleDeleteBucket}
                                        />)}
                        </div>
                </Card>
        )
};

export default WeeklyBudget;


