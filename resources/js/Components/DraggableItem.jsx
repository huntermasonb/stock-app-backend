import {useDraggable} from "@dnd-kit/core";
import {forwardRef} from 'react';

/*
    This Component requires data to be displayed. Draggable Items need `name={}` to define them.
    May choose `element={}`, default is `<div>`. May provide classes `className={}` using Tailwind.
*/
export default function DraggableItem({ name, className = '', ...props }){
    const Element = props.element ? props.element : 'div';
    console.log(props)
    const {setNodeRef, attributes, listeners} = useDraggable({
        id: props.name,
    });

    let elementClassName = 'm-1 p-2 border border-indigo-300 bg-indigo-500 rounded-md' + className;

    // Dynamic item to allow for useDraggable hook and better performance
    const Item = forwardRef(({children, ...props}, ref) => {
        return ( <span {...props} ref={ref}>{children}</span> );
    });

    return (
        <Element className={elementClassName} ref={setNodeRef} {...listeners} {...attributes} {...props}>
            <Item className={'text-lavender-200 '}>
                {props.children}
            </Item>
        </Element>
    )
}
