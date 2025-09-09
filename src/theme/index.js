import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import { softShadows, strongShadows } from "./shadows";
import typography from "./typography";

const baseOptions = {
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "rgba(24, 28, 50, 0.60)",
    },
    background: {
      main: "#080031",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.60)",
    },
  },

  direction: "ltr",
  typography,
  overrides: {
    MuiDialog: {
      paperWidthLg: {
        boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
      },
    },
    MuiAvatar: {
      colorDefault: {},
    },

    MuiToolbar: {
      regular: {
        minHeight: "0px",
        "@media (min-width: 600px)": {
          minHeight: "0px !important",
        },
      },
    },

    MuiIconButton: {
      root: {
        flex: "0 0 auto",
        color: "#00B0ED !important",
        width: "40px",
        height: "40px",
        overflow: "visible",
        borderRadius: "50%",

        "@media (max-width: 767px)": {
          width: "40px",
          height: "40px",
        },
        "&.Mui-disabled": {
          "& .MuiSvgIcon-root": {
            color: "rgba(0, 0, 0, 0.26)",
          },
        },
      },
      edgeEnd: {
        marginRight: " 0px",
      },
    },
    MuiTableRow: {
      root: {
        borderBottom: "1px solid #F2F4FF !important",
      },
    },
    MuiDialogActions: {
      root: {
        padding: "8px 0px 18px",
      },
    },
    MuiDialogContent: {
      root: {
        overflowY: "none",
      },
    },
    MuiMenu: {
      list: {
        padding: "10px ",
      },
    },
    MuiFormControl: {
      marginDense: {
        marginTop: "8px !important",
        marginBottom: "5px !important",
      },
      root: {
        border: "0",
        width: "100%",
        margin: "0",
        display: "inline-flex",
        padding: "0",
        position: "relative",
        minWidth: "0",
        flexDirection: "column",
        verticalAlign: "top",
        marginTop: "5px",
      },
    },
    MuiCheckbox: {
      root: {
        width: "10px",
        height: "10px",
      },
    },
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: "hidden",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
        color: "white",
      },
    },
    MuiList: {
      padding: {
        paddingTop: "0px",
        paddingBottom: "8px",
      },
    },
    MuiListItem: {
      root: {
        paddingBottom: "6px",
        paddingTop: "0x",
      },
      gutters: {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    MuiChip: {
      root: {
        backgroundColor: "rgba(0,0,0,0.075)",
      },
    },
    MuiTableCell: {
      alignLeft: {
        textAlign: "left",
      },
      alignCenter: {
        textAlign: "center",
      },
      alignRight: {
        textAlign: "left",
      },
      root: {
        borderBottom: "none",
        padding: "12px 6px 14px 10px",
        textAlign: "left",
        fontSize: "13px",
      },
      body: {
        color: "#181C32",
        fontSize: "14px",
        fontWeight: "400",
        whiteSpace: "nowrap",
        fontWeight: "300",
      },
      head: {
        color: "rgba(24, 28, 50, 0.60)",
        fontSize: "16px !important",
        background: "#F2F4FF",
        lineHeight: "1.5rem",
        whiteSpace: "nowrap",
        fontWeight: "500 !important",
      },
    },
    MuiTypography: {
      caption: {
        color: "#A7A1A1",
        fontSize: "12px",
      },
      subtitle2: {
        color: "#fff",
        lineHeight: "20px !important",
      },
      colorTextSecondary: {
        color: "#7E8299",
      },
    },
    MuiLink: {
      underlineHover: { color: "#152F40" },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "6px",
        background: "#FFF",
        border: "1px solid #E7E7E7",
        "& ::-webkit-input-placeholder": {
          color: "#000 !important",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "1px solid #fff",
          borderColor: "#fff",
        },
        input: {
          "& ::-webkit-autofill": {
            WebkitBoxShadow: "none !important",
          },
        },
      },
      input: {
        padding: "13.5px 14px !important",
      },
    },

    MuiTab: {
      textColorPrimary: {
        color: "#fff",
        "&.Mui-selected": {
          color: "#fff",
        },
      },
      root: {
        "@media (min-width: 600px)": {
          minWidth: "0",
        },
      },
    },

    MuiButton: {
      root: {
        fontWeight: "500 !important",
        fontSize: "14px",
        color: "#fff",
        lineHeight: " 21px",
        "&:hover": {
          backgroundColor: "none",
          color: "none",
        },
      },
      containedSecondary: {
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.25)",
        borderRadius: "5px",
        color: "#181C32",
        fontSize: "14px",
        backgroundColor: "rgba(24, 28, 50, 0.13)",
        padding: "9px 30px !important",
        border: "1px solid rgba(24, 28, 50, 0.30)",
        "&:hover": {
          backgroundColor: "#181C32",
          color: "#fff",
        },
        "@media (max-width: 600px)": {
          padding: "7px 15px !important",
        },
      },

      outlinedPrimary: {
        color: "#848484",
        padding: "9px 30px !important",
        fontSize: "14px",
        border: "1px solid #1069C2",
        borderRadius: "5px",
        backgroundColor: "#fff",
        boxShadow: "0px 6px 13px rgb(0 0 0 / 25%)",
      },
      containedPrimary: {
        color: "#fff",
        padding: "9px 30px !important",
        fontSize: "14px",
        backgroundColor: "#181C32",
        borderRadius: "5px",
        boxShadow: "0px 6px 13px rgb(0 0 0 / 25%)",
        border: "1px solid rgba(24, 28, 50, 0.10)",
        "&:hover": {
          backgroundColor: "rgba(24, 28, 50, 0.13)",
          color: "#181C32",
        },
      },
      contained: {
        borderRadius: "5px",
        color: "#000",
        fontSize: "18px",
        fontWeight: "500",

        padding: "5px 19px",

        "&:hover": {
          backgroundColor:
            "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
        },
      },
      outlinedSecondary: {
        borderRadius: "5px",
        color: "#848484",
        fontSize: "16px",
        filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25))",
        fontWeight: 400,
        padding: "9px 30px !important",
        border: "1px solid #181C32",
        "&:hover": {
          backgroundColor: "#181C32",
          color: "#fff",
          border: "1px solid rgba(24, 28, 50, 0.10)",
        },
        "@media (max-width: 600px)": {
          padding: "7px 15px !important",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
      textPrimary: {
        color: "#848484",
      },
    },

    PrivateTabIndicator: {
      colorPrimary: {
        backgroundColor: "#FF2626",
      },
    },

    MuiDropzoneArea: {
      root: {
        backgroundColor: "transparent",
        border: "1px dashed #5d5656 !important",
        minHeight: "170px !important",
      },
    },

    MuiFormLabel: {
      root: {
        color: "#1D2D3F",
        marginTop: "0",
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: "0px",
        marginRight: "0px",
        fontSize: "12px !important",
      },
    },

    MuiInputBase: {
      input: {
        "&.Mui-disabled": {
          borderRadius: "4px",
        },
        input__webkit_autofill: {
          WebkitBackgroundClip: "text !important",
          WebkitTextFillColor: "red !important",
        },
      },
      root: {
        fontSize: "13px",
        "& ::-webkit-input-placeholder": {
          color: "#000 !important",
        },
      },
    },
    MuiPopover: {
      paper: {},
    },
    MuiPickersCalendarHeader: {
      iconButton: { backgroundColor: "transparent !important" },

      dayLabel: {
        color: "#fff",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#fff",
      },
      daySelected: {
        backgroundColor: "#000",
      },
      "& :hover": {
        backgroundColor: "#fff",
      },
    },
    MuiSelect: {
      iconOutlined: {
        right: "10px",
      },
      icon: {
        color: "#000",
      },
    },
    MuiSvgIcon: {
      root: {
        color: "#216bc2",
      },
    },

    MuiAlert: {
      standardError: {
        color: "none",
        backgroundColor: "none",
      },
    },

    MuiPagination: {
      ul: {
        background: "none !important",
        height: "41px !important",
        width: "auto !important",
      },
    },
    MuiDrawer: {
      paper: {
        overflowY: "none",
      },
    },
    MuiInput: {
      underline: {
        "&::before": {
          display: "none",
        },
        "&::after": {
          display: "none",
        },
      },
    },

    MuiPickersToolbar: {
      toolbar: {
        background:
          "linear-gradient(180deg, #00ACEB 0%, #1069C2 0.18%, #1069C2 70.35%, #1069C2 100%)",
      },
    },
    MuiPickersToolbarText: {
      toolbarTxt: {
        color: "none",
      },
      toolbarBtnSelected: {
        color: "none",
      },
    },
  },
};

