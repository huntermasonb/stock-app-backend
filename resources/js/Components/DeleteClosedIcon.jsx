// An SVG trash can with a lid on. Use `fill={"#ffffff"}` to control primary color. Accepts `class/className`, `style`, `width`, `height`, and `stroke`
const SVGComponent = (props) => (
    <svg
        fill="#b3b2d7"
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        viewBox="-46.84 -46.84 562.04 562.04"
        xmlSpace="preserve"
        stroke="#b3b2d7"
        {...props}
    >
        <g strokeWidth={0} />
        <g strokeLinecap="round" strokeLinejoin="round" />
        <path d="m381.048 64.229-71.396.031L309.624 0 158.666.064l.027 64.26-71.405.031.024 60.056h293.76l-.024-60.182zM189.274 30.652l89.759-.04.016 33.66-89.759.04-.016-33.66zM87.312 468.36h293.76V139.71H87.312v328.65zm215.73-283.772h15.301v238.891h-15.301V184.588zm-76.5 0h15.3v238.891h-15.3V184.588zm-76.5 0h15.3v238.891h-15.3V184.588z" />
    </svg>
);
export default SVGComponent;
