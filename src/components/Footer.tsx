import React from 'react';

export default function Footer() {
  return (
    <footer className="py-6 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Vinu Varghese. All rights reserved.
        </div>
      </div>
    </footer>
  );
}