const themesOptions = [
  {
    name: "LIGHT",
    overrides: {
      MuiSvgIcon: {
        root: {
          color: "#000",
        },
      },
      MuiSvgIcon: {
        root: {
          " & :active": {},
        },
      },
      MuiInputBase: {
        root: {
          color: "#000 !important",
        },
        input: {
          color: "#000 !important",
        },
      },

      MuiTypography: {
        subtitle2: {
          color: "rgba(0, 0, 0, 0.5)",
        },
      },
      MuiPaper: {
        rounded: {
          border: "20px",
        },
        root: {
          background: "#FFFFFF",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "4px",
          color: "#0F0037",
        },
        outlined: {
          backgroundColor: "#2A292E",
          border: "1px solid #797979",
        },
      },

      MuiOutlinedInput: {
        root: {
          "& ::-webkit-input-placeholder": {
            color: "#000 !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #fff",
            borderColor: "#fff",
          },
          input: {
            "& ::-webkit-autofill": {
              WebkitBoxShadow: "none !important",
            },
          },
        },
        notchedOutline: {
          border: "none",
        },
        adornedEnd: {
          paddingRight: "6px",
        },
      },
    },

    palette: {
      type: "light",
      action: {
        active: colors.blueGrey[600],
      },
      background: {
        default: colors.common.white,
        dark: "#fff",
        virtual: "#F8FBFF",
        paper: colors.common.white,
        taf: "#F3F5F6",
        chatBox: "#fff",
        back: "linear-gradient(180deg, #00ACEB 0%, #00B0ED 10.18%, #1069C2 70.35%, #1069C2 100%)",
        cardstyle: "#245CA3",
        About: "#fff",
        dashLayout: "#3A96DD",
        Notification: "#fff",
        login: "#e5e5e5",
        CardP2P: "#FFFFFF",
        stakeing: "#F8FBFF",
        reward: "#FFFFFF",
      },
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#7E8299",
      },
      tertiary: {
        main: "#ccc",
      },
      text: {
        primary: colors.blueGrey[900],
        mainColor: "#0047AB",
        secondary: colors.blueGrey[600],

        NotificationColor: "green",
        SideBar: "#263238",
        token: "#44484E",
        Steper: "#1D2D3F",
        stperContent: "#0b0b0bba",
        nofiction: "#00000080",
        BannerText: "#1D2D3F",
        lightDark: "#152F40",
      },
    },
    shadows: softShadows,
  },
  {
    name: "DARK",
    overrides: {
      MuiOutlinedInput: {
        root: {
          background: "#0c1012",
        },
      },
      MuiInputBase: {
        root: {
          color: "#fff !important",
        },
        input: {
          color: "#fff !important",
        },
      },

      MuiTypography: {
        subtitle2: {
          color: "#fff",
        },
      },
      MuiTableCell: {
        body: {
          color: "#fff",
        },
      },
      MuiOutlinedInput: {
        root: {
          "& ::-webkit-input-placeholder": {
            color: "#fff !important",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #fff",
            borderColor: "#fff",
          },
        },
        notchedOutline: {},
        adornedEnd: {
          paddingRight: "6px",
        },
        input: {
          "& ::-webkit-autofill": {
            WebkitBoxShadow: "none !important",
          },
        },
      },
    },
    palette: {
      type: "dark",
      action: {
        active: "rgba(255, 255, 255, 0.54)",
        hover: "rgba(255, 255, 255, 0.04)",
        selected: "rgba(255, 255, 255, 0.08)",
        disabled: "rgba(255, 255, 255, 0.26)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        focus: "rgba(255, 255, 255, 0.12)",
      },
      background: {
        default: "#282C34",
        dark: "#000",
        virtual: "#0c1012",
        taf: "#0c1012",
        paper: "#282C34",
        chatBox: "#1a1a1a",
        back: "#18293b",
        cardstyle: "#40474f",
        About: "#0c1012",
        stakeing: "#0c1012",
        dashLayout: "#0c1012",
        Notification: "#373737",
        login: "#343434",
        CardP2P: "#151414",
        reward: "#201e1e",
      },
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#1f73b7",
      },
      warning: {
        main: "#BC211D",
      },
      error: {
        main: "#B33A3A",
      },
      text: {
        primary: "#fff",
        mainColor: "#fff",
        secondary: "#F8FBFF",
        NotificationColor: "#fff",
        SideBar: "#fff",
        token: "#fff",
        Steper: "#fff",
        stperContent: "#fff",
        nofiction: "#fff",
        BannerText: "#f5f5ff5",
      },
    },
    shadows: strongShadows,
  },
];

export const createTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(
    _.merge({}, baseOptions, themeOptions, { direction: config.direction })
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
