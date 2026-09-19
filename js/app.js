/* ==========================================================================
   PYPRO MASTERY - APPLICATION CONTROLLER
   Navigation, Execution, Verification, Confetti, Audio Synthesizer & UI Sync
   ========================================================================== */

class App {
  constructor() {
    this.currentModule = null;
    this.editor = null;
    this.soundEnabled = true;
    this.audioCtx = null;
    this.activeTerminalTab = "output"; // output | tests | mentor
  }

  async init() {
    console.log("Initializing PyPro Mastery...");
    
    // Initialize Code Editor
    this.editor = new CodeEditor("editor-container");
    this.editor.onRunCallback = () => this.runCode();
    this.editor.onSaveCallback = () => this.saveCurrentCode();

    // Render Curriculum Roadmap Sidebar
    this.renderSidebar();

    // Setup Splitter Drags
    this.setupSplitters();

    // Setup Confetti
    this.setupConfetti();

    // Setup Engine & Status Listener
    pyEngine.on("statusChange", (status) => this.handleEngineStatus(status));
    pyEngine.initialize();

    // Load Last Active Module or Default to Module 1
    const lastModuleId = storage.getLastActiveModule();
    this.loadModule(lastModuleId);

    // Update Header Stats
    this.updateStatsUI();

    // Bind Global Events
    this.bindEvents();

    console.log("PyPro Mastery ready.");
  }

