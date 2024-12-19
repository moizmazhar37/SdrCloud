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
  {
    exact: true,
    path: "/dashboard",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/DashboardAdmin/index")),
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
    path: "/leads-search",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/layouts/DashboardLayout/NavBar/SearchLeads/SearchLeads.jsx")
    ),
  },

  {
    exact: true,
    path: "/Edit-Myprojects",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MyProjects/EditProject")),
  },
  {
    exact: true,
    path: "/View-Myprojects",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MyProjects/ViewProject")),
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
    path: "/CreateTemplate",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CreateVideo/index")),
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
    component: lazy(() => import("src/views/pages/CreateVideo/CreateTemplate")),
  },
  {
    exact: true,
    path: "/ui-settings",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/settings/UISettings")),
  },

  // New URL for Routes

  {
    exact: true,
    path: "/companyUsers-List",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CompanyUsers/index")),
  },
  {
    exact: true,
    path: "/AddUser",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CompanyUsers/AddUser")),
  },
  {
    exact: true,
    path: "/Viewuser",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CompanyUsers/View")),
  },

  {
    exact: true,
    path: "/Myprojects",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MyProjects/index")),
  },
  {
    exact: true,
    path: "/project-list",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MyProjects/errorTable")),
  },
  {
    exact: true,
    path: "/Create-hvo-template",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/HVOTemplate/CreateHVOTemplate")
    ),
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
    component: lazy(() => import("src/views/pages/settings")),
  },

  {
    exact: true,
    path: "/company-information",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/CompanuInformation/EditCompanySettings")
    ),
  },

  {
    exact: true,
    path: "/new-settings",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/NewSettings/Settings")),
  },

  {
    exact: true,
    path: "/intent",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/CompanuInformation/Intent")),
  },

  {
    exact: true,
    path: "/myprofile",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/CompanuInformation/MyProfile")
    ),
  },

  {
    exact: true,
    path: "/integrations",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/CompanuInformation/Integration")
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
    path: "/my-profile",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/settings")),
  },
  {
    exact: true,
    path: "/ui-settings",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/settings/UISettings")),
  },
  {
    exact: true,
    path: "/change-password",
    guard: true,
    layout: AuthLayout,
    component: lazy(() => import("src/views/pages/settings/changePassword")),
  },
  {
    exact: true,
    path: "/user-management",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/settings/changePassword")),
  },

  // Google Sheet
  {
    exact: true,
    path: "/viewSheets",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/settings/ViewGoogleSheet")),
  },

  {
    exact: true,
    path: "/editSheets",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/settings/EditGoogleSheet")),
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
    component: lazy(() => import("src/views/pages/PPAdmin/Accounts/index")),
  },
  {
    exact: true,
    path: "/PP-create",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/PPAdmin/Accounts/CreateAccount")
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
    component: lazy(() => import("src/views/pages/DashboardUser/index")),
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
