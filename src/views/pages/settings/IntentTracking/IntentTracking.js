import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";


const IntentTracking = () => {
  const navigationItems = [
    { text: "Settings", route: "/settings" },
    { text: "Footer Links", route: "/intent" },
  ];
  return (
    <div>
      <DynamicNavigator items={navigationItems} />
      Hello
    </div>
  );
};

export default IntentTracking;