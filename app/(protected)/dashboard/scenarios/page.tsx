"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Play, Layers, Network, TrendingDown, AlertCircle, DollarSign, Clock, Users, BarChart3, Sparkles, Database, GitBranch, Activity } from "lucide-react"
import { useState } from "react"

const scenarios = [
  { 
    id: 1, 
    name: "Port Strike Impact", 
    description: "Major port labor strike affecting West Coast operations",
    impact: "High", 
    nodes: 8,
    probability: 35,
    financialImpact: "$2.4M",
    duration: "2-3 weeks",
    affectedRegions: ["North America", "Asia Pacific"],
    cascadeRisk: 68,
    category: "Labor",
    lastRun: "2 days ago",
    status: "active"
  },
  { 
    id: 2, 
    name: "Supplier Bankruptcy", 
    description: "Critical Tier-1 supplier financial collapse scenario",
    impact: "Critical", 
    nodes: 3,
    probability: 12,
    financialImpact: "$5.8M",
    duration: "4-6 weeks",
    affectedRegions: ["Europe"],
    cascadeRisk: 92,
    category: "Financial",
    lastRun: "5 hours ago",
    status: "monitoring"
  },
  { 
    id: 3, 
    name: "Weather Disruption", 
    description: "Severe hurricane affecting transportation networks",
    impact: "Medium", 
    nodes: 5,
    probability: 45,
    financialImpact: "$1.2M",
    duration: "1-2 weeks",
    affectedRegions: ["North America"],
    cascadeRisk: 52,
    category: "Natural",
    lastRun: "1 week ago",
    status: "ready"
  },
  { 
    id: 4, 
    name: "Cyber Attack", 
    description: "Ransomware targeting logistics management systems",
    impact: "High", 
    nodes: 12,
    probability: 28,
    financialImpact: "$3.6M",
    duration: "3-4 weeks",
    affectedRegions: ["Global"],
    cascadeRisk: 75,
    category: "Technology",
    lastRun: "3 days ago",
    status: "ready"
  },
  { 
    id: 5, 
    name: "Trade Policy Change", 
    description: "New tariffs and import restrictions implemented",
    impact: "Medium", 
    nodes: 7,
    probability: 52,
    financialImpact: "$1.8M",
    duration: "8-12 weeks",
    affectedRegions: ["Asia Pacific", "Europe"],
    cascadeRisk: 58,
    category: "Regulatory",
    lastRun: "4 days ago",
    status: "ready"
  },
]

const modelingStats = [
  {
    title: "Scenarios Created",
    value: "47",
    change: "+12",
    icon: Layers,
    color: "#F2613F"
  },
  {
    title: "Simulations Run",
    value: "1,248",
    change: "+156",
    icon: Play,
    color: "#FFA07A"
  },
  {
    title: "Avg Accuracy",
    value: "94.7%",
    change: "+2.3%",
    icon: BarChart3,
    color: "#72A829"
  },
  {
    title: "Active Models",
    value: "18",
    change: "+3",
    icon: Database,
    color: "#F2613F"
  }
]

const impactConfig = {
  "Critical": {
    color: "#F2613F",
    bg: "#F2613F20",
    border: "#F2613F",
    icon: AlertCircle
  },
  "High": {
    color: "#FF6B35",
    bg: "#FF6B3520",
    border: "#FF6B35",
    icon: TrendingDown
  },
  "Medium": {
    color: "#FFA07A",
    bg: "#FFA07A20",
    border: "#FFA07A",
    icon: AlertCircle
  },
  "Low": {
    color: "#72A829",
    bg: "#72A82920",
    border: "#72A829",
    icon: AlertCircle
  }
}

const categoryIcons = {
  "Labor": Users,
  "Financial": DollarSign,
  "Natural": Zap,
  "Technology": Network,
  "Regulatory": GitBranch
}

const MetricCard = ({ metric }) => {
  const Icon = metric.icon
  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-opacity-60 transition-all duration-300 hover:shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" 
           style={{ backgroundColor: metric.color }} />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
               style={{ backgroundColor: metric.color + "20" }}>
            <Icon className="w-6 h-6" style={{ color: metric.color }} />
          </div>
          <span className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{ 
                  backgroundColor: metric.color + "20",
                  color: metric.color 
                }}>
            {metric.change}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-1">{metric.title}</p>
        <p className="text-3xl font-bold text-white">{metric.value}</p>
      </CardContent>
    </Card>
  )
}

