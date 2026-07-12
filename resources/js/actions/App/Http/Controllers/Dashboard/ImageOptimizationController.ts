import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\ImageOptimizationController::optimize
* @see app/Http/Controllers/Dashboard/ImageOptimizationController.php:29
* @route '/dashboard/images/optimize'
*/
export const optimize = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: optimize.url(options),
    method: 'post',
})

optimize.definition = {
    methods: ["post"],
    url: '/dashboard/images/optimize',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\ImageOptimizationController::optimize
* @see app/Http/Controllers/Dashboard/ImageOptimizationController.php:29
* @route '/dashboard/images/optimize'
*/
optimize.url = (options?: RouteQueryOptions) => {
    return optimize.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\ImageOptimizationController::optimize
* @see app/Http/Controllers/Dashboard/ImageOptimizationController.php:29
* @route '/dashboard/images/optimize'
*/
optimize.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: optimize.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\ImageOptimizationController::optimize
* @see app/Http/Controllers/Dashboard/ImageOptimizationController.php:29
* @route '/dashboard/images/optimize'
*/
const optimizeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: optimize.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\ImageOptimizationController::optimize
* @see app/Http/Controllers/Dashboard/ImageOptimizationController.php:29
* @route '/dashboard/images/optimize'
*/
optimizeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: optimize.url(options),
    method: 'post',
})

optimize.form = optimizeForm

const ImageOptimizationController = { optimize }

export default ImageOptimizationController