import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import LoginLayout from "./layouts/LoginLayout";
import AuthLayout from "./layouts/AuthLayout";

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

  // New URL for Routes
  // {
  //   exact: true,
  //   path: "/dashboard",
  //   guard: true,
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/DashboardAdmin/index")),
  // },

  {
    exact: true,
    path: "/dashboard",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/DashboardAdmin/MainDashboard/MainDashboard")
    ),
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
    path: "/view-myproject",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/DashboardUser/MyProject/Viewprojects")
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
  {
    exact: true,
    path: "/ui-settings",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/UISettings/UISettings")
    ),
  },

  // New URL for Routes

  {
    exact: true,
    path: "/companyUsers-List",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CompanyUsers/Users/Users")),

    // component: lazy(() => import("src/views/pages/CompanyUsers/index")),
  },

  {
    exact: true,
    path: "/Myprojects",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/MyProjects/Prospects/Prospects")
    ),
  },
  {
    exact: true,
    path: "/prospects",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/MyProjects/Prospects/Prospects")
    ),
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
    component: lazy(() =>
      import("src/views/pages/HVOTemplate/CustomerPreview")
    ),
  },

  {
    exact: true,
    path: "/play-video/:customerId",
    component: lazy(() =>
      import("src/views/pages/CreateVideo/VideoPlayer/VideoPlayer")
    ),
  },

  // Setting Pages

  {
    exact: true,
    path: "/settings",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/settings/Settings")),
  },

  {
    exact: true,
    path: "/alerts",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/settings/Alerts/Alerts")),
  },

  {
    exact: true,
    path: "/company-information",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/settings/Company/Company")),
  },

  {
    exact: true,
    path: "/intent",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/IntentTracking/IntentTracking")
    ),
  },

  // {
  //   exact: true,
  //   path: "/myprofile",
  //   guard: true,
  //   layout: DashboardLayout,
  //   component: lazy(() =>
  //     import("src/views/pages/settings/MyProfile/profile.js")
  //   ),
  // },

  {
    exact: true,
    path: "/integrations",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/Integrations/Integration")
    ),
  },

  {
    exact: true,
    path: "/googlesheets",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/GoogleSheets/Googlesheets")
    ),
  },

  {
    exact: true,
    path: "/email-templates",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/EmailTemplates/EmailTemplates")
    ),
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
    component: lazy(() =>
      import("src/views/pages/settings/Integrations/SendGrid/SendGrid")
    ),
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
    path: "/ui-settings",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/settings/UISettings/UISettings")
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
  {
    exact: true,
    path: "/user-management",
    guard: true,
    layout: DashboardLayout,
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
    component: lazy(() =>
      import(
        "src/views/pages/settings/Integrations/GoogleSheets/ViewGoogleSheet/ViewGoogleSheet"
      )
    ),
  },

  {
    exact: true,
    path: "/editSheets",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import(
        "src/views/pages/settings/Integrations/GoogleSheets/EditGoogleSheet/EditGoogleSheet"
      )
    ),
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
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PPAdmin/Accounts/Accounts")),
  },
  {
    exact: true,
    path: "/PP-create",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/PPAdmin/Accounts/CreateAccount/CreateAccount")
    ),
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
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/PPAdmin/UserManagement/index")
    ),
  },
  {
    exact: true,
    path: "/edit-PPAdmin",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/PPAdmin/UserManagement/View")
    ),
  },
  {
    exact: true,
    path: "/pp-settings",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PPAdmin/Settings")),
  },
  {
    exact: true,
    path: "/user-settings",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PPAdmin/UserSetting")),
  },
  {
    exact: true,
    path: "/edit-profile",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PPAdmin/EditProfile")),
  },

  {
    exact: true,
    path: "/change-your-password",
    // guard: true,
    layout: AuthLayout,
    component: lazy(() => import("src/views/pages/PPAdmin/ChangePassword")),
  },

  // For Users
  {
    exact: true,
    path: "/user-dashboard",
    guard: true,
    layout: DashboardLayout,
    // component: lazy(() => import("src/views/pages/DashboardUser/index")),
    component: lazy(() =>
      import("src/views/pages/DashboardAdmin/MainDashboard/MainDashboard")
    ),
  },
  {
    exact: true,
    path: "/user-myprojects",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/DashboardUser/MyProject/index")
    ),
  },
  {
    exact: true,
    path: "/myprojects-list",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/DashboardUser/MyProject/ProjectList")
    ),
  },
  {
    exact: true,
    path: "/user-Viewproject",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/DashboardUser/MyProject/Viewprojects")
    ),
  },
  {
    exact: true,
    path: "/userProfile",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/DashboardUser/UserProfile/index")
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
    path: "/company-setting",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/PPAdmin/CompanySetting")),
  },

  {
    component: () => <Redirect to="/404" />,
  },
];
