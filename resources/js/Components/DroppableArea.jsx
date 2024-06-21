import {useDroppable} from "@dnd-kit/core";

// All Droppable Areas must have a unique ID.
export default function DroppableArea({ className = '', ...props }) {
    const Element = props.element ? props.element : 'div';
    console.log(props)
    const {isOver, setNodeRef} = useDroppable({
        id: props.name,
    });
    className = isOver ? 'border border:indigo-500 bg-lavender-400' + className : 'border border:indigo-700 bg-lavender-200' + className;

    return (
        <Element ref={setNodeRef} className={className} {...props}>
            {props.children}
        </Element>
    );
}
