import {SortableContext} from "@dnd-kit/sortable";

// Droppan
export function DroppableArea({ className = '', ...props }) {
    const Element = props.element ? props.element : 'div';
    //console.log(props)

    className = 'border border:indigo-700 bg-lavender-200' + className;

    return (
        <Element className={className}>
            <SortableContext items={props.items} {...props} />
        </Element>
    );
}
