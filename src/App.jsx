import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WaveformDivider from './components/WaveformDivider';
import ProjectModal from './components/ProjectModal';
import { ArrowUpRight, FileText, Download, Gamepad2, Mail, Github, Linkedin, Instagram, Youtube, Image as ImageIcon } from 'lucide-react';
import studioData from './data/studio.json';
import artDesignData from './data/art_design.json';

const SHOW_RESUME = true; // Set to false to hide the resume section

const PROJECTS_DATA = [
  {
    title: "Autonomous Outdoor Robot (IGVC)",
    date: "2025-Present",
    status: "IN_PROGRESS",
    goal: "Model optimization, safety integration, & autonomy",
    stack: ['Jetson Orin NX', 'TM4C123', 'LiDAR', 'Computer Vision', 'C++/Python'],
    repoLink: "https://github.com/Galib2003/IGVC.git",
    images: ['images/igvc_robot.jpg', 'images/igvc_cover_design.png', 'images/igvc_wiring_diagram.png'],
    description: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Developing a unified autonomous mode for the Intelligent Ground Vehicle Competition.
          The 3-layer architecture (Input, Processing, Output) integrates signals from LiDAR, cameras, and encoders for real-time decision making.
        </p>
        <p>
          <strong>Focus:</strong> Enhancing safety systems with wireless E-stops and warning lights, while optimizing the lane detection and obstacle avoidance algorithms on the Jetson Orin NX.
        </p>
      </>
    ),
    fullDescription: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Designed for the <strong>Intelligent Ground Vehicle Competition (IGVC)</strong>, this autonomous robot navigates complex outdoor obstacle courses without human intervention.
          This project is a <strong>continuation of a previous senior design team's work</strong>, refining the architecture for improved reliability and performance.
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>System Architecture</h4>
        <p style={{ marginBottom: '1rem' }}>
          The system follows a strict <strong>3-Layer Architecture</strong>:
        </p>
        <ul style={{ listStyle: 'disc', listStylePosition: 'inside', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <li><strong>Input Layer (Sensors):</strong> Collects environmental data via Logitech C920 Camera (Lane/Object detection), RPLIDAR S3 (Obstacle avoidance), GPS, and Optical Encoders.</li>
          <li><strong>Processing Layer (Decision):</strong> An <strong>NVIDIA Jetson Orin Nano</strong> running <strong>ROS 2</strong> fuses sensor data for localization, path planning, and perception. A <strong>Tiva-C (TM4C123)</strong> microcontroller handles real-time hardware interfacing.</li>
          <li><strong>Output Layer (Actuation):</strong> Translates decisions into physical motion via a Sabertooth 2x32 motor driver and provides visual status feedback through a custom lighting system.</li>
        </ul>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Key Features & Safety</h4>
        <p>
          The vehicle features a redundant safety system including a physical mushroom kill switch and a wireless remote stop.
          Navigation relies on sensor fusion (GPS + Odometry) to maintain accurate localization even in GPS-denied environments.
        </p>
      </>
    )
  },
  {
    title: "Real-Time Operating System (RTOS)",
    date: "2025-12",
    status: "COMPLETED",
    goal: "Preemptive kernel with MPU & Shell on ARM Cortex-M4F",
    stack: ['C', 'ARM Assembly', 'TM4C123', 'Memory Protection'],
    repoLink: "https://github.com/Galib2003/RTOS",
    images: ['images/rtos_board.jpg'],
    description: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Developed a custom preemptive RTOS kernel from scratch for the TM4C123 (ARM Cortex-M4F).
          Features include an 8-level priority scheduler, inter-process communication (mutexes/semaphores), and hardware memory protection.
        </p>
        <p>
          <strong>Highlights:</strong> Implemented a CLI shell for process management and a custom heap allocator with MPU-enforced access rights.
        </p>
      </>
    ),
    fullDescription: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          This project involved building a fully functional <strong>Real-Time Operating System</strong> from the ground up for the TM4C123GH6PMI microcontroller.
          The kernel supports <strong>preemptive scheduling</strong> with 8 priority levels (0-Highest to 7-Lowest), ensuring deterministic behavioral guarantees for critical tasks.
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Core Kernel Architecture</h4>
        <p style={{ marginBottom: '1rem' }}>
          The scheduler utilizes the ARM Cortex-M <strong>PendSV</strong> exception for context switching to maintain low interrupt latency, while the <strong>SysTick</strong> timer drives the preemption and sleep logic.
          Context switching involves saving the full register state (R4-R11 manually, R0-R3/R12/LR/PC/PSR automatically hardware-stacked) to the Process Stack Pointer (PSP).
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Synchronization & IPC</h4>
        <ul style={{ listStyle: 'disc', listStylePosition: 'inside', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <li><strong>Semaphores:</strong> Implemented <code>wait()</code> and <code>post()</code> for blocking synchronization. Tasks blocked on a semaphore are moved to a process queue and do not consume CPU cycles.</li>
          <li><strong>Mutexes:</strong> Supports priority inheritance to prevent priority inversion. Includes <code>lock()</code> and <code>unlock()</code> with ownership validation (only the owner can unlock).</li>
          <li><strong>Yield & Sleep:</strong> <code>yield()</code> voluntarily gives up the timeslice, while <code>sleep(ms)</code> places the task in a delta queue until the specified duration expires.</li>
        </ul>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Memory Protection & Safety</h4>
        <p style={{ marginBottom: '1rem' }}>
          Integrated the hardware <strong>Memory Protection Unit (MPU)</strong> to enforce spatial isolation.
          Kernel code runs in <strong>Privileged Mode</strong> with full access, while user tasks run in <strong>Unprivileged Mode</strong> with access restricted to their own stack and specific peripherals.
          A custom heap manager (<code>malloc_heap</code>) ensures allocations are aligned to MPU region requirements (512B/1024B boundaries).
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Shell Interface</h4>
        <p>
          A non-blocking UART command shell allows for runtime system introspection and control without pausing the kernel:
        </p>
        <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          <li>&gt; ps &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Displays PID, Task Name, State (Run/Wait/Sleep), and CPU usage %</li>
          <li>&gt; ipcs &nbsp;&nbsp;&nbsp;&nbsp;// Shows active Semaphores & Mutexes with holding task info</li>
          <li>&gt; kill &nbsp;&nbsp;&nbsp;&nbsp;// Kills a thread and reclaims its stack/TCB memory</li>
          <li>&gt; pidof &nbsp;&nbsp;&nbsp;// Resolves Task Name to PID</li>
          <li>&gt; sched &nbsp;&nbsp;&nbsp;// Toggles between Priority and Round-Robin scheduling</li>
        </ul>
      </>
    )
  },
  {
    title: "Hybrid Guitar Distortion Pedal",
    date: "2025-11",
    status: "COMPLETED",
    goal: "Analog signal path with STM32-based digital control",
    video: "https://www.youtube.com/embed/-jpOX86UUWA?si=BhXp7STRPKdMwbvW",
    stack: ['STM32F446RE', 'TL082 Op-Amp', 'Relay Switching', 'Analog Circuits', 'C'],
    images: ['images/guitar_pedal_setup.jpg'],
    modalImages: [
      'images/guitar_pedal_detail_1.jpg',
      'images/guitar_pedal_detail_2.jpg',
      'images/guitar_pedal_detail_3.jpg'
    ],
    description: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Designed a hybrid effects pedal that combines a pure analog distortion circuit (TL082 op-amp + diode clipping) with an STM32 microcontroller for precise digital control of signal switching.
        </p>
        <p>
          <strong>Philosophy:</strong> Preserved the "warm" organic tone of analog circuits while identifying that digital control (via relays) offers superior reliability for muting/bypassing without digitizing the audio signal.
        </p>
      </>
    ),
    fullDescription: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          This project successfully integrated an <strong>STM32F446RE microcontroller</strong> into a classic analog distortion circuit.
          By restricting the digital logic to low-bandwidth control tasks (switching/muting), the system avoids expensive AD/DA conversion, ensuring the guitar tone remains 100% analog.
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Analog Signal Path</h4>
        <p style={{ marginBottom: '1rem' }}>
          The core tone is generated by a high-gain <strong>TL082 Op-Amp</strong> stage with symmetrical soft-clipping using anti-parallel <strong>1N4148 diodes</strong>.
          A passive RC network provides tone shaping (Low-Pass Filter), followed by a DC-blocking capacitor to condition the output.
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Digital Control System</h4>
        <ul style={{ listStyle: 'disc', listStylePosition: 'inside', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <li><strong>Controller:</strong> STM32F446RE handling user input and relay logic.</li>
          <li><strong>Relay Switching:</strong> A 5V Relay Module (controlled via GPIO PA5) physically bypasses or engages the output, ensuring a "true mute" with zero signal bleed.</li>
          <li><strong>State Machine:</strong> Firmware implements a debounced FSM for the User Button (PC13) to toggle the mute state reliably.</li>
        </ul>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Power & Validation</h4>
        <p>
          A dual-rail power design uses an <strong>L7805 regulator</strong> to provide a stable 5V for the digital logic/relay from the standard 9V pedal supply.
          Testing confirmed consistent overdrive tones with negligible switching noise and stable thermal performance.
        </p>
      </>
    )
  },
  {
    title: "Embedded LCR Meter",
    date: "2024-11",
    status: "COMPLETED",
    goal: "Measure R, L, & C via comparator interrupts & precise timing",
    stack: ['C', 'TM4C123', 'Hardware Timers', 'Analog Comparators'],
    repoLink: "https://github.com/Galib2003/Inductance-Capacitance-Resistance-LCR-Meter.git",
    images: ['images/lcr_meter_circuit.jpg'],
    description: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Implemented a precision LCR meter on an ARM Cortex-M4 microcontroller.
          Uses a text-based CLI to trigger measurement cycles for Resistance, Capacitance, and Inductance by timing charge/discharge curves.
        </p>
        <p>
          <strong>Key Tech:</strong> Replaced traditional ADC sampling with <strong>Analog Comparator Interrupts</strong> to capture sub-microsecond timing events for calculating component values.
        </p>
      </>
    ),
    fullDescription: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          This project implements a fully functional <strong>Inductance-Capacitance-Resistance (LCR) meter</strong> using only a microcontroller and a basic analog front-end.
          Instead of using an expensive ADC for continuous sampling, it leverages <strong>Analog Comparators</strong> and <strong>Hardware Timers</strong> to measure the <em>time constant</em> of the component under test, offering high precision with minimal CPU overhead.
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Measurement Modes</h4>
        <ul style={{ listStyle: 'disc', listStylePosition: 'inside', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <li><strong>Resistance (r):</strong> Measures the de-integration time of an internal capacitor through the unknown resistor.</li>
          <li><strong>Capacitance (c):</strong> Measures the charge time required to trip the comparator reference voltage.</li>
          <li><strong>Inductance (l):</strong> Measures the "flyback" time (flux collapse) when current is removed from the inductor.</li>
          <li><strong>Auto-Range (auto):</strong> Heuristically detects the component type and selects the appropriate measurement algorithm.</li>
        </ul>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>System Architecture</h4>
        <p>
          The firmware features a non-blocking <strong>Command Line Interface (CLI)</strong> parsing UART input.
          Upon detecting a command, the system configures the GPIOs to stimulate the test circuit, enables the Comparator Interrupt (de-glitched), and starts a 32-bit Timer.
          The ISR captures the timer value instantly upon threshold crossing, which is then mapped to physical units (Ohms, Farads, Henries) using empirically derived calibration tables.
        </p>
      </>
    )
  }
];

