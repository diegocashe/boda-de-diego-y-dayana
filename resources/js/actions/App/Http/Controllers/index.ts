import InvitationController from './InvitationController'
import Dashboard from './Dashboard'
import Settings from './Settings'

const Controllers = {
    InvitationController: Object.assign(InvitationController, InvitationController),
    Dashboard: Object.assign(Dashboard, Dashboard),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers