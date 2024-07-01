import Image from "next/image";
import Navbar from "@/components/navbar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {pricingCards} from "@/constants/landing-page";
import {clsx} from "clsx";
import {Check} from "lucide-react";
import Link from "next/link";

export default function Home() {
    // WIP: Challenge to setup billing card
    return (
        <main>
            <Navbar/>
            <section>
                <div className="flex items-center justify-center flex-col mt-[80px] gap-4">
                    <span className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm">
                        An AI powered sales assistant chatbot
                    </span>
                    {/*<Image*/}
                    {/*    src="/images/corinna-ai-logo.png"*/}
                    {/*    alt="Logo"*/}
                    {/*    width={500}*/}
                    {/*    height={100}*/}
                    {/*    className="max-w-lg object-contain"*/}
                    {/*    draggable={false}*/}
                    {/*/>*/}
                    <span
                        className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-orange to-orange-200">
                        <span className="underline">Real</span>Talk AI
                    </span>
                    <p className="text-center max-w-[500px]">
                        Your AI powered sales assistant! Embed RealTalk AI into any website with just a snippet of code!
                    </p>
                    <Button className="bg-orange font-bold text-white px-4">
                        Get Started For Free
                    </Button>
                    <Image
                        src="/images/iphonecorinna.png"
                        alt="Logo"
                        width={400}
                        height={100}
                        className="max-w-lg object-contain"
                        draggable={false}
                    />
                </div>
            </section>
            <section className="flex justify-center items-center flex-col gap-4 mt-10">
                <h2 className="text-4xl text-center">
                    Choose what fits you right
                </h2>
                <p className="text-muted-foreground text-center max-w-lg">
                    Our straightforward pricing plans are designed to fit your needs. If
                    {" you're"} not
                    ready to commit you can get started for free.
                </p>
            </section>
            <div className="flex justify-center gap-4 flex-wrap mt-6">
                {pricingCards.map((card) => (
                    <Card
                        key={card.title}
                        className={clsx('w-[300px] flex flex-col justify-between', {
                            'border-2 border-primary': card.title === 'Ultimate',
                        })}
                    >
                        <CardHeader>
                            <CardTitle className="text-orange">{card.title}</CardTitle>
                            <CardDescription>
                                {pricingCards.find((c) => c.title === card.title)?.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <span className="text-4xl font-bold">{card.price}</span>
                            <span className="text-muted-foreground">
                                <span>/ month</span>
                            </span>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start gap-4">
                            <div>
                                {pricingCards
                                    .find((c) => c.title === card.title)
                                    ?.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex gap-2"
                                        >
                                            <Check/>
                                            <p>{feature}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <Link
                                href={`/dashboard?plan=${card.title}`}
                                className="bg-[#f3d299] border-orange border-2 p-2 w-full
                                text-center font-bold rounded-md"
                            >
                                Get Started
                            </Link>
                        </CardFooter>
                    </Card>
                ))}

            </div>
        </main>
    );
}
