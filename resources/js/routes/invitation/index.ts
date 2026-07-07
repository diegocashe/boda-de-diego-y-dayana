import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import rsvpDa4a24 from './rsvp'
/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:28
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
* @see app/Http/Controllers/InvitationController.php:28
* @route '/historia'
*/
story.url = (options?: RouteQueryOptions) => {
    return story.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:28
* @route '/historia'
*/
story.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: story.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:28
* @route '/historia'
*/
story.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: story.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:28
* @route '/historia'
*/
const storyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: story.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:28
* @route '/historia'
*/
storyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: story.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:28
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
* @see app/Http/Controllers/InvitationController.php:47
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
* @see app/Http/Controllers/InvitationController.php:47
* @route '/asistencia'
*/
rsvp.url = (options?: RouteQueryOptions) => {
    return rsvp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:47
* @route '/asistencia'
*/
rsvp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:47
* @route '/asistencia'
*/
rsvp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rsvp.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:47
* @route '/asistencia'
*/
const rsvpForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:47
* @route '/asistencia'
*/
rsvpForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:47
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
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:102
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
* @see app/Http/Controllers/InvitationController.php:102
* @route '/detalles'
*/
details.url = (options?: RouteQueryOptions) => {
    return details.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:102
* @route '/detalles'
*/
details.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:102
* @route '/detalles'
*/
details.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: details.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:102
* @route '/detalles'
*/
const detailsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: details.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:102
* @route '/detalles'
*/
detailsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: details.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::details
* @see app/Http/Controllers/InvitationController.php:102
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

const invitation = {
    story: Object.assign(story, story),
    rsvp: Object.assign(rsvp, rsvpDa4a24),
    details: Object.assign(details, details),
}

export default invitation