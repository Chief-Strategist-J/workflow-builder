import React, { useState, useRef, useEffect } from 'react'
import { Brain } from 'lucide-react'
import { AgentNode } from './components/AgentNode'
import { Sidebar } from './components/AgentSidebar'
import { ConnectionLine } from './components/ConnectionLine'
import { agentNodeTypes } from './constants/agentNodes'

export const App = () => {
  const [nodes, setNodes] = useState<AgentNodeType[]>([])
  const [connections, setConnections] = useState<AgentConnection[]>([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [connectingFrom, setConnectingFrom] = useState<{ nodeId: string; x: number; y: number } | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)
  const nodeIdCounter = useRef(0)

  const onDragStart = (e: React.DragEvent, nodeType: any) => {
    e.dataTransfer.setData('nodeType', JSON.stringify(nodeType))
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const nodeType = JSON.parse(e.dataTransfer.getData('nodeType'))

    if (canvasRef.current) {
      const x = e.clientX - canvasRef.current.getBoundingClientRect().left - 100
      const y = e.clientY - canvasRef.current.getBoundingClientRect().top - 50

      const newNode: AgentNodeType = {
        id: `node-${nodeIdCounter.current++}`,
        x,
        y,
        type: nodeType,
        selected: false,
        config: {}
      }

      setNodes([...nodes, newNode])
    }
  }

  const handleSelectNode = (id: string) => {
    setNodes(nodes.map(n => ({ ...n, selected: n.id === id })))
    setSelectedNodeId(id)
  }

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id))
    setConnections(connections.filter(c => c.from !== id && c.to !== id))
    if (selectedNodeId === id) setSelectedNodeId(null)
  }

  const handleDragNode = (id: string, x: number, y: number) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, x, y } : n))
  }

  const handleStartConnection = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId)
    if (node && canvasRef.current) {
      setConnectingFrom({
        nodeId,
        x: node.x + 200,
        y: node.y + 50
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (connectingFrom) {
      const target = (e.target as HTMLElement).closest('[data-node-id]')
      if (target) {
        const toNodeId = target.getAttribute('data-node-id')
        if (toNodeId && toNodeId !== connectingFrom.nodeId) {
          const toNode = nodes.find(n => n.id === toNodeId)
          if (toNode) {
            const newConnection: AgentConnection = {
              id: `conn-${connections.length}`,
              from: connectingFrom.nodeId,
              to: toNodeId,
              fromX: connectingFrom.x,
              fromY: connectingFrom.y,
              toX: toNode.x,
              toY: toNode.y + 50
            }
            setConnections([...connections, newConnection])
          }
        }
      }
      setConnectingFrom(null)
    }
  }

  const handleRun = () => {
    alert('🚀 Workflow execution started! (Demo mode)')
  }

  const handleSave = () => {
    alert('💾 Project saved successfully! (Demo mode)')
  }

  // Update connection positions when nodes move
  useEffect(() => {
    setConnections(connections.map(conn => {
      const fromNode = nodes.find(n => n.id === conn.from)
      const toNode = nodes.find(n => n.id === conn.to)
      if (fromNode && toNode) {
        return {
          ...conn,
          fromX: fromNode.x + 200,
          fromY: fromNode.y + 50,
          toX: toNode.x,
          toY: toNode.y + 50
        }
      }
      return conn
    }))
  }, [nodes])

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #030712 0%, #111827 100%)',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '320px',
        height: '100vh',
        background: 'rgba(17, 24, 39, 0.95)',
        backdropFilter: 'blur(16px)',
        borderRight: '1px solid rgba(55, 65, 81, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(55, 65, 81, 0.5)',
          background: 'rgba(30, 0, 0, 0.6)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontSize: '16px' }}>✨</span>
              </div>
              <div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '0'
                }}>Agent Studio</h2>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(156, 163, 175, 0.7)',
                  margin: '0'
                }}>Build AI workflows</p>
              </div>
            </div>
          </div>
        </div>

        {/* Node Types */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px'
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: '600',
            color: 'rgba(156, 163, 175, 0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px'
          }}>
            Components
          </div>

          {/* LLM Agent */}
          <div
            draggable
            onDragStart={(e) => onDragStart(e, agentNodeTypes[0])}
            style={{
              cursor: 'grab',
              marginBottom: '12px'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              padding: '2px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{
                background: 'rgba(17, 24, 39, 0.95)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontSize: '16px' }}>🧠</span>
                  </div>
                  <div style={{ flex: 1, minWidth: '0' }}>
                    <div style={{
                      color: 'white',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}>LLM Agent</div>
                    <div style={{
                      color: 'rgba(156, 163, 175, 0.7)',
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>AI language model agent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div
            draggable
            onDragStart={(e) => onDragStart(e, agentNodeTypes[1])}
            style={{
              cursor: 'grab',
              marginBottom: '12px'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
              padding: '2px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{
                background: 'rgba(17, 24, 39, 0.95)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontSize: '16px' }}>💬</span>
                  </div>
                  <div style={{ flex: 1, minWidth: '0' }}>
                    <div style={{
                      color: 'white',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}>Chat Interface</div>
                    <div style={{
                      color: 'rgba(156, 163, 175, 0.7)',
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>User interaction point</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Source */}
          <div
            draggable
            onDragStart={(e) => onDragStart(e, agentNodeTypes[2])}
            style={{
              cursor: 'grab',
              marginBottom: '12px'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              padding: '2px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{
                background: 'rgba(17, 24, 39, 0.95)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontSize: '16px' }}>🗄️</span>
                  </div>
                  <div style={{ flex: 1, minWidth: '0' }}>
                    <div style={{
                      color: 'white',
                      fontWeight: '500',
                      fontSize: '14px'
                    }}>Data Source</div>
                    <div style={{
                      color: 'rgba(156, 163, 175, 0.7)',
                      fontSize: '12px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>Connect to databases</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid rgba(55, 65, 81, 0.5)'
        }}>
          <button
            onClick={handleRun}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '8px'
            }}
          >
            <span>▶️</span>
            Run Workflow
          </button>
          <button
            onClick={handleSave}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px 16px',
              background: 'rgba(55, 65, 81, 0.8)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <span>💾</span>
            Save Project
          </button>
        </div>
      </div>

      <div
        ref={canvasRef}
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden'
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onMouseMove={handleMouseMove}
        onClick={handleCanvasClick}
      >
        {/* Grid Background */}
        <svg style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.2
        }}>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#374151" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Connections */}
        <svg style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}>
          <defs>
            {connections.map(conn => (
              <linearGradient key={`gradient-${conn.id}`} id={`gradient-${conn.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            ))}
          </defs>
          {connections.map(conn => (
            <ConnectionLine key={conn.id} connection={conn} />
          ))}
          {connectingFrom && (
            <line
              x1={connectingFrom.x}
              y1={connectingFrom.y}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="#a855f7"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )}
        </svg>

        {/* Nodes */}
        {nodes.map(node => (
          <AgentNode
            key={node.id}
            node={node}
            onSelect={handleSelectNode}
            onDelete={handleDeleteNode}
            onStartConnection={handleStartConnection}
            onDrag={handleDragNode}
          />
        ))}

        {/* Info Panel */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(55, 65, 81, 0.5)',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          maxWidth: '300px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontSize: '16px' }}>🧠</span>
            </div>
            <div>
              <h3 style={{
                color: 'white',
                fontWeight: '600',
                margin: '0',
                fontSize: '16px'
              }}>Getting Started</h3>
              <p style={{
                color: 'rgba(156, 163, 175, 0.7)',
                fontSize: '12px',
                margin: '0'
              }}>Drag & drop to build</p>
            </div>
          </div>
          <p style={{
            color: 'rgba(156, 163, 175, 0.9)',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '8px'
          }}>
            Drag components from the sidebar and connect them by clicking the purple circle on the right of each node.
          </p>
          <div style={{
            fontSize: '12px',
            color: 'rgba(156, 163, 175, 0.7)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '4px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#3b82f6',
                borderRadius: '50%'
              }}></div>
              <span>Input connection point</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                background: '#a855f7',
                borderRadius: '50%'
              }}></div>
              <span>Output connection point</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}