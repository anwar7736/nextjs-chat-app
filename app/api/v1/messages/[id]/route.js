import { NextResponse } from "next/server";
const { mongoDB_connect, auth } = require("@/app/helpers/helper");
import { messageSchema } from "@/app/models/messageModel";
import mongoose from "mongoose";

mongoDB_connect();
export async function PATCH(request, content) { //Unseen a message
  let _id = content.params.id;
  let success = false;
  let message = "";
  let data = [];
    data = await messageSchema.updateOne({ _id }, { $set: { status: 2 } });
    if (data.modifiedCount > 0) {
      success = true;
      message = "Message has been unseen for you.";
    }

  return NextResponse.json({ success, message });
}

export async function DELETE(request, content) {
  let _id = content.params.id;
  const sender_id = auth()?._id;
  let success = false;
  let message = "";
  let data = [];
  data = await messageSchema.findOne({ _id, sender_id });
  if (!data) {
    success = false;
    message = 'You can not delete this message!';
  }
  else {
    data = await messageSchema.deleteOne({ _id });
    if (data) {
      success = true;
      message = "Message has been deleted.";
    }
  }

  return NextResponse.json({ success, message });
}