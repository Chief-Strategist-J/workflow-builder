import React from 'react'
import { AgentConnection } from '../types'

interface ConnectionLineProps {
  connection: AgentConnection
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ connection }) => {
  const controlPointOffset = Math.abs(connection.toX - connection.fromX) * 0.5

  const path = `M ${connection.fromX} ${connection.fromY}
                C ${connection.fromX + controlPointOffset} ${connection.fromY},
                  ${connection.toX - controlPointOffset} ${connection.toY},
                  ${connection.toX} ${connection.toY}`

  return (
    <g>
      <path
        d={path}
        stroke={`url(#gradient-${connection.id})`}
        strokeWidth="2"
        fill="none"
        className="transition-all duration-300"
      />
    </g>
  )
}
