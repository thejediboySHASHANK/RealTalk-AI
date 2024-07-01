'use client'

import React from "react";
import {useSignInForm} from "@/hooks/sign-in/use-sign-in";
import {AuthContextProvider} from "@/context/use-auth-context";
import {FormProvider} from "react-hook-form";
import {Loader} from "@/components/loader";

type Props = {
    children: React.ReactNode
};
const SignInFormProvider = ({children}: Props) => {
    const {methods, onHandleSubmit, loading} = useSignInForm();
    return (
        <AuthContextProvider>
            <FormProvider {...methods}>
                <form
                    onSubmit={onHandleSubmit}
                    className="h-full"
                >
                    <div className="flex flex-col justify-between gap-3 h-full">
                        <Loader loading={loading}>{children}</Loader>
                    </div>
                </form>
            </FormProvider>
        </AuthContextProvider>
    );
};
export default SignInFormProvider;
