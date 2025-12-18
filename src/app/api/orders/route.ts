import { getCurrentUser } from "@/lib/auth/current-user";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const user = await getCurrentUser();

    if(!user){
        return NextResponse.json({error:"Unauthorized"},{status:401});
    }

    const orders = await prisma.order.findMany({
        where:{
            customerId:user.id,
            NOT:{status:"CART"}
        },
        include:{
            shop:true,
            items:{
                include:{
                    item:true,
                },
            },
        },

        orderBy:{createdAt:"desc"},
    });

    return NextResponse.json({orders});
}