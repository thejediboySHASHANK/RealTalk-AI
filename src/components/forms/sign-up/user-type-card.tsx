'use client'

import {FieldValues, UseFormRegister} from "react-hook-form";
import React from "react";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardDescription} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {User} from "lucide-react";

type Props = {
    value: string;
    title: string;
    text: string;
    register: UseFormRegister<FieldValues>;
    userType: 'owner' | 'student';
    setUserType: React.Dispatch<React.SetStateAction<'owner' | 'student'>>
};
const UserTypeCard = ({
                          value,
                          title,
                          text,
                          register,
                          userType,
                          setUserType
                      }: Props) => {
    return (
        <Label htmlFor={value}>
            <Card
                className={cn(
                    'w-full cursor-pointer',
                    userType == value && 'border-orange'
                )}
            >
                <CardContent className="flex justify-between p-2">
                    <div className="flex items-center gap-3">
                        <Card className={cn(
                            'flex justify-center p-3',
                            userType == value && 'border-orange'
                        )}>
                            <User
                                size={30}
                                className={cn(
                                    userType == value ? 'text-orange' : 'text-gray-400'
                                )}
                            />
                        </Card>
                        <div className="">
                            <CardDescription className="text-iridium">{title}</CardDescription>
                            <CardDescription className="text-gray-400">{text}</CardDescription>
                        </div>
                    </div>
                    <div>
                        <div className={cn(
                            'w-4 h-4 rounded-full',
                            userType == value ? 'bg-orange' : 'bg-transparent'
                        )}>
                            <input
                                {...register('type', {
                                    onChange: (event) => setUserType(event.target.value as 'owner' | 'student'),
                                })}
                                value={value}
                                id={value}
                                className="hidden"
                                type="radio"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Label>
    );
};
export default UserTypeCard;
