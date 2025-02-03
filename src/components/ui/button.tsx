import { FC } from "react";

export const Button: FC<HTMLButtonElement> = ({ ...rest }) => {
        return <button
                className="cursor-pointer bg-red-200 p-1.5 border-1 rounded-md"
                {...rest} />;
};
