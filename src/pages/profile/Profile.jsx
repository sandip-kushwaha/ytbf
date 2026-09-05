import { useState } from "react";
import { User, Mail, Shield, CalendarDays, Clock } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/common/Header";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500" />
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-NP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  const lastLogin = user.lastLogin
    ? new Date(user.lastLogin).toLocaleString("en-NP", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not available";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <Header
        title="My Profile"
        description="View your account information"
         />
      </div>

      {/* Account Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">
              Personal Information
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your basic account information
            </p>
          </div>

          <div className="space-y-5">
            {/* Name */}
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                <User size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Full Name
                </p>
                <p className="mt-1 truncate text-sm font-medium text-white">
                  {user.name || "Not available"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-purple-500/10 text-purple-400">
                <Mail size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Email Address
                </p>
                <p className="mt-1 truncate text-sm font-medium text-white">
                  {user.email || "Not available"}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-green-500/10 text-green-400">
                <Shield size={20} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Account Role
                </p>
                <p className="mt-1 text-sm font-medium capitalize text-white">
                  {user.role || "User"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Activity */}
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">
              Account Activity
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your account activity information
            </p>
          </div>

          <div className="space-y-5">
            {/* Joined */}
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-orange-500/10 text-orange-400">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Account Created
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {joinedDate}
                </p>
              </div>
            </div>

            {/* Last Login */}
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <Clock size={20} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Last Login
                </p>
                <p className="mt-1 text-sm font-medium text-white">
                  {lastLogin}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-green-500/10 text-green-400">
                <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Account Status
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-green-400">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
