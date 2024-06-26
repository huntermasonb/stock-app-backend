import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import {forwardRef} from 'react';

/*
    This Component requires data to be displayed and is built for React dndkit. Draggable Items need `name={}` to define them.
    May choose `element={}`, default is `<div>`. May provide classes `className={}` using Tailwind. An `id={}` is also recommended.

    Additionally, this component can be attached to listeners which will
*/
export function DraggableItem({name, className = '', ...props }){
    const Element = props.element ? props.element : 'div';

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging
    } = useSortable({id: name});

    // Special style that needs to be written in CSS for DND kit to show the items moving
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    let elementClassName = 'm-1 p-2 border border-indigo-300 bg-indigo-500 rounded-md' + className;

    return (
        <Element ref={setNodeRef} style={style} className={elementClassName} {...listeners} {...attributes} {...props}>
            <Item className={'text-lavender-100 translate'} name={name} />
        </Element>
    )
}

// Dynamic item to allow for useDraggable hook and better performance
export const Item = forwardRef(({name, ...props}, ref) => {
    return ( <span {...props} ref={ref}>{name}</span> );
});
