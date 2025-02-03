import { Card } from "./card";

export const CustomCard = ({ ...rest }) => {
        return <Card className="m-4 p-4 bg-cyan-200 gap-2 flex flex-col items-center" {...rest} />;
};
