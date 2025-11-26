"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutGrid, AlertTriangle, TrendingUp, Settings, Network, BarChart3, Zap, Activity, X } from "lucide-react"

const menuItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/risks", label: "Risk Analysis", icon: AlertTriangle },
  { href: "/dashboard/predictions", label: "Predictions", icon: TrendingUp },
  { href: "/dashboard/network", label: "Supplier Network", icon: Network },
  { href: "/dashboard/scenarios", label: "Scenarios", icon: Zap },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

interface DashboardSidebarProps {
  isMobileMenuOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ isMobileMenuOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 sm:w-72 lg:w-64 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-r border-[#481E14]/50 min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#481E14]/5 via-transparent to-[#F2613F]/5 opacity-50"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2613F]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#481E14]/10 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Mobile Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 z-50 p-2 bg-gradient-to-r from-[#481E14] to-[#481E14]/70 rounded-lg text-[#F2613F] hover:bg-[#481E14] transition-all duration-300 shadow-lg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Logo Section */}
        <div className="p-4 sm:p-6 border-b border-[#481E14]/30">
          <div className="relative group">
            <div className="flex items-center justify-center">
              <Image
                src="/logo.svg"
                alt="TekGridAI Logo"
                width={180}
                height={180}
                className=""
                priority
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center font-medium tracking-wide">
            Supply Chain Intelligence
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? "bg-gradient-to-r from-[#481E14] to-[#481E14]/70 text-[#F2613F] shadow-lg shadow-[#481E14]/50" 
                    : "text-gray-400 hover:text-[#F2613F] hover:bg-[#2a2a2a]/50"
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 sm:h-8 bg-gradient-to-b from-[#F2613F] to-[#ff6b35] rounded-r-full shadow-lg shadow-[#F2613F]/50"></div>
                )}
                
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#F2613F]/0 to-[#F2613F]/0 group-hover:from-[#F2613F]/5 group-hover:to-transparent transition-all duration-300 ${isActive ? 'opacity-0' : ''}`}></div>
                
                <div className={`relative z-10 ${isActive ? 'animate-pulse' : ''}`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'drop-shadow-[0_0_8px_rgba(242,97,63,0.5)]' : ''}`} />
                </div>
                <span className="relative z-10 text-xs sm:text-sm font-medium truncate">{item.label}</span>
                
                {/* Arrow indicator on hover */}
                <div className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-100' : ''}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F2613F]"></div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Status Card */}
        <div className="p-3 sm:p-4 border-t border-[#481E14]/30">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F2613F]/20 to-[#481E14]/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
            <div className="relative bg-gradient-to-br from-[#481E14] via-[#481E14]/90 to-[#2a1a14] rounded-xl p-3 sm:p-4 border border-[#F2613F]/30 shadow-lg overflow-hidden">
              {/* Animated background pulse */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F2613F]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-1 font-medium">System Status</p>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-2 h-2 bg-[#F2613F] rounded-full animate-ping absolute"></div>
                      <div className="w-2 h-2 bg-[#F2613F] rounded-full"></div>
                    </div>
                    <p className="text-[#F2613F] font-bold text-xs sm:text-sm tracking-wide">ACTIVE</p>
                  </div>
                </div>
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-[#F2613F]/70 animate-pulse" />
              </div>
              
              {/* Performance bar */}
              <div className="mt-2 sm:mt-3 relative">
                <div className="h-1 bg-[#2a1a14] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#F2613F] to-[#ff6b35] rounded-full w-[87%] shadow-lg shadow-[#F2613F]/50 animate-pulse"></div>
                </div>
                <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1 text-right">87% Optimal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}