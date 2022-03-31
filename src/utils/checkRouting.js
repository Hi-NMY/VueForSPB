export function checkRouting(context, url) {
    return context.$route.path !== url ? true : false
}

export function checkRoutingFirst(context, url) {
    return '/' + context.$route.path.split('/')[1] !== url ? true : false
}