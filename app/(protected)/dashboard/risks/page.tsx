"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, TrendingUp, TrendingDown, Minus, Shield, Activity, Zap, Target, Eye, AlertCircle, CheckCircle, Sparkles, X, Loader2, Send } from "lucide-react"
import { useState } from "react"

const API_KEY = "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"
const API_URL = "https://api.groq.com/openai/v1/chat/completions"

const risks = [
  {
    id: 1,
    node: "Supplier A",
    location: "Shanghai, China",
    severity: "critical",
    risk: "Supply disruption",
    description: "Raw material shortage detected",
    impact: 95,
    probability: 88,
    trend: "increasing",
    lastUpdate: "2 hours ago",
    category: "Supply Chain",
    mitigation: "Activate backup supplier protocol"
  },
  {
    id: 2,
    node: "Warehouse D",
    location: "Los Angeles, USA",
    severity: "high",
    risk: "Capacity shortage",
    description: "Storage utilization at 94%",
    impact: 78,
    probability: 72,
    trend: "stable",
    lastUpdate: "4 hours ago",
    category: "Operations",
    mitigation: "Increase external storage capacity"
  },
  {
    id: 3,
    node: "Transport E",
    location: "Rotterdam, Netherlands",
    severity: "medium",
    risk: "Delivery delays",
    description: "Port congestion affecting schedules",
    impact: 55,
    probability: 65,
    trend: "decreasing",
    lastUpdate: "1 hour ago",
    category: "Logistics",
    mitigation: "Reroute through alternative ports"
  },
  {
    id: 4,
    node: "Distributor C",
    location: "Mumbai, India",
    severity: "low",
    risk: "Weather impact",
    description: "Monsoon season approaching",
    impact: 32,
    probability: 45,
    trend: "stable",
    lastUpdate: "6 hours ago",
    category: "Environment",
    mitigation: "Monitor weather patterns closely"
  },
]

const riskMetrics = [
  {
    title: "Critical Risks",
    value: "1",
    change: "+0",
    icon: AlertTriangle,
    color: "#F2613F",
    trend: "stable"
  },
  {
    title: "Total Monitored",
    value: "24",
    change: "+3",
    icon: Eye,
    color: "#FFA07A",
    trend: "up"
  },
  {
    title: "Mitigation Active",
    value: "18",
    change: "+5",
    icon: Shield,
    color: "#72A829",
    trend: "up"
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-0.6h",
    icon: Zap,
    color: "#72A829",
    trend: "down"
  }
]

const severityConfig = {
  critical: {
    color: "#F2613F",
    bg: "#F2613F15",
    border: "#F2613F",
    label: "CRITICAL",
    icon: AlertTriangle
  },
  high: {
    color: "#FF6B35",
    bg: "#FF6B3515",
    border: "#FF6B35",
    label: "HIGH",
    icon: AlertCircle
  },
  medium: {
    color: "#FFA07A",
    bg: "#FFA07A15",
    border: "#FFA07A",
    label: "MEDIUM",
    icon: Activity
  },
  low: {
    color: "#72A829",
    bg: "#72A82915",
    border: "#72A829",
    label: "LOW",
    icon: CheckCircle
  }
}

const getTrendIcon = (trend) => {
  if (trend === "increasing") return <TrendingUp className="w-4 h-4" />
  if (trend === "decreasing") return <TrendingDown className="w-4 h-4" />
  return <Minus className="w-4 h-4" />
}

const getTrendColor = (trend) => {
  if (trend === "increasing") return "#F2613F"
  if (trend === "decreasing") return "#72A829"
  return "#FFA07A"
}

