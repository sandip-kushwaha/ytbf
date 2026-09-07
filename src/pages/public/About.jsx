import React from "react";
import {
  Newspaper,
  ShieldCheck,
  Globe,
  Award,
  Users,
  CheckCircle2,
  BookOpen,
  Scale,
} from "lucide-react";

const About = () => {
  const stats = [
    { label: "Monthly Readers", value: "2.5M+" },
    { label: "Journalists & Reporters", value: "45+" },
    { label: "Years of Coverage", value: "12+" },
    { label: "Press Awards Won", value: "18" },
  ];

  const values = [
    {
      icon: <Scale className="h-6 w-6 text-blue-600" />,
      title: "Uncompromising Independence",
      description:
        "Our editorial line is strictly independent of political pressure, commercial interests, or corporate influence.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      title: "Fact-Checked Accuracy",
      description:
        "Every article undergoes a multi-layer verification process by specialized desk editors before publication.",
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Ground-Level Reporting",
      description:
        "We prioritize firsthand reporting over syndicated wire aggregation to bring authentic, local perspectives.",
    },
  ];

  const team = [
    {
      name: "Aarav Sharma",
      role: "Editor-in-Chief",
      bio: "15+ years in investigative journalism across South Asia.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Sujata kushwaha",
      role: "Head of Investigative Desk",
      bio: "Award-winning journalist specializing in public policy and reform.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Ritesh Prajapati",
      role: "Senior Political Bureau Chief",
      bio: "Covering national affairs, elections, and parliamentary developments.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white sm:py-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-size-[16px_16px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-400 border border-blue-500/20">
              <Newspaper className="h-3.5 w-3.5" />
              About Our Publication
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Truth in Reporting, Independence in Spirit
            </h1>
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              Founded to deliver factual, objective, and timely journalism, we
              are dedicated to holding power accountable and giving voice to
              critical stories across Nepal and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="border-b border-gray-200 bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4">
                <p className="text-3xl font-extrabold text-blue-600 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Our Editorial Mandate
              </span>
              <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                Serving the Public Interest Through Unbiased Journalism
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                In an era of hyper-information and sensationalism, our newsroom
                remains committed to rigorous verification, context-rich
                analysis, and ethical reporting standards.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Strict separation of editorial content and commercial sponsorship.",
                  "Zero tolerance for undisclosed conflicts of interest.",
                  "Transparent correction policies for any factual errors.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm font-medium text-gray-700"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Editorial Standard Card */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">
                Code of Press Ethics
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Our newsroom operates strictly under international press
                standards. We protect whistleblowers, verify anonymous tips, and
                ensure right-of-reply for all investigative subjects.
              </p>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Ratified by the Editorial Board
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Principles / Values */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Core Journalistic Values
            </h2>
            <p className="mt-3 text-gray-600">
              The foundational pillars that guide every story we publish.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs transition hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                  {val.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {val.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Leadership */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Editorial Board
            </span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
              Meet Our Newsroom Leaders
            </h2>
            <p className="mt-3 text-gray-600">
              Guided by veteran journalists with decades of field experience.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition hover:shadow-md"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
