import crypto from "crypto";
import bcrypt from "bcrypt";
export const encryptData = (plainText) => {
    // Convert your Base64 public key to PEM format
    const base64Key = process.env.PUBLIC_KEY;
    const pemKey = `-----BEGIN PUBLIC KEY-----\n${base64Key
        .match(/.{1,64}/g)
        .join("\n")}\n-----END PUBLIC KEY-----`;
    // Convert text to buffer (no JSON stringify!)
    const buffer = Buffer.from(plainText, "utf8");
    const encrypted = crypto.publicEncrypt({
        key: pemKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha1",
    }, buffer);
    return encrypted.toString("base64").replace(/\r?\n/g, "");
};
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
export const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
//# sourceMappingURL=encrypt.functions.js.map