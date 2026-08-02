import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\InvitationController::reserve
* @see app/Http/Controllers/InvitationController.php:236
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
export const reserve = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserve.url(args, options),
    method: 'post',
})

reserve.definition = {
    methods: ["post"],
    url: '/lista-de-deseos/{wishlistItem}/reservar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvitationController::reserve
* @see app/Http/Controllers/InvitationController.php:236
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
reserve.url = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reserve.definition.url
            .replace('{wishlistItem}', parsedArgs.wishlistItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::reserve
* @see app/Http/Controllers/InvitationController.php:236
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
reserve.post = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reserve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvitationController::reserve
* @see app/Http/Controllers/InvitationController.php:236
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
const reserveForm = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reserve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvitationController::reserve
* @see app/Http/Controllers/InvitationController.php:236
* @route '/lista-de-deseos/{wishlistItem}/reservar'
*/
reserveForm.post = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reserve.url(args, options),
    method: 'post',
})

reserve.form = reserveForm

const wishlist = {
    reserve: Object.assign(reserve, reserve),
}

export default wishlist