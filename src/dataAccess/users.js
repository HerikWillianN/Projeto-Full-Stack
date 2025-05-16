import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";
import crypto from "crypto";

const collectionName = "users";

export default class UserDataAccess {
    async getUsers() {
        const result = await Mongo.db.collection(collectionName).find({}).toArray();
        return result;
    }

    async deleteUser(userId) {
        const result = await Mongo.db.collection(collectionName).findOneAndDelete({ _id: new ObjectId(userId) });
        return result;
    }

    async updateUser(userId, userData) {
        try {
            if (userData.password) {
                const salt = crypto.randomBytes(16);

                const hashedPassword = await new Promise((resolve, reject) => {
                    crypto.pbkdf2(userData.password, salt, 310000, 16, "sha256", (err, derivedKey) => {
                        if (err) {
                            return reject(new Error("Error during password hashing"));
                        }
                        resolve(derivedKey);
                    });
                });

                userData = { ...userData, password: hashedPassword, salt };
            }

            const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(userId) },
                    { $set: userData },
                    { returnDocument: "after" }
                );

            return {
                success: true,
                statusCode: 200,
                body: {
                    text: "User updated successfully",
                    user: result.value
                }
            };

        } catch (error) {
            console.error("Error in updateUser:", error.message);
            return {
                success: false,
                statusCode: 500,
                body: {
                    text: "Error updating user",
                    error: error.message
                }
            };
        }
    }
}
