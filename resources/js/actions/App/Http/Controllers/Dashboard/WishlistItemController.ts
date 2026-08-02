import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::index
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:22
* @route '/dashboard/wishlist'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/wishlist',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::index
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:22
* @route '/dashboard/wishlist'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::index
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:22
* @route '/dashboard/wishlist'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::index
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:22
* @route '/dashboard/wishlist'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::index
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:22
* @route '/dashboard/wishlist'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::index
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:22
* @route '/dashboard/wishlist'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::index
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:22
* @route '/dashboard/wishlist'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::store
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:43
* @route '/dashboard/wishlist'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/wishlist',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::store
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:43
* @route '/dashboard/wishlist'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::store
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:43
* @route '/dashboard/wishlist'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::store
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:43
* @route '/dashboard/wishlist'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::store
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:43
* @route '/dashboard/wishlist'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::reorder
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:64
* @route '/dashboard/wishlist/reorder'
*/
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reorder.url(options),
    method: 'patch',
})

reorder.definition = {
    methods: ["patch"],
    url: '/dashboard/wishlist/reorder',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::reorder
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:64
* @route '/dashboard/wishlist/reorder'
*/
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::reorder
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:64
* @route '/dashboard/wishlist/reorder'
*/
reorder.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: reorder.url(options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::reorder
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:64
* @route '/dashboard/wishlist/reorder'
*/
const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reorder.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::reorder
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:64
* @route '/dashboard/wishlist/reorder'
*/
reorderForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reorder.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

reorder.form = reorderForm

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::update
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:78
* @route '/dashboard/wishlist/{wishlistItem}'
*/
export const update = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/wishlist/{wishlistItem}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::update
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:78
* @route '/dashboard/wishlist/{wishlistItem}'
*/
update.url = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{wishlistItem}', parsedArgs.wishlistItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::update
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:78
* @route '/dashboard/wishlist/{wishlistItem}'
*/
update.put = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::update
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:78
* @route '/dashboard/wishlist/{wishlistItem}'
*/
const updateForm = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::update
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:78
* @route '/dashboard/wishlist/{wishlistItem}'
*/
updateForm.put = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::destroy
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:103
* @route '/dashboard/wishlist/{wishlistItem}'
*/
export const destroy = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/wishlist/{wishlistItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::destroy
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:103
* @route '/dashboard/wishlist/{wishlistItem}'
*/
destroy.url = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{wishlistItem}', parsedArgs.wishlistItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::destroy
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:103
* @route '/dashboard/wishlist/{wishlistItem}'
*/
destroy.delete = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::destroy
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:103
* @route '/dashboard/wishlist/{wishlistItem}'
*/
const destroyForm = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\WishlistItemController::destroy
* @see app/Http/Controllers/Dashboard/WishlistItemController.php:103
* @route '/dashboard/wishlist/{wishlistItem}'
*/
destroyForm.delete = (args: { wishlistItem: number | { id: number } } | [wishlistItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const WishlistItemController = { index, store, reorder, update, destroy }

export default WishlistItemController