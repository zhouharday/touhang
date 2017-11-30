export function deepCopy(obj) {
    if (obj instanceof Array) {
        var n = []
        for (var i = 0; i < obj.length; ++i) {
            n[i] = deepCopy(obj[i])
        }
        return n
    } else if (obj instanceof Object) {
        var n = {}
        for (var i in obj) {
            n[i] = deepCopy(obj[i])
        }
        return n
    } else {
        return obj
    }
}
