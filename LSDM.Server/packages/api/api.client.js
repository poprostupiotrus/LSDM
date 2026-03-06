const axiosInstance = require('./axios.instance');
const ApiError = require('./api.error');

class ApiClient {

    async request(config) {
        try {
            const response = await axiosInstance(config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {

            const status = error.response.status;
            const data = error.response.data || {};
            return new ApiError(
                data.message || "Wystąpił błąd",
                status,
                Array.isArray(data.errors) ? data.errors : []
            );
        }
        if (error.request) {
            return new ApiError(
                "Brak odpowiedzi z API",
                503
            );
        }
        return new ApiError(
            error.message || "Nie udało się połączyć z API",
            500
        );
    }
}

module.exports = new ApiClient();