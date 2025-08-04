import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blacklist = mongoose.model("Blacklist", blacklistSchema);
export default Blacklist;
