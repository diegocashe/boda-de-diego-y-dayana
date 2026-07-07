import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::index
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:19
* @route '/dashboard/timeline'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/timeline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::index
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:19
* @route '/dashboard/timeline'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::index
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:19
* @route '/dashboard/timeline'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::index
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:19
* @route '/dashboard/timeline'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::index
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:19
* @route '/dashboard/timeline'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::index
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:19
* @route '/dashboard/timeline'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::index
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:19
* @route '/dashboard/timeline'
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
* @see \App\Http\Controllers\Dashboard\TimelineItemController::store
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:39
* @route '/dashboard/timeline'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/timeline',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::store
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:39
* @route '/dashboard/timeline'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::store
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:39
* @route '/dashboard/timeline'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::store
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:39
* @route '/dashboard/timeline'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::store
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:39
* @route '/dashboard/timeline'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::update
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:56
* @route '/dashboard/timeline/{timelineItem}'
*/
export const update = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/timeline/{timelineItem}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::update
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:56
* @route '/dashboard/timeline/{timelineItem}'
*/
update.url = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timelineItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { timelineItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            timelineItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timelineItem: typeof args.timelineItem === 'object'
        ? args.timelineItem.id
        : args.timelineItem,
    }

    return update.definition.url
            .replace('{timelineItem}', parsedArgs.timelineItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::update
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:56
* @route '/dashboard/timeline/{timelineItem}'
*/
update.put = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::update
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:56
* @route '/dashboard/timeline/{timelineItem}'
*/
const updateForm = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::update
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:56
* @route '/dashboard/timeline/{timelineItem}'
*/
updateForm.put = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Dashboard\TimelineItemController::destroy
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:76
* @route '/dashboard/timeline/{timelineItem}'
*/
export const destroy = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/timeline/{timelineItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::destroy
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:76
* @route '/dashboard/timeline/{timelineItem}'
*/
destroy.url = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { timelineItem: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { timelineItem: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            timelineItem: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        timelineItem: typeof args.timelineItem === 'object'
        ? args.timelineItem.id
        : args.timelineItem,
    }

    return destroy.definition.url
            .replace('{timelineItem}', parsedArgs.timelineItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::destroy
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:76
* @route '/dashboard/timeline/{timelineItem}'
*/
destroy.delete = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::destroy
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:76
* @route '/dashboard/timeline/{timelineItem}'
*/
const destroyForm = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\TimelineItemController::destroy
* @see app/Http/Controllers/Dashboard/TimelineItemController.php:76
* @route '/dashboard/timeline/{timelineItem}'
*/
destroyForm.delete = (args: { timelineItem: number | { id: number } } | [timelineItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const TimelineItemController = { index, store, update, destroy }

export default TimelineItemController