import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";


const collectionName = "roupas";

export default class RoupasDataAccess {
    async getRoupas() {
        const result = await Mongo.db.collection(collectionName)
            .find({ })
            .toArray()

        return result
    }

    async getAvailableRoupas() {
        const result = await Mongo.db.collection(collectionName)
            .find({ available: true })
            .toArray()

        return result
    }

    async addRoupa(roupaData) {
        const result = await Mongo.db
        .collection(collectionName)
        .insertOne(roupaData)

        return result
    }

    async deleteRoupa(roupaId) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndDelete(
                { _id: new ObjectId(roupaId) })

        return result
    }

    async updateRoupa(roupaId, roupaData) {
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndUpdate(
            { _id: new ObjectId(roupaId) },
            { $set: roupaData },
        )

        return result
    }
}