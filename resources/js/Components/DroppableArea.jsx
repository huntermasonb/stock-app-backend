import {SortableContext} from "@dnd-kit/sortable";

// Droppan
export function DroppableArea({name= '', id = '', className = '', ...props }) {
    const Element = props.element ? props.element : 'div';
    //console.log(props)

    className = 'border-2 border:indigo-700 bg-indigo-100 rounded ' + className;

    return (
        <Element className={className}>
            <SortableContext id={id} name={name} items={props.items} strategy={props.strategy} children={props.children} {...props} />
        </Element>
    );
}
