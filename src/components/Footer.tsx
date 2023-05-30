import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { useColorMode } from "@chakra-ui/react";

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <div className="mt-32 border-t-[1px] border-slate-500/30">
        <div className="mx-auto flex w-full flex-wrap py-4 md:px-4 md:py-8 xl:max-w-[2100px]">
          <div className="min-width-[800px] flex flex-grow flex-wrap justify-between xl:pl-60">
            <div className="mt-6 md:mt-0">
              <h2 className="text-md border-r-4 border-[#A71B4A] px-2">
                نقشه سایت
              </h2>
              <div className="mt-2 flex flex-col">
                <Link to="/about-us" className="px-4 py-2 text-sm">
                  دربارۀ ما
                </Link>
                <Link to="/blank" className="px-4 py-2 text-sm">
                  تماس با ما
                </Link>
                <Link to="/blank" className="px-4 py-2 text-sm">
                  فروش در سایت
                </Link>
                <Link to="/blank" className="px-4 py-2 text-sm">
                  فرصت‌های شغلی
                </Link>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <h2 className="text-md border-r-4 border-[#A71B4A] px-2">
                خدمات مشتریان
              </h2>
              <div className="mt-2 flex flex-col">
                <Link to="/about-us" className="px-4 py-2 text-sm">
                  سؤالات متداول
                </Link>
                <Link to="/blank" className="px-4 py-2 text-sm">
                  رویۀ بازگرداندن کالا
                </Link>
                <Link to="/blank" className="px-4 py-2 text-sm">
                  حریم خصوصی
                </Link>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <h2 className="text-md border-r-4 border-[#A71B4A] px-2">
                راهنمای خرید
              </h2>
              <div className="mt-2 flex flex-col">
                <Link to="/about-us" className="px-4 py-2 text-sm">
                  نحوۀ ثبت سفارش
                </Link>
                <Link to="/blank" className="px-4 py-2 text-sm">
                  رویۀ ارسال سفارش
                </Link>
                <Link to="/blank" className="px-4 py-2 text-sm">
                  شیوه‌های پرداخت
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-0 lg:mr-12">
            <div>
              <h2 className="text-md sm:text-lg">همراه ما باشید!</h2>
              <div className="mt-3 flex">
                <Link
                  to="/blank"
                  className="px-2 opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-100"
                >
                  <FaInstagram
                    className={`${
                      colorMode === "dark"
                        ? "instagram"
                        : "hover:bg-[#E4405F] hover:text-white"
                    } text-4xl hover:rounded-[10px]`}
                  />
                </Link>
                <Link
                  to="/blank"
                  className="px-2 opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-100"
                >
                  <FaTelegramPlane className="text-4xl hover:text-[#0099FF]" />
                </Link>
                <Link
                  to="/blank"
                  className="px-2 opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-100"
                >
                  <FaTwitter className="text-4xl hover:text-[#1DA1F2]" />
                </Link>
                <Link
                  to="/blank"
                  className="px-2 opacity-60 transition-opacity duration-300 ease-in-out hover:opacity-100"
                >
                  <FaLinkedin className="text-4xl hover:text-[#0A66C2]" />
                </Link>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-md sm:text-lg">
                با ثبت ایمیل، از جدید‌ترین تخفیف‌ها با‌خبر شوید
              </h2>
              <form className="mt-4 flex flex-wrap items-center sm:flex-nowrap ">
                <input
                  type="email"
                  style={
                    colorMode === "dark"
                      ? { backgroundColor: "#1E293B" }
                      : { backgroundColor: "#E1E4E7" }
                  }
                  className="w-full rounded-lg px-4 py-3 shadow-md outline-none focus:shadow-sm sm:rounded-none sm:rounded-br-lg sm:rounded-tr-lg sm:shadow-none"
                  placeholder="لطفاً ایمیل خود را وارد کنید"
                />
                <button className="mt-2 w-full rounded-lg bg-[#A71B4A] px-4 py-3 text-[#fcfdff] outline-none sm:mt-0 sm:w-auto sm:rounded-none sm:rounded-bl-lg sm:rounded-tl-lg md:w-auto">
                  ثبت
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] border-slate-500/30 py-4 text-center text-xs md:text-sm">
        <div>
          <span> © تمام حقوق این سایت محفوظ است</span>
        </div>
        <div className="py-1">
          <RiDoubleQuotesR
            style={{
              color: "#A71B4A",
              display: "inline",
              verticalAlign: "top",
              fontSize: "0.8rem",
            }}
          />
          کار برای بهبود زندگی است نه برعکس.
          <RiDoubleQuotesL
            style={{
              color: "#A71B4A",
              display: "inline",
              verticalAlign: "top",
              fontSize: "0.8rem",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
