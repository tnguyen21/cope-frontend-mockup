import { __awaiter } from "tslib";
import { useState, useEffect } from "react";
const useFetch = ({ url, options }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield fetch(url, options);
                const json = yield res.json();
                setResponse(json);
            }
            catch (error) {
                setError(error);
            }
        });
        fetchData();
    });
    return { response, error };
};
export default useFetch;
