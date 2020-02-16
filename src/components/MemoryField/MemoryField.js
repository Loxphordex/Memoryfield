import React from 'react'
import { getLevelDetails } from '../../levels/levelDetails'
import GenerateNodes from '../MemoryNode/GenerateNodes'

// Presents memory nodes and level info
export default function MemoryField({ currentLevel }) {

    const nodes = getLevelDetails(currentLevel)

    return (
        <section className='memory-field'>
            <GenerateNodes nodes={nodes} />
        </section>
    )
}