"use client"

import { useState } from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { RiMenu3Line } from 'react-icons/ri';

const categories = [
  { name: 'Shampoo', href: '/category/shampoo' },
  { name: 'Body Wash', href: '/category/body-wash' },
  { name: 'Towels', href: '/category/towels' },
  { name: 'Kids', href: '/category/kids' },
  { name: 'Sale', href: '/category/sale' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Categories */}
          <div className="hidden md:flex space-x-4 flex-shrink-0 w-1/3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm text-gray-600 hover:text-cyan-500 transition-colors whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="flex justify-center w-1/3">
            <Link href="/" className="text-4xl font-bold text-cyan-500 relative">
              <span className="bubble-text hover:scale-110 hover:text-cyan-400">
                Aqua Heaven
                <span>○</span>
                <span>○</span>
                <span>○</span>
              </span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center justify-end space-x-6 w-1/3">
            <button className="text-gray-600 hover:text-cyan-500">
              <FiSearch size={24} />
            </button>
            <Link href="/cart" className="text-gray-600 hover:text-cyan-500">
              <FiShoppingBag size={24} />
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-cyan-500"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-cyan-500"
            >
              <RiMenu3Line size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white rounded-b-2xl shadow-lg">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block px-4 py-2 text-gray-600 hover:bg-cyan-50 hover:text-cyan-500"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
