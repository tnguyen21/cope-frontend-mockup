export const shortUUID = (name, hash_length = 12) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charl = chars.length
    const url_compat = name.toLowerCase().replace(" ", "-")
    const hashFn = (n = hash_length, acc = "") => {
        if (n === 0) return acc
        return hashFn(n - 1, acc + chars.charAt(Math.floor(Math.random() * charl)))
    }
    return `${url_compat}~${hashFn()}`
}

shortUUID("Some Name") //?
