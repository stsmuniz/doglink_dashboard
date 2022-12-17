const removeJsonNullProperties = (object: Object) => {
    // @ts-ignore
    return Object.entries(object).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
}

export default removeJsonNullProperties;
