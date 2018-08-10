/**
 * update old object immutable
 * 
 * @param {object} oldObject 
 * @param {object} updatedProperties 
 * @returns updated object
 */
export function updateObject(oldObject, updatedProperties) {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


/**
 * simulate server latency
 *
 * @export
 * @param {any} values
 */
export async function showResults(values, result) {
    await sleep(1000)
    window.alert(`Delivery Cost:\n\n${JSON.stringify({values, result}, null, 2)}`)
    return values;
}