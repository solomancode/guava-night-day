import React, { useEffect, useState } from 'react';

const SRC_DEFAULT = {
    1: 'guava.png',
    2: 'AM.png',
    3: 'PM.png'
}

const SRC_SWAPPED = {
    1: 'guava.png',
    2: 'PM.png',
    3: 'AM.png'
}

export function Card({ id, isSelected, onClick, selected = [] }) {
    const [src, setSrc] = useState(SRC_DEFAULT);
    useEffect(() => {
        if (selected&&selected.includes(1)) {
            setSrc(SRC_SWAPPED)
        } else {
            setSrc(SRC_DEFAULT)
        }
    }, [selected])
    return (
        <article className={onClick ? 'grow' : ''} onClick={onClick}>
            {isSelected && <span className="pa2 bg-green ba b--white absolute br-100"></span>}
            <img src={src[id]} alt="Guava"/>
        </article>
    )
}