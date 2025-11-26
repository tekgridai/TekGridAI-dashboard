"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, Building2, Factory, Package, AlertCircle, MapPin, Users } from "lucide-react"
import { useState, useMemo } from "react"

// Supplier data structure
const suppliersData = {
  tier1: [
    { id: 1, name: "GlobalTech Industries", region: "North America", status: "active", risk: "low", revenue: "$2.4M" },
    { id: 2, name: "EuroManufacturing Co.", region: "Europe", status: "active", risk: "low", revenue: "$1.8M" },
    { id: 3, name: "AsiaPac Logistics", region: "Asia Pacific", status: "warning", risk: "medium", revenue: "$3.1M" },
    
  ],
  tier2: [
    { id: 5, name: "Component Specialists Ltd", parent: 1, status: "active", risk: "low" },
    { id: 6, name: "Raw Materials Inc", parent: 1, status: "active", risk: "medium" },
    { id: 7, name: "Tech Parts Europe", parent: 2, status: "active", risk: "low" },
    { id: 8, name: "Assembly Solutions", parent: 3, status: "warning", risk: "high" },
  ],
  tier3: [
    { id: 9, name: "Mining Corp", parent: 6, status: "active", risk: "medium" },
    { id: 10, name: "Chemical Suppliers", parent: 6, status: "active", risk: "low" },
    { id: 11, name: "Transportation Services", parent: 8, status: "warning", risk: "high" },
  ]
}

// Regional data
const regionalData = [
  { region: "North America", description: "Primary manufacturing hub", tier1: 3, tier2: 8, risk: "low" },
  { region: "Europe", description: "Technology components", tier1: 4, tier2: 12, risk: "low" },
  { region: "Asia Pacific", description: "Logistics & assembly", tier1: 5, tier2: 8, risk: "medium" }
]

const getRiskColor = (risk) => {
  switch(risk) {
    case "low": return "#72A829"
    case "medium": return "#FFA07A"
    case "high": return "#F2613F"
    default: return "#999"
  }
}

const getStatusColor = (status) => {
  switch(status) {
    case "active": return "#72A829"
    case "warning": return "#FFA07A"
    case "critical": return "#F2613F"
    default: return "#999"
  }
}

// Reusable components
const StatCard = ({ title, value, subtitle, icon: Icon, color }) => (
  <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-opacity-60 transition-all duration-300 hover:shadow-lg" style={{ borderColor: color + '40' }}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-xs mt-1" style={{ color }}>{subtitle}</p>
        </div>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '1a' }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
      </div>
    </CardContent>
  </Card>
)

const SupplierCard = ({ supplier, tier, onClick }) => {
  const Icon = tier === 1 ? Building2 : tier === 2 ? Package : Network
  const tierColor = tier === 1 ? "#F2613F" : tier === 2 ? "#C8763E" : "#72A829"
  const riskColor = getRiskColor(supplier.risk)
  const statusColor = getStatusColor(supplier.status)
  
  const borderColor = supplier.status === "warning" || supplier.risk === "high" ? "#F2613F" : 
                      supplier.risk === "medium" ? "#FFA07A" : "#72A829"

  return (
    <div
      className="bg-[#1a1a1a] rounded-lg p-4 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl border-2"
      style={{ 
        borderColor: borderColor,
        backgroundColor: '#1a1a1a'
      }}
      onClick={() => onClick?.(supplier)}
    >
      <div className="flex items-start gap-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: tierColor + '20' }}
        >
          <Icon className="w-5 h-5" style={{ color: tierColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm mb-1 truncate">
            {supplier.name}
          </h4>
          {supplier.region && (
            <p className="text-gray-400 text-xs mb-2">{supplier.region}</p>
          )}
          <div className="flex items-center gap-1.5">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: riskColor }}
            />
            <span className="text-xs text-gray-400 capitalize">{supplier.risk} Risk</span>
          </div>
        </div>
      </div>
      {supplier.revenue && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
          <span className="text-xs text-gray-400">Revenue</span>
          <span className="text-xs text-[#72A829] font-semibold">{supplier.revenue}</span>
        </div>
      )}
    </div>
  )
}

const TierBadge = ({ tier, label, icon: Icon, color }) => (
  <div className="text-center mb-6">
    <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border-2" style={{ 
      backgroundColor: color + '15',
      borderColor: color 
    }}>
      <Icon className="w-4 h-4" style={{ color }} />
      <span className="font-bold text-sm tracking-wide" style={{ color }}>{label}</span>
    </div>
  </div>
)

const ConnectionLines = ({ suppliers }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#481E14" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#C8763E" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#481E14" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    
    {/* Tier 1 to Tier 2 connections */}
    {suppliers.tier2.map((t2, i) => {
      const t1Index = suppliers.tier1.findIndex(t => t.id === t2.parent)
      return (
        <line
          key={`t1-t2-${t2.id}`}
          x1="25%"
          y1={`${18 + t1Index * 22}%`}
          x2="48%"
          y2={`${23 + i * 18}%`}
          stroke="url(#lineGradient)"
          strokeWidth="2"
          opacity="0.5"
        />
      )
    })}
    
    {/* Tier 2 to Tier 3 connections */}
    {suppliers.tier3.map((t3, i) => {
      const t2Index = suppliers.tier2.findIndex(t => t.id === t3.parent)
      return (
        <line
          key={`t2-t3-${t3.id}`}
          x1="52%"
          y1={`${23 + t2Index * 18}%`}
          x2="75%"
          y2={`${28 + i * 22}%`}
          stroke="url(#lineGradient)"
          strokeWidth="2"
          opacity="0.5"
        />
      )
    })}
  </svg>
)

