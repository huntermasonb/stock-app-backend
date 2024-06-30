// An SVG trash can with the lid off. Meant to use with `<DeleteClosedIcon />`. Use `fill={"#ffffff"}` to control primary color. Accepts `class/className`, `style`, `width`, `height`, and `stroke`
const SVGComponent = (props) => (
    <svg
        fill="#b3b2d7"
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        viewBox="-46.84 -45.84 620.04 652.04"
        xmlSpace="preserve"
        stroke="#b3b2d7"
        {...props}
    >
        <g strokeWidth={0} />
        <g
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCC"
            strokeWidth={3.441}
        />
        <path d="M376.041 111.435v-35.04H0v420.707h376.041V283.443l-38.615-145.965-3.914-14.792 14.793-3.914 27.736-7.337zM105.392 439.65h-30.6V133.843h30.6V439.65zm97.926 0h-30.6V133.843h30.6V439.65zm97.93 0h-30.601V133.843h30.601V439.65z" />
        <path d="m466.678 205.193-7.396 1.955-7.396 1.956-25.195-95.243-50.648 13.4-23.826 6.304 23.826 90.056 72.35 273.478 74.475-19.703-23.746-89.762 7.396-1.956 7.396-1.955 59.584-15.762-47.23-178.53-59.59 15.762zm39.402 148.949-7.395 1.956-7.396 1.955-31.58-119.368 7.396-1.956 7.396-1.955 30-7.938 31.58 119.367-30.001 7.939z" />
    </svg>
);
export default SVGComponent;
