/* ==========================================================================
   PYPRO MASTERY - ARCHITECT AI MENTOR
   Intelligent Diagnostic Assistant, Plain-English Error Translator & Guide
   ========================================================================== */

class ArchitectMentor {
  constructor() {
    this.container = document.getElementById("mentor-feedback-content");
  }

  /**
   * Translates cryptic Python error messages into beginner-friendly coaching
   */
  diagnoseError(errorMessage, code) {
    let diagnosis = {
      summary: "Python encountered an issue while running your code.",
      explanation: "",
      fixSuggestion: "",
      analogy: ""
    };

    if (errorMessage.includes("SyntaxError")) {
      diagnosis.summary = "Syntax Error (Grammar Mistake)";
      diagnosis.explanation = "Python is strict about punctuation and grammar. It spotted something it couldn't understand—usually a missing quote <code>\"</code>, a missing closing parenthesis <code>)</code>, or a missing colon <code>:</code> at the end of an <code>if</code>, <code>for</code>, or <code>def</code> line.";
      diagnosis.fixSuggestion = "Check each line carefully: did you close every bracket and string quote you opened? If you wrote an 'if' or 'for', did you finish the line with a colon <code>:</code>?";
      diagnosis.analogy = "Like forgetting a period at the end of a sentence in English.";
    } 
    else if (errorMessage.includes("IndentationError")) {
      diagnosis.summary = "Indentation Error (Spacing Alignment)";
      diagnosis.explanation = "In Python, space at the start of a line is how Python knows what belongs inside a loop, function, or if-statement. You have lines that don't line up evenly.";
      diagnosis.fixSuggestion = "Make sure indented blocks are indented by exactly 4 spaces. Press the 'Tab' key in the editor to insert 4 spaces cleanly.";
      diagnosis.analogy = "Like a bulleted outline where sub-points aren't indented properly.";
    }
    else if (errorMessage.includes("NameError")) {
      const match = errorMessage.match(/name '(\w+)' is not defined/);
      const varName = match ? match[1] : "a variable";
      diagnosis.summary = `Name Error: '${varName}' is not defined`;
      diagnosis.explanation = `Python tried to use <code>${varName}</code>, but you haven't declared or created it yet, or there's a slight spelling mismatch.`;
      diagnosis.fixSuggestion = `Check your spelling: did you write <code>${varName}</code> above this line with an <code>=</code> assignment? Remember that Python is case-sensitive (<code>MyVar</code> is not <code>myvar</code>).`;
      diagnosis.analogy = "Like asking someone to find a book in a library that was never cataloged.";
    }
    else if (errorMessage.includes("TypeError")) {
      diagnosis.summary = "Type Error (Data Incompatibility)";
      diagnosis.explanation = "You tried to perform an action on data types that don't work together—for example, trying to add a number to a word like <code>10 + 'apples'</code>.";
      diagnosis.fixSuggestion = "Check if you need to convert your data using <code>str()</code>, <code>int()</code>, or <code>float()</code>, or use an f-string <code>f'Result: {variable}'</code>.";
      diagnosis.analogy = "Like trying to plug a square peg into a circular electrical socket.";
    }
    else if (errorMessage.includes("IndexError")) {
      diagnosis.summary = "Index Error (Out of Bounds)";
      diagnosis.explanation = "You asked Python to grab an item at a position in a list that doesn't exist. For example, asking for item 5 in a list that only has 3 items!";
      diagnosis.fixSuggestion = "Remember that Python counts from 0! A list with 3 items has positions 0, 1, and 2. Use <code>len(my_list)</code> to check list length.";
      diagnosis.analogy = "Like pushing elevator button 10 in a 3-story building.";
    }
    else if (errorMessage.includes("KeyError")) {
      diagnosis.summary = "Key Error (Missing Dictionary Key)";
      diagnosis.explanation = "You searched a dictionary for a key that isn't stored in it.";
      diagnosis.fixSuggestion = "Check key spelling or use <code>my_dict.get('key_name', default_value)</code> for crash-proof lookups.";
      diagnosis.analogy = "Looking for a name in a phonebook that hasn't been added.";
    }
    else if (errorMessage.includes("ZeroDivisionError")) {
      diagnosis.summary = "Zero Division Error (Math Impossibility)";
      diagnosis.explanation = "Your code attempted to divide a number by zero (<code>x / 0</code>). In mathematics and computing, this is undefined!";
      diagnosis.fixSuggestion = "Add a check with <code>if divisor != 0:</code> or handle it using a <code>try / except ZeroDivisionError</code> block.";
      diagnosis.analogy = "Trying to distribute 10 apples among 0 people.";
    }
    else {
      diagnosis.summary = "Runtime Issue";
      diagnosis.explanation = errorMessage;
      diagnosis.fixSuggestion = "Review the line highlighted in the error traceback above and verify each variable and function call.";
      diagnosis.analogy = "A minor hiccup in the execution sequence.";
    }

    this.renderDiagnosis(diagnosis);
  }

