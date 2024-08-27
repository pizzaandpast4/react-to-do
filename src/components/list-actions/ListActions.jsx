/* eslint-disable react/prop-types */
export function ListActions(props) {
    const { updateSorting } = props;

    return (
        <div className="list-actions">
            <div className="title">Rikiavimas:</div>
            <button onClick={() => updateSorting('timeAsc')} className="active">Laikas 0-9</button>
            <button onClick={() => updateSorting('timeDes')}>Laikas 9-0</button>
            <button onClick={() => updateSorting('colorAsc')}>Spalva A-Z</button>
            <button onClick={() => updateSorting('colorDes')}>Spalva Z-A</button>
            <button onClick={() => updateSorting('textAsc')}>Pavadinimas A-Z</button>
            <button onClick={() => updateSorting('textDes')}>Pavadinimas Z-A</button>
        </div>
    );
}