import { getCurrentUser } from "@/lib/auth/current-user";
import prisma from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req:Request,context:{params:Promise<{id:string}>}) {
    const user = await getCurrentUser();

    if(!user){
        return NextResponse.json({error:"Unauthorized"},{status:401});
    }
    const {id} = await context.params;
    const order = await prisma.order.findFirst({
        where:{
            id,
            customerId:user.id,
        },
    });
    
    if(!order){
        return NextResponse.json({error:"Order not found"},{status:404});
    }

    if(order.status !== OrderStatus.CREATED){
        return NextResponse.json(
            {error:"Order cannot be cancelled at this stage"},
            {status:400}
        );
    }

    const updated = await prisma.order.update({
        where:{id},
        data:{status:OrderStatus.CANCELLED},
    });

    return NextResponse.json({order:updated});
}