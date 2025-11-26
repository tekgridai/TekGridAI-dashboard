"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { TrendingUp, Brain, AlertTriangle, Shield, Zap, Activity, Target, Sparkles } from "lucide-react"
import { useState } from "react"

const predictionData = [
  { week: "Week 1", probability: 15, confidence: 85, baseline: 20 },
  { week: "Week 2", probability: 22, confidence: 82, baseline: 20 },
  { week: "Week 3", probability: 18, confidence: 88, baseline: 20 },
  { week: "Week 4", probability: 35, confidence: 79, baseline: 20 },
  { week: "Week 5", probability: 45, confidence: 75, baseline: 20 },
  { week: "Week 6", probability: 42, confidence: 77, baseline: 20 },
  { week: "Week 7", probability: 38, confidence: 81, baseline: 20 },
  { week: "Week 8", probability: 52, confidence: 72, baseline: 20 },
]

const riskFactors = [
  { 
    id: 1, 
    name: "Weather Events", 
    impact: 78, 
    trend: "increasing", 
    status: "high",
    description: "Severe weather patterns affecting logistics"
  },
  { 
    id: 2, 
    name: "Supply Shortage", 
    impact: 65, 
    trend: "stable", 
    status: "medium",
    description: "Raw material availability concerns"
  },
  { 
    id: 3, 
    name: "Geopolitical", 
    impact: 42, 
    trend: "decreasing", 
    status: "medium",
    description: "Trade policy changes and regulations"
  },
  { 
    id: 4, 
    name: "Demand Surge", 
    impact: 38, 
    trend: "increasing", 
    status: "low",
    description: "Unexpected market demand fluctuations"
  },
]

const aiInsights = [
  {
    icon: Brain,
    title: "ML Model Accuracy",
    value: "94.2%",
    change: "+2.1%",
    status: "positive"
  },
  {
    icon: Target,
    title: "Prediction Confidence",
    value: "87.5%",
    change: "+5.3%",
    status: "positive"
  },
  {
    icon: Activity,
    title: "Active Scenarios",
    value: "24",
    change: "+3",
    status: "neutral"
  },
  {
    icon: Zap,
    title: "Processing Speed",
    value: "1.2s",
    change: "-0.3s",
    status: "positive"
  }
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#F2613F] rounded-lg p-4 shadow-2xl">
        <p className="text-white font-semibold mb-2">{payload[0].payload.week}</p>
        <div className="space-y-1">
          <p className="text-[#F2613F] text-sm">
            Risk: <span className="font-bold">{payload[0].value}%</span>
          </p>
          {payload[0].payload.confidence && (
            <p className="text-[#72A829] text-sm">
              Confidence: <span className="font-bold">{payload[0].payload.confidence}%</span>
            </p>
          )}
        </div>
      </div>
    )
  }
  return null
}

const RiskFactorCard = ({ factor }) => {
  const getImpactColor = (impact) => {
    if (impact >= 70) return "#F2613F"
    if (impact >= 40) return "#FFA07A"
    return "#72A829"
  }

  const getTrendIcon = (trend) => {
    if (trend === "increasing") return "↗"
    if (trend === "decreasing") return "↘"
    return "→"
  }

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 rounded-lg p-4 hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-xl"
         style={{ borderColor: getImpactColor(factor.impact) }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-white font-semibold mb-1">{factor.name}</h4>
          <p className="text-gray-400 text-xs">{factor.description}</p>
        </div>
        <div className="text-2xl" style={{ color: getImpactColor(factor.impact) }}>
          {getTrendIcon(factor.trend)}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Impact Score</span>
          <span className="font-bold text-white">{factor.impact}%</span>
        </div>
        
        <div className="w-full bg-[#0a0a0a] rounded-full h-2 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${factor.impact}%`,
              backgroundColor: getImpactColor(factor.impact)
            }}
          />
        </div>
      </div>
    </div>
  )
}

