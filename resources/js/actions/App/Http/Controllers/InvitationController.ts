import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InvitationController::home
* @see app/Http/Controllers/InvitationController.php:29
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationController::home
* @see app/Http/Controllers/InvitationController.php:29
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::home
* @see app/Http/Controllers/InvitationController.php:29
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::home
* @see app/Http/Controllers/InvitationController.php:29
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::home
* @see app/Http/Controllers/InvitationController.php:29
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::home
* @see app/Http/Controllers/InvitationController.php:29
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::home
* @see app/Http/Controllers/InvitationController.php:29
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:55
* @route '/historia'
*/
export const story = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: story.url(options),
    method: 'get',
})

story.definition = {
    methods: ["get","head"],
    url: '/historia',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:55
* @route '/historia'
*/
story.url = (options?: RouteQueryOptions) => {
    return story.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:55
* @route '/historia'
*/
story.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: story.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:55
* @route '/historia'
*/
story.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: story.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:55
* @route '/historia'
*/
const storyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: story.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:55
* @route '/historia'
*/
storyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: story.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:55
* @route '/historia'
*/
storyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: story.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

story.form = storyForm

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:85
* @route '/asistencia'
*/
export const rsvp = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvp.url(options),
    method: 'get',
})

rsvp.definition = {
    methods: ["get","head"],
    url: '/asistencia',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:85
* @route '/asistencia'
*/
rsvp.url = (options?: RouteQueryOptions) => {
    return rsvp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:85
* @route '/asistencia'
*/
rsvp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:85
* @route '/asistencia'
*/
rsvp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rsvp.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:85
* @route '/asistencia'
*/
const rsvpForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:85
* @route '/asistencia'
*/
rsvpForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:85
* @route '/asistencia'
*/
rsvpForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvp.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

rsvp.form = rsvpForm

/**
* @see \App\Http\Controllers\InvitationController::rsvpShow
* @see app/Http/Controllers/InvitationController.php:96
* @route '/asistencia/{invitation}'
*/
export const rsvpShow = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvpShow.url(args, options),
    method: 'get',
})

rsvpShow.definition = {
    methods: ["get","head"],
    url: '/asistencia/{invitation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationController::rsvpShow
* @see app/Http/Controllers/InvitationController.php:96
* @route '/asistencia/{invitation}'
*/
rsvpShow.url = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { invitation: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            invitation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invitation: typeof args.invitation === 'object'
        ? args.invitation.code
        : args.invitation,
    }

    return rsvpShow.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::rsvpShow
* @see app/Http/Controllers/InvitationController.php:96
* @route '/asistencia/{invitation}'
*/
rsvpShow.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvpShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvpShow
* @see app/Http/Controllers/InvitationController.php:96
* @route '/asistencia/{invitation}'
*/
rsvpShow.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rsvpShow.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvpShow
* @see app/Http/Controllers/InvitationController.php:96
* @route '/asistencia/{invitation}'
*/
const rsvpShowForm = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvpShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvpShow
* @see app/Http/Controllers/InvitationController.php:96
* @route '/asistencia/{invitation}'
*/
rsvpShowForm.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvpShow.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvpShow
* @see app/Http/Controllers/InvitationController.php:96
* @route '/asistencia/{invitation}'
*/
rsvpShowForm.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvpShow.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

rsvpShow.form = rsvpShowForm

/**
* @see \App\Http\Controllers\InvitationController::rsvpStore
* @see app/Http/Controllers/InvitationController.php:144
* @route '/asistencia/{invitation}'
*/
export const rsvpStore = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rsvpStore.url(args, options),
    method: 'post',
})

rsvpStore.definition = {
    methods: ["post"],
    url: '/asistencia/{invitation}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvitationController::rsvpStore
* @see app/Http/Controllers/InvitationController.php:144
* @route '/asistencia/{invitation}'
*/
rsvpStore.url = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { invitation: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            invitation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invitation: typeof args.invitation === 'object'
        ? args.invitation.code
        : args.invitation,
    }

    return rsvpStore.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::rsvpStore
* @see app/Http/Controllers/InvitationController.php:144
* @route '/asistencia/{invitation}'
*/
rsvpStore.post = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rsvpStore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvpStore
* @see app/Http/Controllers/InvitationController.php:144
* @route '/asistencia/{invitation}'
*/
const rsvpStoreForm = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: rsvpStore.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvpStore
* @see app/Http/Controllers/InvitationController.php:144
* @route '/asistencia/{invitation}'
*/
rsvpStoreForm.post = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: rsvpStore.url(args, options),
    method: 'post',
})

