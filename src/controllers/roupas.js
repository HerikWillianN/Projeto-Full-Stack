import RoupasDataAccess from '../dataAccess/roupas.js'
import { ok, serverError } from '../helpers/httpResponse.js'

export default class RoupasControllers {
    constructor() {
        this.dataAccess = new RoupasDataAccess()
    }

    async getRoupas() {
        try {
            const roupas = await this.dataAccess.getRoupas()

            return ok(roupas)
        } catch (error) {
            return serverError(error)
        }
    }

    async getAvailableRoupas() {
        try {
            const roupas = await this.dataAccess.getAvailableRoupas()

            return ok(roupas)
        } catch (error) {
            return serverError(error)
        }
    }

    async addRoupa(roupaData) {
        try {
            const result = await this.dataAccess.addRoupa(roupaData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteRoupa(roupaId) {
        try {
            const result = await this.dataAccess.deleteRoupa(roupaId)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updateRoupa(roupaId, roupaData) {
        try {
            const result = await this.dataAccess.updateRoupa(roupaId, roupaData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}