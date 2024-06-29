import React from "react";
import {AuthContextProvider} from "@/context/use-auth-context";
import FormProvider from "react-hook-form";

type Props = {
    children: React.ReactNode;
};
const SignUpFormProvider = ({children}: Props) => {
    // return <AuthContextProvider>
    //     <FormProvider>
    //     </FormProvider>
    // </AuthContextProvider>
};
export default SignUpFormProvider;
