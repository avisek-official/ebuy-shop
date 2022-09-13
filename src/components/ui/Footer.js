import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div
      id="footer-devename"
      className="w-full h-auto bg-gradient-to-r from-emerald-900 to-emerald-500 mt-8 flex justify-center items-center rounded-t-3xl flex-col text-white"
    >
      <span
        id="row1"
        className="flex flex-col-reverse md:flex-row w-[90%] justify-between my-6"
      >
        <span className="flex flex-col w-full md:w-[50%] items-center md:items-start">
          <h1 className="font-bold">About this project</h1>
          <p className="text-xs italic text-justify w-full md:w-[80%]">
            This is a dummy project built for learning purposes. Technologies
            used to create this project are{" "}
            <b>React JS, Tailwind CSS, Firebase</b> (Authentication & Real Time
            Database), <b>npm</b> etc. React JS Libraries like{" "}
            <b>Redux, Saga, Axios, React-Router, React-Icons</b> also used to
            fulfil the necessities. The title, description and images of the
            products are taken from <b>Amazon India</b>'s Website. Copyrights of
            the products does not belong to me. The GitHub repository for this
            project will be available in my GitHub Profile.
          </p>
        </span>
        <span className="flex flex-col w-full md:w-[50%] justify-start items-center mb-6">
          <h1 className="font-bold text-lg mb-6">Find Me on</h1>
          <span className="flex w-[50%] justify-evenly">
            <a
              href="https://www.linkedin.com/in/avisek-kar/"
              target="_blank"
              rel="noreferrer"
            >
              <BsLinkedin size={35} className="hover:scale-110 duration-150" />
            </a>
            <a
              href="https://github.com/avisek-official/"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub size={35} className="hover:scale-110 duration-150" />
            </a>
          </span>
        </span>
      </span>
      <span
        id="row2"
        className="italic font-bold flex w-full justify-center items-center my-2"
      >
        &copy; Designed & Developed by Avisek Kar
      </span>
    </div>
  );
};
export default Footer;
