"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { AlertTriangle, TrendingUp, Zap, AlertCircle, Activity, Shield, Target, Sparkles, Brain, Network, ArrowUp, ArrowDown, Minus } from "lucide-react"
import { useState } from "react"

const supplyChainData = [
  { node: "Supplier A", health: 85, risk: 15, performance: 88 },
  { node: "Supplier B", health: 72, risk: 28, performance: 75 },
  { node: "Distributor C", health: 90, risk: 10, performance: 92 },
  { node: "Warehouse D", health: 65, risk: 35, performance: 68 },
  { node: "Transport E", health: 78, risk: 22, performance: 80 },
]

const riskTrends = [
  { month: "Jan", high: 12, medium: 24, low: 35, total: 71 },
  { month: "Feb", high: 10, medium: 22, low: 38, total: 70 },
  { month: "Mar", high: 15, medium: 28, low: 32, total: 75 },
  { month: "Apr", high: 8, medium: 20, low: 41, total: 69 },
  { month: "May", high: 11, medium: 25, low: 38, total: 74 },
  { month: "Jun", high: 9, medium: 19, low: 42, total: 70 },
]

const performanceData = [
  { category: "Reliability", value: 85 },
  { category: "Speed", value: 78 },
  { category: "Quality", value: 92 },
  { category: "Cost", value: 75 },
  { category: "Flexibility", value: 88 },
]

const realtimeMetrics = [
  {
    title: "High Risk Nodes",
    value: "12",
    change: "+2",
    trend: "up",
    subtitle: "from last week",
    icon: AlertTriangle,
    color: "#F2613F",
    percentage: 25.5
  },
  {
    title: "System Health",
    value: "78%",
    change: "+5%",
    trend: "up",
    subtitle: "Improving",
    icon: Activity,
    color: "#72A829",
    percentage: 78
  },
  {
    title: "Active Alerts",
    value: "5",
    change: "-3",
    trend: "down",
    subtitle: "Requires attention",
    icon: Zap,
    color: "#FFA07A",
    percentage: 10.6
  },
  {
    title: "Total Nodes",
    value: "47",
    change: "+3",
    trend: "up",
    subtitle: "Across 3 tiers",
    icon: Network,
    color: "#F2613F",
    percentage: 100
  }
]

