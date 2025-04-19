import { ThemeConfig } from "antd";

const themeConfig = {
  token: {
    fontFamily: "Inter",
    colorPrimary: "#7F56D9",
  },
  components: {
    Button: {
      borderRadius: 8,
      controlHeight: 44,
      fontSize: 16,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 16,
    },
    Tabs: {
      inkBarColor: "#7F56D9",
      itemSelectedColor: "#7F56D9",
      fontWeightStrong: 600,
    },
  },
};

export default themeConfig;
