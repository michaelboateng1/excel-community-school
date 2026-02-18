import schoolLogo from "../assets/images/schoolLogo.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-[#0f2a92] via-[#0b247f] to-[#0f2a92] text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-linear-to-r from-sky-400 to-indigo-500 opacity-50 blur"></div>
                <img src={schoolLogo} alt="Spring Side Academy" className="relative h-10 w-10" />
              </div>
              <span className="text-lg font-bold">Excel Community School</span>
            </div>
            <p className="leading-relaxed text-[#cccccc]">Empowering students to shine through excellence, creativity, and character.</p>
            <div className="mt-6 flex gap-3">
              <a aria-label="Facebook" href="https://www.facebook.com/excelcommunityschoolgh/" target="_blank" className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20">
                <svg className="h-5 w-5 text-[#cccccc] transition-colors group-hover:text-white" fill="white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a aria-label="Twitter" href="https://www.tiktok.com/@excelcommunitysch" className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M16.5 2c.45 2.94 2.47 4.96 5.41 5.41v3.02c-1.98-.06-3.8-.65-5.41-1.72v6.16c0 3.52-2.86 6.38-6.38 6.38S3.75 18.39 3.75 14.87c0-3.51 2.86-6.37 6.37-6.37.42 0 .83.05 1.23.14v3.18a2.88 2.88 0 0 0-1.23-.27 3.32 3.32 0 1 0 3.32 3.32V2h3.06z" />
                </svg>
              </a>
              <a aria-label="YouTube" href="https://www.youtube.com/@ExcelCommunitySchool1" target="_blank" className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20">
                <svg className="h-5 w-5 text-[#cccccc] transition-colors group-hover:text-white" fill="white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link className="group flex items-center gap-2 text-[#cccccc] transition-colors hover:text-white" to="/about">
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  About Us
                </Link>
              </li>
              <li>
                <Link className="group flex items-center gap-2 text-[#cccccc] transition-colors hover:text-white" to="/admissions">
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Admissions
                </Link>
              </li>
              <li>
                <Link className="group flex items-center gap-2 text-[#cccccc] transition-colors hover:text-white" to="/contact">
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">Contact</h3>
            <ul className="space-y-3 text-[#cccccc]">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info.excel@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+233 554 357 897</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span> AK-045-0058, Kumasi</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">Newsletter</h3>
            <p className="mb-4 text-sm text-[#cccccc]">Stay updated with our latest news and events.</p>
            {/* <form onsubmit={e => hundleSubmit(e)} class="relative flex flex-col gap-3">
                        {#if formStatus === "success"}
                            <div bind:this={successMessage} class="absolute inset-0 flex items-center justify-center rounded-lg bg-sky-600/95 backdrop-blur-sm">
                                <div class="flex flex-col items-center justify-center space-y-2 text-center">
                                    <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <p class="text-sm font-semibold text-white">Subscribed!</p>
                                    <p class="text-xs text-sky-100">Thank you for joining us</p>
                                </div>
                            </div>
                        {/if}
                        <input
                            type="email"
                            name="newsletter-email"
                            placeholder="Your email"
                            class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-white transition-all placeholder:text-[#cccccc] focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 focus:outline-none"
                        />
                        <button
                            type="submit"
                            class="rounded-lg bg-linear-to-r from-sky-600 to-[#2b52ec] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:from-sky-500 hover:to-blue-600"
                            >Subscribe</button
                        >
                    </form> */}
          </div>
        </div>
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-[#cccccc] md:flex-row">
            <p>© {new Date().getFullYear()} Excel Community School. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" target="_blank" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" target="_blank" className="transition-colors hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
