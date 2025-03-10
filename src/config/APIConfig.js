// const url = "https://backend-283763506150.us-central1.run.app";
const url = "http://localhost:8000";
// const url = "http://192.168.18.91:8000";

const auth = `${url}/auth`;
export const users = `${url}/users`;
const urls = `${url}/url`;
export const tenant = `${url}/tenant`;
const admin = `${url}/admin`;
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
  getAllPPUsers: `${admin}/subadmin`,
  googleSheet: `${googlesheets}`,
  googleSheetDataTypes: `${googlesheets}/get-headers`,
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
  // userSignup: `${user}/userSignUp`,
  // // verifyEmail: `${user}/verifyEmail`,
  // goggleLogin: `${user}/googleLogin`,
  // getProfile: `${user}user/getProfile`,
  // editUserProfile: `${user}/editUserProfile`,
  // logout: `${user}/logout`,
  // editUserProfile: `${user}/editUserProfile`,
  // globalSearch: `${user}/globalSearch`,
  // addLogoOrCover: `${url}/api/v1/uiSetting/addLogoOrCover`,
  // getLogoOrCover: `${url}account/api/v1/uiSetting/getLogoOrCover`,
  // addOrganisation: `${url}/api/v1/organization/addOrganization`,
  // uploadCsv: `${url}/api/v1/organization/uploadCsv`,
  // getAllProject: `${url}/api/v1/organization/getProjectList`,
  // getAllProjectById: `${url}/api/v1/organization/getSingleProject`,
  // editOrganisation: `${url}/api/v1/organization/editOrganization`,
  // getOrganisationLogo: `${url}/api/v1/organization/getlogo`,
  // userMangement: `${admin}/viewUserList`,
  // addTemplate: `${url}api/v1/template/addTemplate`,
  // // getTemplateList: `${url}api/v1/template/getTemplateList`,
  // getSingleTemplate: `${url}api/v1/template/getSingleTemplate`,
  // updateAndRemoveDataApi: `${url}api/v1/template/updateAndRemoveDataApi`,
  // getSubAdminList: `${admin}/getListSubAdmin`,
  // googleAuth: `${url}api/v1/auth/google`,
  // deleteSubAdmin: `${admin}/deleteSubAdmin`,
  // adminCreateUser: `${admin}/adminCreateUser`,
  // adminCreateSubAdmin: `${admin}/adminCreateSubAdmin`,
  // addMultipleUser: `${admin}/uploadCSVFile`,
  // addMultipleSubAdmin: `${admin}/addMultipleSubAdmin`,
  // deleteSubAdmin: `${admin}/deleteSubAdmin`,
  // myProjects: `${url}/api/v1/organization/getMyProjectList`,

  // // Java API

  // // AUTH FLOW

  // forgotPassword: `${javaurl}user/forget-password-new`,
  // verifyEmail: `${javaurl}user/validate-token`,
  // resendOtp: `${javaurl}user/resend-otp`,
  // resetPassword: `${javaurl}user/reset-password-new`,
  // changePassword: `${javaurl}user/change-password`,

  // // Login
  // profile: `${javaurl}user/getProfile`,
  // updateProfile: `${javaurl}user/user-management/edit-my-profile`,

  // // Create User
  // getAllUsers: `${javaurl}user/admin/user-management/search-and-filter-user-list`,
  // getUserById: `${javaurl}/userManagement/getUserById`,
  // updateUser: `${javaurl}/userManagement/updateUser`,
  //
  // deleteUser: `${javaurl}user/sub-admin/delete-user`,
  // projectListing: `${javaurl}sheet/user-projects/project-listing`,
  // addProjectManually: `${javaurl}sheet/add-project-manually`,
  // userAddProjectManually: `${javaurl}user-projects/add-project-manually`,
  // viewUser: `${javaurl}user/admin/user-management/get-role-user-deatils`,

  // // Template List
  // getTemplateList: `${javaurl}video/video-templates/getAllTemplateData`,

  // // Create Video

  // createVideoTemplateReferral: `${javaurl}video/video-templates/createVideoTemplateReferral`,
  // updateTemplateVideo: `${javaurl}video/video-templates/updateTemplate`,
  // duplicateTemplateVideo: `${javaurl}video/video-templates/duplicate-template-data`,
  //
  // getAllTags: `${javaurl}account/api/elements/getAllTags`,
  // deleteElement: `${javaurl}video/video-templates/delete-video-referral`,

  //
  // getRowData: `${javaurl}sheet/row-data`,

  // // getTemplatebyID: `${url}account/videotemplatess/getTemplateById`,
  // getTemplatebyID: `${javaurl}video/video-templates/getVideoTemplateById`,
  // deletedVideoTemplateById: `${javaurl}video/video-templates/deletedTemplateById`,
  // createVideo: `${javaurl}account/video-templates/create-video`,
  // previewVideoByTemplateId: `${javaurl}account/video-templates/get-preview-by-template-iD`,
  // updateTemplatePreview: `${javaurl}account/video-templates/updateTemplatePreview`,
  // createVideoWithSheet: `${javaurl}video/video-templates/create-video-with-sheet-data`,
  // connectSheetTOTemplate: `${javaurl}hvo/hvoTemplate/connect-sheet-with-template`,
  // topPerformingTempate: `${javaurl}hvo/Top-Performing-Template`,
  // getpreviewdata: `${javaurl}video/video-templates/get-preview-data`,
  // reprocess: `${javaurl}account/video-templates/re-process`,
  // reprocessVideo: `${javaurl}video/video-templates/re-process`,
  // previewVideo: `${javaurl}video/video-templates/preview-video-with-sheet-data`,
  // createdVideo: `${javaurl}video/video-templates/video-link`,
  // customVdoTemplate: `${javaurl}video/video-templates/create-custom-template`,
  // //google Sheet
  // connectedSheet: `${javaurl}hvo/hvoTemplate/connected-all-google-sheets`,
  //
  // updateFetchDays: `${javaurl}sheet/update-fetch-days`,

  // getSheetById: `${javaurl}account/google/api/get-google-sheet-connection-by-id`,
  // getAllSheet: `${javaurl}sheet/get-all-sheet-fields`,
  // setHeadersDataType: `${javaurl}sheet/setHeadersDataType`,
  // setHeadersDataTypeVideo: `${javaurl}sheet/setHeadersDataTypeforVideo`,
  // sheetcount: `${javaurl}sheet/used-sheet`,
  // bestMonth: `${javaurl}hvo/bestMonth`,
  // //
  // disconnectSheet: `${javaurl}account/google/api/disconnect-sheet`,
  // deleteSheet: `${javaurl}sheet/delete-sheet`,

  // //dashboard
  // totalUserCount: `${javaurl}user/get-total-users`,
  // getAllAdminSeat: `${javaurl}account/api/dashboard/get-package-media-activeMedia-seats-info`,
  // lastFourMonthData: `${javaurl}hvo/last-four-month-view`,

  // // Projects
  // getAllCustomers: `${javaurl}/customerManagement/getAllCustomers`,
  // getAllVideoRefTypes: `${javaurl}video/video-templates/allElements`,

  // // Settings
  // googleSheet: `${javaurl}sheet/filter-google-connection-list`,
  // viewgooglesheet: `${javaurl}sheet/get-google-sheet-connection-by-id`,

  // //Create HVO Template
  // createHVOTemplate: `${javaurl}hvo/hvoTemplate/create-HVO-template`,
  // updateHVOTemplate: `${javaurl}hvo/hvoTemplate/update-HVO-template`,
  // sectionType: `${javaurl}hvo/hvoTemplate/all-section-type`,
  // getHVO: `${javaurl}hvo/hvoTemplate/get-HVO-template-by-id`,
  // addElement: `${javaurl}hvo/hvoTemplate/create-hvo-elements`,
  // hvoList: `${javaurl}hvo/hvoTemplate/get-hvo-list`,
  // deleteHVO: `${javaurl}hvo/hvoTemplate/delete-HVO-template`,
  // duplicateTemplateHVO: `${javaurl}hvo/hvoTemplate/duplicate-hvo-tempalte`,
  // getsheettype: `${javaurl}hvo/hvoTemplate/get-sheet-type`,
  // previewHVOwithsheetdata: `${javaurl}hvo/hvoTemplate/preview-HVO-with-sheet-data`,

  // getSectionbyId: `${javaurl}account/hvoTemplate/get-section-by-id`,
  // EditSectionbyId: `${javaurl}hvo/hvoTemplate/update-section-by-id`,
  // deleteSectionById: `${javaurl}hvo/hvoTemplate/delete-section-by-id`,
  // companySheetData: `${javaurl}account/hvoTemplate/get-all-sheet-data-hvo`,
  // createHVOsheetData: `${javaurl}hvo/hvoTemplate/create-HVO-with-sheet-data`,
  // reprocessHVO: `${javaurl}hvo/hvoTemplate/re-process`,
  // // getHvoAndCustomerData: `${javaurl}/account/hvoTemplate/get-hvo-and-customer-data`,
  // getHvoAndCustomerData: `${javaurl}hvo/hvoTemplate/get-HVO-and-customer-data`,
  // addCategory: `${javaurl}company/add-Category`,

  // //upload file
  // uploadFile: `${javaurl}user/uploadFile`,
  // // PP admin

  // // Account

  //
  // viewAccount: `${javaurl}user/get-account-details-by-id`,
  // blockUnblockAccount: `${javaurl}user/admin/user-management/change-account-status`,
  //
  // assignUnassign: `${javaurl}user/assign-or-unassign-sheet-to-user`,
  // companyDetails: `${javaurl}user/sub-admin/get-account-company-details`,
  // EditcompanyDetails: `${javaurl}user/sub-admin/edit-company-information`,
  // ChangeAccountLogo: `${javaurl}user/sub-admin/change-account-logo`,
  // // EditcompanyDetails: `${javaurl}account/sub-admin/edit-company-information`,
  // useraccount: `${javaurl}user/user-management/my-account`,
  // edituseraccount: `${javaurl}user/user-management/update-profile-data`,
  // getppadmindetails: `${javaurl}user/get-account-details-by-id`,
  // updateProfilePic: `${javaurl}user/updateProfilePic`,
  // //IntentTraking
  // FooterLink: `${javaurl}hvo/hvoTemplate/save-footer-links`,
  // saveFooterContact: `${javaurl}hvo/hvoTemplate/save-footer-contact`,
  // updateFooterContact: `${javaurl}hvo/hvoTemplate/update-footer-contact`,
  // getAllFooterLink: `${javaurl}hvo/hvoTemplate/get-footer-links`,
  // updateFooterLink: `${javaurl}hvo/hvoTemplate/update-footer-links`,
  // IntentTracking: `${javaurl}account/intent-tracking/save`,
  // GetFooterLink: `${javaurl}account/intent-tracking/get-footer-links`,
  // GetIntentTracking: `${javaurl}account/intent-tracking/get-all-intent-tracking`,
  // UpdateIntentTracking: `${javaurl}account/intent-tracking/update`,

  // // User
  // ppadminUserList: `${javaurl}user/admin/user-management/pp-admin-list`,
  //
  // createPPAdmin: `${javaurl}user/admin/user-management/add-new-ppadmin`,
  // deletePPAdmin: `${javaurl}user/admin/user-management/suspend-pp-admin`,
  // getAccountCompanyDetails: `${javaurl}account/admin/user-management/get-account-company-details`,
  // EditCompanyInformation: `${javaurl}account/admin/user-management/edit-company-information`,
  // // userProjectListing api is commented all places due to APi not available in node
  // userProjectListing: `${javaurl}sheet/user-projects/project-listing-of-user`,
  // subAdminList: `${javaurl}account/sub-admin/view-project-details-by-sheet-id`,
  // PostProjectDetails: `${javaurl}account/user-projects/add-missing-data-in-create-video-in-sheet`,
  //
  // AddProjectManually: `${javaurl}account/user-projects/add-project-manually`,
  // ErrorDataListing: `${javaurl}sheet/user-projects/project-listing-of-user`,
  // UserProjectList: `${javaurl}sheet/My-Project-list`,
  // getHeadersDataType: `${javaurl}sheet/getHeadersDataType`,
  // setSheetDataType: `${javaurl}sheet/change-sheet-type`,

  // // Comapny
  // editImages: `${javaurl}company/user-management/edit-my-profile`,
  // editAccount: `${javaurl}user/admin/user-management/edit-account`,
  // getcompanydetails: `${javaurl}company/user-management/get-company`,
  // getuserlogo: `${javaurl}company/get-config`,
  // deleteCategory: `${javaurl}company/delete-category`,
  // addMissingData: `${javaurl}account/admin/user-management/add-missing-data-in-create-video-in-sheet`,
};

export default ApiConfig;
