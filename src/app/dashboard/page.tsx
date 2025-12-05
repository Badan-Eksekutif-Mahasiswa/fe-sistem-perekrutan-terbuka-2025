"use client";

import { useRequireAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Loader from "@/components/elements/Loader";

const DashboardPage = () => {
  const { user, isLoading } = useRequireAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return null; // useRequireAuth will handle redirect
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome to Sistem Perekrutan Terbuka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Information Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">
                Profile Information
              </h2>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Name:
                  </span>
                  <p className="text-sm text-gray-900">{user.name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Email:
                  </span>
                  <p className="text-sm text-gray-900">{user.email}</p>
                </div>
                {user.npm && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      NPM:
                    </span>
                    <p className="text-sm text-gray-900">{user.npm}</p>
                  </div>
                )}
                {user.faculty && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Faculty:
                    </span>
                    <p className="text-sm text-gray-900">{user.faculty}</p>
                  </div>
                )}
                {user.studyProgram && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Study Program:
                    </span>
                    <p className="text-sm text-gray-900">{user.studyProgram}</p>
                  </div>
                )}
                {user.year && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Year:
                    </span>
                    <p className="text-sm text-gray-900">{user.year}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-green-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Button className="w-full" variant="ghost">
                  View Available Positions
                </Button>
                <Button className="w-full" variant="ghost">
                  My Applications
                </Button>
                <Button className="w-full" variant="ghost">
                  Profile Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Session Information */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Session Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <span className="font-medium">User ID:</span> {user.id}
              </div>
              <div>
                <span className="font-medium">Email Verified:</span>{" "}
                {user.emailVerified ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-medium">Created:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Last Updated:</span>{" "}
                {new Date(user.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
