"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-800">CREDORA</h1>
        <nav className="space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
        </nav>
      </header>

      <main className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900">
            Building <span className="text-green-500">Financial Security</span> Together
          </h2>
          <p className="text-gray-500 mt-4">
            Join forces with our experienced advisors to build a strong financial foundation for yourself and your loved ones.
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="mt-6 px-6 py-3 bg-black text-white text-lg rounded-md hover:bg-green-500"
          >
            Get a free account
          </button>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/1234.png"
            alt="Financial Advisor"
            width={300}  
            height={300} 
            className="rounded-lg"
          />
        </div>
      </main>

      <section className="bg-gray-100 py-16">
        <div className="text-center mb-12">
          <h3 className="text-lg text-gray-500">A One Stop Solution</h3>
          <h2 className="text-3xl font-bold text-gray-900">For All Your Financial Needs</h2>
        </div>

        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 w-full max-w-5xl">
            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
              <h4 className="text-xl font-semibold mt-4">Personal Loans</h4>
              <p className="text-gray-500 mt-2">Unsecured credit to fulfill current requirements.</p>
              <button
                onClick={() => router.push("/auth")}
                className="text-blue-500 font-semibold mt-4"
              >
                Get started →
              </button>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
              <h4 className="text-xl font-semibold mt-4">Business Loans</h4>
              <p className="text-gray-500 mt-2">Finance to help facilitate your business.</p>
              <button
                onClick={() => router.push("/auth")}
                className="text-blue-500 font-semibold mt-4"
              >
                Get started →
              </button>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
              <h4 className="text-xl font-semibold mt-4">Loan Against Property</h4>
              <p className="text-gray-500 mt-2">Unlock the true value of your assets.</p>
              <button
                onClick={() => router.push("/auth")}
                className="text-blue-500 font-semibold mt-4"
              >
                Get started →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 w-full max-w-3xl mt-8">
            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
              <h4 className="text-xl font-semibold mt-4">Education Loans</h4>
              <p className="text-gray-500 mt-2">Get financial support for your higher education.</p>
              <button
                onClick={() => router.push("/auth")}
                className="text-blue-500 font-semibold mt-4"
              >
                Get started →
              </button>
            </div>

            <div className="bg-white shadow-lg p-6 rounded-lg text-center">
              <h4 className="text-xl font-semibold mt-4">Agriculture Loans</h4>
              <p className="text-gray-500 mt-2">Support for farmers and agricultural businesses.</p>
              <button
                onClick={() => router.push("/auth")}
                className="text-blue-500 font-semibold mt-4"
              >
                Get started →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
