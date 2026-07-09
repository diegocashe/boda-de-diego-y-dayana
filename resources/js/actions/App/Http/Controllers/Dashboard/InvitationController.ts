import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Dashboard\InvitationController::index
* @see app/Http/Controllers/Dashboard/InvitationController.php:23
* @route '/dashboard/invitations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/invitations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::index
* @see app/Http/Controllers/Dashboard/InvitationController.php:23
* @route '/dashboard/invitations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::index
* @see app/Http/Controllers/Dashboard/InvitationController.php:23
* @route '/dashboard/invitations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::index
* @see app/Http/Controllers/Dashboard/InvitationController.php:23
* @route '/dashboard/invitations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::index
* @see app/Http/Controllers/Dashboard/InvitationController.php:23
* @route '/dashboard/invitations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::index
* @see app/Http/Controllers/Dashboard/InvitationController.php:23
* @route '/dashboard/invitations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::index
* @see app/Http/Controllers/Dashboard/InvitationController.php:23
* @route '/dashboard/invitations'
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
* @see \App\Http\Controllers\Dashboard\InvitationController::exportMethod
* @see app/Http/Controllers/Dashboard/InvitationController.php:48
* @route '/dashboard/invitations/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/dashboard/invitations/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::exportMethod
* @see app/Http/Controllers/Dashboard/InvitationController.php:48
* @route '/dashboard/invitations/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::exportMethod
* @see app/Http/Controllers/Dashboard/InvitationController.php:48
* @route '/dashboard/invitations/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::exportMethod
* @see app/Http/Controllers/Dashboard/InvitationController.php:48
* @route '/dashboard/invitations/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::exportMethod
* @see app/Http/Controllers/Dashboard/InvitationController.php:48
* @route '/dashboard/invitations/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::exportMethod
* @see app/Http/Controllers/Dashboard/InvitationController.php:48
* @route '/dashboard/invitations/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::exportMethod
* @see app/Http/Controllers/Dashboard/InvitationController.php:48
* @route '/dashboard/invitations/export'
*/
exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::store
* @see app/Http/Controllers/Dashboard/InvitationController.php:98
* @route '/dashboard/invitations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/invitations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::store
* @see app/Http/Controllers/Dashboard/InvitationController.php:98
* @route '/dashboard/invitations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::store
* @see app/Http/Controllers/Dashboard/InvitationController.php:98
* @route '/dashboard/invitations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::store
* @see app/Http/Controllers/Dashboard/InvitationController.php:98
* @route '/dashboard/invitations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::store
* @see app/Http/Controllers/Dashboard/InvitationController.php:98
* @route '/dashboard/invitations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::update
* @see app/Http/Controllers/Dashboard/InvitationController.php:110
* @route '/dashboard/invitations/{invitation}'
*/
export const update = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/invitations/{invitation}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::update
* @see app/Http/Controllers/Dashboard/InvitationController.php:110
* @route '/dashboard/invitations/{invitation}'
*/
update.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { invitation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            invitation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invitation: typeof args.invitation === 'object'
        ? args.invitation.id
        : args.invitation,
    }

    return update.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::update
* @see app/Http/Controllers/Dashboard/InvitationController.php:110
* @route '/dashboard/invitations/{invitation}'
*/
update.put = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::update
* @see app/Http/Controllers/Dashboard/InvitationController.php:110
* @route '/dashboard/invitations/{invitation}'
*/
const updateForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::update
* @see app/Http/Controllers/Dashboard/InvitationController.php:110
* @route '/dashboard/invitations/{invitation}'
*/
updateForm.put = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Dashboard\InvitationController::destroy
* @see app/Http/Controllers/Dashboard/InvitationController.php:125
* @route '/dashboard/invitations/{invitation}'
*/
export const destroy = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/invitations/{invitation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::destroy
* @see app/Http/Controllers/Dashboard/InvitationController.php:125
* @route '/dashboard/invitations/{invitation}'
*/
destroy.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { invitation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            invitation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invitation: typeof args.invitation === 'object'
        ? args.invitation.id
        : args.invitation,
    }

    return destroy.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::destroy
* @see app/Http/Controllers/Dashboard/InvitationController.php:125
* @route '/dashboard/invitations/{invitation}'
*/
destroy.delete = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::destroy
* @see app/Http/Controllers/Dashboard/InvitationController.php:125
* @route '/dashboard/invitations/{invitation}'
*/
const destroyForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::destroy
* @see app/Http/Controllers/Dashboard/InvitationController.php:125
* @route '/dashboard/invitations/{invitation}'
*/
destroyForm.delete = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::send
* @see app/Http/Controllers/Dashboard/InvitationController.php:139
* @route '/dashboard/invitations/{invitation}/send'
*/
export const send = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/dashboard/invitations/{invitation}/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::send
* @see app/Http/Controllers/Dashboard/InvitationController.php:139
* @route '/dashboard/invitations/{invitation}/send'
*/
send.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { invitation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            invitation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invitation: typeof args.invitation === 'object'
        ? args.invitation.id
        : args.invitation,
    }

    return send.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::send
* @see app/Http/Controllers/Dashboard/InvitationController.php:139
* @route '/dashboard/invitations/{invitation}/send'
*/
send.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::send
* @see app/Http/Controllers/Dashboard/InvitationController.php:139
* @route '/dashboard/invitations/{invitation}/send'
*/
const sendForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::send
* @see app/Http/Controllers/Dashboard/InvitationController.php:139
* @route '/dashboard/invitations/{invitation}/send'
*/
sendForm.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: send.url(args, options),
    method: 'post',
})

