export const utils = {
    fromStringToDateAndMonth: function (temp: string) {
        let date = new Date(temp).toString().split(' ')
        let result = [date[2], date[1]].join(' ')
        return result
    },
    extractOneParam: function <T, K extends keyof T>(obj: T, param: K): T[K] {
        return obj[param]
    }
}

