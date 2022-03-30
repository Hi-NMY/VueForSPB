export function checkRouting(context, url) {
    return context.$route.path !== url ? true : false
}