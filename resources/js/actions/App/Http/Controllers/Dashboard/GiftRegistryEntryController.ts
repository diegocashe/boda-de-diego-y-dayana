import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::index
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:18
* @route '/dashboard/gift-registry'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/gift-registry',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::index
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:18
* @route '/dashboard/gift-registry'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::index
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:18
* @route '/dashboard/gift-registry'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::index
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:18
* @route '/dashboard/gift-registry'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::index
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:18
* @route '/dashboard/gift-registry'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::index
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:18
* @route '/dashboard/gift-registry'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::index
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:18
* @route '/dashboard/gift-registry'
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
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::store
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:33
* @route '/dashboard/gift-registry'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/gift-registry',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::store
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:33
* @route '/dashboard/gift-registry'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::store
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:33
* @route '/dashboard/gift-registry'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::store
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:33
* @route '/dashboard/gift-registry'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::store
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:33
* @route '/dashboard/gift-registry'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::update
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:45
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
export const update = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/gift-registry/{giftRegistryEntry}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::update
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:45
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
update.url = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { giftRegistryEntry: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { giftRegistryEntry: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            giftRegistryEntry: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        giftRegistryEntry: typeof args.giftRegistryEntry === 'object'
        ? args.giftRegistryEntry.id
        : args.giftRegistryEntry,
    }

    return update.definition.url
            .replace('{giftRegistryEntry}', parsedArgs.giftRegistryEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::update
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:45
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
update.put = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::update
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:45
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
const updateForm = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::update
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:45
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
updateForm.put = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::destroy
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:57
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
export const destroy = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/gift-registry/{giftRegistryEntry}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::destroy
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:57
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
destroy.url = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { giftRegistryEntry: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { giftRegistryEntry: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            giftRegistryEntry: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        giftRegistryEntry: typeof args.giftRegistryEntry === 'object'
        ? args.giftRegistryEntry.id
        : args.giftRegistryEntry,
    }

    return destroy.definition.url
            .replace('{giftRegistryEntry}', parsedArgs.giftRegistryEntry.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::destroy
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:57
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
destroy.delete = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::destroy
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:57
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
const destroyForm = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\GiftRegistryEntryController::destroy
* @see app/Http/Controllers/Dashboard/GiftRegistryEntryController.php:57
* @route '/dashboard/gift-registry/{giftRegistryEntry}'
*/
destroyForm.delete = (args: { giftRegistryEntry: string | number | { id: string | number } } | [giftRegistryEntry: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const GiftRegistryEntryController = { index, store, update, destroy }

export default GiftRegistryEntryController