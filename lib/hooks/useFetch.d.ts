declare const useFetch: ({ url, options }: {
    url: string;
    options?: object;
}) => {
    response: any;
    error: any;
};
export default useFetch;
