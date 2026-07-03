import React from 'react';
import { Mail } from 'lucide-react';

const Verify = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600" />

          <div className="px-8 py-10 flex flex-col items-center text-center">

            {/* Animated icon */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-200">
                <Mail size={34} className="text-white" />
              </div>
              {/* Ping animation */}
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-green-500" />
              </span>
            </div>

            {/* Text */}
            <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full mb-4">
              Almost there!
            </span>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
              Check your inbox
            </h2>

            <p className="text-gray-400 text-[14px] leading-7 max-w-xs">
              We've sent a verification link to your email. Click the link in the email to activate your account.
            </p>

            {/* Tip box */}
            <div className="mt-6 w-full bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-left">
              <p className="text-[12px] text-amber-700 font-semibold mb-1">💡 Didn't receive it?</p>
              <p className="text-[12px] text-amber-600">
                Check your spam or junk folder. It may take a minute or two to arrive.
              </p>
            </div>

          </div>
        </div>

        {/* Below card note */}
        <p className="text-center text-xs text-gray-400 mt-5">
          🔒 Your data is safe and encrypted
        </p>

      </div>
    </div>
  );
};

export default Verify;