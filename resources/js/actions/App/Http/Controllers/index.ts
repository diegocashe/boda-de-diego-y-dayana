import InvitationController from './InvitationController'
import GuestUploadController from './GuestUploadController'
import Dashboard from './Dashboard'
import Settings from './Settings'

const Controllers = {
    InvitationController: Object.assign(InvitationController, InvitationController),
    GuestUploadController: Object.assign(GuestUploadController, GuestUploadController),
    Dashboard: Object.assign(Dashboard, Dashboard),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers