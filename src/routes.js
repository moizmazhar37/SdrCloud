import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import LoginLayout from "./layouts/LoginLayout";
import AuthLayout from "./layouts/AuthLayout";
import withRoleGuard from "./withRoleGuard";

const SubAdminDashboard = lazy(() =>
  import("src/views/pages/DashboardAdmin/AdminDashboard/AdminDashboard")
);

const SdrcDashboardWrapper = lazy(() =>
  import("src/views/pages/SdrcAdmin/SdrcDashboardWrapper")
);

//=========================================Admin=======================================
const AdminAccount = lazy(() =>
  import("src/views/pages/PPAdmin/Accounts/Accounts")
);

const AdminCreateAccount = lazy(() =>
  import("src/views/pages/PPAdmin/Accounts/CreateAccount/CreateAccount")
);

const AdminUserManagement = lazy(() =>
  import("src/views/pages/PPAdmin/UserManagement/index")
);

  //=========================================SDRC ADMIN=======================================
  const Settings = lazy(() =>
    import("src/views/pages/settings/Settings")
  );

  const SDRCAdmin = lazy(() =>
    import("src/views/pages/SdrcAdmin/LandingPage/LandingPage")
  );



  //========================================SUB ADMIN=========================================
  const CompanyInformation = lazy(() =>
    import("src/views/pages/settings/Company/Company")
  );

  const Intent = lazy(() => 
    import("src/views/pages/settings/IntentTracking/IntentTracking")
  );

  const Alerts = lazy(() =>
    import("src/views/pages/settings/Alerts/Alerts")
  );

  const Integrations = lazy(() =>
    import("src/views/pages/settings/Integrations/Integration")
  );

  const GoogleSheet = lazy(() =>
    import("src/views/pages/settings/GoogleSheets/Googlesheets")
  );

  const EmailTemplates = lazy(() =>
    import("src/views/pages/settings/EmailTemplates/EmailTemplates")
  );
  
  const BookedMeetings = lazy(() =>
    import("src/views/pages/settings/BookedMeetings/BookedMeetings")
  );

  const EmailScheduling = lazy(() =>
    import("src/views/pages/settings/EmailScheduling/ScheduledEmails/ScheduledEmails")
  );

  const ViewGoogleSheet = lazy(() =>
    import( "src/views/pages/settings/Integrations/GoogleSheets/ViewGoogleSheet/ViewGoogleSheet")
  );

  const EditGoogleSheet = lazy(() =>
    import(
        "src/views/pages/settings/Integrations/GoogleSheets/EditGoogleSheet/EditGoogleSheet"
      )
  );

  const CalendarLink = lazy(() =>
    import("src/views/pages/settings/Integrations/CalendarLink/OAuth")
  );

  const Prospect = lazy(() =>
    import("src/views/pages/MyProjects/Prospects/Prospects")
  );

  const CompanyUsers = lazy(() =>
    import("src/views/pages/CompanyUsers/Users/Users"),
  );

  const SendGrid = lazy(() =>
    import("src/views/pages/settings/Integrations/SendGrid/SendGrid")
  );

  const Calandarlink = lazy(() =>
    import("src/views/pages/settings/Integrations/CalenderLink/CalenderLink")
  );
  
  
