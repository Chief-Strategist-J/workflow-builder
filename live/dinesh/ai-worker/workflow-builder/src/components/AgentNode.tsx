import React, { useState, useEffect } from 'react'
import { Trash2, Settings } from 'lucide-react'
import { AgentNode as AgentNodeType } from '../types'
import { iconMap } from '../constants/icons'
import { Button } from './ui/button'

interface AgentNodeProps {
  node: AgentNodeType
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onStartConnection: (nodeId: string) => void
  onDrag: (id: string, x: number, y: number) => void
}

export const AgentNode: React.FC<AgentNodeProps> = ({
  node,
  onSelect,
  onDelete,
  onStartConnection,
  onDrag
}) => {
  const IconComponent = iconMap[node.type.icon]
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return

    setIsDragging(true)
    setDragStart({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    })
    onSelect(node.id)
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      onDrag(node.id, e.clientX - dragStart.x, e.clientY - dragStart.y)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, node.id, dragStart, onDrag])

  return (
    <div
      style={{
        position: 'absolute',
        left: node.x,
        top: node.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        transform: node.selected ? 'scale(1.05)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s',
      }}
      onMouseDown={handleMouseDown}
      className="group"
      data-node-id={node.id}
    >
      <div className={`
        relative bg-gradient-to-br ${node.type.color} p-[2px] rounded-2xl
        shadow-lg hover:shadow-2xl transition-all duration-300
        ${node.selected ? 'ring-4 ring-white/50' : ''}
      `}>
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl p-4 w-[200px]">
          {/* Input Handle */}
          <div
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-gray-900 cursor-pointer hover:scale-125 transition-transform"
            data-handle="input"
          />

          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${node.type.color}` }>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold text-sm">{node.type.label}</div>
              <div className="text-gray-400 text-xs">{node.type.id}</div>
            </div>
          </div>

          {Object.keys(node.config).length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-700/50">
              <div className="text-xs text-gray-400 space-y-1">
                {Object.entries(node.config).slice(0, 2).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="opacity-70">{key}:</span>
                    <span className="font-medium text-gray-300">{String(value).slice(0, 15)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Output Handle */}
          <div
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-gray-900 cursor-pointer hover:scale-125 transition-transform"
            data-handle="output"
            onMouseDown={(e) => {
              e.stopPropagation()
              onStartConnection(node.id)
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(node.id)
          }}
          className="p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="p-1.5 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Settings className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
