import { FC } from "react";
import { Card } from "./card";
import { Button } from "./button";

interface BucketProps {
        name: string;
        amount: number;
        handleDelete: (title: string) => void;
};

export const Bucket: FC<BucketProps> = ({ handleDelete, name, amount }) => {
        return (
                <Card className="p-2 flex flex-col gap-1 items-center">
                        <div>{name}</div>
                        <div>Amount: {amount}</div>
                        <Button onClick={() => handleDelete(name)}>
                                Remove
                        </Button>
                </Card>
        )
}

