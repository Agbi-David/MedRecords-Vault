import {Button} from "@/components/ui/button";

export default function Approval() {
    return (
        <div className="w-full h-screen flex flex-col justify-center">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Approval</h1>
                        <p className="text-balance text-muted-foreground">

                            We will send an email to the user to approve the request
                        </p>
                    </div>
                    <div className="grid gap-4">

                    </div>
                    <Button type="submit" className="w-full">
                        Request Approval
                    </Button>
                </div>
            </div>
        </div>
    );
}
