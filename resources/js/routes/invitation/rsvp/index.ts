import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\InvitationController::show
* @see app/Http/Controllers/InvitationController.php:81
* @route '/asistencia/{invitation}'
*/
export const show = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/asistencia/{invitation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InvitationController::show
* @see app/Http/Controllers/InvitationController.php:81
* @route '/asistencia/{invitation}'
*/
show.url = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::show
* @see app/Http/Controllers/InvitationController.php:81
* @route '/asistencia/{invitation}'
*/
show.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::show
* @see app/Http/Controllers/InvitationController.php:81
* @route '/asistencia/{invitation}'
*/
show.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\InvitationController::show
* @see app/Http/Controllers/InvitationController.php:81
* @route '/asistencia/{invitation}'
*/
const showForm = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::show
* @see app/Http/Controllers/InvitationController.php:81
* @route '/asistencia/{invitation}'
*/
showForm.get = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\InvitationController::show
* @see app/Http/Controllers/InvitationController.php:81
* @route '/asistencia/{invitation}'
*/
showForm.head = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\InvitationController::store
* @see app/Http/Controllers/InvitationController.php:127
* @route '/asistencia/{invitation}'
*/
export const store = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/asistencia/{invitation}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InvitationController::store
* @see app/Http/Controllers/InvitationController.php:127
* @route '/asistencia/{invitation}'
*/
store.url = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InvitationController::store
* @see app/Http/Controllers/InvitationController.php:127
* @route '/asistencia/{invitation}'
*/
store.post = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvitationController::store
* @see app/Http/Controllers/InvitationController.php:127
* @route '/asistencia/{invitation}'
*/
const storeForm = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\InvitationController::store
* @see app/Http/Controllers/InvitationController.php:127
* @route '/asistencia/{invitation}'
*/
storeForm.post = (args: { invitation: string | { code: string } } | [invitation: string | { code: string } ] | string | { code: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const rsvp = {
    show: Object.assign(show, show),
    store: Object.assign(store, store),
}

export default rsvp