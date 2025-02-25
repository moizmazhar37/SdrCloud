import DynamicNavigator from 'src/Common/DynamicNavigator/DynamicNavigator';
import React from 'react'

const SendGrid = () => {
    const navigationItems = [
        { text: "Settings", route: "/settings" },
        { text: "Integration", route: "/integrations" },
        { text: "SendGrid", route: "/sendgrid" }
    ];
    return (
        <>
            <DynamicNavigator items={navigationItems} />

        </>
    )
}

export default SendGrid
