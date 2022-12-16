const removeJsonNullProperties = (object: Object) => {
    return Object.entries(object).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
}

export default removeJsonNullProperties;
