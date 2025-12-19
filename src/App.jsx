import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import WaveformDivider from './components/WaveformDivider';
import ProjectModal from './components/ProjectModal';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS_DATA = [
  {
    title: "Autonomous Outdoor Robot (IGVC)",
    date: "2025-Present",
    status: "IN_PROGRESS",
    goal: "Model optimization, safety integration, & autonomy",
    stack: ['Jetson Orin NX', 'TM4C123', 'LiDAR', 'Computer Vision', 'C++/Python'],
    images: ['/images/igvc_robot.jpg', '/images/igvc_cover_design.png'],
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
    images: ['/images/rtos_board.jpg'],
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
    stack: ['STM32F446RE', 'TL082 Op-Amp', 'Relay Switching', 'Analog Circuits', 'C'],
    images: ['/images/guitar_pedal_setup.jpg'],
    modalImages: [
      '/images/guitar_pedal_detail_1.jpg',
      '/images/guitar_pedal_detail_2.jpg',
      '/images/guitar_pedal_detail_3.jpg'
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
    images: ['/images/lcr_meter_circuit.jpg'],
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
          <li><strong>Resistance ('r'):</strong> Measures the de-integration time of an internal capacitor through the unknown resistor.</li>
          <li><strong>Capacitance ('c'):</strong> Measures the charge time required to trip the comparator reference voltage.</li>
          <li><strong>Inductance ('l'):</strong> Measures the "flyback" time (flux collapse) when current is removed from the inductor.</li>
          <li><strong>Auto-Range ('auto'):</strong> Heuristically detects the component type and selects the appropriate measurement algorithm.</li>
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

// Content for sections
const SystemOverview = () => (
  <div className="section-content fade-in">
    <header style={{ marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About Me</h2>
      <WaveformDivider type="noise" />
    </header>

    <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '300px', fontSize: '1rem', color: 'var(--text-secondary)' }}>
        <p style={{ marginBottom: '1.5rem' }}>
          I design and implement real-time systems where software interfaces directly with physical signals.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          My work sits at the intersection of <strong style={{ color: 'var(--text-primary)' }}>embedded firmware</strong> and <strong style={{ color: 'var(--text-primary)' }}>hardware design</strong>, with an emphasis on deterministic behavior, signal integrity, and validation on real hardware rather than simulation alone.
        </p>
        <p>
          I’m particularly interested in systems where timing, noise, and resource constraints actively shape design decisions — and where correctness is measured using oscilloscopes, logic analyzers, and controlled test signals.
        </p>
      </div>
      <div style={{ flexShrink: 0 }}>
        <img
          src="/images/profile_photo.jpg"
          alt="Profile"
          style={{
            width: '360px',
            height: 'auto',
            borderRadius: '8px',
            border: '1px solid var(--border-lines)',
            filter: 'grayscale(20%) contrast(1.1)'
          }}
        />
      </div>
    </div>

    <section style={{ marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-lines)', paddingBottom: '0.5rem' }}>What I Do</h3>
      <ul style={{ listStyle: 'none', marginLeft: '0' }}>
        {[
          "Analog front-end design for sensor signals",
          "Bare-metal and RTOS-based firmware on ARM Cortex-M microcontrollers",
          "Digital hardware design using FPGA and RTL methodologies",
          "Hardware-in-the-loop validation using lab instrumentation"
        ].map((item, i) => (
          <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-main)' }}>//</span> {item}
          </li>
        ))}
      </ul>
    </section>

    <section style={{ marginTop: '4rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-lines)', paddingBottom: '0.5rem' }}>Technical Skills</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {[
          {
            title: "Circuit & PCB",
            items: [
              "Schematic design and PCB layout",
              "Tools: KiCad, Altium, LTSpice",
              "Soldering and circuit bring-up",
              "Validation using Multimeter/Scope"
            ]
          },
          {
            title: "Embedded Systems",
            items: [
              "ARM Cortex-M (STM32, Tiva C)",
              "Arduino Uno, Raspberry Pi",
              "Protocols: UART, SPI, I2C, GPIO, PWM, MQTT",
              "Real-time constraints & Interrupts"
            ]
          },
          {
            title: "FPGA & HDL",
            items: [
              "Verilog, SystemVerilog, VHDL",
              "RTL design and simulation",
              "Tools: Quartus Prime, ModelSim",
              "Cyclone IV Hardware"
            ]
          },
          {
            title: "Programming",
            items: [
              "C, C++ (Embedded focus)",
              "Python (Scripting/Test)",
              "Assembly (8086, ARMv7)",
              "Version Control: Git/GitHub"
            ]
          },
          {
            title: "Lab & Tools",
            items: [
              "Oscilloscope, Logic Analyzer, Function Generator",
              "GCC/GDB Debugging Toolchain",
              "Code Composer Studio, Linux Environment"
            ]
          }
        ].map((area, i) => (
          <div key={i} style={{ background: 'var(--bg-surface)', padding: '1.5rem', border: '1px solid var(--border-lines)' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{area.title}</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {area.items.map((item, j) => (
                <li key={j} style={{ marginBottom: '0.5rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border-lines)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section style={{ marginTop: '4rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-lines)', paddingBottom: '0.5rem' }}>Quick Stats</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        {[
          { label: "Core Focus", value: "Embedded & Mixed-Signal" },
          { label: "Hardware", value: "STM32, Tiva C, FPGA" },
          { label: "Languages", value: "C/C++, Verilog, Python" },
          { label: "Design Tools", value: "KiCad, Altium, Quartus" },
          { label: "Lab Equipment", value: "Scope, Logic Analyzer" }
        ].map((param, i) => (
          <div key={i} style={{ background: 'var(--code-block)', padding: '0.75rem' }}>
            <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{param.label.toUpperCase()}</span>
            <span style={{ color: 'var(--text-primary)' }}>{param.value}</span>
          </div>
        ))}
      </div>
    </section>

    <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-lines)', paddingBottom: '0.5rem' }}>My Philosophy</h3>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {["Clear signal paths", "Predictable timing", "Explicit tradeoffs", "Systems that can be measured, heard, and debugged"].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <div style={{ width: '6px', height: '6px', background: 'var(--accent-main)' }}></div>
            {item}
          </div>
        ))}
      </div>
      <p style={{ maxWidth: '65ch', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>
        I enjoy turning low-level understanding into physical systems you can interact with — whether that’s an embedded controller or a real-time processing pipeline.
      </p>
    </section>
  </div>
);

const BuildLog = ({ title, goal, stack, date, status, images, repoLink, onSeeMore, children }) => (
  <article style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-lines)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
      <span>{date}</span>
      <span>
        Status: <span style={{ color: status === 'COMPLETED' ? 'var(--accent-main)' : '#fbbf24' }}>{status}</span>
      </span>
    </div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{title}</h3>

    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '2rem', marginBottom: '2rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <div style={{ marginBottom: '1rem' }}>
          <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Goal</strong>
          {goal}
        </div>
        <div>
          <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Technologies</strong>
          {stack.join(', ')}
        </div>
        {repoLink && (
          <div style={{ marginTop: '1rem' }}>
            <a
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--accent-main)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--accent-main)'
              }}
            >
              [ View Code ]
            </a>
          </div>
        )}
      </div>
      <div style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {images && images.length > 0 && (
            <img
              src={images[0]}
              alt={title}
              style={{
                width: '340px',
                height: 'auto',
                borderRadius: '4px',
                border: '1px solid var(--border-lines)',
                flexShrink: 0
              }}
            />
          )}
          <div style={{ flex: 1, minWidth: '300px' }}>
            {children}
            <button
              onClick={onSeeMore}
              style={{
                marginTop: '1rem',
                background: 'none',
                border: 'none',
                color: 'var(--accent-main)',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: 0
              }}
            >
              [ See More ] <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const Projects = ({ onProjectSelect }) => (
  <div className="section-content fade-in">
    <header style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Selected Projects</h2>
      <WaveformDivider type="square" />
    </header>

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



const HardwareInterfaces = () => {
  const hardwareItems = [
    {
      title: "STM32 Nucleo-64",
      subtitle: "The Workhorse",
      specs: ["ARM Cortex-M4 @ 180MHz", "FPU & DSP Instructions", "16-bit ADCs"],
      useCase: "Primary choice for audio processing and complex control loops requiring deterministic timing.",
      image: "/images/guitar_pedal_setup.jpg" // Using Guitar Pedal setup as it features STM32
    },
    {
      title: "Tiva C Series (TM4C123)",
      subtitle: "Real-Time Control",
      specs: ["ARM Cortex-M4F @ 80MHz", "Double Precision FPU", "High-Drive GPIOs"],
      useCase: "Go-to platform for RTOS development and educational embedded systems projects.",
      image: "/images/rtos_board.jpg"
    },
    {
      title: "NVIDIA Jetson Orin NX",
      subtitle: "AI at the Edge",
      specs: ["100 TOPS AI Performance", "Ampere GPU Architecture", "ROS 2 Support"],
      useCase: "Sensor fusion and path planning for autonomous robotics (IGVC).",
      image: "/images/igvc_robot.jpg"
    },
    {
      title: "Cyclone IV FPGA",
      subtitle: "Digital Logic Fabric",
      specs: ["6K Logic Elements", "Embedded Multipliers", "PLLs for Clock Gen"],
      useCase: "Custom digital peripherals and high-speed parallel I/O interfaces.",
      image: "/images/lcr_meter_circuit.jpg" // Visual placeholder for complex circuit
    }
  ];

  return (
    <div className="section-content fade-in">
      <header style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Silicon Arsenal</h2>
        <WaveformDivider type="square" />
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', maxWidth: '60ch' }}>
          My daily drivers for bringing code to the physical world.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {hardwareItems.map((item, index) => (
          <div key={index} style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-lines)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '200px', overflow: 'hidden', borderBottom: '1px solid var(--border-lines)' }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{item.title}</h3>
                <span style={{ fontSize: '0.875rem', color: 'var(--accent-main)', fontFamily: 'var(--font-mono)' }}>// {item.subtitle}</span>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                {item.specs.map((spec, i) => (
                  <span key={i} style={{
                    display: 'inline-block',
                    background: 'var(--code-block)',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    marginRight: '0.5rem',
                    marginBottom: '0.5rem',
                    color: 'var(--text-secondary)',
                    borderRadius: '4px'
                  }}>
                    {spec}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginTop: 'auto' }}>
                {item.useCase}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '2rem', background: 'var(--code-block)', border: '1px dashed var(--border-lines)', textAlign: 'center' }}>
        <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Lab Instrumentation</h4>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          <span>[ Tektronix Oscilloscope ]</span>
          <span>[ Logic Analyzer ]</span>
          <span>[ Soldering Station ]</span>
          <span>[ Digital Multimeter ]</span>
        </div>
      </div>

    </div>
  );
};

function App() {
  const [currentSection, setCurrentSection] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);

  const renderSection = () => {
    switch (currentSection) {
      case 'overview': return <SystemOverview />;
      case 'projects': return <Projects onProjectSelect={setSelectedProject} />;
      case 'hardware': return <HardwareInterfaces />;
      default: return <SystemOverview />;
    }
  };

  return (
    <div className="layout-container">
      <Sidebar currentSection={currentSection} onNavigate={setCurrentSection} />
      <main className="main-content">
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