export const routes = [
  {
    exact: true,
    path: "/",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/LogIn")),
  },
  {
    exact: true,
    path: "/otp-verify",
    layout: LoginLayout,
    component: lazy(() =>
      import("src/views/auth/forget-password-link/OtpVerify")
    ),
  },
  {
    exact: true,
    path: "/otpverify",
    layout: AuthLayout,
    component: lazy(() =>
      import("src/views/auth/forget-password/otpverify-Forget")
    ),
  },
  {
    exact: true,
    path: "/forget-password",
    layout: AuthLayout,
    component: lazy(() => import("src/views/auth/forget-password/index")),
  },
  {
    exact: true,
    path: "/veify-email",
    layout: AuthLayout,
    component: lazy(() => import("src/views/auth/verify-email/index")),
  },
  {
    exact: true,
    path: "/signup",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/Signup")),
  },
  {
    exact: true,
    path: "/create-password",
    layout: AuthLayout,
    component: lazy(() => import("src/views/pages/ResetPassword/Index")),
  },

  {
    exact: true,
    path: "/leads",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/layouts/DashboardLayout/NavBar/Installation/Installation")
    ),
  },
  {
    exact: true,
    path: "/leads-dashboard",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/layouts/DashboardLayout/NavBar/LeadsDashboard/LeadsDashboard")
    ),
  },
  //necessary duplicate route
  {
    exact: true,
    path: "/visitor-dashboard",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/layouts/DashboardLayout/NavBar/LeadsDashboard/LeadsDashboard")
    ),
  },
  {
    exact: true,
    path: "/leads-search",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/layouts/DashboardLayout/NavBar/SearchLeads/SearchLeads.jsx")
    ),
  },
  {
    exact: true,
    path: "/edit-myproject",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/DashboardUser/MyProject/EditProjects")
    ),
  },
  {
    exact: true,
    path: "/CreateTemplates",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CreateVideo/index")),
  },

  // Dummy Route for create
  {
    exact: true,
    path: "/CreateTemplate",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Create/Create")),
  },

  {
    exact: true,
    path: "/preview-video",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CreateVideo/PreviewVideo")),
  },
  {
    exact: true,
    path: `/preview-video/:customerId`,
    // guard: true,
    // layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CreateVideo/CreatedVideo")),
  },

  {
    exact: true,
    path: "/createtemplate&Video",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Create/CreateVideo/CreateVideo")
    ),
  },

  // New URL for Routes

  {
    exact: true,
    path: "/companyUsers-List",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(CompanyUsers, ["SUBADMIN"])
  },
  {
    exact: true,
    path: "/prospects",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(Prospect, ["SUBADMIN", "MARKETING_USER"]),
  },
  {
    exact: true,
    path: "/prospectuser/:id",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/MyProjects/Prospects/ProspectUsers/ProspectUsers")
    ),
  },

  // {
  //   exact: true,
  //   path: "/Create-hvo-template",
  //   guard: true,
  //   layout: DashboardLayout,
  //   component: lazy(() =>
  //     import("src/views/pages/HVOTemplate/CreateHVOTemplate")
  //   ),
  // },

  //DummyRoute
  {
    exact: true,
    path: "/Create-hvo-template",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Create/CreateHVO/CreateHVO")),
  },

  {
    exact: true,
    path: "/footer",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/HVOTemplate/Footer")),
  },

  {
    exact: true,
    path: "/preview-hvo",
    guard: true,
    // layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/HVOTemplate/PreviewHVO")),
  },
  {
    exact: true,
    path: `/preview-url/:customerId`,
    // guard: true,
    // layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/HVOTemplate/PreviewHVO")),
  },

  {
    exact: true,
    path: `/new-hvo/:customerId`,
    component: lazy(() => import("src/views/pages/Previews/HVOPreview")),
  },

  {
    exact: true,
    path: "/play-video/:customerId",
    component: lazy(() =>
      import("src/views/pages/CreateVideo/VideoPlayer/VideoPlayer")
    ),
  },

  {
    exact: true,
    path: "/book-meeting/:tenant_id",
    component: lazy(() => import("src/views/pages/Meeting/BookMeeting")),
  },

  {
    exact: true,
    path: "/privacy-policy/:tenantId",
    component: lazy(() =>
      import("src/views/pages/PrivacyPolicy/PrivacyPolicyPage")
    ),
  },

  // Setting Pages

  {
    exact: true,
    path: "/alerts",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(Alerts, ["SUBADMIN"]),
  },

  {
    exact: true,
    path: "/company-information",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(CompanyInformation, ["SUBADMIN"]),
  },

  {
    exact: true,
    path: "/intent",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(Intent, ["SUBADMIN", "MARKETING_USER"]),
  },

  {
    exact: true,
    path: "/integrations",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(Integrations, ["SUBADMIN"]),
  },

  {
    exact: true,
    path: "/googlesheets",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(GoogleSheet, ["SUBADMIN"])
  },

  {
    exact: true,
    path: "/email-templates",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(EmailTemplates, ["SUBADMIN"]),
  },

  {
    exact: true,
    path: "/create-email-template",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/settings/EmailTemplates/NewEmailTemplate/NewEmailTemplate"
      )
    ),
  },

  {
    exact: true,
    path: "/sendgrid",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(SendGrid, ["SUBADMIN"]),
  },

  {
    exact: true,
    path: "/calenderlink",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(Calandarlink, ["SUBADMIN"]),
  },

  {
    exact: true,
    path: "/addsheet",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/Integrations/AddNewSheet/NewSheet")
    ),
  },

  // {
  //   exact: true,
  //   path: "/integrations/google-sheet",
  //   guard: true,
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/settings/GoogleSheet")),
  // },

  // Email Scheduling
  {
    exact: true,
    path: "/email-scheduling",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(EmailScheduling, ["SUBADMIN"]),
  },

  //Booked Meetings
  {
    exact: true,
    path: "/booked-meetings",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(BookedMeetings, ["SUBADMIN"]),
  },

  {
    exact: true,
    path: "/create-new-schedule",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/EmailScheduling/EmailScheduling")
    ),
  },
  {
    exact: true,
    path: "/myprofile",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/MyProfile/MyProfileContainer")
    ),
  },
  {
    exact: true,
    path: "/change-password",
    guard: true,
    layout: AuthLayout,
    component: lazy(() =>
      import("src/views/pages/settings/MyProfile/ChangePassword/changePassword")
    ),
  },
  

  // Google Sheet
  {
    exact: true,
    path: "/viewSheets",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(ViewGoogleSheet, ["SUBADMIN"]),
  },

  {
    exact: true,
    path: "/editSheets",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(EditGoogleSheet, ["SUBADMIN"]),
  },

  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },

  //for PP Admin
  {
    exact: true,
    path: "/PP-createaccount",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(AdminAccount, ["ADMIN"]),
  },
  {
    exact: true,
    path: "/PP-create",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(AdminCreateAccount, ["ADMIN"]),
  },
  // {
  //   exact: true,
  //   path: "/user-management",
  //   guard: true,
  //   layout: DashboardLayout,
  //   component: lazy(() =>
  //     import("src/views/pages/settings/MyProfile/ChangePassword/changePassword")
  //   ),
  // },

  //==========================================SDRC ADMIN=======================================
  {
    exact: true,
    path: "/SDRC-dashboard",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(SDRCAdmin, ["SDRC_ADMIN"]),
  },
  {
    exact: true,
    path: "/View-PP-createaccount",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/PPAdmin/Accounts/ViewAccount.js")
    ),
  },
  {
    exact: true,
    path: "/Edit-PP-createaccount",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/PPAdmin/Accounts/EditAccount.js")
    ),
  },
  {
    exact: true,
    path: "/PP-user-management",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(AdminUserManagement, ["ADMIN"]),
  },
  // {
  //   exact: true,
  //   path: "/edit-PPAdmin",
  //   // guard: true,
  //   layout: DashboardLayout,
  //   component: lazy(() =>
  //     import("src/views/pages/PPAdmin/UserManagement/View")
  //   ),
  // },
  // {
  //   exact: true,
  //   path: "/user-settings",
  //   // guard: true,
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/PPAdmin/UserSetting")),
  // },
  // {
  //   exact: true,
  //   path: "/edit-profile",
  //   // guard: true,
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/PPAdmin/EditProfile")),
  // },

  // {
  //   exact: true,
  //   path: "/change-your-password",
  //   // guard: true,
  //   layout: AuthLayout,
  //   component: lazy(() => import("src/views/pages/PPAdmin/ChangePassword")),
  // },

  {
    exact: true,
    path: "/dashboard",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(SubAdminDashboard, ["SUBADMIN",])
  },

  {
    exact: true,
    path: "/calendar-link",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(CalendarLink, ["SUBADMIN",])
  },
  {
    exact: true,
    path: "/book-meeting",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/ScheduleMeetings/ScheduleMeetings")
    ),
  },
  {
    exact: true,
    path: "/changePasswordUser",
    guard: true,
    layout: AuthLayout,
    component: lazy(() =>
      import("src/views/pages/DashboardUser/UserProfile/changePasswordUser")
    ),
  },
  {
    exact: true,
    path: "/set-password/:token",
    layout: AuthLayout,
    component: lazy(() =>
      import("src/views/pages/DashboardUser/SetAdminPassword/VerifyOTP")
    ),
  },
  {
    exact: true,
    path: "/set-admin",
    guard: true,
    layout: AuthLayout,
    component: lazy(() =>
      import(
        "src/views/pages/DashboardUser/SetAdminPassword/SetPassword/SetPassword"
      )
    ),
  },

  //=========================================SDRC ADMIN=======================================
  {
    exact: true,
    path: "/sdrc-tenant-insights",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(SdrcDashboardWrapper, ["SDRC_ADMIN"]),
  },

  {
    exact: true,
    path: "/settings",
    guard: true,
    layout: DashboardLayout,
    component: withRoleGuard(Settings, ["ADMIN", "SDRC_ADMIN", "SUBADMIN", "SALES_USER", "MARKETING_USER"]),
  },

  {
    component: () => <Redirect to="/404" />,
  },
];