const ScenarioCard = ({ scenario, onRun }) => {
  const [isRunning, setIsRunning] = useState(false)
  const config = impactConfig[scenario.impact]
  const Icon = config.icon
  const CategoryIcon = categoryIcons[scenario.category]

  const handleRun = () => {
    setIsRunning(true)
    setTimeout(() => {
      onRun(scenario)
      setIsRunning(false)
    }, 2000)
  }

  const getStatusColor = (status) => {
    if (status === "active") return "#F2613F"
    if (status === "monitoring") return "#FFA07A"
    return "#72A829"
  }

  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl group relative overflow-hidden"
          style={{ borderColor: config.border + "40" }}>
      
      {/* Animated background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ 
             background: `radial-gradient(circle at top right, ${config.color}08, transparent 70%)`
           }} />

      {/* Status indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm"
           style={{ backgroundColor: getStatusColor(scenario.status) + "20" }}>
        <div className="w-2 h-2 rounded-full animate-pulse" 
             style={{ backgroundColor: getStatusColor(scenario.status) }} />
        <span className="text-xs font-semibold capitalize" 
              style={{ color: getStatusColor(scenario.status) }}>
          {scenario.status}
        </span>
      </div>
      
      <CardContent className="p-6 relative z-10">
        <div className="flex gap-4">
          {/* Icon section */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center relative mb-2"
                 style={{ backgroundColor: config.bg, borderColor: config.border, borderWidth: '2px' }}>
              <Icon className="w-8 h-8" style={{ color: config.color }} />
            </div>
            <div className="w-16 h-8 rounded-lg flex items-center justify-center"
                 style={{ backgroundColor: categoryIcons[scenario.category] ? "#481E14" : "transparent" }}>
              {CategoryIcon && <CategoryIcon className="w-4 h-4 text-gray-400" />}
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-white font-bold text-xl">{scenario.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full font-bold" 
                        style={{ 
                          backgroundColor: config.bg,
                          color: config.color,
                          border: `1px solid ${config.color}`
                        }}>
                    {scenario.impact.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{scenario.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {scenario.affectedRegions.map((region, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 rounded bg-[#481E14] text-gray-300">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Network className="w-3.5 h-3.5" />
                  <span className="text-xs">Nodes</span>
                </div>
                <p className="text-white font-bold text-lg">{scenario.nodes}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="text-xs">Impact</span>
                </div>
                <p className="text-white font-bold text-lg">{scenario.financialImpact}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">Duration</span>
                </div>
                <p className="text-white font-bold text-sm">{scenario.duration}</p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span className="text-xs">Probability</span>
                </div>
                <p className="text-white font-bold text-lg">{scenario.probability}%</p>
              </div>
            </div>

            {/* Cascade Risk Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Cascade Risk Score</span>
                <span className="text-sm font-bold text-white">{scenario.cascadeRisk}%</span>
              </div>
              <div className="w-full bg-[#0a0a0a] rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700"
                  style={{ 
                    width: `${scenario.cascadeRisk}%`,
                    backgroundColor: config.color
                  }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last run: {scenario.lastRun}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{scenario.category}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleRun}
                disabled={isRunning}
                className="bg-gradient-to-r from-[#F2613F] to-[#9B3922] hover:from-[#9B3922] hover:to-[#F2613F] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#F2613F]/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Running...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Run Simulation
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const QuickActions = () => {
  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14]">
      <CardHeader>
        <CardTitle className="text-[#F2613F] flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Quick Actions
        </CardTitle>
        <CardDescription className="text-gray-400">
          Common scenario operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <button className="w-full bg-[#F2613F]/10 hover:bg-[#F2613F]/20 border-2 border-[#F2613F] rounded-lg p-4 text-left transition-all duration-200 hover:scale-105 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F2613F]/20 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#F2613F]" />
            </div>
            <div>
              <p className="text-[#F2613F] font-semibold">Create New Scenario</p>
              <p className="text-xs text-gray-400">Build custom simulation</p>
            </div>
          </div>
        </button>
        
        <button className="w-full bg-[#72A829]/10 hover:bg-[#72A829]/20 border-2 border-[#72A829] rounded-lg p-4 text-left transition-all duration-200 hover:scale-105 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#72A829]/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#72A829]" />
            </div>
            <div>
              <p className="text-[#72A829] font-semibold">Compare Scenarios</p>
              <p className="text-xs text-gray-400">Side-by-side analysis</p>
            </div>
          </div>
        </button>
        
        <button className="w-full bg-[#FFA07A]/10 hover:bg-[#FFA07A]/20 border-2 border-[#FFA07A] rounded-lg p-4 text-left transition-all duration-200 hover:scale-105 group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFA07A]/20 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-[#FFA07A]" />
            </div>
            <div>
              <p className="text-[#FFA07A] font-semibold">Export Results</p>
              <p className="text-xs text-gray-400">Download reports</p>
            </div>
          </div>
        </button>
      </CardContent>
    </Card>
  )
}

export default function ScenariosPage() {
  const [runningScenario, setRunningScenario] = useState(null)

  const handleRunScenario = (scenario) => {
    setRunningScenario(scenario)
    console.log("Running scenario:", scenario.name)
    // Add your simulation logic here
  }

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2613F]/20 via-[#9B3922]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F2613F]/10 to-transparent blur-xl" />
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#F2613F]/20 rounded-xl flex items-center justify-center backdrop-blur border-2 border-[#F2613F]">
              <Layers className="w-6 h-6 text-[#F2613F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Scenario Modeling & Simulation</h1>
              <p className="text-gray-400 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Test disruptions and analyze cascade effects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {modelingStats.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenarios List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#F2613F]" />
              Available Scenarios
            </h2>
            <span className="text-sm text-gray-400">{scenarios.length} scenarios</span>
          </div>
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} onRun={handleRunScenario} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions />
          
          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14]">
            <CardHeader>
              <CardTitle className="text-[#FFA07A] flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Runs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scenarios.slice(0, 3).map((scenario) => (
                <div key={scenario.id} className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-lg border border-gray-800">
                  <div className="w-2 h-2 rounded-full bg-[#72A829]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{scenario.name}</p>
                    <p className="text-xs text-gray-500">{scenario.lastRun}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}