  bindEvents() {
    // Top Run Button
    const runBtn = document.getElementById("btn-run-code");
    if (runBtn) runBtn.addEventListener("click", () => this.runCode());

    // Top Verify Task Button
    const verifyBtn = document.getElementById("btn-verify-task");
    if (verifyBtn) verifyBtn.addEventListener("click", () => this.verifyTask());

    // Reset Code Button
    const resetBtn = document.getElementById("btn-reset-code");
    if (resetBtn) resetBtn.addEventListener("click", () => this.resetCode());

    // Copy Code Button
    const copyBtn = document.getElementById("btn-copy-code");
    if (copyBtn) copyBtn.addEventListener("click", () => this.copyCode());

    // Clear Terminal Button
    const clearBtn = document.getElementById("btn-clear-terminal");
    if (clearBtn) clearBtn.addEventListener("click", () => this.clearTerminal());

    // Ask Mentor Button
    const mentorBtn = document.getElementById("btn-ask-mentor");
    if (mentorBtn) mentorBtn.addEventListener("click", () => this.consultMentor());

    // Sidebar Toggle
    const sidebarToggleBtn = document.getElementById("btn-toggle-sidebar");
    if (sidebarToggleBtn) {
      sidebarToggleBtn.addEventListener("click", () => {
        document.getElementById("sidebar").classList.toggle("collapsed");
      });
    }

    // Sound Toggle
    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        this.soundEnabled = !this.soundEnabled;
        soundBtn.textContent = this.soundEnabled ? "🔊" : "🔇";
        this.showToast(this.soundEnabled ? "Audio effects enabled" : "Audio muted");
      });
    }

    // Modal Next Module Button
    const modalNextBtn = document.getElementById("modal-btn-next");
    if (modalNextBtn) {
      modalNextBtn.addEventListener("click", () => {
        this.closeCelebrationModal();
        this.goToNextModule();
      });
    }

    // Modal Close Button
    const modalCloseBtn = document.getElementById("modal-btn-close");
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", () => this.closeCelebrationModal());
    }

    // Search bar filter
    const searchInput = document.getElementById("module-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.filterModules(e.target.value));
    }
  }

  handleEngineStatus(status) {
    const dot = document.getElementById("engine-status-dot");
    const label = document.getElementById("engine-status-label");
    if (!dot || !label) return;

    if (status === "ready") {
      dot.className = "status-dot ready";
      label.textContent = "Python 3.12 (WASM Ready)";
    } else if (status === "loading") {
      dot.className = "status-dot";
      label.textContent = "Loading WebAssembly...";
    } else if (status === "simulated") {
      dot.className = "status-dot ready";
      label.textContent = "Python Fast-Eval Engine";
    }
  }

  renderSidebar() {
    const listEl = document.getElementById("module-list");
    if (!listEl) return;

    const completed = storage.getCompletedModules();

    listEl.innerHTML = CURRICULUM.map(mod => {
      const isCompleted = completed.includes(mod.id);
      const levelClass = `badge-level-${mod.level}`;

      return `
        <div class="module-item ${isCompleted ? 'completed' : ''}" id="nav-item-${mod.id}" onclick="app.loadModule('${mod.id}')">
          <div class="module-info">
            <span class="module-num">M${mod.moduleNum}</span>
            <div class="module-text">
              <div class="module-name">${mod.title}</div>
              <span class="module-badge-tag ${levelClass}">${mod.level.toUpperCase()} • ${mod.time}</span>
            </div>
          </div>
          <div class="module-status-icon">
            ${isCompleted ? '✓' : '○'}
          </div>
        </div>
      `;
    }).join("");
  }

  filterModules(query) {
    const q = query.toLowerCase();
    CURRICULUM.forEach(mod => {
      const el = document.getElementById(`nav-item-${mod.id}`);
      if (!el) return;
      const matches = mod.title.toLowerCase().includes(q) || 
                      mod.category.toLowerCase().includes(q) ||
                      mod.level.toLowerCase().includes(q);
      el.style.display = matches ? "flex" : "none";
    });
  }

  loadModule(moduleId) {
    const mod = CURRICULUM.find(m => m.id === moduleId) || CURRICULUM[0];
    this.currentModule = mod;
    storage.setLastActiveModule(mod.id);

    // Update active item in sidebar
    document.querySelectorAll(".module-item").forEach(el => el.classList.remove("active"));
    const activeEl = document.getElementById(`nav-item-${mod.id}`);
    if (activeEl) {
      activeEl.classList.add("active");
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    // Render Lesson Content
    this.renderLesson(mod);

    // Load User Code from Storage or Starter Code
    const savedCode = storage.getModuleCode(mod.id, mod.starterCode);
    this.editor.setValue(savedCode);

    // Switch to Terminal tab
    this.switchTerminalTab("output");
  }

  renderLesson(mod) {
    const container = document.getElementById("lesson-content");
    if (!container) return;

    const completed = storage.getCompletedModules().includes(mod.id);

    container.innerHTML = `
      <div class="lesson-meta-bar">
        <span class="meta-badge badge-level-${mod.level}">${mod.level.toUpperCase()}</span>
        <span class="meta-badge" style="background: rgba(255,255,255,0.08); color: var(--text-muted);">${mod.category}</span>
        <span class="meta-badge badge-xp">⚡ +${mod.xp} XP</span>
        <span class="meta-badge" style="background: rgba(255,255,255,0.05); color: var(--text-dim);">${mod.time}</span>
        ${completed ? '<span class="meta-badge" style="background: rgba(16,185,129,0.2); color: #34d399;">✓ Completed</span>' : ''}
      </div>

      <h1 class="lesson-title">Module ${mod.moduleNum}: ${mod.title}</h1>

      <!-- ELI5 Analogy Card -->
      <div class="analogy-card">
        <div class="analogy-header">
          <span>💡 Explain Like I'm 5</span> • <span>${mod.analogy.headline}</span>
        </div>
        <div class="analogy-body">
          ${mod.analogy.body}
        </div>
      </div>

      <!-- Theory Content -->
      ${mod.content}

      <!-- Interactive Challenge Task -->
      <div class="task-card">
        <div class="task-card-header">
          <div class="task-card-title">
            <span>🎯 Mission Challenge</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--accent-cyan); font-weight: 600;">Automated Evaluation</span>
        </div>
        <div class="task-card-body">
          ${mod.task.description}
        </div>
        <ul class="task-checklist">
          ${mod.task.checklist.map(item => `
            <li class="task-check-item">
              <span class="task-check-icon">▹</span>
              <span>${item}</span>
            </li>
          `).join("")}
        </ul>
      </div>

      <!-- 3-Tier Progressive Hints -->
      <div class="hints-accordion">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.3rem;">
          Stuck or need a hint?
        </div>
        ${mod.hints.map((hint, idx) => `
          <div class="hint-item" id="hint-item-${idx}">
            <button class="hint-trigger" onclick="app.toggleHint(${idx})">
              <span>${hint.title}</span>
              <span class="hint-badge">Reveal ▾</span>
            </button>
            <div class="hint-content">
              ${hint.content}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  toggleHint(idx) {
    const hintEl = document.getElementById(`hint-item-${idx}`);
    if (hintEl) {
      hintEl.classList.toggle("open");
    }
  }

  insertCode(snippet) {
    const current = this.editor.getValue();
    this.editor.setValue(current + "\n" + snippet);
    this.showToast("Code inserted into editor!");
  }

  async runCode() {
    this.playSound("run");
    const code = this.editor.getValue();
    this.saveCurrentCode();

    this.switchTerminalTab("output");
    this.clearTerminal();
    this.appendTerminalLine(`>>> Executing Python script...`, "term-dim");

    const result = await pyEngine.runCode(code, (channel, text) => {
      this.appendTerminalLine(text, channel === 'stdout' ? 'term-stdout' : 'term-stderr');
    });

    if (result.success) {
      this.appendTerminalLine(`\n[Process completed in ${result.duration}s]`, "term-dim");
    } else {
      this.playSound("error");
      this.appendTerminalLine(`\n[Execution stopped with error]`, "term-stderr");
      // Let Architect Mentor analyze the error
      mentor.diagnoseError(result.error, code);
      // Highlight mentor tab badge
      this.highlightTabBadge("mentor");
    }
  }

  async verifyTask() {
    const code = this.editor.getValue();
    this.saveCurrentCode();

    this.switchTerminalTab("tests");
    const testView = document.getElementById("terminal-view-tests");
    testView.innerHTML = `<div class="term-dim">Running automated test harness for ${this.currentModule.title}...</div>`;

    const result = await pyEngine.runCode(code);
    const verification = this.currentModule.verify(result.output, code);

    this.renderTestResults(verification);

    if (verification.passed) {
      this.playSound("success");
      const isNewCompletion = !storage.getCompletedModules().includes(this.currentModule.id);
      storage.markModuleCompleted(this.currentModule.id);

      if (isNewCompletion) {
        storage.addXP(this.currentModule.xp);
      }

      this.updateStatsUI();
      this.renderSidebar();
      mentor.celebrateMastery(this.currentModule);
      this.triggerConfetti();
      this.openCelebrationModal(this.currentModule);
    } else {
      this.playSound("error");
      mentor.provideTaskGuidance(this.currentModule, code, verification);
      this.highlightTabBadge("mentor");
    }
  }

  renderTestResults(verification) {
    const testView = document.getElementById("terminal-view-tests");
    if (!testView) return;

    testView.innerHTML = `
      <div class="test-summary-header">
        <div>
          <strong>Automated Verification Results</strong>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">
            ${verification.passed ? "All checks passed flawlessly!" : "Some criteria were not met."}
          </div>
        </div>
        <span class="test-badge-result ${verification.passed ? 'test-badge-pass' : 'test-badge-fail'}">
          ${verification.passed ? "PASSED ✓" : "NEEDS WORK"}
        </span>
      </div>
      <div class="test-cases-list">
        ${verification.checks.map(c => `
          <div class="test-case-item ${c.passed ? 'passed' : 'failed'}">
            <div class="test-case-title">
              <span>${c.name}</span>
              <span>${c.passed ? '✓ Passed' : '✗ Failed'}</span>
            </div>
          </div>
        `).join("")}
      </div>
      <div style="margin-top: 1rem; font-size: 0.85rem; color: #94a3b8; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
        <strong>Feedback:</strong> ${verification.feedback}
      </div>
    `;
  }

  consultMentor() {
    this.switchTerminalTab("mentor");
    const code = this.editor.getValue();
    mentor.container.innerHTML = `
      <div class="mentor-card">
        <div class="mentor-header">
          <div class="mentor-avatar">🤖</div>
          <div>
            <div class="mentor-name">Architect AI Mentor</div>
            <div class="mentor-role">Code Advisor</div>
          </div>
        </div>
        <div class="mentor-message">
          <p>Analyzing your current code for <strong>${this.currentModule.title}</strong>...</p>
          <div style="margin-top: 0.75rem; padding: 0.75rem; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); font-size: 0.85rem;">
            <strong>Module Concept:</strong> ${this.currentModule.analogy.headline}<br>
            <em>${this.currentModule.analogy.body}</em>
          </div>
        </div>
        <div class="mentor-suggestion-box">
          💡 <strong>Pro Tip:</strong> Click 'Verify Task' in the top bar to run automated test checks on your solution!
        </div>
      </div>
    `;
  }

  switchTerminalTab(tabName) {
    this.activeTerminalTab = tabName;
    document.querySelectorAll(".terminal-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabName);
    });

    document.querySelectorAll(".terminal-view").forEach(view => {
      view.classList.toggle("active", view.id === `terminal-view-${tabName}`);
    });
  }

  highlightTabBadge(tabName) {
    const badge = document.querySelector(`.terminal-tab-btn[data-tab="${tabName}"] .tab-badge`);
    if (badge) {
      badge.style.background = "var(--accent-cyan)";
      badge.style.color = "#000";
    }
  }

  appendTerminalLine(text, className = "term-stdout") {
    const termView = document.getElementById("terminal-view-output");
    if (!termView) return;

    const line = document.createElement("div");
    line.className = `term-line ${className}`;
    line.textContent = text;
    termView.appendChild(line);
    termView.scrollTop = termView.scrollHeight;
  }

  clearTerminal() {
    const termView = document.getElementById("terminal-view-output");
    if (termView) {
      termView.innerHTML = "";
    }
  }

  saveCurrentCode() {
    if (this.currentModule && this.editor) {
      storage.saveModuleCode(this.currentModule.id, this.editor.getValue());
    }
  }

  resetCode() {
    if (confirm("Reset editor back to original starter template?")) {
      this.editor.setValue(this.currentModule.starterCode);
      this.saveCurrentCode();
      this.showToast("Editor reset to starter template");
    }
  }

  copyCode() {
    const code = this.editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
      this.showToast("Code copied to clipboard!");
    });
  }

  updateStatsUI() {
    const completedCount = storage.getCompletedModules().length;
    const totalCount = CURRICULUM.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    const fillEl = document.getElementById("progress-bar-fill");
    const labelEl = document.getElementById("progress-label");
    const xpEl = document.getElementById("stat-xp");
    const streakEl = document.getElementById("stat-streak");

    if (fillEl) fillEl.style.width = `${percentage}%`;
    if (labelEl) labelEl.textContent = `${completedCount}/${totalCount} Modules (${percentage}%)`;
    if (xpEl) xpEl.textContent = `${storage.getXP()} XP`;
    if (streakEl) streakEl.textContent = `${storage.getStreak()} Day Streak 🔥`;
  }

  goToNextModule() {
    const curIdx = CURRICULUM.findIndex(m => m.id === this.currentModule.id);
    if (curIdx < CURRICULUM.length - 1) {
      this.loadModule(CURRICULUM[curIdx + 1].id);
    } else {
      this.showToast("You have completed all modules! You are a certified Python Architect!");
    }
  }

  openCelebrationModal(mod) {
    const modal = document.getElementById("celebration-modal");
    const title = document.getElementById("modal-module-title");
    const xp = document.getElementById("modal-earned-xp");
    if (!modal) return;

    if (title) title.textContent = mod.title;
    if (xp) xp.textContent = `+${mod.xp} XP`;
    modal.classList.add("active");
  }

  closeCelebrationModal() {
    const modal = document.getElementById("celebration-modal");
    if (modal) modal.classList.remove("active");
  }

  showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // Web Audio Synthesizer (No external audio file downloads required!)
  playSound(type) {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === "run") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "success") {
        // Ascending harmonic chime
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        osc.frequency.setValueAtTime(659.25, now + 0.2);
        osc.frequency.setValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === "error") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {}
  }

  // Draggable Split Panes
  setupSplitters() {
    const resizerH = document.getElementById("split-resizer-h");
    const theoryPane = document.getElementById("pane-theory");
    let isDraggingH = false;

    if (resizerH && theoryPane) {
      resizerH.addEventListener("mousedown", (e) => {
        isDraggingH = true;
        resizerH.classList.add("dragging");
        document.body.style.cursor = "col-resize";
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDraggingH) return;
        const containerWidth = document.getElementById("workspace-split").getBoundingClientRect().width;
        const newWidth = (e.clientX - document.getElementById("sidebar").getBoundingClientRect().right);
        const percent = Math.min(Math.max((newWidth / containerWidth) * 100, 25), 65);
        theoryPane.style.width = `${percent}%`;
      });

      document.addEventListener("mouseup", () => {
        if (isDraggingH) {
          isDraggingH = false;
          resizerH.classList.remove("dragging");
          document.body.style.cursor = "";
        }
      });
    }

    const resizerV = document.getElementById("split-resizer-v");
    const editorSec = document.getElementById("editor-section");
    let isDraggingV = false;

    if (resizerV && editorSec) {
      resizerV.addEventListener("mousedown", () => {
        isDraggingV = true;
        resizerV.classList.add("dragging");
        document.body.style.cursor = "row-resize";
      });

      document.addEventListener("mousemove", (e) => {
        if (!isDraggingV) return;
        const interactivePane = document.getElementById("pane-interactive");
        const rect = interactivePane.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        const flexRatio = Math.max(100, relativeY);
        editorSec.style.flex = "none";
        editorSec.style.height = `${flexRatio}px`;
      });

      document.addEventListener("mouseup", () => {
        if (isDraggingV) {
          isDraggingV = false;
          resizerV.classList.remove("dragging");
          document.body.style.cursor = "";
        }
      });
    }
  }

  // Confetti Particle Engine
  setupConfetti() {
    this.confettiCanvas = document.getElementById("confetti-canvas");
    if (!this.confettiCanvas) return;
    this.confettiCtx = this.confettiCanvas.getContext("2d");
    this.confettiParticles = [];

    const resize = () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();
  }

  triggerConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    const colors = ["#00f2fe", "#4facfe", "#8b5cf6", "#10b981", "#fbbf24", "#f43f5e"];
    this.confettiParticles = [];

    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.4,
        vx: (Math.random() - 0.5) * 12,
        vy: -Math.random() * 10 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        life: 1
      });
    }

    const animate = () => {
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      let alive = 0;

      this.confettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.rotation += p.rotSpeed;
        p.life -= 0.012;

        if (p.life > 0) {
          alive++;
          this.confettiCtx.save();
          this.confettiCtx.translate(p.x, p.y);
          this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.globalAlpha = Math.max(0, p.life);
          this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          this.confettiCtx.restore();
        }
      });

      if (alive > 0) {
        requestAnimationFrame(animate);
      } else {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      }
    };

    requestAnimationFrame(animate);
  }
}

// Instantiate global application
const app = new App();
window.addEventListener("DOMContentLoaded", () => app.init());
