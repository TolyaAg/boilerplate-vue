const routerId = "6385385939497347608"
const templates = []

const addTemp = (temp) => {
    if (typeof temp !== "object") {
        throw TypeError("Argument must be an object like this \r\n \"{id: 1, name: \"Test\"}\"")
    }

    templates.push(temp)
}

addTemp({ id: "6423618230641905130", name: "notStudy" })

export const getAll = () => {
    return templates
}

export const getTemplate = (name, action) => {
    const temps = templates.filter(temp => {
        return temp.name === name
    })

    const temp = temps[0]

    return temp != null ? { object_id: routerId, server_id: temp.id, server_name: temp.name, action_name: action } : null
}
