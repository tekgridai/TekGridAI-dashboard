"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"
import { BarChart3, TrendingUp, Clock, CheckCircle2, AlertTriangle, Activity } from "lucide-react"

const analyticsData = [
  { month: "Jan", incidents: 4, resolved: 3, avgTime: 5.2 },
  { month: "Feb", incidents: 3, resolved: 3, avgTime: 4.8 },
  { month: "Mar", incidents: 5, resolved: 4, avgTime: 6.1 },
  { month: "Apr", incidents: 2, resolved: 2, avgTime: 3.5 },
  { month: "May", incidents: 3, resolved: 3, avgTime: 4.2 },
  { month: "Jun", incidents: 1, resolved: 1, avgTime: 2.8 },
]

const severityData = [
  { name: "Critical", value: 3, color: "#F2613F" },
  { name: "High", value: 5, color: "#FF8C42" },
  { name: "Medium", value: 8, color: "#FFA07A" },
  { name: "Low", value: 2, color: "#72A829" },
]

const performanceData = [
  { metric: "Response Time", value: 85 },
  { metric: "Resolution Rate", value: 92 },
  { metric: "Customer Satisfaction", value: 88 },
  { metric: "Uptime", value: 99 },
  { metric: "Efficiency", value: 90 },
]

export default function AnalyticsPage() {
  const totalIncidents = analyticsData.reduce((sum, item) => sum + item.incidents, 0)
  const totalResolved = analyticsData.reduce((sum, item) => sum + item.resolved, 0)
  const avgResolutionTime = (analyticsData.reduce((sum, item) => sum + item.avgTime, 0) / analyticsData.length).toFixed(1)
  const resolutionRate = ((totalResolved / totalIncidents) * 100).toFixed(0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2613F]/10 to-transparent rounded-lg blur-xl"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Reports</h1>
          <p className="text-gray-400">Historical trends and performance metrics</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#F2613F] transition-all duration-300 hover:shadow-lg hover:shadow-[#F2613F]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Incidents</p>
                <p className="text-3xl font-bold text-white">{totalIncidents}</p>
                <p className="text-[#72A829] text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  -12% from last period
                </p>
              </div>
              <div className="w-12 h-12 bg-[#F2613F]/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#F2613F]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#72A829] transition-all duration-300 hover:shadow-lg hover:shadow-[#72A829]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Resolved</p>
                <p className="text-3xl font-bold text-white">{totalResolved}</p>
                <p className="text-[#72A829] text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {resolutionRate}% rate
                </p>
              </div>
              <div className="w-12 h-12 bg-[#72A829]/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#72A829]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#F2613F] transition-all duration-300 hover:shadow-lg hover:shadow-[#F2613F]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Avg Resolution</p>
                <p className="text-3xl font-bold text-white">{avgResolutionTime}h</p>
                <p className="text-[#72A829] text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  15% faster
                </p>
              </div>
              <div className="w-12 h-12 bg-[#F2613F]/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#F2613F]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#72A829] transition-all duration-300 hover:shadow-lg hover:shadow-[#72A829]/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-white">{resolutionRate}%</p>
                <p className="text-[#72A829] text-xs mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Excellent
                </p>
              </div>
              <div className="w-12 h-12 bg-[#72A829]/10 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#72A829]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Incident Trends Bar Chart */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#F2613F]/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F2613F]">
              <BarChart3 className="w-5 h-5" />
              Incident Trends
            </CardTitle>
            <CardDescription className="text-gray-400">6-month overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <defs>
                  <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F2613F" stopOpacity={1} />
                    <stop offset="100%" stopColor="#F2613F" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#72A829" stopOpacity={1} />
                    <stop offset="100%" stopColor="#72A829" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#481E14" opacity={0.3} />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1a1a1a", 
                    border: "1px solid #481E14",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
                  }} 
                />
                <Legend />
                <Bar dataKey="incidents" fill="url(#incidentGradient)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="resolved" fill="url(#resolvedGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resolution Time Line Chart */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#F2613F]/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F2613F]">
              <Clock className="w-5 h-5" />
              Resolution Time Trend
            </CardTitle>
            <CardDescription className="text-gray-400">Average hours to resolve</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F2613F" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#F2613F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#481E14" opacity={0.3} />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1a1a1a", 
                    border: "1px solid #481E14",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="avgTime" 
                  stroke="#F2613F" 
                  strokeWidth={3}
                  dot={{ fill: "#F2613F", r: 5 }}
                  activeDot={{ r: 7, fill: "#F2613F", stroke: "#fff", strokeWidth: 2 }}
                  fill="url(#lineGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution Pie Chart */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#F2613F]/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F2613F]">
              <AlertTriangle className="w-5 h-5" />
              Severity Distribution
            </CardTitle>
            <CardDescription className="text-gray-400">Incidents by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1a1a1a", 
                    border: "1px solid #481E14",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Radar Chart */}
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#F2613F]/50 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F2613F]">
              <Activity className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
            <CardDescription className="text-gray-400">Overall system performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#481E14" />
                <PolarAngleAxis dataKey="metric" stroke="#999" tick={{ fill: '#999', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#999" />
                <Radar 
                  name="Performance" 
                  dataKey="value" 
                  stroke="#F2613F" 
                  fill="#F2613F" 
                  fillOpacity={0.5}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1a1a1a", 
                    border: "1px solid #481E14",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}