import { useState, Dispatch, FC, SetStateAction } from "react";
import { Bucket, Transaction } from "@/types";
import { CustomCard } from "@/components/ui/customCard";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Transactions } from "@/components/transactions";

interface ExpensesProps {
        buckets: Bucket[];
        setBuckets: Dispatch<SetStateAction<Bucket[]>>;
};

interface ExpenseForm {
        category: string;
        amount: number;
};

export const Expenses: FC<ExpensesProps> = ({
        buckets,
        setBuckets
}) => {
        const { register, watch } = useForm<ExpenseForm>();
        const [transactions, setTransactions] = useState<Transaction[]>([]);

        const handleAddExpense = () => {
                const category = watch('category');
                const amount: number = parseInt(watch('amount'));

                const curBucket = buckets.find(b => b.title === category);

                setTransactions(prev => [...prev, {
                        date: new Date().getTime(),
                        amount,
                        category
                }])

                setBuckets(
                        prev => [
                                ...prev.filter((b) => b !== curBucket),
                                {
                                        ...curBucket,
                                        expensesAmount: curBucket?.expensesAmount ?
                                                curBucket.expensesAmount + amount : amount
                                }
                        ]);
        };

        return (<CustomCard>
                <div className="text-3xl">Add expenses</div>
                {!!buckets.length && <select {...register("category")} name="category">
                        {buckets.map(({ title }) =>
                                <option value={title}>
                                        {title}
                                </option>)
                        }
                </select>}
                <Input className="bg-white w-[50%]" placeholder="amount" {...register("amount")} />
                <Button onClick={handleAddExpense}>Add expense</Button>
                <Transactions
                        transactions={transactions}
                />
        </CustomCard>);
};
