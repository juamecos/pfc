import { homeOutline, mapOutline, addCircleOutline, settingsOutline, personCircleOutline } from 'ionicons/icons';

export const navigationLinks = [
    { id: 'home', icon: homeOutline, label: 'Home', href: '/' },
    { id: 'map', icon: mapOutline, label: 'Discover', href: '/discover' },
    { id: 'add', icon: addCircleOutline, label: 'Add', href: '/stone/create' },
    { id: 'settings', icon: settingsOutline, label: 'Settings', href: '/settings' },
    { id: 'profile', icon: personCircleOutline, label: 'Profile', href: '/profile' }
];
