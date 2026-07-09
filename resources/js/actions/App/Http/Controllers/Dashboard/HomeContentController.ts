import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::edit
* @see app/Http/Controllers/Dashboard/HomeContentController.php:17
* @route '/dashboard/home-content'
*/
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/home-content',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::edit
* @see app/Http/Controllers/Dashboard/HomeContentController.php:17
* @route '/dashboard/home-content'
*/
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::edit
* @see app/Http/Controllers/Dashboard/HomeContentController.php:17
* @route '/dashboard/home-content'
*/
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::edit
* @see app/Http/Controllers/Dashboard/HomeContentController.php:17
* @route '/dashboard/home-content'
*/
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::edit
* @see app/Http/Controllers/Dashboard/HomeContentController.php:17
* @route '/dashboard/home-content'
*/
const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::edit
* @see app/Http/Controllers/Dashboard/HomeContentController.php:17
* @route '/dashboard/home-content'
*/
editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::edit
* @see app/Http/Controllers/Dashboard/HomeContentController.php:17
* @route '/dashboard/home-content'
*/
editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::update
* @see app/Http/Controllers/Dashboard/HomeContentController.php:37
* @route '/dashboard/home-content'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/home-content',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::update
* @see app/Http/Controllers/Dashboard/HomeContentController.php:37
* @route '/dashboard/home-content'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::update
* @see app/Http/Controllers/Dashboard/HomeContentController.php:37
* @route '/dashboard/home-content'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::update
* @see app/Http/Controllers/Dashboard/HomeContentController.php:37
* @route '/dashboard/home-content'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\HomeContentController::update
* @see app/Http/Controllers/Dashboard/HomeContentController.php:37
* @route '/dashboard/home-content'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const HomeContentController = { edit, update }

export default HomeContentController