  /**
   * Renders personalized mentor feedback into the Mentor tab
   */
  renderDiagnosis(diag) {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="mentor-card">
        <div class="mentor-header">
          <div class="mentor-avatar">🤖</div>
          <div>
            <div class="mentor-name">Architect AI Mentor</div>
            <div class="mentor-role">Diagnostic & Learning Coach</div>
          </div>
        </div>
        <div class="mentor-message">
          <strong>${diag.summary}</strong>
          <p style="margin: 0.5rem 0;">${diag.explanation}</p>
          <div style="margin: 0.5rem 0; font-size: 0.85rem; color: #a5b4fc;">
            💡 <em>Analogy:</em> ${diag.analogy}
          </div>
        </div>
        <div class="mentor-suggestion-box">
          🎯 <strong>Recommended Next Step:</strong><br>
          ${diag.fixSuggestion}
        </div>
      </div>
    `;
  }

  /**
   * Provides constructive feedback on task verification failure
   */
  provideTaskGuidance(moduleObj, userCode, verificationResult) {
    if (!this.container) return;

    const failedChecks = verificationResult.checks.filter(c => !c.passed);
    const checksHTML = failedChecks.map(c => `<li>❌ ${c.name}</li>`).join("");

    this.container.innerHTML = `
      <div class="mentor-card">
        <div class="mentor-header">
          <div class="mentor-avatar">🧭</div>
          <div>
            <div class="mentor-name">Architect AI Mentor</div>
            <div class="mentor-role">Code Review & Verification Guide</div>
          </div>
        </div>
        <div class="mentor-message">
          <p>You're making great progress! We ran your code through automated verification for <strong>${moduleObj.title}</strong>.</p>
          <p style="margin: 0.5rem 0;">Here is what still needs attention:</p>
          <ul style="margin: 0.5rem 0 0.5rem 1.2rem; color: #f87171;">
            ${checksHTML}
          </ul>
          <p style="margin-top: 0.5rem; color: #cbd5e1;">${verificationResult.feedback}</p>
        </div>
        <div class="mentor-suggestion-box">
          💡 <strong>Architect Tip:</strong><br>
          Take a look at the Hint tabs in the left lesson panel. Start with <em>Hint 1</em> for a gentle nudge!
        </div>
      </div>
    `;
  }

  /**
   * Displays celebratory praise when a module is mastered
   */
  celebrateMastery(moduleObj) {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="mentor-card" style="border-color: rgba(16, 185, 129, 0.4);">
        <div class="mentor-header">
          <div class="mentor-avatar" style="background: var(--gradient-success);">🏆</div>
          <div>
            <div class="mentor-name">Architect AI Mentor</div>
            <div class="mentor-role">Achievement Unlocked</div>
          </div>
        </div>
        <div class="mentor-message">
          <h4 style="color: #34d399; margin-bottom: 0.4rem;">Spectacular Job!</h4>
          <p>You successfully completed <strong>Module ${moduleObj.moduleNum}: ${moduleObj.title}</strong> and earned <strong>+${moduleObj.xp} XP</strong>!</p>
          <p style="margin-top: 0.5rem; color: #94a3b8;">You have internalized this concept. Ready to level up your engineering skills in the next module?</p>
        </div>
      </div>
    `;
  }
}

const mentor = new ArchitectMentor();
