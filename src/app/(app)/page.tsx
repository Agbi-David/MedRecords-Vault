import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Shield,
  Users,
  Building,
  Search,
  Key,
  BarChart,
  Clock,
  Trophy,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Shield className="text-blue-600 h-8 w-8" />
              <h1 className="text-3xl font-bold text-blue-600">
                MedRecords Pro
              </h1>
            </div>
            <div className="space-x-4">
              <Link href="/admin">
                <Button variant="ghost">Admin Login</Button>
              </Link>
              <Link href="/institution/auth/login">
                <Button variant="outline">Institution Login</Button>
              </Link>
              <Link href="/demo-request">
                <Button>Request Demo</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-5xl font-bold mb-6">
                Revolutionary Medical Records Management for Modern Hospitals
              </h2>
              <p className="text-xl mb-10">
                Streamline patient data, enhance collaboration, and ensure
                utmost security with our cutting-edge platform.
              </p>
              <div className="space-x-4">
                <Link href="/demo-request">
                  <Button size="lg" variant="secondary">
                    Schedule a Demo
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="default">
                    Explore Features
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Transforming Healthcare Data Management
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <Users className="mr-2" />
                    Family-Centric Records
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Create and manage comprehensive family medical records with
                    ease. Generate unique Family IDs for efficient
                    record-keeping and seamless healthcare delivery across
                    generations.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <Key className="mr-2" />
                    Advanced ID Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Utilize our state-of-the-art algorithm to generate secure,
                    unique identifiers for families and individual members.
                    Ensure data integrity and privacy while facilitating easy
                    record retrieval.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <Building className="mr-2" />
                    Seamless Institution Collaboration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Enable secure and efficient document requests from
                    authorized institutions. Streamline information exchange
                    while maintaining strict access controls and audit trails.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <Shield className="mr-2" />
                    Military-Grade Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Protect sensitive medical data with AES-256 encryption,
                    multi-factor authentication, and role-based access control.
                    Ensure HIPAA compliance and patient confidentiality at every
                    level.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <Search className="mr-2" />
                    Intelligent Record Retrieval
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Leverage advanced search algorithms and natural language
                    processing to quickly locate and access patient records.
                    Enjoy intuitive interfaces designed for healthcare
                    professionals.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <FileText className="mr-2" />
                    Comprehensive Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Store and manage a wide range of medical documents, from
                    birth certificates to complex medical histories. Support for
                    various file formats and integration with existing hospital
                    systems.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              How MedRecords Pro Works
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Hospital Onboarding
                </h4>
                <p className="text-gray-600">
                  Quick and secure registration process with dedicated support
                  for smooth integration.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h4 className="text-xl font-semibold mb-2">Record Creation</h4>
                <p className="text-gray-600">
                  Admins easily create and manage family records with automated
                  ID generation.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Secure Collaboration
                </h4>
                <p className="text-gray-600">
                  Authorized institutions can request and access specific
                  documents as needed.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Continuous Improvement
                </h4>
                <p className="text-gray-600">
                  Regular updates and support ensure your system evolves with
                  healthcare needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Why Choose MedRecords Pro?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center text-blue-600">
                    <BarChart className="h-12 w-12 mb-4" />
                    Improved Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Reduce administrative overhead by up to 40% and streamline
                    patient data management processes.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center text-blue-600">
                    <Clock className="h-12 w-12 mb-4" />
                    Time-Saving
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Cut record retrieval time by 60%, allowing healthcare
                    professionals to focus more on patient care.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center text-blue-600">
                    <Trophy className="h-12 w-12 mb-4" />
                    Industry-Leading Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Benefit from our 99.99% uptime and zero successful security
                    breaches since inception.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Revolutionize Your {"Hospital's"} Record Management?
            </h3>
            <p className="text-xl mb-10">
              Join over 500+ healthcare institutions already benefiting from
              MedRecords Pro
            </p>
            <Link href="/contact-sales">
              <Button size="lg" variant="secondary">
                Schedule a Personalized Demo
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <p className="text-gray-400">
                MedRecords Pro is dedicated to transforming healthcare data
                management with innovative, secure, and efficient solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-400 hover:text-white"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-400 hover:text-white"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-gray-400 hover:text-white"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/compliance"
                    className="text-gray-400 hover:text-white"
                  >
                    HIPAA Compliance
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">
                1234 Healthcare Ave, Suite 500
                <br />
                San Francisco, CA 94104
              </p>
              <p className="text-gray-400 mt-2">
                contact@medrecordspro.com
                <br />
                +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2024 MedRecords Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
