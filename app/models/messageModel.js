const { default: mongoose } = require("mongoose");

const messageModel = new mongoose.Schema({
    "sender_id": mongoose.Schema.Types.ObjectId,
    "receiver_id": mongoose.Schema.Types.ObjectId,
    "message":String,
    "is_read": {type: Number, default: 0 },
}, {
    timestamps: true
});

export const messageSchema = mongoose.models.messages ||
mongoose.model("messages", messageModel);