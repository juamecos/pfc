import { useState } from 'react';
import Icon from './Icon'; // Importa tu componente Icon que ya has definido anteriormente



import { Link } from '@inertiajs/react';
import { navigationLinks } from '@/config/navigation';

export default function BottomNavigator() {
  const [active, setActive] = useState('home');

  return (
    <div className="fixed z-50 w-full h-18 md:hidden max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 drop-shadow-md px-2 py-0.5">
      <div className="flex justify-between">
        {navigationLinks.map(({ id, icon, label, badge, badgeData, href }) => (
          <div key={id} className="flex flex-col items-center">
            <Link

              key={id}
              href={href}
              className={`flex flex-col items-center p-2 ${active === id ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActive(id)}
            >
              <Icon
                iconName={icon}
                badge={badge}
                badgeData={badgeData}
                size={20}
                iconColor={active === id ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}
                textColor={active === id ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}
                title={label}
                bottom={true} // Icon above the text
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