rsvpStore.form = rsvpStoreForm

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:131
* @route '/asistencia/{invitation}/og.jpg'
*/
export const ogImage = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ogImage.url(args, options),
    method: 'get',
})

ogImage.definition = {
    methods: ["get","head"],
    url: '/asistencia/{invitation}/og.jpg',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:131
* @route '/asistencia/{invitation}/og.jpg'
*/
ogImage.url = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'code' in args) {
        args = { invitation: args.code }
    }

    if (Array.isArray(args)) {
        args = {
            invitation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invitation: typeof args.invitation === 'object'
        ? args.invitation.code
        : args.invitation,
    }

    return ogImage.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:131
* @route '/asistencia/{invitation}/og.jpg'
*/
ogImage.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ogImage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:131
* @route '/asistencia/{invitation}/og.jpg'
*/
ogImage.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ogImage.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:131
* @route '/asistencia/{invitation}/og.jpg'
*/
const ogImageForm = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ogImage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:131
* @route '/asistencia/{invitation}/og.jpg'
*/
ogImageForm.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ogImage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:131
* @route '/asistencia/{invitation}/og.jpg'
*/
ogImageForm.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ogImage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

ogImage.form = ogImageForm

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:175
* @route '/detalles'
*/
export const details = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(options),
    method: 'get',
})

details.definition = {
    methods: ["get","head"],
    url: '/detalles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:175
* @route '/detalles'
*/
details.url = (options?: RouteQueryOptions) => {
    return details.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:175
* @route '/detalles'
*/
details.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:175
* @route '/detalles'
*/
details.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: details.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:175
* @route '/detalles'
*/
const detailsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: details.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:175
* @route '/detalles'
*/
detailsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: details.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:175
* @route '/detalles'
*/
detailsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: details.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

details.form = detailsForm

/**
* @see \App\Http\Controllers\InvitationController::wishlist
* @see app/Http/Controllers/InvitationController.php:211
* @route '/lista-de-deseos'
*/
export const wishlist = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wishlist.url(options),
    method: 'get',
})

wishlist.definition = {
    methods: ["get","head"],
    url: '/lista-de-deseos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationController::wishlist
* @see app/Http/Controllers/InvitationController.php:211
* @route '/lista-de-deseos'
*/
wishlist.url = (options?: RouteQueryOptions) => {
    return wishlist.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::wishlist
* @see app/Http/Controllers/InvitationController.php:211
* @route '/lista-de-deseos'
*/
wishlist.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wishlist.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::wishlist
* @see app/Http/Controllers/InvitationController.php:211
* @route '/lista-de-deseos'
*/
wishlist.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: wishlist.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::wishlist
* @see app/Http/Controllers/InvitationController.php:211
* @route '/lista-de-deseos'
*/
const wishlistForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: wishlist.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::wishlist
* @see app/Http/Controllers/InvitationController.php:211
* @route '/lista-de-deseos'
*/
wishlistForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: wishlist.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::wishlist
* @see app/Http/Controllers/InvitationController.php:211
* @route '/lista-de-deseos'
*/
wishlistForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: wishlist.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

wishlist.form = wishlistForm

/**
* @see \App\Http\Controllers\InvitationController::reserveWishlistItem
* @see app/Http/Controllers/InvitationController.php:237
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
export const reserveWishlistItem = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserveWishlistItem.url(args, options),
    method: 'post',
})

reserveWishlistItem.definition = {
    methods: ["post"],
    url: '/lista-de-deseos/{wishlistItem}/reservar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvitationController::reserveWishlistItem
* @see app/Http/Controllers/InvitationController.php:237
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
reserveWishlistItem.url = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { wishlistItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { wishlistItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            wishlistItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        wishlistItem: typeof args.wishlistItem === 'object'
        ? args.wishlistItem.id
        : args.wishlistItem,
    }

    return reserveWishlistItem.definition.url
            .replace('{wishlistItem}', parsedArgs.wishlistItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::reserveWishlistItem
* @see app/Http/Controllers/InvitationController.php:237
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
reserveWishlistItem.post = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserveWishlistItem.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvitationController::reserveWishlistItem
* @see app/Http/Controllers/InvitationController.php:237
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
const reserveWishlistItemForm = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reserveWishlistItem.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvitationController::reserveWishlistItem
* @see app/Http/Controllers/InvitationController.php:237
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
reserveWishlistItemForm.post = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reserveWishlistItem.url(args, options),
    method: 'post',
})

reserveWishlistItem.form = reserveWishlistItemForm

const InvitationController = { home, story, rsvp, rsvpShow, rsvpStore, ogImage, details, wishlist, reserveWishlistItem }

export default InvitationController