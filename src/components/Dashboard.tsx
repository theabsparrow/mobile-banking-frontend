"use client";

import React, { useState } from "react";
import { logoutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  ShoppingBag,
  FileText,
  PlusCircle,
  LogOut,
  Bell,
  Wallet,
  ArrowRight,
  TrendingUp,
  User,
  History,
  QrCode,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

interface DashboardProps {
  user: {
    phone?: string;
    email?: string;
    accountType: string;
  } | null;
}

export default function Dashboard({ user }: DashboardProps) {
  const [showBalance, setShowBalance] = useState(false);
  const [balanceTapping, setBalanceTapping] = useState(false);

  // Mask the phone number for safety
  const formatMobile = (num: string) => {
    if (!num) return "";
    return `+880 ${num.slice(0, 4)}-${num.slice(4, 7)}-${num.slice(7)}`;
  };

  const handleTapBalance = () => {
    if (showBalance) {
      setShowBalance(false);
      return;
    }

    setBalanceTapping(true);
    setTimeout(() => {
      setShowBalance(true);
      setBalanceTapping(false);
    }, 800);
  };

  const transactions = [
    {
      id: "tx-1",
      type: "Send Money",
      recipient: "01712345678",
      date: "Today, 02:30 PM",
      amount: -500.0,
      status: "Success",
    },
    {
      id: "tx-2",
      type: "Mobile Recharge",
      recipient: "Robi (01844221100)",
      date: "Yesterday, 11:15 AM",
      amount: -100.0,
      status: "Success",
    },
    {
      id: "tx-3",
      type: "Add Money",
      recipient: "City Bank Visa",
      date: "07 Aug 2026, 05:40 PM",
      amount: 5000.0,
      status: "Success",
    },
    {
      id: "tx-4",
      type: "Merchant Payment",
      recipient: "Aarong Outlet",
      date: "05 Aug 2026, 08:20 PM",
      amount: -1250.0,
      status: "Success",
    },
  ];

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col gap-6 md:gap-8">
      {/* Top Header */}
      <header className="flex justify-between items-center bg-black/40 border border-white/5 backdrop-blur-xl p-4 md:p-6 rounded-3xl">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-secondary p-2.5 shadow-md shadow-primary/20">
            <Wallet className="h-full w-full text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-white">PaySwift</h2>
              <span className="text-[10px] bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {user?.accountType || "Personal"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              {user ? (user.phone ? formatMobile(user.phone) : user.email) : "+880 1700-000-000"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer">
            <Bell className="h-4.5 w-4.5" />
          </button>
          <form action={logoutAction}>
            <button
              type="submit"
              className="h-9 gap-1.5 px-3 flex items-center justify-center rounded-xl bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 text-destructive-foreground transition-all cursor-pointer text-xs font-semibold"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </form>
        </div>
      </header>

      {/* Grid Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Balance & Quick Info */}
        <div className="md:col-span-1 flex flex-col gap-6">
          {/* bKash/Nagad Iconic Tap Balance Card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary via-primary/80 to-secondary/80 p-6 text-white shadow-xl shadow-primary/10 min-h-[170px] flex flex-col justify-between">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/20 rounded-full blur-xl pointer-events-none" />

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                Available Balance
              </p>
              <div className="mt-4 flex items-center gap-1 min-h-[48px]">
                {balanceTapping ? (
                  <div className="flex items-center gap-1.5 text-white/50 text-xl font-bold animate-pulse pl-1">
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : showBalance ? (
                  <span className="text-4xl font-extrabold tracking-tight animate-fade-in pl-1">
                    ৳ 12,450.75
                  </span>
                ) : (
                  <button
                    onClick={handleTapBalance}
                    className="group relative flex items-center justify-between gap-2 overflow-hidden bg-white/15 hover:bg-white/20 border border-white/10 px-5 py-2.5 rounded-2xl shadow-inner text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <QrCode className="h-4 w-4 text-secondary animate-pulse" />
                      Tap to Show Balance
                    </span>
                    {/* Glowing effect inside button */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
                  </button>
                )}

                {showBalance && (
                  <button
                    onClick={() => setShowBalance(false)}
                    className="ml-auto text-[10px] bg-black/20 hover:bg-black/30 px-2.5 py-1 rounded-full font-bold border border-white/5 transition-all cursor-pointer"
                  >
                    Hide
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-4 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-secondary" /> Plus Points: 1,450
              </span>
              <span>ID: {user ? (user.phone ? user.phone.slice(7) : user.email?.split("@")[0]) : "0000"}</span>
            </div>
          </div>

          {/* Quick Actions Guide */}
          <div className="bg-black/40 border border-white/5 backdrop-blur-xl p-5 rounded-3xl flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              PaySwift Limits & Charges
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs py-1 border-b border-white/5">
                <span className="text-muted-foreground">Cash Out Charge</span>
                <span className="text-white font-semibold">1.49% (App)</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/5">
                <span className="text-muted-foreground">Send Money Fee</span>
                <span className="text-white font-semibold">৳ 0.00 (Free)</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-muted-foreground">Daily Tx Limit</span>
                <span className="text-white font-semibold">৳ 25,000</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-semibold border-white/10 text-white bg-white/5 hover:bg-white/10 cursor-pointer rounded-xl h-9"
            >
              View Full Limits Chart
            </Button>
          </div>
        </div>

        {/* Right Side: Primary Actions & Transactions */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Main Action Grid */}
          <div className="bg-black/40 border border-white/5 backdrop-blur-xl p-6 rounded-3xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              MFS Quick Services
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {[
                { label: "Send Money", icon: ArrowUpRight, color: "from-pink-500 to-rose-600" },
                { label: "Cash Out", icon: ArrowDownLeft, color: "from-amber-500 to-orange-600" },
                { label: "Mobile Recharge", icon: Smartphone, color: "from-blue-500 to-indigo-600" },
                { label: "Make Payment", icon: ShoppingBag, color: "from-emerald-500 to-teal-600" },
                { label: "Pay Bill", icon: FileText, color: "from-violet-500 to-purple-600" },
                { label: "Add Money", icon: PlusCircle, color: "from-cyan-500 to-blue-600" },
              ].map((act, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                >
                  <div
                    className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${act.color} p-3 flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                  >
                    <act.icon className="h-full w-full stroke-[2.5]" />
                  </div>
                  <span className="text-[11px] font-bold text-muted-foreground group-hover:text-white text-center leading-tight transition-colors">
                    {act.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-black/40 border border-white/5 backdrop-blur-xl p-6 rounded-3xl flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <History className="h-4.5 w-4.5 text-primary" /> Recent Activity
              </h3>
              <button className="text-xs font-bold text-secondary hover:text-secondary/85 flex items-center gap-0.5 cursor-pointer">
                View All <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-3 flex-1">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center p-3 rounded-2xl bg-white/2 border border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                        tx.amount > 0
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-white/5 text-white/70"
                      }`}
                    >
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{tx.type}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {tx.recipient} • {tx.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`text-xs font-extrabold ${
                        tx.amount > 0 ? "text-emerald-400" : "text-white"
                      }`}
                    >
                      {tx.amount > 0 ? "+" : ""}৳ {Math.abs(tx.amount).toFixed(2)}
                    </p>
                    <p className="text-[9px] text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded-full mt-0.5 inline-block">
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
