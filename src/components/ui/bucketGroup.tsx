import { Bucket as BucketType } from "@/types";
import { Dispatch, SetStateAction, FC } from "react";
import { Bucket } from "./bucket";

interface BucketGroupProps {
        buckets: BucketType[];
        setBuckets: Dispatch<SetStateAction<BucketType[]>>;
};

export const BucketGroup: FC<BucketGroupProps> = ({ buckets, setBuckets }) => {
        const handleDeleteBucket = (title: string): void => {
                setBuckets(prev => prev.filter(b => b.title !== title));
        };


        return (<div className="flex gap-4 flex-wrap">
                {buckets.map(({ title, amount, expensesAmount }) =>
                        <Bucket
                                name={title}
                                amount={amount}
                                handleDelete={handleDeleteBucket}
                                expensesAmount={expensesAmount}
                        />)}
        </div>);
};
