import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import rsvpDa4a24 from './rsvp'
/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:53
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
* @see app/Http/Controllers/InvitationController.php:53
* @route '/historia'
*/
story.url = (options?: RouteQueryOptions) => {
    return story.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:53
* @route '/historia'
*/
story.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: story.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:53
* @route '/historia'
*/
story.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: story.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:53
* @route '/historia'
*/
const storyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: story.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:53
* @route '/historia'
*/
storyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: story.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::story
* @see app/Http/Controllers/InvitationController.php:53
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
* @see app/Http/Controllers/InvitationController.php:83
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
* @see app/Http/Controllers/InvitationController.php:83
* @route '/asistencia'
*/
rsvp.url = (options?: RouteQueryOptions) => {
    return rsvp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:83
* @route '/asistencia'
*/
rsvp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rsvp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:83
* @route '/asistencia'
*/
rsvp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rsvp.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:83
* @route '/asistencia'
*/
const rsvpForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:83
* @route '/asistencia'
*/
rsvpForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: rsvp.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::rsvp
* @see app/Http/Controllers/InvitationController.php:83
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
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:130
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
* @see app/Http/Controllers/InvitationController.php:130
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
* @see app/Http/Controllers/InvitationController.php:130
* @route '/asistencia/{invitation}/og.jpg'
*/
ogImage.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ogImage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:130
* @route '/asistencia/{invitation}/og.jpg'
*/
ogImage.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ogImage.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:130
* @route '/asistencia/{invitation}/og.jpg'
*/
const ogImageForm = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ogImage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:130
* @route '/asistencia/{invitation}/og.jpg'
*/
ogImageForm.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: ogImage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::ogImage
* @see app/Http/Controllers/InvitationController.php:130
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

const invitation = {
    story: Object.assign(story, story),
    rsvp: Object.assign(rsvp, rsvpDa4a24),
    ogImage: Object.assign(ogImage, ogImage),
    details: Object.assign(details, details),
}

export default invitation