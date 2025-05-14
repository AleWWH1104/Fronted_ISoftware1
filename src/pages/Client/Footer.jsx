import React from 'react';

function Footer() {
  const openLink = (url) => window.open(url, '_blank');

  return (
    <footer className="bg-[#2e6a8f] text-white flex flex-col md:flex-row justify-between items-center px-8 py-4 mt-auto font-decorative">
      <div className="mb-4 md:mb-0">
        <span className="text-xl">© Copyright 2025</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xl">Follow us</span>
        <img
          className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
          src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
          alt="Facebook"
          onClick={() => openLink('https://facebook.com')}
        />
        <img
          className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          onClick={() => openLink('https://wa.me/')}
        />

        <img
          className="w-7 h-7 cursor-pointer hover:scale-110 transition-transform"
          src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
          alt="Instagram"
          onClick={() => openLink('https://instagram.com')}
        />
      </div>
    </footer>
  );
}

export default Footer;
