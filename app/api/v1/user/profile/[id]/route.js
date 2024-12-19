import { userSchema } from "@/app/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const { mongoDB_connect } = require("@/app/helpers/helper");
import { writeFile } from 'fs/promises';

mongoDB_connect();
export async function PUT(request, content) {
    let id = content.params.id;
    let success = false;
    let data = [];
    let message = "";
    request = await request.formData();
    let name = payload.get('name');
    let phone = payload.get('phone');
    let old_password = payload.get('old_password');
    let password = payload.get('password');
    let address = payload.get('address');
    let photo = payload.get('photo');
    let inputs = {
        name,
        phone,
        address
    }

    let user = await userSchema.findOne({ phone, _id: { $ne: id } });
    if (user) {
        success = false;
        message = 'Phone number already used.';
    }

    else {
        user = await userSchema.findById(id);
        if (!user) {
            success = false;
            message = "User not fond.";
            return NextResponse.json({ success, data, message });
        }
        if (old_password) {
            const passwordMatched = await bcrypt.compare(old_password, user.password);
            if (!passwordMatched) {
                success = false;
                message = "Old password is incorrect.";
                return NextResponse.json({ success, data, message });

            }

            inputs.password = await bcrypt.hash(password, 10);
        }

        if (photo != 'undefined') {
            let byteData = await photo.arrayBuffer();
            let buffer = Buffer.from(byteData);
            let file_name = `${Math.floor(Math.random() * 9999999999)}_${photo.name}`;
            let upload_path = `./public/images/users/${file_name}`;
            await writeFile(upload_path, buffer);
            inputs.photo = file_name;
        }



        data = await userSchema.updateOne({ _id: id }, { $set: inputs });
        if (data.modifiedCount > 0) {
            success = true;
            message = "Profile updated successfully.";
            data = await userSchema.findById(id, { password: 0 });

        } else {
            success = false;
            message = "Nothing to updated.";

        }
    }

    return NextResponse.json({ success, data, message });

}