const MetricCard = ({ metric }) => {
  const Icon = metric.icon
  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-opacity-60 transition-all duration-300 hover:shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-30" 
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

const RiskCard = ({ risk, onClick, onAIAnalyze }) => {
  const config = severityConfig[risk.severity]
  const Icon = config.icon

  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer group relative overflow-hidden"
          style={{ borderColor: config.border + "60" }}
          onClick={() => onClick(risk)}>
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ 
             background: `radial-gradient(circle at top right, ${config.color}10, transparent 70%)`
           }} />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center relative"
                 style={{ backgroundColor: config.bg, borderColor: config.border, borderWidth: '2px' }}>
              <Icon className="w-7 h-7" style={{ color: config.color }} />
              {risk.severity === "critical" && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
                     style={{ backgroundColor: config.color }} />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-bold text-lg">{risk.node}</h3>
                  <Badge className="text-xs font-bold px-2 py-0.5" 
                         style={{ 
                           backgroundColor: config.bg,
                           color: config.color,
                           border: `1px solid ${config.color}`
                         }}>
                    {config.label}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm mb-1">{risk.location}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAIAnalyze(risk)
                  }}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500 text-purple-400 text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 hover:scale-105"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Analyze
                </button>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                     style={{ 
                       backgroundColor: getTrendColor(risk.trend) + "15",
                       color: getTrendColor(risk.trend)
                     }}>
                  {getTrendIcon(risk.trend)}
                  <span className="text-xs font-semibold capitalize">{risk.trend}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-white font-semibold mb-1">{risk.risk}</p>
                <p className="text-gray-400 text-sm">{risk.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-400">Impact</span>
                    <span className="text-xs font-bold text-white">{risk.impact}%</span>
                  </div>
                  <div className="w-full bg-[#0a0a0a] rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                         style={{ 
                           width: `${risk.impact}%`,
                           backgroundColor: config.color
                         }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-400">Probability</span>
                    <span className="text-xs font-bold text-white">{risk.probability}%</span>
                  </div>
                  <div className="w-full bg-[#0a0a0a] rounded-full h-2 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500"
                         style={{ 
                           width: `${risk.probability}%`,
                           backgroundColor: config.color
                         }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-500" />
                  <span className="text-xs text-gray-400">{risk.category}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{risk.lastUpdate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const RiskDistribution = () => {
  const distribution = [
    { severity: "Critical", count: 1, percentage: 4, color: "#F2613F" },
    { severity: "High", count: 6, percentage: 25, color: "#FF6B35" },
    { severity: "Medium", count: 9, percentage: 38, color: "#FFA07A" },
    { severity: "Low", count: 8, percentage: 33, color: "#72A829" }
  ]

  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14]">
      <CardHeader>
        <CardTitle className="text-[#F2613F] flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Risk Distribution
        </CardTitle>
        <CardDescription className="text-gray-400">
          Current risk levels across all nodes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {distribution.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-white font-semibold">{item.severity}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">{item.count} risks</span>
                  <span className="text-white font-bold">{item.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-[#0a0a0a] rounded-full h-2.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const AIAnalysisModal = ({ risk, onClose, isOpen }) => {
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [userInput, setUserInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)

  const analyzeRisk = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `You are a supply chain risk expert. Analyze this risk and provide:
1. Root cause analysis
2. Potential cascading effects
3. Recommended mitigation strategies
4. Timeline predictions
5. Alternative solutions

Risk Details:
- Node: ${risk.node}
- Location: ${risk.location}
- Risk Type: ${risk.risk}
- Description: ${risk.description}
- Severity: ${risk.severity}
- Impact: ${risk.impact}%
- Probability: ${risk.probability}%
- Trend: ${risk.trend}
- Category: ${risk.category}
- Current Mitigation: ${risk.mitigation}

Provide a comprehensive but concise analysis.`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      })

      const data = await response.json()
      setAnalysis(data.choices[0].message.content)
    } catch (error) {
      setAnalysis("Error analyzing risk: " + error.message)
    }
    setLoading(false)
  }

  const sendChatMessage = async () => {
    if (!userInput.trim()) return

    const newMessage = { role: "user", content: userInput }
    setChatMessages(prev => [...prev, newMessage])
    setUserInput("")
    setChatLoading(true)

    try {
      const conversationHistory = [
        {
          role: "system",
          content: `You are analyzing this risk: ${risk.node} - ${risk.risk}. ${risk.description}. Severity: ${risk.severity}. Impact: ${risk.impact}%, Probability: ${risk.probability}%. Answer questions about this risk specifically.`
        },
        ...chatMessages,
        newMessage
      ]

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: conversationHistory,
          temperature: 0.7,
          max_tokens: 500
        })
      })

      const data = await response.json()
      const assistantMessage = { role: "assistant", content: data.choices[0].message.content }
      setChatMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Error: " + error.message }])
    }
    setChatLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-purple-500/50 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  AI Risk Analysis: {risk.node}
                </CardTitle>
                <CardDescription className="text-gray-400">{risk.location}</CardDescription>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto flex-1">
          {!analysis && !loading && (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Ready to Analyze</h3>
              <p className="text-gray-400 mb-6">Get AI-powered insights for this risk</p>
              <button
                onClick={analyzeRisk}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105"
              >
                Generate Analysis
              </button>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
              <span className="ml-3 text-gray-400">Analyzing risk...</span>
            </div>
          )}

          {analysis && (
            <div className="space-y-6">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h3 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Analysis
                </h3>
                <div className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                  {analysis}
                </div>
              </div>

              {/* Chat Interface */}
              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Ask Follow-up Questions
                </h3>
                
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        msg.role === "user"
                          ? "bg-blue-500/20 border border-blue-500/30 ml-8"
                          : "bg-gray-800/50 border border-gray-700 mr-8"
                      }`}
                    >
                      <p className="text-sm text-gray-300">{msg.content}</p>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Thinking...
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                    placeholder="Ask anything about this risk..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={sendChatMessage}
                    disabled={!userInput.trim() || chatLoading}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function RisksPage() {
  const [selectedRisk, setSelectedRisk] = useState(null)
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [aiRisk, setAiRisk] = useState(null)
  const [reportLoading, setReportLoading] = useState(false)
  const [reportContent, setReportContent] = useState("")

  const handleAIAnalyze = (risk) => {
    setAiRisk(risk)
    setAiModalOpen(true)
  }

  const generateFullReport = async () => {
    setReportLoading(true)
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `Generate an executive risk report for the following supply chain risks:

${risks.map(r => `- ${r.node} (${r.location}): ${r.risk} - ${r.description} [Severity: ${r.severity}, Impact: ${r.impact}%, Probability: ${r.probability}%]`).join('\n')}

Provide:
1. Executive Summary
2. Critical Risk Priorities (top 3)
3. Overall Risk Landscape Assessment
4. Recommended Immediate Actions
5. 30-day Risk Forecast

Keep it concise and actionable.`
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      })

      const data = await response.json()
      setReportContent(data.choices[0].message.content)
      alert("Report generated! Check console or add a modal to display it.")
      console.log(data.choices[0].message.content)
    } catch (error) {
      alert("Error generating report: " + error.message)
    }
    setReportLoading(false)
  }

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2613F]/20 via-[#FF6B35]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F2613F]/10 to-transparent blur-xl" />
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#F2613F]/20 rounded-xl flex items-center justify-center backdrop-blur border-2 border-[#F2613F]">
              <Shield className="w-6 h-6 text-[#F2613F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                Risk Analysis & Monitoring
                <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
              </h1>
              <p className="text-gray-400 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Real-time vulnerability detection with AI insights
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {riskMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#F2613F]" />
              Active Risks
            </h2>
            <span className="text-sm text-gray-400">Sorted by severity</span>
          </div>
          {risks.map((risk) => (
            <RiskCard key={risk.id} risk={risk} onClick={setSelectedRisk} onAIAnalyze={handleAIAnalyze} />
          ))}
        </div>

        <div className="space-y-6">
          <RiskDistribution />
          
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14]">
            <CardHeader>
              <CardTitle className="text-[#72A829] flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full bg-[#F2613F]/10 hover:bg-[#F2613F]/20 border-2 border-[#F2613F] rounded-lg p-3 text-[#F2613F] font-semibold text-sm transition-all duration-200 hover:scale-105">
                Activate Emergency Protocol
              </button>
              <button
                onClick={generateFullReport}
                disabled={reportLoading}
                className="w-full bg-purple-500/10 hover:bg-purple-500/20 border-2 border-purple-500 rounded-lg p-3 text-purple-400 font-semibold text-sm transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {reportLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Report
                  </>
                )}
              </button>
              <button className="w-full bg-[#FFA07A]/10 hover:bg-[#FFA07A]/20 border-2 border-[#FFA07A] rounded-lg p-3 text-[#FFA07A] font-semibold text-sm transition-all duration-200 hover:scale-105">
                Schedule Review
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      {aiModalOpen && aiRisk && (
        <AIAnalysisModal
          risk={aiRisk}
          onClose={() => {
            setAiModalOpen(false)
            setAiRisk(null)
          }}
          isOpen={aiModalOpen}
        />
      )}
    </div>
  )
}