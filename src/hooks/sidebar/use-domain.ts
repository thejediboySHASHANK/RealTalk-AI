import {UploadClient} from "@uploadcare/upload-client";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddDomainSchema} from "@/schemas/settings.schema";

const upload = new UploadClient({
    publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
})

export const useDomain = () => {
    const {register, handleSubmit} = useForm<FieldValues>(
        {
            resolver: zodResolver(AddDomainSchema),
        }
    )
}