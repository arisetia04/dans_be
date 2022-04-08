const axios = require("axios").default;

const API_URL = "http://dev3.dansmultipro.co.id/api/recruitment";

exports.getService = async (url, params = null) => {
    try {
        
        const data = await axios.get(`${API_URL}${url}`, { params });

        return data.data;
    } catch (err) {
        throw new Error("job service unavailable");
    }
};