const MetricCard = ({ metric }) => {
  const getStatusColor = (status) => {
    if (status === "positive") return "#72A829"
    if (status === "negative") return "#F2613F"
    return "#FFA07A"
  }

  const Icon = metric.icon

  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#F2613F] transition-all duration-300 hover:shadow-lg hover:shadow-[#F2613F]/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F2613F]/10 to-transparent rounded-full blur-3xl" />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-[#F2613F]/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#F2613F]" />
          </div>
          <div className="text-right">
            <span className="text-xs px-2 py-1 rounded-full" style={{ 
              backgroundColor: getStatusColor(metric.status) + "20",
              color: getStatusColor(metric.status)
            }}>
              {metric.change}
            </span>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">{metric.title}</p>
          <p className="text-3xl font-bold text-white">{metric.value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PredictionsPage() {
  const [selectedWeek, setSelectedWeek] = useState(null)

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen">
      {/* Header with animated gradient */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2613F]/20 via-[#9B3922]/20 to-transparent animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F2613F]/10 to-transparent blur-xl" />
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#F2613F]/20 rounded-xl flex items-center justify-center backdrop-blur">
              <Brain className="w-6 h-6 text-[#F2613F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI-Powered Predictions</h1>
              <p className="text-gray-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Real-time machine learning forecasts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {aiInsights.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Main Chart */}
      <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F2613F]/5 to-transparent rounded-full blur-3xl" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-[#F2613F] text-xl">
                <TrendingUp className="w-6 h-6" />
                Disruption Probability Forecast
              </CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                8-week predictive analysis with confidence intervals
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-[#F2613F]/10 border border-[#F2613F] rounded-lg px-4 py-2">
              <Activity className="w-4 h-4 text-[#F2613F] animate-pulse" />
              <span className="text-[#F2613F] font-semibold text-sm">Live</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <ResponsiveContainer width="100%" height={450}>
            <AreaChart data={predictionData} onMouseMove={(e) => e.activePayload && setSelectedWeek(e.activePayload[0].payload)}>
              <defs>
                <linearGradient id="colorProbability" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F2613F" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F2613F" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#72A829" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#72A829" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#481E14" opacity={0.3} />
              <XAxis 
                dataKey="week" 
                stroke="#999" 
                style={{ fontSize: '12px' }}
                tick={{ fill: '#999' }}
              />
              <YAxis 
                stroke="#999" 
                style={{ fontSize: '12px' }}
                tick={{ fill: '#999' }}
                label={{ value: 'Risk Probability (%)', angle: -90, position: 'insideLeft', fill: '#999' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="baseline" 
                stroke="#72A829" 
                strokeWidth={1}
                fill="url(#colorBaseline)"
                strokeDasharray="5 5"
              />
              <Area 
                type="monotone" 
                dataKey="probability" 
                stroke="#F2613F" 
                strokeWidth={3}
                fill="url(#colorProbability)"
                dot={{ fill: "#F2613F", r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7, strokeWidth: 3, stroke: "#F2613F", fill: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#F2613F] rounded-full" />
              <span className="text-sm text-gray-400">Predicted Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-[#72A829]" />
              <span className="text-sm text-gray-400">Baseline (20%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-[#F2613F]" />
          <h2 className="text-xl font-bold text-white">Key Risk Factors</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {riskFactors.map(factor => (
            <RiskFactorCard key={factor.id} factor={factor} />
          ))}
        </div>
      </div>

      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#72A829]">
            <Shield className="w-5 h-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription className="text-gray-400">
            Automated insights based on current predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-[#F2613F]/10 border border-[#F2613F] rounded-lg">
              <div className="w-10 h-10 bg-[#F2613F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-[#F2613F]" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">High Risk Alert - Week 8</h4>
                <p className="text-gray-400 text-sm">
                  52% disruption probability detected. Recommend increasing safety stock by 30% and activating backup suppliers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-[#FFA07A]/10 border border-[#FFA07A] rounded-lg">
              <div className="w-10 h-10 bg-[#FFA07A]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-[#FFA07A]" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Weather Impact Increasing</h4>
                <p className="text-gray-400 text-sm">
                  Weather-related risk factors trending upward. Consider diversifying transportation routes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-[#72A829]/10 border border-[#72A829] rounded-lg">
              <div className="w-10 h-10 bg-[#72A829]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-[#72A829]" />
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Geopolitical Risks Stabilizing</h4>
                <p className="text-gray-400 text-sm">
                  Trade policy concerns showing improvement. Maintain current supplier relationships.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}