import React from 'react';
import { Link } from '@inertiajs/react'


export default function Pagination({ links }) {
  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="flex items-center -space-x-px h-10 text-base justify-center">
        {links.map((link, index) => (
          <li key={index} className="flex">
            <Link
              preserveScroll
              href={link.url ? link.url : undefined}
              disabled={!link.url}
              className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 
        ${link.active
                  ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100"
                  : "text-gray-500 bg-white border-gray-300"
                } 
        ${index === 0 ? 'rounded-s-lg' : ''} 
        ${index === links.length - 1 ? "rounded-e-lg" : ""}
        ${!link.url ? "!text-gray-500 cursor-not-allowed" : "hover:bg-gray-100"}`
              }
            >
              {/* Assuming you want to render the link's label as HTML */}
              <span dangerouslySetInnerHTML={{ __html: link.label }}></span>
            </Link>

          </li>
        ))}
      </ul>
    </nav>
  );
}
