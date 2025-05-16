import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="absolute w-full bg-red-800 text-white px-4 py-10 md:px-20 lg:px-40 z-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo + Mô tả */}
        <div className="md:w-1/3 flex flex-col gap-4">
          <img src={logo} alt="Logo" className="w-40" />
          <p className="text-sm leading-6">
            This open source website is our final project.
            <br />
            <span className="text-gray-200">(Course: Software Engineering)</span>
            <br />
            Contribute to our project on Github:&nbsp;
            <a
              href="https://github.com/tboi0602/Toy-Shop"
              className="font-semibold text-blue-300 hover:text-white"
              target="_blank" rel="noopener noreferrer"
            >
              NinjaShop
            </a>
          </p>
        </div>

        {/* Thông tin thêm */}
        <div className="flex flex-col sm:flex-row gap-10">
          <div>
            <h2 className="text-lg font-bold mb-2">About Us</h2>
            <p className="text-sm">
              A website that guarantees genuine sales, <br />
              established in 2025 with Japanese origin.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Support</h2>
            <p className="text-sm">ninjashop@support.vn</p>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="mt-10 border-t border-white pt-4 text-center text-sm text-gray-300">
        © 2025 NinjaShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
