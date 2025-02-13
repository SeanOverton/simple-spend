import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Bucket, Currency } from "@/types";
import { CURRENCIES } from "@/constants";
import WeeklyBudget from "@/components/weeklyBudget";
import { useForm } from "react-hook-form";
import { CustomCard } from "@/components/ui/customCard";
import { Expenses } from "@/components/expense";
import { BucketGroup } from "@/components/ui/bucketGroup";
import { ExpenseSummary } from "@/components/expenseSummary";

export const enum Frequency {
        daily = 1,
        weekly = 2,
        fortnightly = 3,
        monthly = 4
};

interface FormInputs {
        rawPay: number;
        frequency: Frequency;
        payDayReference: Date;
};

const Home = () => {
        const [currency, setCurrency] = useState<Currency>(CURRENCIES.AUD);

        const [buckets, setBuckets] = useState<Bucket[]>([]);

        const {
                register,
                watch,
        } = useForm<FormInputs>();

        const { format } = currency;

        const getMultiplier = (frequency: Frequency): number => {
                switch (frequency) {
                        case Frequency.weekly: {
                                return 52;
                        };
                        case Frequency.fortnightly: {
                                return 26;
                        };
                        case Frequency.monthly: {
                                return 12;
                        };
                        case Frequency.daily: {
                                // assuming only a 5 day working week
                                return 5 * 52;
                        };
                        default: {
                                return 0;
                        };
                }
        };

        console.log('rawPay/frequency', watch('rawPay'), watch('frequency'))
        const annualSalaryAfterTax = parseInt(watch("rawPay")) * getMultiplier(parseInt(watch("frequency")));

        return (
                <>
                        <CustomCard className="p-6 m-6">
                                <form className="flex flex-col gap-4 items-center">
                                        <div className="flex flex-row justify-center items-center">
                                                <span>whats your average re-occuring pay?</span>
                                                <Input className="w-[50%] ml-[1em]" type="number" defaultValue={0} {...register("rawPay")} />
                                        </div>

                                        <div className="flex gap-6">
                                                <div className="flex items-center gap-2">
                                                        <Input id="daily" type="radio" value={Frequency.daily} {...register("frequency")} />
                                                        <label htmlFor="daily">Daily</label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                        <Input id="daily" type="radio" value={Frequency.weekly} {...register("frequency")} />
                                                        <label htmlFor="daily">Weekly</label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                        <Input id="daily" type="radio" value={Frequency.monthly} {...register("frequency")} />
                                                        <label htmlFor="daily">Monthly</label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                        <Input id="daily" type="radio" value={Frequency.fortnightly} {...register("frequency")} />
                                                        <label htmlFor="daily">Fortnightly</label>
                                                </div>
                                        </div>

                                        <div className="flex flex-row items-center">
                                                <span className="w-[100%]">most recent pay day?</span>
                                                <Input className="w-[50%] ml-[1em]" type="date" {...register("payDayReference")} />
                                        </div>
                                        <div>{`Your estimated annual salary after tax: `}
                                                <span className="font-bold">{format(annualSalaryAfterTax)}</span>
                                        </div>
                                </form>
                        </CustomCard>
                        <WeeklyBudget
                                annualSalary={annualSalaryAfterTax}
                                currency={currency}
                                buckets={buckets}
                                setBuckets={setBuckets}
                        />
                        <ExpenseSummary
                                buckets={buckets}
                                totalBudget={parseInt(watch('rawPay'))}
                        />
                        <BucketGroup
                                buckets={buckets}
                                setBuckets={setBuckets}
                                frequency={parseInt(watch("frequency"))}
                        />
                        <Expenses buckets={buckets} setBuckets={setBuckets} />
                </>
        )
}

export default Home;

