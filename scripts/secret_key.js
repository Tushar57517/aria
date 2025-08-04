import crypto from "crypto";

console.log(`Your secret key: ${crypto.randomBytes(32).toString("hex")}`);