send.form = sendForm

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::toggleLock
* @see app/Http/Controllers/Dashboard/InvitationController.php:159
* @route '/dashboard/invitations/{invitation}/lock'
*/
export const toggleLock = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleLock.url(args, options),
    method: 'put',
})

toggleLock.definition = {
    methods: ["put"],
    url: '/dashboard/invitations/{invitation}/lock',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::toggleLock
* @see app/Http/Controllers/Dashboard/InvitationController.php:159
* @route '/dashboard/invitations/{invitation}/lock'
*/
toggleLock.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { invitation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            invitation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invitation: typeof args.invitation === 'object'
        ? args.invitation.id
        : args.invitation,
    }

    return toggleLock.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::toggleLock
* @see app/Http/Controllers/Dashboard/InvitationController.php:159
* @route '/dashboard/invitations/{invitation}/lock'
*/
toggleLock.put = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleLock.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::toggleLock
* @see app/Http/Controllers/Dashboard/InvitationController.php:159
* @route '/dashboard/invitations/{invitation}/lock'
*/
const toggleLockForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleLock.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::toggleLock
* @see app/Http/Controllers/Dashboard/InvitationController.php:159
* @route '/dashboard/invitations/{invitation}/lock'
*/
toggleLockForm.put = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleLock.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

toggleLock.form = toggleLockForm

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::regenerateOgImage
* @see app/Http/Controllers/Dashboard/InvitationController.php:174
* @route '/dashboard/invitations/{invitation}/og-regenerate'
*/
export const regenerateOgImage = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerateOgImage.url(args, options),
    method: 'post',
})

regenerateOgImage.definition = {
    methods: ["post"],
    url: '/dashboard/invitations/{invitation}/og-regenerate',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::regenerateOgImage
* @see app/Http/Controllers/Dashboard/InvitationController.php:174
* @route '/dashboard/invitations/{invitation}/og-regenerate'
*/
regenerateOgImage.url = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { invitation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { invitation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            invitation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        invitation: typeof args.invitation === 'object'
        ? args.invitation.id
        : args.invitation,
    }

    return regenerateOgImage.definition.url
            .replace('{invitation}', parsedArgs.invitation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::regenerateOgImage
* @see app/Http/Controllers/Dashboard/InvitationController.php:174
* @route '/dashboard/invitations/{invitation}/og-regenerate'
*/
regenerateOgImage.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: regenerateOgImage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::regenerateOgImage
* @see app/Http/Controllers/Dashboard/InvitationController.php:174
* @route '/dashboard/invitations/{invitation}/og-regenerate'
*/
const regenerateOgImageForm = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: regenerateOgImage.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Dashboard\InvitationController::regenerateOgImage
* @see app/Http/Controllers/Dashboard/InvitationController.php:174
* @route '/dashboard/invitations/{invitation}/og-regenerate'
*/
regenerateOgImageForm.post = (args: { invitation: number | { id: number } } | [invitation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: regenerateOgImage.url(args, options),
    method: 'post',
})

regenerateOgImage.form = regenerateOgImageForm

const InvitationController = { index, exportMethod, store, update, destroy, send, toggleLock, regenerateOgImage, export: exportMethod }

export default InvitationController