"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, User, LogOut, Sparkles, Shield, Menu, X } from "lucide-react"

interface DashboardHeaderProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
  user?: {
    displayName?: string;
    email?: string;
  };
  onLogout?: () => void;
  onNavigate?: (path: string) => void;
}

export function DashboardHeader({ 
  onMobileMenuToggle, 
  isMobileMenuOpen,
  user = { displayName: "John Doe", email: "john@example.com" },
  onLogout,
  onNavigate
}: DashboardHeaderProps) {

  const handleLogout = () => {
    if (onLogout) onLogout()
  }

  const handleNavigation = (path: string) => {
    if (onNavigate) onNavigate(path)
  }

  return (
    <header className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-b border-[#481E14]/50 px-3 sm:px-4 md:px-6 py-3 md:py-4 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl shadow-2xl shadow-[#481E14]/20 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F2613F]/5 via-transparent to-[#481E14]/5 opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F2613F]/10 rounded-full blur-3xl -translate-y-48 animate-pulse"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#481E14]/10 rounded-full blur-3xl -translate-y-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 flex items-center gap-2 sm:gap-4 md:gap-6 flex-1">
        {/* Mobile Menu Button (for sidebar toggle) */}
        {onMobileMenuToggle && (
          <Button
            onClick={onMobileMenuToggle}
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-400 hover:text-[#F2613F] hover:bg-[#2a2a2a]/50 transition-all duration-300 rounded-xl"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        )}

        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F2613F] to-[#481E14] rounded-lg blur-md group-hover:blur-lg transition-all duration-300 opacity-50"></div>
            <div className="relative bg-gradient-to-br from-[#481E14] to-[#2a1a14] p-1.5 sm:p-2 rounded-lg border border-[#F2613F]/30 group-hover:border-[#F2613F]/50 transition-all duration-300">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#F2613F] group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-[#F2613F] via-[#ff6b35] to-[#F2613F] bg-clip-text text-transparent font-serif group-hover:tracking-wider transition-all duration-300">
              TekGridAI Dashboard
            </h1>
            <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium">Real-time Intelligence</p>
          </div>
          {/* Mobile abbreviated title */}
          <div className="block sm:hidden">
            <h1 className="text-sm font-bold bg-gradient-to-r from-[#F2613F] via-[#ff6b35] to-[#F2613F] bg-clip-text text-transparent font-serif">
              TekGridAI
            </h1>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2 md:gap-3">
        {/* Security Status Badge - Hidden on mobile */}
        <div className="hidden xl:flex items-center gap-2 bg-gradient-to-r from-[#481E14]/30 to-[#2a1a14]/30 border border-[#F2613F]/20 rounded-lg px-3 py-1.5 backdrop-blur-sm">
          <Shield className="w-4 h-4 text-green-500 animate-pulse" />
          <span className="text-xs text-gray-400 font-medium">Secure</span>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative text-gray-400 hover:text-[#F2613F] hover:bg-[#2a2a2a]/50 transition-all duration-300 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 group h-8 sm:h-9 md:h-10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F2613F]/0 to-[#F2613F]/0 group-hover:from-[#F2613F]/10 group-hover:to-transparent rounded-xl transition-all duration-300"></div>
              <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F2613F] to-[#481E14] rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-[#481E14] to-[#2a1a14] p-1 sm:p-1.5 rounded-full border border-[#F2613F]/30 group-hover:border-[#F2613F]/50 transition-all duration-300">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-medium hidden lg:block truncate max-w-[100px]">
                  {user?.displayName?.split(' ')[0] || 'User'}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-[#1a1a1a]/95 border-[#481E14]/50 backdrop-blur-xl shadow-2xl shadow-[#481E14]/20 rounded-xl min-w-[200px] sm:min-w-[240px] overflow-hidden mr-2 sm:mr-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#F2613F]/5 via-transparent to-[#481E14]/5"></div>
            
            <DropdownMenuLabel className="text-gray-300 font-serif relative z-10 py-2 sm:py-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F2613F] to-[#481E14] rounded-full blur-md"></div>
                  <div className="relative bg-gradient-to-br from-[#481E14] to-[#2a1a14] p-1.5 sm:p-2 rounded-full border border-[#F2613F]/30">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#F2613F]" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-xs sm:text-sm truncate">{user?.displayName || 'User'}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-normal truncate">{user?.email}</p>
                </div>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-[#481E14]/50 to-transparent relative z-10" />
            
            <div className="relative z-10 py-1">
              <DropdownMenuItem
                onClick={() => handleNavigation("/dashboard/profile")}
                className="text-gray-300 hover:text-[#F2613F] hover:bg-[#2a2a2a]/50 cursor-pointer transition-all duration-300 rounded-lg mx-1 group text-xs sm:text-sm"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                <span>Profile</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem
                onClick={() => handleNavigation("/dashboard/settings")}
                className="text-gray-300 hover:text-[#F2613F] hover:bg-[#2a2a2a]/50 cursor-pointer transition-all duration-300 rounded-lg mx-1 group text-xs sm:text-sm"
              >
                <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:rotate-90 transition-transform duration-300" />
                <span>Settings</span>
              </DropdownMenuItem>
            </div>
            
            <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-[#481E14]/50 to-transparent relative z-10" />
            
            <div className="relative z-10 py-1">
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer transition-all duration-300 rounded-lg mx-1 group text-xs sm:text-sm"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Logout</span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}