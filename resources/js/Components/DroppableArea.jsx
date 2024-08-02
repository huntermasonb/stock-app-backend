import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

/*
Re-usable `<SortableContext />` component with a fully customizable `Element` wrapper supporting `className={}` for tailwind styling.
`<SortableContext />` supports `id={}` which is required,`name={}`, `items={}` for items to be listed, `strategy={}` for sorting strategy, and other `children={}`.
*/
export default function DroppableArea({name= '', id, className = '', ...props }) {
    const Element = props.element ? props.element : 'div';
    //console.log(props)

    className = 'p-2 rounded ' + className;

    return (
        <Element className={className}>
            <SortableContext
                id={id}
                name={name}
                items={props.items}
                strategy={props.strategy ? props.strategy : verticalListSortingStrategy}
                className={'min-h-40'}
                children={props.children}
                {...props}
            />
        </Element>
    );
}
