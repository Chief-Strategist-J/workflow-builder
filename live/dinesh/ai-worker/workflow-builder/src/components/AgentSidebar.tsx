import React, { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { AgentNodeType } from '../types'
import { agentNodeTypes } from '../constants/agentNodes'
import { iconMap } from '../constants/icons'
import { Sparkles, X, Plus, Play, Save } from 'lucide-react'

interface SidebarProps {
  onDragStart: (e: React.DragEvent, nodeType: AgentNodeType) => void
  onRun: () => void
  onSave: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ onDragStart, onRun, onSave }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className={`
      relative bg-gray-900/95 backdrop-blur-xl border-r border-gray-800
      transition-all duration-300 ease-in-out z-10
      ${isExpanded ? 'w-80' : 'w-16'}
    `}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            {isExpanded && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Agent Studio</h2>
                  <p className="text-xs text-gray-400">Build AI workflows</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <X className="w-5 h-5 text-gray-400" />
              ) : (
                <Plus className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Node Types */}
        {isExpanded && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Components
            </div>
            <Accordion type="multiple" className="space-y-2">
              {/* AI Agents */}
              <AccordionItem value="ai-agents">
                <AccordionTrigger className="text-white hover:bg-gray-800 rounded-lg px-3 py-2">
                  AI Agents
                </AccordionTrigger>
                <AccordionContent className="space-y-2 mt-2">
                  {agentNodeTypes.filter(type => type.id === 'llm').map((type) => {
                    const IconComponent = iconMap[type.icon]
                    return (
                      <div
                        key={type.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, type as AgentNodeType)}
                        className="group cursor-grab active:cursor-grabbing"
                      >
                        <div className={`
                          relative bg-gradient-to-br ${type.color} p-[2px] rounded-xl
                          hover:shadow-xl transition-all duration-300 hover:scale-105
                        `}>
                          <div className="bg-gray-900/95 rounded-xl p-3 hover:bg-gray-800/95 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${type.color}` }>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-medium text-sm">{type.label}</div>
                                <div className="text-gray-400 text-xs truncate">{type.description}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>

              {/* Interactions */}
              <AccordionItem value="interactions">
                <AccordionTrigger className="text-white hover:bg-gray-800 rounded-lg px-3 py-2">
                  Interactions
                </AccordionTrigger>
                <AccordionContent className="space-y-2 mt-2">
                  {agentNodeTypes.filter(type => type.id === 'chat').map((type) => {
                    const IconComponent = iconMap[type.icon]
                    return (
                      <div
                        key={type.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, type as AgentNodeType)}
                        className="group cursor-grab active:cursor-grabbing"
                      >
                        <div className={`
                          relative bg-gradient-to-br ${type.color} p-[2px] rounded-xl
                          hover:shadow-xl transition-all duration-300 hover:scale-105
                        `}>
                          <div className="bg-gray-900/95 rounded-xl p-3 hover:bg-gray-800/95 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${type.color}` }>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-medium text-sm">{type.label}</div>
                                <div className="text-gray-400 text-xs truncate">{type.description}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>

              {/* Data Sources */}
              <AccordionItem value="data-sources">
                <AccordionTrigger className="text-white hover:bg-gray-800 rounded-lg px-3 py-2">
                  Data Sources
                </AccordionTrigger>
                <AccordionContent className="space-y-2 mt-2">
                  {agentNodeTypes.filter(type => type.id === 'database').map((type) => {
                    const IconComponent = iconMap[type.icon]
                    return (
                      <div
                        key={type.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, type as AgentNodeType)}
                        className="group cursor-grab active:cursor-grabbing"
                      >
                        <div className={`
                          relative bg-gradient-to-br ${type.color} p-[2px] rounded-xl
                          hover:shadow-xl transition-all duration-300 hover:scale-105
                        `}>
                          <div className="bg-gray-900/95 rounded-xl p-3 hover:bg-gray-800/95 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${type.color}` }>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-medium text-sm">{type.label}</div>
                                <div className="text-gray-400 text-xs truncate">{type.description}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>

              {/* Execution */}
              <AccordionItem value="execution">
                <AccordionTrigger className="text-white hover:bg-gray-800 rounded-lg px-3 py-2">
                  Execution
                </AccordionTrigger>
                <AccordionContent className="space-y-2 mt-2">
                  {agentNodeTypes.filter(type => type.id === 'code' || type.id === 'workflow').map((type) => {
                    const IconComponent = iconMap[type.icon]
                    return (
                      <div
                        key={type.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, type as AgentNodeType)}
                        className="group cursor-grab active:cursor-grabbing"
                      >
                        <div className={`
                          relative bg-gradient-to-br ${type.color} p-[2px] rounded-xl
                          hover:shadow-xl transition-all duration-300 hover:scale-105
                        `}>
                          <div className="bg-gray-900/95 rounded-xl p-3 hover:bg-gray-800/95 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${type.color}` }>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-medium text-sm">{type.label}</div>
                                <div className="text-gray-400 text-xs truncate">{type.description}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>

              {/* Logic */}
              <AccordionItem value="logic">
                <AccordionTrigger className="text-white hover:bg-gray-800 rounded-lg px-3 py-2">
                  Logic
                </AccordionTrigger>
                <AccordionContent className="space-y-2 mt-2">
                  {agentNodeTypes.filter(type => type.id === 'condition').map((type) => {
                    const IconComponent = iconMap[type.icon]
                    return (
                      <div
                        key={type.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, type as AgentNodeType)}
                        className="group cursor-grab active:cursor-grabbing"
                      >
                        <div className={`
                          relative bg-gradient-to-br ${type.color} p-[2px] rounded-xl
                          hover:shadow-xl transition-all duration-300 hover:scale-105
                        `}>
                          <div className="bg-gray-900/95 rounded-xl p-3 hover:bg-gray-800/95 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${type.color}` }>
                                <IconComponent className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-medium text-sm">{type.label}</div>
                                <div className="text-gray-400 text-xs truncate">{type.description}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* Actions */}
        {isExpanded && (
          <div className="p-4 border-t border-gray-800 space-y-2">
            <button
              onClick={onRun}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Run Workflow
            </button>
            <button
              onClick={onSave}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
            >
              <Save className="w-5 h-5" />
              Save Project
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