const RiskLegend = () => (
  <div className="absolute bottom-6 left-6 bg-[#0a0a0a] border-2 border-gray-800 rounded-lg p-4 shadow-xl">
    <h4 className="text-white font-bold text-sm mb-3">Risk Levels</h4>
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-[#72A829]" />
        <span className="text-xs text-gray-300">Low Risk</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-[#FFA07A]" />
        <span className="text-xs text-gray-300">Medium Risk</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-[#F2613F]" />
        <span className="text-xs text-gray-300">High Risk</span>
      </div>
    </div>
  </div>
)

const RegionalCard = ({ region, description, tier1, tier2, risk }) => (
  <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14] hover:border-[#F2613F]/50 transition-all duration-300">
    <CardHeader>
      <CardTitle className="text-[#F2613F] text-lg">{region}</CardTitle>
      <CardDescription className="text-gray-400">{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Tier 1</span>
          <span className="text-white font-semibold">{tier1} suppliers</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Tier 2</span>
          <span className="text-white font-semibold">{tier2} suppliers</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Risk Score</span>
          <span className="font-semibold capitalize" style={{ color: getRiskColor(risk) }}>
            {risk}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
)

export default function NetworkPage() {
  const [selectedSupplier, setSelectedSupplier] = useState(null)

  // Calculate statistics
  const stats = useMemo(() => {
    const totalSuppliers = suppliersData.tier1.length + suppliersData.tier2.length + suppliersData.tier3.length
    const allSuppliers = [...suppliersData.tier1, ...suppliersData.tier2, ...suppliersData.tier3]
    const activeCount = allSuppliers.filter(s => s.status === "active").length
    const atRiskCount = allSuppliers.filter(s => s.risk === "medium" || s.risk === "high").length
    const regions = new Set(suppliersData.tier1.map(s => s.region)).size

    return {
      total: totalSuppliers,
      active: activeCount,
      atRisk: atRiskCount,
      regions,
      healthyPercent: Math.round((activeCount / totalSuppliers) * 100)
    }
  }, [])

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2613F]/10 to-transparent rounded-lg blur-xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold text-white mb-2">Supplier Network</h1>
          <p className="text-gray-400">Multi-tier supplier relationships and dependencies</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Total Suppliers" 
          value={stats.total} 
          subtitle="Across 3 tiers" 
          icon={Building2}
          color="#F2613F"
        />
        <StatCard 
          title="Active Relationships" 
          value={stats.active} 
          subtitle={`${stats.healthyPercent}% healthy`}
          icon={Users}
          color="#72A829"
        />
        <StatCard 
          title="At Risk" 
          value={stats.atRisk} 
          subtitle="Needs attention"
          icon={AlertCircle}
          color="#FFA07A"
        />
        <StatCard 
          title="Regions" 
          value={stats.regions} 
          subtitle="Global coverage"
          icon={MapPin}
          color="#F2613F"
        />
      </div>

      {/* Network Visualization */}
      <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#481E14]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#F2613F]">
            <Network className="w-5 h-5" />
            Network Hierarchy
          </CardTitle>
          <CardDescription className="text-gray-400">
            Interactive 3-tier supplier ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative min-h-[700px] bg-black rounded-lg p-8 overflow-hidden">
            <ConnectionLines suppliers={suppliersData} />

            {/* Tier 1 - Primary Suppliers */}
            <div className="absolute left-[3%] top-[8%] w-[28%] space-y-5" style={{ zIndex: 1 }}>
              <TierBadge tier={1} label="TIER 1" icon={Factory} color="#F2613F" />
              {suppliersData.tier1.map(supplier => (
                <SupplierCard 
                  key={supplier.id}
                  supplier={supplier}
                  tier={1}
                  onClick={setSelectedSupplier}
                />
              ))}
            </div>

            {/* Tier 2 - Sub-suppliers */}
            <div className="absolute left-[37%] top-[13%] w-[26%] space-y-4" style={{ zIndex: 1 }}>
              <TierBadge tier={2} label="TIER 2" icon={Package} color="#C8763E" />
              {suppliersData.tier2.map(supplier => (
                <SupplierCard 
                  key={supplier.id}
                  supplier={supplier}
                  tier={2}
                  onClick={setSelectedSupplier}
                />
              ))}
            </div>

            {/* Tier 3 - Extended Network */}
            <div className="absolute right-[3%] top-[18%] w-[26%] space-y-5" style={{ zIndex: 1 }}>
              <TierBadge tier={3} label="TIER 3+" icon={Network} color="#72A829" />
              {suppliersData.tier3.map(supplier => (
                <SupplierCard 
                  key={supplier.id}
                  supplier={supplier}
                  tier={3}
                  onClick={setSelectedSupplier}
                />
              ))}
            </div>

            <RiskLegend />
          </div>
        </CardContent>
      </Card>

      {/* Regional Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {regionalData.map(region => (
          <RegionalCard key={region.region} {...region} />
        ))}
      </div>
    </div>
  )
}