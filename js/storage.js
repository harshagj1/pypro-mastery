/* ==========================================================================
   PYPRO MASTERY - STATE & STORAGE MANAGER
   LocalStorage persistence for code progress, XP, streaks, and achievements
   ========================================================================== */

class StorageManager {
  constructor() {
    this.prefix = "pypro_mastery_";
  }

  getModuleCode(moduleId, defaultCode) {
    try {
      const saved = localStorage.getItem(this.prefix + "code_" + moduleId);
      return saved !== null ? saved : defaultCode;
    } catch (e) {
      return defaultCode;
    }
  }

  saveModuleCode(moduleId, code) {
    try {
      localStorage.setItem(this.prefix + "code_" + moduleId, code);
    } catch (e) {
      console.warn("Storage full or unavailable:", e);
    }
  }

  getCompletedModules() {
    try {
      const data = localStorage.getItem(this.prefix + "completed");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  markModuleCompleted(moduleId) {
    const completed = this.getCompletedModules();
    if (!completed.includes(moduleId)) {
      completed.push(moduleId);
      try {
        localStorage.setItem(this.prefix + "completed", JSON.stringify(completed));
      } catch (e) {}
    }
    return completed;
  }

  getXP() {
    try {
      return parseInt(localStorage.getItem(this.prefix + "xp") || "0", 10);
    } catch (e) {
      return 0;
    }
  }

  addXP(amount) {
    const current = this.getXP();
    const updated = current + amount;
    try {
      localStorage.setItem(this.prefix + "xp", updated.toString());
    } catch (e) {}
    return updated;
  }

  getStreak() {
    try {
      const lastDate = localStorage.getItem(this.prefix + "streak_date");
      const streakCount = parseInt(localStorage.getItem(this.prefix + "streak_count") || "1", 10);
      const today = new Date().toISOString().split("T")[0];

      if (!lastDate) {
        localStorage.setItem(this.prefix + "streak_date", today);
        localStorage.setItem(this.prefix + "streak_count", "1");
        return 1;
      }

      return streakCount;
    } catch (e) {
      return 1;
    }
  }

  getLastActiveModule() {
    try {
      return localStorage.getItem(this.prefix + "active_module") || "m1_intro";
    } catch (e) {
      return "m1_intro";
    }
  }

  setLastActiveModule(moduleId) {
    try {
      localStorage.setItem(this.prefix + "active_module", moduleId);
    } catch (e) {}
  }
}

const storage = new StorageManager();
