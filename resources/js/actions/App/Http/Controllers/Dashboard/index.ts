import DashboardController from './DashboardController'
import WeddingSettingController from './WeddingSettingController'
import HomeContentController from './HomeContentController'
import TimelineItemController from './TimelineItemController'
import InvitationController from './InvitationController'
import VenueController from './VenueController'
import GiftRegistryEntryController from './GiftRegistryEntryController'

const Dashboard = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    WeddingSettingController: Object.assign(WeddingSettingController, WeddingSettingController),
    HomeContentController: Object.assign(HomeContentController, HomeContentController),
    TimelineItemController: Object.assign(TimelineItemController, TimelineItemController),
    InvitationController: Object.assign(InvitationController, InvitationController),
    VenueController: Object.assign(VenueController, VenueController),
    GiftRegistryEntryController: Object.assign(GiftRegistryEntryController, GiftRegistryEntryController),
}

export default Dashboard