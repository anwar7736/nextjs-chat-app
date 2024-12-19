const { default: mongoose } = require("mongoose");

const messageModel = new mongoose.Schema({
    "sender_id": mongoose.Schema.Types.ObjectId,
    "receiver_id": mongoose.Schema.Types.ObjectId,
    "message":String,
    "status": {type: Number, default: 0 }, // 0=>pending, 1=>seen, 2=>unseen, 
}, {
    timestamps: true
});

export const messageSchema = mongoose.models.messages ||
mongoose.model("messages", messageModel);