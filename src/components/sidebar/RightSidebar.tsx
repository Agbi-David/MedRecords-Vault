import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight, Copy, DownloadCloud, MoreVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Separator} from "@/components/ui/separator";
import {Pagination, PaginationContent, PaginationItem} from "@/components/ui/pagination";

export default function RightSidebar() {
    return (
        <div>
            <Card
                className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Family ID: GEIWPLSYJ
                            <Button
                                size="icon"
                                variant="outline"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <Copy className="h-3 w-3"/>
                                <span className="sr-only">Copy Family ID</span>
                            </Button>
                        </CardTitle>
                        <CardDescription>Date: November 23, 2023</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                            <DownloadCloud className="h-3.5 w-3.5"/>
                            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Download
                    </span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="outline" className="h-8 w-8">
                                    <MoreVertical className="h-3.5 w-3.5"/>
                                    <span className="sr-only">More</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Export</DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Trash</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Patient Details</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Patient Name</span>
                                <span>Liam Johnson</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Age</span>
                                <span>45</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Address</span>
                                <span>1234 Main St, Anytown, CA 12345</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Phone Number</span>
                                <span>+1 234 567 890</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Email</span>
                                <span>liam@acme.com</span>
                            </li>
                        </ul>
                        <Separator className="my-2"/>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <div className="font-semibold">Medical Information</div>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Blood Type</span>
                                        <span>O+</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Allergies</span>
                                        <span>None</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Chronic Conditions</span>
                                        <span>Hypertension</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="grid gap-3">
                                <div className="font-semibold">Emergency Contact</div>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Name</span>
                                        <span>Jane Johnson</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Relation</span>
                                        <span>Wife</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Phone Number</span>
                                        <span>+1 234 567 891</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Separator className="my-4"/>
                        <div className="grid gap-3">
                            <div className="font-semibold">Insurance Information</div>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Insurance Provider</span>
                                    <span>HealthPlus</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Policy Number</span>
                                    <span>HP123456789</span>
                                </li>
                            </ul>
                        </div>
                        <Separator className="my-4"/>
                        <div className="grid gap-3">
                            <div className="font-semibold">Recent Visits</div>
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Date</span>
                                    <span>2023-05-14</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Reason</span>
                                    <span>Annual Check-up</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">Notes</span>
                                    <span>Blood pressure normal</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                        Updated <time dateTime="2023-11-23">November 23, 2023</time>
                    </div>
                    <Pagination className="ml-auto mr-0 w-auto">
                        <PaginationContent>
                            <PaginationItem>
                                <Button size="icon" variant="outline" className="h-6 w-6">
                                    <ChevronLeft className="h-3.5 w-3.5"/>
                                    <span className="sr-only">Previous Order</span>
                                </Button>
                            </PaginationItem>
                            <PaginationItem>
                                <Button size="icon" variant="outline" className="h-6 w-6">
                                    <ChevronRight className="h-3.5 w-3.5"/>
                                    <span className="sr-only">Next Order</span>
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardFooter>
            </Card>
        </div>
    )
}
