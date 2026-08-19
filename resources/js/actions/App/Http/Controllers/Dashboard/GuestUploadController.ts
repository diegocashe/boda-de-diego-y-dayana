import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\GuestUploadController::index
* @see app/Http/Controllers/Dashboard/GuestUploadController.php:16
* @route '/dashboard/guest-uploads'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/guest-uploads',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\GuestUploadController::index
* @see app/Http/Controllers/Dashboard/GuestUploadController.php:16
* @route '/dashboard/guest-uploads'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\GuestUploadController::index
* @see app/Http/Controllers/Dashboard/GuestUploadController.php:16
* @route '/dashboard/guest-uploads'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GuestUploadController::index
* @see app/Http/Controllers/Dashboard/GuestUploadController.php:16
* @route '/dashboard/guest-uploads'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\GuestUploadController::index
* @see app/Http/Controllers/Dashboard/GuestUploadController.php:16
* @route '/dashboard/guest-uploads'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GuestUploadController::index
* @see app/Http/Controllers/Dashboard/GuestUploadController.php:16
* @route '/dashboard/guest-uploads'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\GuestUploadController::index
* @see app/Http/Controllers/Dashboard/GuestUploadController.php:16
* @route '/dashboard/guest-uploads'
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

const GuestUploadController = { index }

export default GuestUploadController