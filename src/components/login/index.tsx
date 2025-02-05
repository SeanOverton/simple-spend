import { useRef } from "react";
import { Input } from "../ui/input";
import { supabase } from "@/api/client";
import { Button } from "../ui/button";

export const Login = () => {
        const emailRef = useRef<undefined | HTMLInputElement>(undefined);

        async function signInWithEmail() {
                console.log(emailRef?.current?.value);
                const email = emailRef?.current?.value;
                if (!email) return;

                const { data, error } = await supabase.auth.signInWithOtp({
                        email: email,
                        options: {
                                // set this to false if you do not want the user to be automatically signed up
                                shouldCreateUser: true,
                                emailRedirectTo: 'https://example.com/welcome',
                        },
                });

                console.log(data, error)
        }

        const onClickHandler = () => {
                signInWithEmail();
        };

        return (<>
                <h1>Login or Signup</h1>
                <Input ref={emailRef} placeholder="email" />
                <Button onClick={onClickHandler}>Sign in</Button>
        </>);
};
