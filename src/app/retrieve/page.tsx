'use client'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {DownloadCloud} from "lucide-react";
import Link from "next/link";

export default function Retrieve() {
    // add loading state

    return (
        <div className="w-full h-screen flex flex-col justify-center ">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Retrieve Document</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to retrieve your account
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="clientID">Client ID</Label>
                            <Input
                                id="clientID"
                                type="text"
                                placeholder="Enter Client ID"
                                required
                            />
                            <div>
                                <Separator className={'my-4'} />
                            </div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="clientID"
                                type="text"
                                placeholder="Enter your email adress"
                                required
                            />
                            <div>
                                <Separator className={'my-4'} />
                            </div>
                            <Label htmlFor={"institution"}>Institution</Label>
                            <Input
                                id="institution"
                                type={'text'}
                                placeholder={'Name of your Institution'}
                                required
                            />
                        </div>
                    </div>
                    <Link href={'/approval'}>
                        <Button type="submit" className="w-full">
                            Retrieve
                            <DownloadCloud  className={'ml-3'}/>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
