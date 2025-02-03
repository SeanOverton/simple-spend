import { Card } from "./card";

export const CustomCard = ({ ...rest }) => {
        return <Card className="bg-cyan-200" {...rest} />;
};
