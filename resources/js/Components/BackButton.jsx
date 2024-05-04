import React from 'react';
import Icon from './Icon';
import { arrowBackOutline } from 'ionicons/icons';


export default function BackButton() {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <Icon
            iconName={arrowBackOutline}
            onClick={handleGoBack}
        />
    );
}
