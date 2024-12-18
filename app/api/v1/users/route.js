import { mongoDB_connect } from "@/app/helpers/helper";
import { userSchema } from "@/app/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

mongoDB_connect();
export async function GET(request) {
    let success = false;
    const queryParams = request.nextUrl.searchParams;
    const auth_id = queryParams.get('auth_id');
    const search = queryParams.get('search');
    let data = [];
    data = await userSchema.aggregate([
        {
            $match: {
                name: { $regex: new RegExp(search, 'i') },
                _id: { $ne: new mongoose.Types.ObjectId(auth_id) }
            }
        },
        {
            $lookup: {
                from: "messages",
                localField: "_id",
                foreignField: "sender_id",
                as: "messages"
            }
        },
        {
            $addFields: {
                pending: {
                    $size: {
                        $filter: {
                            input: "$messages",
                            as: "message",
                            cond: {
                                $and: [
                                    { $eq: ["$$message.is_read", 0] },
                                    { $eq: ["$$message.receiver_id", new mongoose.Types.ObjectId(auth_id)] }
                                ]
                            }
                        }
                    }
                }
            }
        },
        
        {
            $sort: { pending: -1 }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                pending: 1
            }
        }
    ]);

    if (data) {
        success = true;
    }

    return NextResponse.json({ success, data });
}