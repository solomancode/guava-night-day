import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import { CardSet } from './CardSet';

function swap(cardSet, index1, index2) {
    var temp = cardSet[index1];
    cardSet[index1] = cardSet[index2];
    cardSet[index2] = temp;
    return cardSet;
}

export function Game({ options }) {
    const [selectedSets, setSelectedSets] = useState([]);
    const [selected, setSelected] = useState([]);
    const [cardSet, setCardSet] = useState([]);

    function permute(list, startIndex, endIndex, result = []) {
        if (startIndex === endIndex) {
            result.push([...list])
        } else {
            let i = startIndex;
            for (; i <= endIndex; i++) {
                swap(list, startIndex, i);
                permute(list, startIndex + 1, endIndex, result);
                swap(list, i, startIndex);
            }
        }
        return result;
    }

    useEffect(() => {
        const result = [];
        permute(options, 0, options.length - 1, result);
        setCardSet(result);
    }, []);

    function select(id) {
        setSelected(s => {
            if (s.includes(id)) return s;
            if (s.length + 1 === options.length) {
                setSelectedSets(s => {
                    const next = [...selected, id].join();
                    if (s.includes(next) === false) {
                        return [...s, next]
                    } else {
                        return s
                    }
                })
                return [];
            } else {
                return [...s, id]
            }
        });
    }

    return (
        <section style={{ height: '100vh' }} className="flex flex-column justify-between">
            {
                selectedSets.length === cardSet.length
                ? <h1 className="tc green">YOU WIN</h1>
                : null
            }
            <h1 className="tc">{cardSet.length - selectedSets.length} REMAINING</h1>
            <section className="flex justify-center h-100 items-center">
                {cardSet.map((s, i) => <CardSet selected={selected} selectedSets={selectedSets} key={i} list={s} />)}
            </section>
            <section className="flex justify-center pointer bg-black-05 pa4">
                {
                    options.map(o => <Card key={o} onClick={() => select(o)} id={o} />)
                }
            </section>
        </section>
    );
}