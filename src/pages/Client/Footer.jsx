function Footer() {
  return (
    <footer className="bg-[#2e6a8f] text-white flex justify-between items-center px-8 py-4 mt-auto">
      <div>
        <span>© Copyright 2025</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="mr-2">Follow us</span>
        <img
          className="w-7 h-7 cursor-pointer transition-transform duration-200 hover:scale-110"
          src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
          alt="Facebook"
          onClick={() => openLink('https://facebook.com')}
        />
        <img
          className="w-7 h-7 cursor-pointer transition-transform duration-200 hover:scale-110"
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          onClick={() => openLink('https://wa.me/')}
        />
        <img
          className="w-7 h-7 cursor-pointer transition-transform duration-200 hover:scale-110"
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="LinkedIn"
          onClick={() => openLink('https://linkedin.com')}
        />
        <img
          className="w-7 h-7 cursor-pointer transition-transform duration-200 hover:scale-110"
          src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
          alt="Instagram"
          onClick={() => openLink('https://instagram.com')}
        />
      </div>
    </footer>
  )
}

export default Footer