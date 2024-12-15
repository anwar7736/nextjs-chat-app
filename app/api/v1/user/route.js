import { mongoDB_connect } from "@/app/helpers/helper";
import { userSchema } from "@/app/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

mongoDB_connect();
export async function POST(request)
{
    let payload = await request.json();
    let success = false;
    let data = [];
    let message = "";
    if(payload.login)
    {
        delete payload.login;
        data = await userSchema.findOne({phone:payload.phone});
        if(data)
        {
            const passwordMatched = await bcrypt.compare(payload.password, data.password);
            if(passwordMatched)
            {
                message = 'Login Successfully';
                success = true;
            }
            else{
                message = 'Password did not matched';
            }
        }
        else{
            message = 'User not found';
        }
    }
    else{
        delete payload.login;
        delete payload.cpassword;
        const user = await userSchema.findOne({ phone: payload.phone });
        if(user)
        {
            message = 'Account already exists.';
            success = false;
        }
        else{
            payload.password = await bcrypt.hash(payload.password, 10);
            let res = await new userSchema(payload);
            res = await res.save();
            message = 'Registration Successfully';
            data = res;
            success = true;
        }
    }

    return NextResponse.json({success, message, data});
}

export async function GET(request)
{
    let success = false;
    let data = [];
    data = await userSchema.find();
    if(data)
    {
        success = true;
    }

    return NextResponse.json({success, data});
}