const aiInsights = [
  {
    type: "warning",
    title: "Potential Disruption Detected",
    message: "Warehouse D showing 35% risk increase. Recommend backup activation.",
    time: "5 min ago",
    priority: "high"
  },
  {
    type: "success",
    title: "Risk Mitigation Successful",
    message: "Supplier B risk reduced by 12% through diversification strategy.",
    time: "1 hour ago",
    priority: "medium"
  },
  {
    type: "info",
    title: "Performance Optimization",
    message: "Transport E efficiency improved by 8% using AI route optimization.",
    time: "2 hours ago",
    priority: "low"
  }
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#F2613F] rounded-lg p-3 sm:p-4 shadow-2xl">
        <p className="text-white font-semibold mb-2 text-xs sm:text-sm">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-xs sm:text-sm">
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

const MetricCard = ({ metric }) => {
  const Icon = metric.icon
  const getTrendIcon = () => {
    if (metric.trend === "up") return <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />
    if (metric.trend === "down") return <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />
    return <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
  }

  const getTrendColor = () => {
    if (metric.trend === "up" && metric.title === "System Health") return "#72A829"
    if (metric.trend === "down" && metric.title === "Active Alerts") return "#72A829"
    if (metric.trend === "up") return "#F2613F"
    if (metric.trend === "down") return "#72A829"
    return "#FFA07A"
  }

  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-opacity-80 transition-all duration-300 hover:shadow-2xl hover:scale-105 relative overflow-hidden group">
      {/* Animated background gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" 
           style={{ backgroundColor: metric.color }} />
      
      <CardContent className="p-4 sm:p-6 relative z-10">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center" 
               style={{ backgroundColor: metric.color + "20" }}>
            <Icon className="w-5 h-5 sm:w-7 sm:h-7" style={{ color: metric.color }} />
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold text-xs sm:text-sm"
               style={{ 
                 backgroundColor: getTrendColor() + "20",
                 color: getTrendColor()
               }}>
            {getTrendIcon()}
            <span>{metric.change}</span>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">{metric.title}</p>
          <p className="text-2xl sm:text-4xl font-bold text-white mb-1">{metric.value}</p>
          <p className="text-[10px] sm:text-xs" style={{ color: metric.color }}>{metric.subtitle}</p>
        </div>
      </CardContent>
    </Card>
  )
}

const InsightCard = ({ insight }) => {
  const getConfig = () => {
    if (insight.type === "warning") return { 
      color: "#F2613F", 
      bg: "#F2613F15", 
      icon: AlertTriangle 
    }
    if (insight.type === "success") return { 
      color: "#72A829", 
      bg: "#72A82915", 
      icon: Shield 
    }
    return { 
      color: "#FFA07A", 
      bg: "#FFA07A15", 
      icon: Brain 
    }
  }

  const config = getConfig()
  const Icon = config.icon

  return (
    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105"
         style={{ backgroundColor: config.bg, borderColor: config.color + "40" }}>
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
           style={{ backgroundColor: config.color + "30" }}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: config.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-white font-semibold text-xs sm:text-sm line-clamp-2">{insight.title}</h4>
          <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full capitalize flex-shrink-0"
                style={{ backgroundColor: config.color + "20", color: config.color }}>
            {insight.priority}
          </span>
        </div>
        <p className="text-gray-400 text-[10px] sm:text-xs mb-1 sm:mb-2 line-clamp-2">{insight.message}</p>
        <p className="text-gray-500 text-[10px] sm:text-xs">{insight.time}</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [selectedNode, setSelectedNode] = useState(null)

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 bg-black min-h-screen">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2613F]/30 via-[#9B3922]/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F2613F]/20 via-transparent to-transparent blur-3xl" />
        <div className="relative p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#F2613F]/20 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur border-2 border-[#F2613F]">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#F2613F]" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">Supply Chain Command Center</h1>
                  <p className="text-gray-400 flex items-center gap-2 mt-0.5 sm:mt-1 text-xs sm:text-sm">
                    <Activity className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
                    Real-time AI-powered intelligence
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 bg-[#0a0a0a]/60 backdrop-blur-lg border-2 border-[#72A829] rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#72A829] animate-pulse" />
              <div>
                <p className="text-[10px] sm:text-xs text-gray-400">System Status</p>
                <p className="text-[#72A829] font-bold text-xs sm:text-sm md:text-base">All Systems Operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {realtimeMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Supply Chain Health */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-[#F2613F]/5 to-transparent rounded-full blur-3xl" />
          <CardHeader className="relative z-10 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <CardTitle className="text-[#F2613F] flex items-center gap-2 text-base sm:text-lg md:text-xl">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                  Supply Chain Health Matrix
                </CardTitle>
                <CardDescription className="text-gray-400 mt-1 text-xs sm:text-sm">
                  Node performance and risk analysis
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 bg-[#F2613F]/10 border border-[#F2613F] rounded-lg px-3 sm:px-4 py-1.5 sm:py-2">
                <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-[#F2613F] animate-pulse" />
                <span className="text-[#F2613F] font-semibold text-xs sm:text-sm">Live</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={250} className="sm:hidden">
              <BarChart data={supplyChainData}>
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#72A829" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#72A829" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2613F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F2613F" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#481E14" opacity={0.3} />
                <XAxis dataKey="node" stroke="#999" style={{ fontSize: '10px' }} angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#999" style={{ fontSize: '10px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="health" fill="url(#healthGradient)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="risk" fill="url(#riskGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={350} className="hidden sm:block">
              <BarChart data={supplyChainData}>
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#72A829" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#72A829" stopOpacity={0.4}/>
                  </linearGradient>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2613F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F2613F" stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#481E14" opacity={0.3} />
                <XAxis dataKey="node" stroke="#999" style={{ fontSize: '12px' }} />
                <YAxis stroke="#999" style={{ fontSize: '12px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="health" fill="url(#healthGradient)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="risk" fill="url(#riskGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Radar */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14]">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-[#72A829] flex items-center gap-2 text-base sm:text-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              Performance Score
            </CardTitle>
            <CardDescription className="text-gray-400 text-xs sm:text-sm">
              Key metrics overview
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={250} className="sm:hidden">
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#481E14" />
                <PolarAngleAxis dataKey="category" stroke="#999" style={{ fontSize: '9px' }} />
                <PolarRadiusAxis stroke="#999" style={{ fontSize: '9px' }} />
                <Radar name="Performance" dataKey="value" stroke="#72A829" fill="#72A829" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={300} className="hidden sm:block">
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#481E14" />
                <PolarAngleAxis dataKey="category" stroke="#999" style={{ fontSize: '11px' }} />
                <PolarRadiusAxis stroke="#999" />
                <Radar name="Performance" dataKey="value" stroke="#72A829" fill="#72A829" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Trends and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Risk Trends Chart */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] overflow-hidden relative">
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-[#72A829]/5 to-transparent rounded-full blur-3xl" />
          <CardHeader className="relative z-10 p-4 sm:p-6">
            <CardTitle className="text-[#F2613F] flex items-center gap-2 text-base sm:text-lg md:text-xl">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              Risk Trend Analysis
            </CardTitle>
            <CardDescription className="text-gray-400 text-xs sm:text-sm">
              6-month historical risk distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={250} className="sm:hidden">
              <AreaChart data={riskTrends}>
                <defs>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2613F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F2613F" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFA07A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFA07A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#72A829" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#72A829" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#481E14" opacity={0.3} />
                <XAxis dataKey="month" stroke="#999" style={{ fontSize: '10px' }} />
                <YAxis stroke="#999" style={{ fontSize: '10px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Area type="monotone" dataKey="high" stackId="1" stroke="#F2613F" fill="url(#colorHigh)" />
                <Area type="monotone" dataKey="medium" stackId="1" stroke="#FFA07A" fill="url(#colorMedium)" />
                <Area type="monotone" dataKey="low" stackId="1" stroke="#72A829" fill="url(#colorLow)" />
              </AreaChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={350} className="hidden sm:block">
              <AreaChart data={riskTrends}>
                <defs>
                  <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2613F" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#F2613F" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFA07A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FFA07A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#72A829" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#72A829" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#481E14" opacity={0.3} />
                <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} />
                <YAxis stroke="#999" style={{ fontSize: '12px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="high" stackId="1" stroke="#F2613F" fill="url(#colorHigh)" />
                <Area type="monotone" dataKey="medium" stackId="1" stroke="#FFA07A" fill="url(#colorMedium)" />
                <Area type="monotone" dataKey="low" stackId="1" stroke="#72A829" fill="url(#colorLow)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Insights Panel */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14]">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-[#FFA07A] flex items-center gap-2 text-base sm:text-lg">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
              AI Insights
            </CardTitle>
            <CardDescription className="text-gray-400 text-xs sm:text-sm">
              Real-time recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6">
            {aiInsights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}