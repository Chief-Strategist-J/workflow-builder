import { memo } from 'react'
import { EdgeProps, getBezierPath, BaseEdge } from 'reactflow'

export const CustomEdge = memo(({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        stroke: selected ? '#ff4d4f' : '#3e3e42',
        strokeWidth: selected ? 3 : 2,
        ...style,
      }}
    />
  )
})

CustomEdge.displayName = 'CustomEdge'
