import React from 'react';
import { Card } from './Card';

export function CardSet({ list, selected, selectedSets }) {
    return (
        selectedSets.includes(list.join())
        ? null
        : <section className="flex ma2 ba pa2 bw2 br4 b--black-10">
        {
            list.map((id, i) => <Card selected={selected} key={id.toString()+i} id={id} isSelected={id === selected[i]} />)
        }
        </section>
    ) 
}