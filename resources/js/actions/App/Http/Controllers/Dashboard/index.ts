import DashboardController from './DashboardController'
import WeddingSettingController from './WeddingSettingController'
import HomeContentController from './HomeContentController'
import TimelineItemController from './TimelineItemController'
import InvitationController from './InvitationController'
import GuestUploadController from './GuestUploadController'
import WishlistItemController from './WishlistItemController'
import VenueController from './VenueController'
import ImageOptimizationController from './ImageOptimizationController'
import GiftRegistryEntryController from './GiftRegistryEntryController'

const Dashboard = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    WeddingSettingController: Object.assign(WeddingSettingController, WeddingSettingController),
    HomeContentController: Object.assign(HomeContentController, HomeContentController),
    TimelineItemController: Object.assign(TimelineItemController, TimelineItemController),
    InvitationController: Object.assign(InvitationController, InvitationController),
    GuestUploadController: Object.assign(GuestUploadController, GuestUploadController),
    WishlistItemController: Object.assign(WishlistItemController, WishlistItemController),
    VenueController: Object.assign(VenueController, VenueController),
    ImageOptimizationController: Object.assign(ImageOptimizationController, ImageOptimizationController),
    GiftRegistryEntryController: Object.assign(GiftRegistryEntryController, GiftRegistryEntryController),
}

export default Dashboard