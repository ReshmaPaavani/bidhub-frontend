import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="hidden flex-1 items-center justify-center bg-primary-dark md:flex">
        <div className="max-w-md px-8 text-white">
          <h1 className="mb-4 text-4xl font-bold">Join BidHub Today</h1>
          <p className="mb-6 text-lg leading-relaxed text-white/90">
            Create an account to start bidding on unique items or sell your own treasures on our secure auction platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-white/10 p-2">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Quick Setup</h3>
                <p className="text-sm text-white/80">Create your account in less than a minute</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-white/10 p-2">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Personalized Experience</h3>
                <p className="text-sm text-white/80">Curated recommendations based on your interests</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 rounded-full bg-white/10 p-2">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Verified Users</h3>
                <p className="text-sm text-white/80">Trade with confidence in a trusted community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </div>
  );
};