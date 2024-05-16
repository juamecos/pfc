import React from 'react';
import SettingItem from '@/Components/Setting/SettingItem';
import { mapOutline, notificationsOutline, settingsOutline, personOutline, informationCircleOutline, logOutOutline } from 'ionicons/icons';
import GuestLayout from '@/Layouts/GuestLayout';

import { Head } from '@inertiajs/react';
import CustomText from '@/Components/CustomText';


const SettingsIndex = () => {
    return (
        <GuestLayout>
            <Head title="Log in" />
            <section className="max-w-4xl mx-auto px-6 pb-8 md:py-16 w-full mb-20">
                <CustomText h1 bold title='Settings' margin="my-8" />
                <SettingItem
                    href="/map-settings"
                    iconName={mapOutline}
                    title="Map"
                    description="Map settings"
                />
                <SettingItem
                    href="/notifications-settings"
                    iconName={notificationsOutline}
                    title="Notifications"
                    description="Push notifications settings"
                />
                <SettingItem
                    href="/units-settings"
                    iconName={settingsOutline}
                    title="Units"
                    description="Metric"
                />
                <SettingItem
                    href="/language-settings"
                    iconName={personOutline}
                    title="Language"
                    description="System default"
                />
                <div className="p-4 border-t">
                    <SettingItem
                        href="/info"
                        iconName={informationCircleOutline}
                        title="Info"
                        description=""
                    />
                    <SettingItem
                        href={route('logout')}
                        method="post"
                        as="button"
                        iconName={logOutOutline}
                        title="Logout"
                        description=""
                    />
                </div>
            </section>
        </GuestLayout>
    );
};

export default SettingsIndex;