const CREATIVE_PROJECTS_DATA = [
  {
    theme: 'retro',
    title: "PixelStrum",
    date: "2026-02",
    status: "CONCEPT",
    goal: "Gamified social music platform with AI integration",
    stack: ['React 19', 'Gemini API', 'Web Audio API', 'Tailwind'],
    images: ['images/projects/pixelstrum/feed.png'],
    modalImages: [
      'images/projects/pixelstrum/drummer.png',
      'images/projects/pixelstrum/amp.png',
      'images/projects/pixelstrum/card.png'
    ],
    description: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          PixelStrum is a concept web application that bridges the gap between social networking, gamification, and serious musical utility for guitarists.
        </p>
        <p>
          <strong>Focus:</strong> A matched "retro-gaming" aesthetic meets advanced AI tools like an Avatar Creator, Session Drummer, and "NeuroShred" Amp Sim.
        </p>
      </>
    ),
    fullDescription: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          PixelStrum demonstrates the future of "Creative Co-pilot" applications. It moves beyond simple chatbots by integrating AI directly into the creative workflow.
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Feature Deep Dive</h4>
        <ul style={{ listStyle: 'disc', listStylePosition: 'inside', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <li><strong>AI-Driven Avatar Creator:</strong> Uses Gemini Vision to map user selfies to pixel-art avatars with specific gear.</li>
          <li><strong>AI Session Drummer:</strong> Conversational interface to generate 16-step sequencer patterns based on natural language or song requests.</li>
          <li><strong>NeuroShred Amp Sim:</strong> Browser-based DSP engine with Tube Saturation, EQ, and Cabinet Simulation.</li>
          <li><strong>Intelligent Tone Stickers:</strong> Auto-categorizes uploaded tracks using Gemini to analyze title and visual vibe.</li>
        </ul>
      </>
    )
  },
  {
    theme: 'modern',
    title: "Bruce",
    date: "2026-01",
    status: "BETA",
    goal: "AI-Powered PhD Application Consultant",
    stack: ['Gemini 2.0 Flash', 'React (TypeScript)', 'Google Search Grounding', 'Tailwind'],
    images: ['images/projects/bruce/dashboard.png'],
    modalImages: [
      'images/projects/bruce/builder.png',
      'images/projects/bruce/opportunities.png',
      'images/projects/bruce/scout.png'
    ],
    description: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          An intelligent "PhD Application AI" designed to act as a personal wingman for aspiring doctoral students. Built on the cutting-edge Google Gemini 2.0 Flash API.
        </p>
        <p>
          <strong>Mission:</strong> Streamline the chaotic journey from resume creation to finding the perfect supervisor and crafting the cold email.
        </p>
      </>
    ),
    fullDescription: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          Applying for a PhD is grueling. Bruce unifies the disparate tasks—writing, searching, tailoring, and emailing—into a single, intelligent dashboard.
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Core Intelligence</h4>
        <ul style={{ listStyle: 'disc', listStylePosition: 'inside', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <li><strong>The Resume Architect:</strong> Extracts PDF data into structured JSON and re-renders it into academic LaTeX-style formats.</li>
          <li><strong>Academic Headhunter:</strong> Uses student profile data to semantic search for professors with active funding and recent relevant papers.</li>
          <li><strong>Tailoring Engine:</strong> Re-writes resume bullet points to align with specific professor's research interests.</li>
          <li><strong>Global Scout:</strong> Geospatial map search for funded positions worldwide.</li>
        </ul>
      </>
    )
  },
  {
    theme: 'neumorphic',
    title: "SyncSpace",
    date: "2026-03",
    status: "BETA",
    goal: "Minimalist Tracker for Asynchronous Collaboration",
    stack: ['React 19', 'Tailwind', 'GenAI SDK', 'Gemini'],
    images: ['images/projects/syncspace/overview.png'],
    modalImages: [
      'images/projects/syncspace/dashboard.png',
      'images/projects/syncspace/projects.png',
      'images/projects/syncspace/activity.png'
    ],
    description: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          A web-based application designed to bridge the gap between casual chat and heavy project management. Engineered for remote partners working in different time zones.
        </p>
        <p>
          <strong>Focus:</strong> "Context Preservation" and "Baton Passing" workflow to reduce anxiety in asynchronous collaboration.
        </p>
      </>
    ),
    fullDescription: (
      <>
        <p style={{ marginBottom: '1rem' }}>
          SyncSpace is not about managing tasks; it is about managing momentum. By combining the "Baton" workflow with AI summarization and a calm, tactile UI, it ensures alignment even with a 12-hour timezone difference.
        </p>

        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Core Features</h4>
        <ul style={{ listStyle: 'disc', listStylePosition: 'inside', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <li><strong>Baton Passing System:</strong> Binary project states ("Your Turn", "Waiting", "Shared") to clarify responsibility.</li>
          <li><strong>Context Snapshots:</strong> Dedicated "Where we left off" notes for the future self or partner.</li>
          <li><strong>AI Smart Summarization:</strong> Uses Gemini to generate bulleted summaries of activity since the user's last login.</li>
          <li><strong>Relationship-Based Workspace:</strong> Organizes projects by "Friendship" rather than generic teams.</li>
        </ul>
      </>
    )
  }
];

// Content for sections
// Content for sections
const SystemOverview = () => (
  <div className="section-content fade-in">
    <div className="section-header">
      <h2 className="section-title">ABOUT<br />ME</h2>
    </div>

    <div className="swiss-grid">
      {/* Column 1: Main Content with Floated Image */}
      <div style={{ gridColumn: 'span 9' }}>
        <div style={{
          float: 'right',
          width: '320px',
          marginLeft: '2rem',
          marginBottom: '1rem',
          position: 'relative'
        }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src="images/profile.jpg"
              alt="Rafiqul Islam"
              className="profile-photo"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>

        <p style={{ fontFamily: '"Source Sans 3", sans-serif', fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          I’ve always been drawn to creating. Starting with digital art and evolving into code, circuits, and sound.
        </p>
        <p style={{ fontFamily: '"Source Sans 3", sans-serif', fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          Studying <span style={{ color: 'var(--accent-main)', fontWeight: 600 }}>Computer Engineering</span> at UT Arlington shifted my perspective, helping me see technology not just as tools, but as creative mediums to shape visual, sonic, and interactive experiences.
        </p>
        <p style={{ fontFamily: '"Source Sans 3", sans-serif', fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          Now, I focus on blending creativity with an <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>engineering mindset</strong> through photography, videography, audio, and design - building work that’s both structured and expressive.
        </p>
        <p style={{ fontFamily: '"Source Sans 3", sans-serif', fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          At the core, I just want to create things that feel real - things people can <strong style={{ color: 'var(--accent-main)', fontWeight: 700 }}>See, Hear, and Connect</strong> with.
        </p>
        <blockquote style={{
          borderLeft: '4px solid var(--accent-main)',
          paddingLeft: '1.5rem',
          fontSize: '1.25rem',
          fontStyle: 'italic',
          color: 'var(--text-primary)',
          margin: '2rem 0',
          clear: 'none'
        }}>
          “All that matters is that you are making something you love, to the best of your ability, here and now.”
          <footer style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-secondary)', fontStyle: 'normal' }}>― Rick Rubin, The Creative Act</footer>
        </blockquote>
      </div>

      {/* Column 2: Stats/Focus Areas */}
      <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: '#755941', padding: '2rem', color: 'white' }}>
          <h4 style={{ marginBottom: '1rem', color: 'white' }}>Focus Areas</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['Graphic Design & Visual Communication', 'Film & Video Production', 'Creative Audio & Sound Design', 'Creative Technology & Engineering', 'Photography & Storytelling'].map(item => (
              <li key={item} style={{ marginBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.2)', paddingBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Full Width: Skills Matrix */}
    <div style={{ gridColumn: '1 / -1', marginTop: '4rem' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px solid var(--accent-main)', display: 'inline-block' }}>Technical Arsenal</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {[
          { title: "Languages", items: ["C/C++", "Python", "ARM Assembly", "Bash"] },
          { title: "Hardware", items: ["STM32", "TM4C123", "NVIDIA Jetson", "FPGA"] },
          { title: "Protocols", items: ["I2C/SPI/UART", "CAN Bus", "Ethernet", "MQTT"] },
          { title: "Tools", items: ["ROS 2", "Altium/KiCad", "Docker", "PyTorch"] }
        ].map((cat, i) => (
          <div key={i}>
            <h4 style={{ color: 'var(--accent-main)', marginBottom: '1rem' }}>{cat.title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)' }}>
              {cat.items.map(skill => <li key={skill} style={{ marginBottom: '0.25rem' }}>{skill}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>

    {SHOW_RESUME && (
      <div style={{ marginTop: '6rem', background: 'var(--accent-main)', padding: '4rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--bg-main)', marginBottom: '1rem' }}>LOOKING FOR THE CV?</h2>
        <a href="resume.pdf" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block',
          background: 'white',
          color: 'var(--accent-main)',
          padding: '1rem 3rem',
          fontWeight: 700,
          fontSize: '1.25rem',
          textTransform: 'uppercase'
        }}>
          Download PDF
        </a>
      </div>
    )}
  </div>
);

// Research Section
const Research = () => (
  <div className="section-content fade-in">
    <div className="section-header">
      <h2 className="section-title">RESEARCH<br />LAB</h2>
    </div>

    <div className="swiss-grid">
      {/* Introduction */}
      <div style={{ gridColumn: 'span 4' }}>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          My academic work focuses on <strong style={{ color: 'var(--accent-main)' }}>AI-enabled IoT Security</strong> and <strong style={{ color: 'var(--accent-main)' }}>Optimization Algorithms</strong>. I aim to publish actionable findings that protect edge devices and improve system efficiency.
        </p>
      </div>

      {/* Papers List */}
      <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {[
          {
            title: "A Novel Optimization Model for Cost-effective Sustainable Power Plant",
            subtitle: "Raid, G. A. (First Author), Islam, M. T., Swapnil, F. M. | Applied Energy (Elsevier)",
            status: "Submitted",
            date: "Jan 2026",
            description: "Developed a Direct Numerical Solution Optimization Algorithm (DNSOA) and compared performance against 7 Nature-Inspired Meta-Heuristic Multi-Objective Algorithms (e.g., NSGA-II, PSO). Integrated LSTM neural networks to predict future source availability, achieving a 0.12% reduction in system uncertainty and an ~88% reduction in pollutant emissions."
          },
          {
            title: "Investigation of Turbulence Model in CFD Flow for NACA 2412 Airfoil at High Reynolds Number",
            subtitle: "Raid, G. A. (First Author) | Applied Energy (Elsevier)",
            status: "Submitted",
            date: "Jan 2026",
            description: "Conducted a CFD study on NACA 2412 airfoils at high Reynolds numbers (1.3 × 10⁶) to analyze lift, drag, and aerodynamic efficiency. Evaluated 11 RANS turbulence models utilizing a Multi-Criteria Decision Making (MCDM) algorithm based on TOPSIS to identify optimal solvers."
          },
          {
            title: "Multi-Criteria Decision Making–Based Selection of RANS Turbulence Models for CFD Analysis of NACA 2412 Airfoil",
            subtitle: "Raid, G. A. (First Author), Islam, M. T. | Int. Journal for Computational Methods in Engineering Science and Mechanics",
            status: "Submitted",
            date: "Jan 2026",
            description: "Analyzed airflow at a moderate Reynolds number of 6.6 × 10⁵ using hybrid mesh topology in ANSYS Fluent. Applied MCDM algorithms to rank 11 RANS models, determining the Transition SST model achieved the least deviation (9.23%) against X-Foil data."
          },
          {
            title: "The Secure AI-Enabled IoT Edge: Attacks, Lightweight Defenses, and Privacy Challenges: A Systematic Review",
            subtitle: "Chowdhury, A., Moriwam, Islam, M. M., Tabassum, M., Raid, G. A. (Co-author) | Data Science and Management",
            status: "Submitted",
            date: "Dec 2025",
            description: "Co-authored a systematic review on AI-enabled IoT edge security. Synthesized threats, lightweight defenses, and privacy-preserving learning practices across peer-reviewed literature."
          }
        ].map((paper, i) => (
          <article key={i} style={{ borderTop: '1px solid var(--border-lines)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', opacity: 0.6, fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
              <span>{paper.status.toUpperCase()}</span>
              <span>{paper.date}</span>
            </div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{paper.title}</h3>
            <p style={{ color: 'var(--accent-main)', fontWeight: 500, marginBottom: '1rem' }}>{paper.subtitle}</p>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '65ch' }}>{paper.description}</p>
          </article>
        ))}
      </div>
    </div>
  </div>
);

const BuildLog = ({ title, stack, date, status, images, repoLink, videoLink, onSeeMore, children }) => (
  <article style={{ marginBottom: '6rem' }}>
    <div className="swiss-grid">
      {/* Image Area - Span 7 */}
      <div style={{ gridColumn: 'span 7', position: 'relative' }}>
        {images && images.length > 0 && (
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={images[0]}
              alt={title}
              style={{ width: '100%', display: 'block', filter: 'grayscale(100%) contrast(1.2)' }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              background: 'var(--accent-main)',
              color: 'var(--bg-main)',
              padding: '0.5rem 1rem',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              {status}
            </div>
          </div>
        )}
      </div>

      {/* Content Area - Span 5 */}
      <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: '1rem', borderBottom: '4px solid var(--accent-main)', display: 'inline-block', paddingBottom: '0.5rem' }}>
          <span style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1 }}>{date.slice(0, 4)}</span>
        </div>
        <h3 style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
          {title}
        </h3>

        <div style={{ marginBottom: '2rem' }}>
          <strong style={{ display: 'block', color: 'var(--accent-main)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Stack</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {stack.map(tech => (
              <span key={tech} style={{ border: '1px solid #555', padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>{tech}</span>
            ))}
          </div>
        </div>

        <div style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {children}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={onSeeMore}
            style={{
              background: 'var(--text-primary)',
              color: 'var(--bg-main)',
              border: 'none',
              padding: '1rem 2rem',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            Expand Project
          </button>
          {repoLink && (
            <a href={repoLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3rem', border: '1px solid #555' }}>
              <Github size={20} />
            </a>
          )}
          {videoLink && (
            <a href={videoLink} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3rem', border: '1px solid var(--accent-main)', color: 'var(--accent-main)' }}>
              <Youtube size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  </article>
);

const Projects = ({ onProjectSelect }) => (
  <div className="section-content fade-in">
    <div className="section-header">
      <h2 className="section-title">HARDWARE<br />PROJECTS</h2>
    </div>

    {PROJECTS_DATA.map((project, index) => (
      <BuildLog
        key={index}
        {...project}
        onSeeMore={() => onProjectSelect(project)}
      >
        {project.description}
      </BuildLog>
    ))}
  </div>
);




const ContactSection = () => (
  <div className="section-content fade-in">
    <div className="section-header">
      <h2 className="section-title">GET IN<br />TOUCH</h2>
    </div>

    <div className="swiss-grid">
      <div style={{ gridColumn: 'span 6', background: 'var(--accent-main)', color: 'var(--bg-main)', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 style={{ fontSize: '3rem', lineHeight: 1, marginBottom: '2rem' }}>LET'S<br />COLLABORATE</h3>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--bg-main)', maxWidth: '600px', opacity: 0.95 }}>
          I am currently open to opportunities in Embedded Systems, Robotics, Creative Technology, and Research & Development, with a growing interest in interactive and sound-driven systems.
        </p>
        <div style={{ marginTop: 'auto', paddingTop: '3rem' }}>
          <a href="mailto:gar5128@mavs.uta.edu" style={{ fontSize: '1.5rem', fontWeight: 700, textDecoration: 'underline' }}>
            gar5128@mavs.uta.edu
          </a>
        </div>
      </div>

      <div style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { icon: Mail, label: 'Email', value: 'gar5128@mavs.uta.edu', link: "mailto:gar5128@mavs.uta.edu" },
          { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/galib-raid', link: "https://www.linkedin.com/in/galib-raid/" },
          { icon: Github, label: 'GitHub', value: 'github.com/Galib2003', link: "https://github.com/Galib2003" },
          { icon: Instagram, label: 'Instagram', value: '@riuji_uzu', link: "https://www.instagram.com/riuji_uzu/" }
        ].map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={{
            background: 'var(--bg-surface)',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            transition: 'all 0.2s',
            border: '1px solid transparent'
          }}
            onMouseOver={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.border = '1px solid var(--accent-main)'; e.currentTarget.style.transform = 'translateX(10px)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.border = '1px solid transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}
          >
            <div style={{ background: 'var(--accent-main)', padding: '0.75rem', color: 'var(--bg-main)' }}>
              <item.icon size={24} />
            </div>
            <div>
              <strong style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.8rem', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{item.label}</strong>
              <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{item.value}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
);

const CreativeWorks = ({ onProjectSelect }) => {
  return (
    <div className="section-content fade-in">
      <div className="section-header">
        <h2 className="section-title">CREATIVE<br />LAB</h2>
      </div>
      <div className="swiss-grid">
        {CREATIVE_PROJECTS_DATA.map((project, i) => (
          <div
            key={i}
            className="creative-card"
            onClick={() => onProjectSelect(project)}
            style={{
              gridColumn: 'span 6',
              background: 'var(--bg-surface)',
              padding: '2rem',
              border: '1px solid var(--border-lines)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.borderColor = 'var(--accent-main)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-lines)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-main)' }}>{project.theme.toUpperCase()}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>v{project.date}</span>
            </div>

            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{project.goal}</p>
            <div style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '2rem' }}>{project.description}</div>

            <div style={{
              marginTop: 'auto',
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--accent-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              View Project <ArrowUpRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  return (
    <div className="section-content fade-in" style={{ padding: 0 }}>
      <div className="section-header" style={{ marginBottom: '4rem', paddingLeft: 'calc(5vw + 2rem)', paddingTop: '4rem', paddingRight: '5vw' }}>
        <h2 className="section-title">GALLERY</h2>

      </div>

      <div style={{
        width: '100%',
        margin: '0' // Removed full bleed to prevent left crop under the sidebar
      }}>
        {/* Style tag to handle responsive column count */}
        <style dangerouslySetInnerHTML={{
          __html: `
          .studio-masonry-grid { 
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0px; 
            line-height: 0; 
          }
          .studio-grid-item {
            width: 100%;
            margin: 0;
            padding: 0;
            position: relative;
            overflow: hidden;
            background: var(--bg-main);
          }
          .studio-grid-item img {
            width: 100%;
            aspect-ratio: 16 / 9;
            object-fit: cover;
            display: block;
            transition: opacity 0.2s ease;
          }
          @media (max-width: 1024px) {
            .studio-masonry-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 640px) {
            .studio-masonry-grid { grid-template-columns: 1fr; }
          }
        `}} />

        <div className="studio-masonry-grid">
          {studioData && studioData.length > 0 ? (
            studioData.map((post, i) => (
              <div
                key={i}
                className="studio-grid-item"
              >
                <img
                  src={post.imageUrl}
                  alt={post.alt}
                />
              </div>
            ))
          ) : (
            <div style={{ columnSpan: 'all', padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-lines)' }}>
              <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5, margin: '0 auto' }} />
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>The Gallery is empty.</p>
              <p style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>Upload images to public/images/studio and run 'npm run update-studio'.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ArtDesign = () => {
    return (
        <div className="section-content fade-in" style={{ padding: 0 }}>
            <div className="section-header" style={{ marginBottom: '4rem', paddingLeft: 'calc(5vw + 2rem)', paddingTop: '4rem', paddingRight: '5vw' }}>
                <h2 className="section-title">ART & DESIGN</h2>
            </div>

            <div style={{
                width: '100%',
                margin: '0'
            }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
            .art-masonry-grid { 
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 0px; 
              line-height: 0; 
            }
            .art-grid-item {
              width: 100%;
              margin: 0;
              padding: 0;
              position: relative;
              overflow: hidden;
              background: var(--bg-main);
            }
            .art-grid-item img {
              width: 100%;
              height: auto;
              object-fit: contain;
              display: block;
              transition: opacity 0.2s ease;
            }
            @media (max-width: 1024px) {
              .art-masonry-grid { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 640px) {
              .art-masonry-grid { grid-template-columns: 1fr; }
            }
          `}} />

                <div className="art-masonry-grid">
                    {artDesignData && artDesignData.length > 0 ? (
                        artDesignData.map((post, i) => (
                            <div
                                key={i}
                                className="art-grid-item"
                            >
                                <img
                                    src={post.imageUrl}
                                    alt={post.alt}
                                />
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-lines)' }}>
                            <ImageIcon size={48} style={{ marginBottom: '1rem', opacity: 0.5, margin: '0 auto' }} />
                            <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>The Art & Design gallery is empty.</p>
                            <p style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>Upload images to public/images/art_design and run 'npm run update-studio'.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PrintLayout = () => (
  <div className="print-layout">
    <div className="print-section"><SystemOverview /></div>
    <div className="print-section"><Research /></div>
    <div className="print-section"><Projects onProjectSelect={() => { }} /></div>
    <div className="print-section"><CreativeWorks onProjectSelect={() => { }} /></div>
    <div className="print-section"><ArtDesign /></div>
    <div className="print-section"><Gallery /></div>
    <div className="print-section"><ContactSection /></div>
  </div>
);

function App() {
  const [currentSection, setCurrentSection] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection]);

  // Check for print mode
  const searchParams = new URLSearchParams(window.location.search);
  const isPrintMode = searchParams.get('print') === 'true';

  if (isPrintMode) {
    return <PrintLayout />;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'overview': return <SystemOverview />;
      case 'research': return <Research />;
      case 'projects': return <Projects onProjectSelect={setSelectedProject} />;
      case 'playground': return <CreativeWorks onProjectSelect={setSelectedProject} />;
      case 'art_design': return <ArtDesign />;
      case 'studio': return <Gallery />;
      case 'contact': return <ContactSection />;
      default: return <SystemOverview />;
    }
  };

  return (
    <div className="layout-container">
      <Sidebar currentSection={currentSection} onNavigate={setCurrentSection} />
      <main
        className="main-content"
        style={(currentSection === 'studio' || currentSection === 'art_design') ? { padding: 0, maxWidth: 'none', marginLeft: '220px' } : {}}
      >
        {renderSection()}
      </main>
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
}

export default App;
