let currentId = 0;
export default function uniqueId(prefix = '__') {
    currentId++;
    return `${prefix}${currentId}`
}