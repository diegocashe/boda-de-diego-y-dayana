import WeddingSettingController from './WeddingSettingController'
import TimelineItemController from './TimelineItemController'
import InvitationController from './InvitationController'

const Dashboard = {
    WeddingSettingController: Object.assign(WeddingSettingController, WeddingSettingController),
    TimelineItemController: Object.assign(TimelineItemController, TimelineItemController),
    InvitationController: Object.assign(InvitationController, InvitationController),
}

export default Dashboard