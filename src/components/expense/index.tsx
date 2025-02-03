import { Dispatch, FC, SetStateAction } from "react";
import { Bucket } from "@/types";
import { CustomCard } from "@/components/ui/customCard";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

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

        const handleAddExpense = () => {
                const category = watch('category');
                const amount = parseInt(watch('amount'));

                const curBucket = buckets.find(b => b.title === category);

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
        </CustomCard>);
};
