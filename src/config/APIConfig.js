// Environment-specific backend URLs
const getBackendUrl = () => {
  const hostname = window.location.hostname;

  if (hostname.includes("staging")) {
    return "https://backend-283763506150.us-central1.run.app"; // Replace with your staging backend URL
  } else if (hostname.includes("localhost")) {
    return "http://localhost:8000";
  } else {
    // Production/Live environment
    return "https://live-backend-283763506150.us-central1.run.app";
  }
};
export const url = "https://backend-283763506150.us-central1.run.app";
// export const url = getBackendUrl();

export const auth = `${url}/auth`;
export const users = `${url}/users`;
const urls = `${url}/url`;
export const tenant = `${url}/tenant`;
export const admin = `${url}/admin`;
const subadmin = `${url}/subadmin`;
const categories = `${url}/categories`;
export const templates = `${url}/templates`;
export const hvoelement = `${url}/hvoelement`;
export const videoelement = `${url}/videoelement`;
const googlesheets = `${url}/googlesheets`;
const upload = `${url}/upload`;
const prospects = `${url}/prospect`;
const hvo = `${url}/hvo`;
export const video = `${url}/video`;
const footer = `${url}/footer-link`;
export const leads = `${url}/leads/dashboard`;
export const alerts = `${url}/user-alerts`;
export const tenantEmail = `${url}/tenant-email/`;
export const emailTemplate = `${url}/email-template`;
export const tenantEmailTemplate = `${url}/tenant-email-template/tenant-email-template`;
export const videoTracking = `${url}/video-tracking/`;
export const hvoTracking = `${url}/hvo-tracking`;
export const tenantMeeting = `${url}/tenant-meeting`;

//======================================Campaign Builder
export const campaignEmail = `${url}/campaign/campaign-email`;
export const updateCampaignEmail = (templateId) =>
  `${url}/campaign/campaign-email/${templateId}`;
export const deleteCampaignEmail = (templateId) =>
  `${url}/campaign/campaign-email/${templateId}`;
export const followupEmail = `${url}/campaign/followup-email`;
export const updateFollowupEmail = (templateId) =>
  `${url}/campaign/followup-email/${templateId}`;
export const deleteFollowupEmail = (templateId) =>
  `${url}/campaign/followup-email/${templateId}`;
export const getEmailTemplates = (templateId) =>
  `${url}/campaign/emails/${templateId}`;
export const campaignSettings = `${url}/campaign/settings`;
export const campaign = `${url}/campaign`;

export const reminderEmail = `${url}/campaign/reminder-email`;
export const updateReminderEmail = (templateId) =>
  `${url}/campaign/reminder-email/${templateId}`;
export const deleteReminderEmail = (templateId) =>
  `${url}/campaign/reminder-email/${templateId}`;

//================Domain Authentication======================
export const domain = `${url}/domain`;
//================
const ApiConfig = {
  getUrls: `${url}/url`,
  addUrl: `${url}/url`,
  mainDashboard: `${url}/dashboard`,
  login: `${auth}/signin`,
  viewAsUser: `${auth}/view-as`,
  changePassword: `${auth}/change-password`,
  createNewAccount: `${admin}/subadmin`,
  getAllCategories: `${categories}/`,
  ppadminUserListNew: `${admin}/`,
  addUser: `${subadmin}/user`,
  getAllUserByAccountId: `${subadmin}/users`,
  CreateUser: `${subadmin}/user`,
  fetchSheet: `${googlesheets}`,
  createVdoTemplate: `${templates}/`,
  connectedSheetVideo: `${googlesheets}/all-connected-sheets`,
  connectSheetTOTemplateVideo: `${templates}/connect-sheet-with-template`,
  createVideoTemplateReferral: `${videoelement}/video-section`,

  getTemplatebyID: `${video}/template`,
  previewVideo: `${video}/preview-video-with-sheet-data`,
  getFirstRowData: `${googlesheets}/first-row-data`,
  getFirstRowbyTemplateId: `${googlesheets}/first-row`,

  UploadFile: `${upload}/upload-file`,
  headers: `${googlesheets}/sheet-data-types`,
  createVideo: `${video}/create-video`,
  getAllTenants: `${admin}/subadmin`,
  googleSheet: `${googlesheets}`,
  googleSheetDataTypes: `${googlesheets}/get-headers`,
  googlesheetnames: `${googlesheets}/tabs`,
  getTemplateList: `${templates}`,
  deleteTemplate: `${templates}`,
  deleteElement: `${videoelement}`,
  profile: `${users}/profile`,
  getAllUsers: `${subadmin}/users`,
  category: `${categories}/`,
  prospects: `${prospects}`,
  headerSection: `${hvoelement}/header-section`,
  heroSection: `${hvoelement}/hero-section`,
  rightTextLeftImageSection: `${hvoelement}/right-text-left-image-section`,
  hvoVideoSection: `${hvoelement}/video-section`,
  higlightBannerSection: `${hvoelement}/highlight-banner-section`,
  highlightBanner2Section: `${hvoelement}/highlight-banner2-section`,
  footerSection: `${hvoelement}/footer-section`,
  leftTextRightImageSection: `${hvoelement}/left-text-right-image-section`,
  getHVOTemplateById: `${hvo}/template`,
  previewHVOwithsheetdata: `${hvo}/preview-hvo-with-sheet-data`,
  createHVO: `${hvo}/generate-hvo-from-sheet`,
  getHVO: `${hvo}`,
  setHeadersDataType: `${googlesheets}/sheet-data-types`,
  hvoStatus: `${hvo}/hvo-status`,
  video: `${video}`,
  footerLink: `${footer}`,

  privacyPolicy: `${tenant}/privacy-policy`,
};

export default ApiConfig;
