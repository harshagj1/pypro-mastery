/* ==========================================================================
   PYPRO MASTERY - ZERO TO PRO CURRICULUM
   16 Comprehensive Modular Learning Steps with Analogies, Tasks & Tests
   ========================================================================== */

const CURRICULUM = [
  {
    id: "m1_intro",
    moduleNum: 1,
    title: "The First Spark: Printing & Comments",
    category: "Foundation",
    level: "beginner",
    xp: 50,
    time: "5 mins",
    analogy: {
      headline: "The Megaphone Metaphor",
      body: "Think of Python as an obedient robot. By default, it stays silent. The <code>print()</code> command is like giving your robot a megaphone: whatever message you put between the quotes inside the parentheses, the robot shouts out loud to your screen!"
    },
    content: `
      <div class="lesson-section">
        <h3>Welcome to Programming!</h3>
        <p>A computer program is simply a recipe of instructions given in exact order. In Python, communicating output to the world starts with the <code>print()</code> command.</p>
        
        <div class="code-example-card">
          <div class="code-example-header">
            <span>syntax_example.py</span>
            <div class="code-example-actions">
              <button class="code-example-btn" onclick="app.insertCode('print(\"Hello, Python Architect!\")')">Insert</button>
            </div>
          </div>
          <pre class="code-example-body">print("Hello, Python Architect!")</pre>
        </div>

        <h3>Writing Developer Notes (Comments)</h3>
        <p>Any line starting with <code>#</code> is a comment. Python skips it completely! Developers use comments to explain the <em>why</em> behind their code.</p>
        <div class="code-example-card">
          <div class="code-example-header"><span>comments.py</span></div>
          <pre class="code-example-body"># This is a comment - Python ignores this
print("Code that runs!") # This comment is also ignored</pre>
        </div>
      </div>
    `,
    task: {
      description: "Write your first Python program! Print out the exact sentence: <code>Hello, Future Architect!</code> and add a helpful comment on the line above it explaining what the program does.",
      checklist: [
        "Include a comment starting with #",
        "Print exactly 'Hello, Future Architect!' to the console"
      ]
    },
    starterCode: `# Write your comment here
print("Replace this with Hello, Future Architect!")
`,
    solutionCode: `# My first Python program that greets the world!
print("Hello, Future Architect!")
`,
    hints: [
      {
        title: "Hint 1: The Print Function",
        content: "Make sure you use double quotes <code>\"...\"</code> or single quotes <code>'...'</code> around your text, and ensure the casing and punctuation match exactly."
      },
      {
        title: "Hint 2: Exact Matching",
        content: "The string must be exactly: <code>print(\"Hello, Future Architect!\")</code>. Do not forget the exclamation mark <code>!</code>."
      },
      {
        title: "Hint 3: Complete Solution",
        content: "Here is the exact code:<br><pre class='code-example-body'># Greeting the developer\\nprint(\\\"Hello, Future Architect!\\\")</pre>"
      }
    ],
    verify: (output, code) => {
      const hasComment = /#.+/.test(code);
      const hasOutput = output.includes("Hello, Future Architect!");
      return {
        passed: hasComment && hasOutput,
        checks: [
          { name: "Contains a comment (#)", passed: hasComment },
          { name: "Output contains 'Hello, Future Architect!'", passed: hasOutput }
        ],
        feedback: !hasOutput ? "Your output didn't contain 'Hello, Future Architect!'. Check quotes and spelling." : "Fantastic start! You've run your first command."
      };
    }
  },

  {
    id: "m2_variables",
    moduleNum: 2,
    title: "Variables & Data Types",
    category: "Foundation",
    level: "beginner",
    xp: 60,
    time: "7 mins",
    analogy: {
      headline: "The Labeled Storage Boxes",
      body: "A variable is like an Amazon cardboard box with a sticky label on the front (the variable name). Inside that box, you can store different items: a word (String), a counting number (Integer), a decimal price (Float), or a True/False light switch (Boolean)."
    },
    content: `
      <div class="lesson-section">
        <h3>Storing Information in Memory</h3>
        <p>In Python, you create a variable simply by assigning a value with the equals sign <code>=</code>.</p>
        
        <div class="code-example-card">
          <div class="code-example-header"><span>datatypes.py</span></div>
          <pre class="code-example-body"># 1. String (text enclosed in quotes)
username = "Ada Lovelace"

# 2. Integer (whole numbers)
level = 1

# 3. Float (numbers with decimal fractions)
speed = 98.75

# 4. Boolean (True or False flags)
is_active = True</pre>
        </div>

        <h3>Displaying Variables with F-Strings</h3>
        <p>You can effortlessly blend text and variables using formatted strings: <code>f"Hello {variable}"</code>.</p>
        <div class="code-example-card">
          <div class="code-example-header"><span>fstrings.py</span></div>
          <pre class="code-example-body">hero = "Neo"
power = 9000
print(f"{hero} has a power level of {power}!")</pre>
        </div>
      </div>
    `,
    task: {
      description: "Define three variables: <code>dev_name</code> with your chosen coder name (String), <code>experience_years</code> set to <code>0</code> (Integer), and <code>is_ready</code> set to <code>True</code> (Boolean). Then use an f-string to print: <code>Developer [name] has [years] years of experience and ready status is [is_ready].</code>",
      checklist: [
        "Declare dev_name as a string",
        "Declare experience_years as an integer",
        "Declare is_ready as a boolean",
        "Print output using an f-string"
      ]
    },
    starterCode: `# 1. Define your three variables below:
dev_name = ""
experience_years = 0
is_ready = False

# 2. Print using an f-string:
# Expected format: Developer Alice has 0 years of experience and ready status is True.
`,
    solutionCode: `dev_name = "Alex"
experience_years = 0
is_ready = True

print(f"Developer {dev_name} has {experience_years} years of experience and ready status is {is_ready}.")
`,
    hints: [
      {
        title: "Hint 1: Creating Booleans",
        content: "Remember that Python booleans are capitalized: <code>True</code> and <code>False</code> (not true or false)."
      },
      {
        title: "Hint 2: F-String Syntax",
        content: "Put an <code>f</code> right before the opening quote: <code>print(f\"Developer {dev_name} has {experience_years} years of experience and ready status is {is_ready}.\")</code>"
      },
      {
        title: "Hint 3: Full Solution",
        content: "<code>dev_name = 'Alex'\nexperience_years = 0\nis_ready = True\nprint(f'Developer {dev_name} has {experience_years} years of experience and ready status is {is_ready}.')</code>"
      }
    ],
    verify: (output, code) => {
      const hasDevName = /dev_name\s*=\s*['"][^'"]+['"]/.test(code);
      const hasExp = /experience_years\s*=\s*\d+/.test(code);
      const hasReady = /is_ready\s*=\s*True/.test(code);
      const hasValidOutput = /Developer\s+\S+\s+has\s+\d+\s+years of experience and ready status is True\./.test(output);
      return {
        passed: hasDevName && hasExp && hasReady && hasValidOutput,
        checks: [
          { name: "dev_name declared with string", passed: hasDevName },
          { name: "experience_years declared with integer", passed: hasExp },
          { name: "is_ready set to True", passed: hasReady },
          { name: "Formatted output matches template", passed: hasValidOutput }
        ],
        feedback: hasValidOutput ? "Excellent! You understand Python's primary primitive data types." : "Check your f-string format. It must match: 'Developer <name> has <years> years of experience and ready status is True.'"
      };
    }
  },

  {
    id: "m3_math_io",
    moduleNum: 3,
    title: "Math Operations & Dynamic Input",
    category: "Foundation",
    level: "beginner",
    xp: 75,
    time: "8 mins",
    analogy: {
      headline: "The Cash Register Calculator",
      body: "Python comes with a built-in supercalculator. Plus <code>+</code>, minus <code>-</code>, multiply <code>*</code>, divide <code>/</code>, and floor divide <code>//</code> (cutting off decimals). And the <code>input()</code> function is like a microphone waiting for a customer's answer."
    },
    content: `
      <div class="lesson-section">
        <h3>Python as a Calculator</h3>
        <p>Python calculates values according to PEMDAS rules (Parentheses, Exponents <code>**</code>, Multiplication/Division, Addition/Subtraction).</p>
        
        <div class="code-example-card">
          <div class="code-example-header"><span>math_ops.py</span></div>
          <pre class="code-example-body">sum_val = 10 + 5    # 15
product = 4 * 7     # 28
squared = 2 ** 3    # 8 (2 to the power of 3)
remainder = 10 % 3  # 1 (Modulo / remainder)</pre>
        </div>

        <h3>Type Conversion & Casting</h3>
        <p>Note: <code>input()</code> <strong>always</strong> returns a String! If someone enters <code>"25"</code> and you want to do math with it, you must convert it using <code>int("25")</code> or <code>float("25.5")</code>.</p>
        <div class="code-example-card">
          <div class="code-example-header"><span>conversion.py</span></div>
          <pre class="code-example-body">price_str = "50"
total = int(price_str) * 2 # 100</pre>
        </div>
      </div>
    `,
    task: {
      description: "Write a program that calculates a tip. Create a variable <code>bill_amount = 80.0</code> and <code>tip_percentage = 15</code>. Calculate <code>tip_amount = bill_amount * (tip_percentage / 100)</code> and <code>total_bill = bill_amount + tip_amount</code>. Print both <code>tip_amount</code> and <code>total_bill</code> formatted to 2 decimal places using <code>f\"{value:.2f}\"</code>.",
      checklist: [
        "Create bill_amount = 80.0 and tip_percentage = 15",
        "Calculate tip_amount and total_bill",
        "Print tip formatted as 12.00 and total as 92.00"
      ]
    },
    starterCode: `bill_amount = 80.0
tip_percentage = 15

# Calculate tip_amount and total_bill below:
tip_amount = 0
total_bill = 0

# Print the results:
print(f"Tip: {tip_amount:.2f}")
print(f"Total: {total_bill:.2f}")
`,
    solutionCode: `bill_amount = 80.0
tip_percentage = 15

tip_amount = bill_amount * (tip_percentage / 100)
total_bill = bill_amount + tip_amount

print(f"Tip: {tip_amount:.2f}")
print(f"Total: {total_bill:.2f}")
`,
    hints: [
      {
        title: "Hint 1: Tip Calculation",
        content: "To get the percentage, divide by 100: <code>tip_percentage / 100</code> gives <code>0.15</code>. Multiply that by <code>bill_amount</code>."
      },
      {
        title: "Hint 2: Total Calculation",
        content: "<code>total_bill = bill_amount + tip_amount</code>"
      },
      {
        title: "Hint 3: Full Solution",
        content: "<code>tip_amount = bill_amount * (tip_percentage / 100)\ntotal_bill = bill_amount + tip_amount</code>"
      }
    ],
    verify: (output, code) => {
      const hasTip = output.includes("Tip: 12.00");
      const hasTotal = output.includes("Total: 92.00");
      return {
        passed: hasTip && hasTotal,
        checks: [
          { name: "Calculated correct tip (12.00)", passed: hasTip },
          { name: "Calculated correct total (92.00)", passed: hasTotal }
        ],
        feedback: (hasTip && hasTotal) ? "Great job! You mastered Python arithmetic and format specifiers." : "Check your math equations. Tip should be 12.00 and Total 92.00."
      };
    }
  },

  {
    id: "m4_conditionals",
    moduleNum: 4,
    title: "Decision Making & Conditionals",
    category: "Core Logic",
    level: "beginner",
    xp: 80,
    time: "10 mins",
    analogy: {
      headline: "The Railroad Switch Track",
      body: "Imagine a train arriving at a junction. If the green switch is active, the train goes left to Station A. Else if the yellow switch is on, it goes right to Station B. Otherwise, it defaults to the depot. In Python, <code>if</code>, <code>elif</code>, and <code>else</code> guide your code's path."
    },
    content: `
      <div class="lesson-section">
        <h3>Indentation: Python's Superpower</h3>
        <p>Unlike languages that use curly braces <code>{}</code>, Python uses <strong>4 spaces of indentation</strong> to know which code belongs inside an <code>if</code> block!</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>conditionals.py</span></div>
          <pre class="code-example-body">score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
else:
    print("Keep practicing!")</pre>
        </div>

        <h3>Comparison & Logical Operators</h3>
        <ul>
          <li><code>==</code> (Equal to), <code>!=</code> (Not equal to)</li>
          <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
          <li><code>and</code> (both must be True), <code>or</code> (at least one is True), <code>not</code> (inverts boolean)</li>
        </ul>
      </div>
    `,
    task: {
      description: "Write an access control logic: Given <code>age = 20</code> and <code>has_ticket = True</code>, if <code>age >= 18 and has_ticket</code>, print <code>Access Granted: Welcome VIP!</code>. If <code>age >= 18 and not has_ticket</code>, print <code>Access Denied: Ticket Required.</code>. Otherwise, print <code>Access Denied: Underage.</code>",
      checklist: [
        "Test with age = 20, has_ticket = True",
        "Use 'if', 'elif', and 'else'",
        "Indent blocks with 4 spaces",
        "Verify output outputs 'Access Granted: Welcome VIP!'"
      ]
    },
    starterCode: `age = 20
has_ticket = True

# Write your if / elif / else logic below:
`,
    solutionCode: `age = 20
has_ticket = True

if age >= 18 and has_ticket:
    print("Access Granted: Welcome VIP!")
elif age >= 18 and not has_ticket:
    print("Access Denied: Ticket Required.")
else:
    print("Access Denied: Underage.")
`,
    hints: [
      {
        title: "Hint 1: The 'and' keyword",
        content: "Use <code>if age >= 18 and has_ticket:</code> to check both conditions simultaneously."
      },
      {
        title: "Hint 2: The 'not' keyword",
        content: "Use <code>elif age >= 18 and not has_ticket:</code> for the second check."
      },
      {
        title: "Hint 3: Full Solution",
        content: "Ensure proper 4-space indentation under every condition."
      }
    ],
    verify: (output, code) => {
      const hasIf = /if\s+.+:/.test(code);
      const hasOutput = output.includes("Access Granted: Welcome VIP!");
      return {
        passed: hasIf && hasOutput,
        checks: [
          { name: "Uses conditional structure (if/elif/else)", passed: hasIf },
          { name: "Outputs 'Access Granted: Welcome VIP!'", passed: hasOutput }
        ],
        feedback: hasOutput ? "Brilliant logic! You've mastered conditional branching." : "Expected 'Access Granted: Welcome VIP!'. Check your condition syntax."
      };
    }
  },

  {
    id: "m5_loops",
    moduleNum: 5,
    title: "Loops & Iteration: The Power of Repetition",
    category: "Core Logic",
    level: "beginner",
    xp: 90,
    time: "10 mins",
    analogy: {
      headline: "The Assembly Conveyor Belt",
      body: "Imagine stamping 1,000 envelopes by hand. Exhausting! A loop is an automated robotic arm that repeats an exact set of actions for every single envelope that rolls down the conveyor belt until the job is done."
    },
    content: `
      <div class="lesson-section">
        <h3>For Loops with <code>range()</code></h3>
        <p>The <code>for</code> loop repeats code a specific number of times. <code>range(start, stop)</code> generates numbers from start up to (but not including) stop.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>for_loop.py</span></div>
          <pre class="code-example-body">for i in range(1, 6):
    print(f"Step {i}") # Prints 1, 2, 3, 4, 5</pre>
        </div>

        <h3>While Loops</h3>
        <p>A <code>while</code> loop keeps executing as long as a condition remains <code>True</code>. Be careful: always update your counter so it doesn't run forever!</p>
        <div class="code-example-card">
          <div class="code-example-header"><span>while_loop.py</span></div>
          <pre class="code-example-body">energy = 3
while energy > 0:
    print(f"Working... Energy: {energy}")
    energy -= 1 # Decrement</pre>
        </div>
      </div>
    `,
    task: {
      description: "Write a loop that calculates the sum of all numbers from 1 to 10 inclusive (1 + 2 + 3 + ... + 10). Store the result in a variable <code>total_sum</code>. Print the final result in the format: <code>Total Sum: 55</code>.",
      checklist: [
        "Initialize total_sum = 0",
        "Use a for loop with range(1, 11)",
        "Add each number to total_sum",
        "Print 'Total Sum: 55'"
      ]
    },
    starterCode: `total_sum = 0

# Use a for loop with range(1, 11) to add numbers to total_sum:


# Print the final result:
print(f"Total Sum: {total_sum}")
`,
    solutionCode: `total_sum = 0

for num in range(1, 11):
    total_sum += num

print(f"Total Sum: {total_sum}")
`,
    hints: [
      {
        title: "Hint 1: Range Stop Value",
        content: "Remember <code>range(1, 11)</code> stops at 10. If you use <code>range(1, 10)</code>, it will stop at 9!"
      },
      {
        title: "Hint 2: Accumulating",
        content: "Inside the loop, write: <code>total_sum += num</code> or <code>total_sum = total_sum + num</code>."
      },
      {
        title: "Hint 3: Full Solution",
        content: "<code>total_sum = 0\nfor num in range(1, 11):\n    total_sum += num\nprint(f'Total Sum: {total_sum}')</code>"
      }
    ],
    verify: (output, code) => {
      const hasFor = /for\s+\w+\s+in\s+range/.test(code);
      const hasSum = output.includes("Total Sum: 55");
      return {
        passed: hasFor && hasSum,
        checks: [
          { name: "Uses for loop with range", passed: hasFor },
          { name: "Calculates correct sum (55)", passed: hasSum }
        ],
        feedback: hasSum ? "Well done! You've grasped iterative loops." : "The sum was not 55. Check your range bounds: range(1, 11)."
      };
    }
  },

  {
    id: "m6_lists",
    moduleNum: 6,
    title: "Lists & Sequences: Dynamic Collections",
    category: "Data Structures",
    level: "beginner",
    xp: 95,
    time: "10 mins",
    analogy: {
      headline: "The Train Carriages",
      body: "A list in Python is like a train with numbered carriages hooked together. Carriage 0 is the locomotive, carriage 1 is next, and so on. You can easily unhook a carriage, attach new carriages to the end, or swap what's inside!"
    },
    content: `
      <div class="lesson-section">
        <h3>Zero-Indexed Lists</h3>
        <p>Python lists are created with square brackets <code>[]</code>. Python starts counting positions (indexes) from <strong>0</strong>!</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>list_basics.py</span></div>
          <pre class="code-example-body">languages = ["Python", "JavaScript", "Rust"]
print(languages[0]) # "Python" (First item)
print(languages[-1]) # "Rust" (Last item)</pre>
        </div>

        <h3>Essential List Methods</h3>
        <ul>
          <li><code>.append(item)</code> - Adds an item to the end</li>
          <li><code>.pop()</code> - Removes and returns the last item</li>
          <li><code>len(my_list)</code> - Returns how many items are in the list</li>
          <li><code>.sort()</code> - Arranges items in alphabetical/numerical order</li>
        </ul>
      </div>
    `,
    task: {
      description: "You are organizing a team roster. Start with <code>roster = ['Ada', 'Alan', 'Grace']</code>. Add <code>'Linus'</code> to the end using <code>.append()</code>. Sort the roster alphabetically with <code>roster.sort()</code>. Then print each member on a new line using a <code>for</code> loop.",
      checklist: [
        "Append 'Linus' to roster",
        "Sort the list alphabetically with roster.sort()",
        "Iterate over the list and print each name"
      ]
    },
    starterCode: `roster = ["Ada", "Alan", "Grace"]

# 1. Append "Linus"


# 2. Sort the roster


# 3. Print each member using a for loop:

`,
    solutionCode: `roster = ["Ada", "Alan", "Grace"]
roster.append("Linus")
roster.sort()

for member in roster:
    print(member)
`,
    hints: [
      {
        title: "Hint 1: Appending",
        content: "Use <code>roster.append(\"Linus\")</code>"
      },
      {
        title: "Hint 2: Sorting",
        content: "Call <code>roster.sort()</code> which sorts in-place."
      },
      {
        title: "Hint 3: Printing with Loop",
        content: "<code>for member in roster:\n    print(member)</code>"
      }
    ],
    verify: (output, code) => {
      const hasAppend = /\.append\(/.test(code);
      const hasSort = /\.sort\(/.test(code);
      const lines = output.trim().split(/\r?\n/).map(s => s.trim());
      const expected = ["Ada", "Alan", "Grace", "Linus"];
      const matches = expected.every(name => lines.includes(name));
      const correctOrder = lines.indexOf("Ada") < lines.indexOf("Alan") && 
                           lines.indexOf("Alan") < lines.indexOf("Grace") && 
                           lines.indexOf("Grace") < lines.indexOf("Linus");
      const passed = hasAppend && hasSort && matches && correctOrder;
      return {
        passed,
        checks: [
          { name: "Uses roster.append('Linus')", passed: hasAppend },
          { name: "Sorts the roster", passed: hasSort },
          { name: "Prints all 4 members in sorted order", passed: matches && correctOrder }
        ],
        feedback: passed ? "Great list manipulation! You understand sequences." : "Make sure you append 'Linus', sort the roster, and print each name."
      };
    }
  },

  {
    id: "m7_dicts",
    moduleNum: 7,
    title: "Dictionaries: Key-Value Architecture",
    category: "Data Structures",
    level: "intermediate",
    xp: 100,
    time: "12 mins",
    analogy: {
      headline: "The Contacts Phonebook",
      body: "In a phonebook, you don't search by page 0 or page 1. You look up a contact by their unique name (the Key), which instantly reveals their phone number (the Value). Python Dictionaries <code>{}</code> give you instant O(1) lookups by key!"
    },
    content: `
      <div class="lesson-section">
        <h3>Key-Value Pairs</h3>
        <p>Dictionaries store associations between keys and values. Keys are usually strings or integers.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>dictionary.py</span></div>
          <pre class="code-example-body">server = {
    "hostname": "prod-01",
    "ip": "192.168.1.100",
    "status": "online",
    "ports": [80, 443]
}

# Accessing values:
print(server["hostname"])  # "prod-01"

# Safe access with .get() (never crashes if key missing!):
print(server.get("location", "Unknown Location"))</pre>
        </div>

        <h3>Looping Over Dictionaries</h3>
        <p>Use <code>.items()</code> to loop over both keys and values together:</p>
        <div class="code-example-card">
          <div class="code-example-header"><span>items_loop.py</span></div>
          <pre class="code-example-body">for key, value in server.items():
    print(f"{key} -> {value}")</pre>
        </div>
      </div>
    `,
    task: {
      description: "Create a dictionary named <code>student</code> with keys <code>name</code> ('Maya'), <code>grade</code> (95), and <code>subject</code> ('Python'). Update Maya's <code>grade</code> to <code>98</code>. Then add a new key <code>status</code> set to <code>'Passed'</code>. Finally, print: <code>Maya scored 98 in Python. Status: Passed.</code> using dictionary lookups.",
      checklist: [
        "Create student dictionary with name, grade, subject",
        "Update grade to 98",
        "Add status: 'Passed'",
        "Print formatted result string"
      ]
    },
    starterCode: `# 1. Create student dictionary:
student = {
    "name": "Maya",
    "grade": 95,
    "subject": "Python"
}

# 2. Update grade to 98:


# 3. Add status 'Passed':


# 4. Print using student dictionary values:
`,
    solutionCode: `student = {
    "name": "Maya",
    "grade": 95,
    "subject": "Python"
}

student["grade"] = 98
student["status"] = "Passed"

print(f"{student['name']} scored {student['grade']} in {student['subject']}. Status: {student['status']}.")
`,
    hints: [
      {
        title: "Hint 1: Updating Dictionaries",
        content: "Assigning to a key updates it: <code>student[\"grade\"] = 98</code>."
      },
      {
        title: "Hint 2: Adding New Keys",
        content: "Adding is just as easy: <code>student[\"status\"] = \"Passed\"</code>."
      },
      {
        title: "Hint 3: Full Solution",
        content: "Print with: <code>print(f\"{student['name']} scored {student['grade']} in {student['subject']}. Status: {student['status']}.\")</code>"
      }
    ],
    verify: (output, code) => {
      const hasGradeUpdate = /student\[['"]grade['"]\]\s*=\s*98/.test(code);
      const hasStatus = /student\[['"]status['"]\]\s*=\s*['"]Passed['"]/.test(code);
      const hasOutput = output.includes("Maya scored 98 in Python. Status: Passed.");
      return {
        passed: hasGradeUpdate && hasStatus && hasOutput,
        checks: [
          { name: "Updated grade to 98", passed: hasGradeUpdate },
          { name: "Added status 'Passed'", passed: hasStatus },
          { name: "Formatted output matches template", passed: hasOutput }
        ],
        feedback: hasOutput ? "Awesome! Dictionaries are the workhorse of real-world data in Python." : "Verify you updated the grade and status, and printed the expected message."
      };
    }
  },

  {
    id: "m8_tuples_sets",
    moduleNum: 8,
    title: "Tuples & Sets: Immutability & Uniqueness",
    category: "Data Structures",
    level: "intermediate",
    xp: 100,
    time: "10 mins",
    analogy: {
      headline: "The Sealed Envelope & The Guest Bouncer",
      body: "A <strong>Tuple</strong> <code>(x, y)</code> is like a notarized legal deed: once written and sealed, it can NEVER be modified (immutable). A <strong>Set</strong> <code>{a, b}</code> is like a nightclub bouncer with a guest list: it completely rejects duplicate people and only keeps unique guests!"
    },
    content: `
      <div class="lesson-section">
        <h3>Tuples: Protected Data</h3>
        <p>Tuples use parentheses <code>()</code>. They are faster than lists and guarantee that data won't accidentally get altered.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>tuples.py</span></div>
          <pre class="code-example-body">gps_coordinates = (37.7749, -122.4194)
# gps_coordinates[0] = 40.0 # ERROR! Tuples cannot be modified</pre>
        </div>

        <h3>Sets: Unique Elements & Fast Membership</h3>
        <p>Sets use curly braces <code>{}</code> and automatically strip out duplicates.</p>
        <div class="code-example-card">
          <div class="code-example-header"><span>sets.py</span></div>
          <pre class="code-example-body">tags = {"python", "ai", "python", "code", "ai"}
print(tags) # {'code', 'python', 'ai'} - Duplicates removed!

# Set operations:
frontend = {"HTML", "CSS", "JS"}
backend = {"Python", "JS", "SQL"}
both = frontend.intersection(backend) # {'JS'}</pre>
        </div>
      </div>
    `,
    task: {
      description: "You are given a list of raw email signups with duplicate emails: <code>raw_emails = ['a@test.com', 'b@test.com', 'a@test.com', 'c@test.com', 'b@test.com']</code>. Convert the list into a set <code>unique_emails</code> to eliminate duplicates. Print the number of unique signups using <code>len()</code> in format: <code>Unique subscribers: [count]</code>.",
      checklist: [
        "Convert raw_emails into a set",
        "Count unique items with len()",
        "Print 'Unique subscribers: 3'"
      ]
    },
    starterCode: `raw_emails = ["a@test.com", "b@test.com", "a@test.com", "c@test.com", "b@test.com"]

# 1. Convert to a set to remove duplicates:
unique_emails = set()

# 2. Print count:
`,
    solutionCode: `raw_emails = ["a@test.com", "b@test.com", "a@test.com", "c@test.com", "b@test.com"]
unique_emails = set(raw_emails)

print(f"Unique subscribers: {len(unique_emails)}")
`,
    hints: [
      {
        title: "Hint 1: The set() constructor",
        content: "You can turn any list into a set simply with <code>set(my_list)</code>."
      },
      {
        title: "Hint 2: len() Function",
        content: "<code>len(unique_emails)</code> calculates the number of elements."
      },
      {
        title: "Hint 3: Full Solution",
        content: "<code>unique_emails = set(raw_emails)\nprint(f\"Unique subscribers: {len(unique_emails)}\")</code>"
      }
    ],
    verify: (output, code) => {
      const hasSetConversion = /set\(\s*raw_emails\s*\)/.test(code);
      const hasOutput = output.includes("Unique subscribers: 3");
      return {
        passed: hasSetConversion && hasOutput,
        checks: [
          { name: "Uses set(raw_emails)", passed: hasSetConversion },
          { name: "Outputs 'Unique subscribers: 3'", passed: hasOutput }
        ],
        feedback: hasOutput ? "Perfect! Deduplicating data using sets is an essential software pattern." : "Expected 'Unique subscribers: 3'. Check your set conversion."
      };
    }
  },

  {
    id: "m9_functions",
    moduleNum: 9,
    title: "Functions & Scope: Modular Architecture",
    category: "Core Logic",
    level: "intermediate",
    xp: 110,
    time: "12 mins",
    analogy: {
      headline: "The Automated Coffee Machine",
      body: "A function is like a high-end espresso machine. You define how it works once (beans in, hot espresso out). Whenever you want coffee, you don't rebuild the machine—you simply press the button with your parameters (single or double shot), and it returns your beverage!"
    },
    content: `
      <div class="lesson-section">
        <h3>Defining Functions with <code>def</code></h3>
        <p>Functions prevent repetitive code (DRY: Don't Repeat Yourself). They take inputs (arguments) and pass back output with <code>return</code>.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>functions.py</span></div>
          <pre class="code-example-body">def calculate_tax(subtotal, tax_rate=0.08):
    """Calculates sales tax with a default 8% rate."""
    tax = subtotal * tax_rate
    return round(tax, 2)

order_tax = calculate_tax(150.0) # 12.0
print(f"Tax: \${order_tax}")</pre>
        </div>

        <h3>Scope: Local vs Global</h3>
        <p>Variables created inside a function exist <strong>only</strong> while that function is running (local scope). They disappear once the function returns.</p>
      </div>
    `,
    task: {
      description: "Write a function named <code>calculate_bmi(weight_kg, height_m)</code> that computes BMI using the formula: <code>bmi = weight_kg / (height_m ** 2)</code>. The function must return the rounded BMI to 1 decimal place using <code>round(bmi, 1)</code>. Test it by calling <code>calculate_bmi(70, 1.75)</code> and printing: <code>BMI: [result]</code> (which should be 22.9).",
      checklist: [
        "Define function calculate_bmi(weight_kg, height_m)",
        "Compute weight_kg / (height_m ** 2)",
        "Return rounded result to 1 decimal place",
        "Print 'BMI: 22.9'"
      ]
    },
    starterCode: `# Define calculate_bmi below:


# Test the function with weight=70 and height=1.75:
result = calculate_bmi(70, 1.75)
print(f"BMI: {result}")
`,
    solutionCode: `def calculate_bmi(weight_kg, height_m):
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 1)

result = calculate_bmi(70, 1.75)
print(f"BMI: {result}")
`,
    hints: [
      {
        title: "Hint 1: Exponent Operator",
        content: "In Python, power is written with double asterisks: <code>height_m ** 2</code>."
      },
      {
        title: "Hint 2: The return statement",
        content: "Make sure you return the value: <code>return round(bmi, 1)</code>."
      },
      {
        title: "Hint 3: Full Solution",
        content: "<code>def calculate_bmi(weight_kg, height_m):\n    bmi = weight_kg / (height_m ** 2)\n    return round(bmi, 1)</code>"
      }
    ],
    verify: (output, code) => {
      const hasDef = /def\s+calculate_bmi\s*\(\s*weight_kg\s*,\s*height_m\s*\)/.test(code);
      const hasReturn = /return\s+round/.test(code);
      const hasOutput = output.includes("BMI: 22.9");
      return {
        passed: hasDef && hasReturn && hasOutput,
        checks: [
          { name: "Function defined with correct parameters", passed: hasDef },
          { name: "Returns rounded calculation", passed: hasReturn },
          { name: "Outputs 'BMI: 22.9'", passed: hasOutput }
        ],
        feedback: hasOutput ? "Excellent! Functions are the foundation of clean, maintainable software." : "Expected 'BMI: 22.9'. Check your formula and rounding."
      };
    }
  },

  {
    id: "m10_strings",
    moduleNum: 10,
    title: "String Mastery & Text Processing",
    category: "Data Structures",
    level: "intermediate",
    xp: 115,
    time: "12 mins",
    analogy: {
      headline: "The Text Sculptor",
      body: "Text in modern applications arrives messy: extra spaces, mixed uppercase/lowercase, and weird formatting. Python provides a complete set of precision chisels—like <code>.strip()</code> to trim excess, <code>.split()</code> to slice into words, and <code>.join()</code> to sew them back cleanly."
    },
    content: `
      <div class="lesson-section">
        <h3>Essential String Methods</h3>
        <p>Strings in Python are immutable; calling a string method returns a brand new clean string.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>string_methods.py</span></div>
          <pre class="code-example-body">raw_input = "   admin@SYSTEM.local  "

clean_input = raw_input.strip().lower() 
# "admin@system.local"

# Splitting and Joining:
sentence = "python,javascript,go"
tools = sentence.split(",") # ['python', 'javascript', 'go']
formatted = " | ".join(tools) # "python | javascript | go"</pre>
        </div>

        <h3>Search & Replace</h3>
        <div class="code-example-card">
          <div class="code-example-header"><span>replace.py</span></div>
          <pre class="code-example-body">msg = "Error: server timeout"
fixed = msg.replace("Error", "Resolved")
print(fixed) # "Resolved: server timeout"</pre>
        </div>
      </div>
    `,
    task: {
      description: "You have a messy CSV string of tags: <code>raw_tags = '  ai , python , cloud , security  '</code>. Clean it up by: 1) Splitting by commas, 2) Trimming spaces from each tag and converting to UPPERCASE, 3) Joining them with a dash separator <code>' - '</code> into <code>clean_tags</code>. Print <code>clean_tags</code> (Expected: <code>AI - PYTHON - CLOUD - SECURITY</code>).",
      checklist: [
        "Split raw_tags by comma",
        "Strip and uppercase each element",
        "Join using ' - '",
        "Print 'AI - PYTHON - CLOUD - SECURITY'"
      ]
    },
    starterCode: `raw_tags = "  ai , python , cloud , security  "

# Step 1: Split into a list of items
items = raw_tags.split(",")

# Step 2: Clean each item (strip spaces & make uppercase)
cleaned = []
for item in items:
    cleaned.append(item.strip().upper())

# Step 3: Join with " - "
clean_tags = ""

print(clean_tags)
`,
    solutionCode: `raw_tags = "  ai , python , cloud , security  "

items = raw_tags.split(",")
cleaned = [item.strip().upper() for item in items]
clean_tags = " - ".join(cleaned)

print(clean_tags)
`,
    hints: [
      {
        title: "Hint 1: Joining",
        content: "Use <code>\" - \".join(cleaned)</code>"
      },
      {
        title: "Hint 2: Combining methods",
        content: "<code>item.strip().upper()</code> removes spaces and turns text uppercase."
      },
      {
        title: "Hint 3: Full Solution",
        content: "<code>clean_tags = \" - \".join(cleaned)\nprint(clean_tags)</code>"
      }
    ],
    verify: (output, code) => {
      const hasOutput = output.includes("AI - PYTHON - CLOUD - SECURITY");
      return {
        passed: hasOutput,
        checks: [
          { name: "Outputs 'AI - PYTHON - CLOUD - SECURITY'", passed: hasOutput }
        ],
        feedback: hasOutput ? "Spot on! Text data hygiene is critical for APIs and databases." : "Check your string manipulation. Expected 'AI - PYTHON - CLOUD - SECURITY'."
      };
    }
  },

  {
    id: "m11_exceptions",
    moduleNum: 11,
    title: "Error Handling & Defensive Coding",
    category: "Pro Engineering",
    level: "intermediate",
    xp: 120,
    time: "12 mins",
    analogy: {
      headline: "The Acrobat's Safety Net",
      body: "Without error handling, a single unexpected bug causes your entire server to crash like an acrobat hitting the floor. A <code>try-except</code> block is a sturdy safety net: your code tries a risky stunt, and if something slips, the net catches it safely and continues performing gracefully."
    },
    content: `
      <div class="lesson-section">
        <h3>Catching Exceptions</h3>
        <p>Wrap potentially failing operations in a <code>try</code> block and catch specific issues in an <code>except</code> block.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>try_except.py</span></div>
          <pre class="code-example-body">try:
    number = int("not_a_number")
except ValueError as e:
    print(f"Handled invalid input: {e}")
finally:
    print("Cleanup: This block runs no matter what!")</pre>
        </div>

        <h3>Common Python Exceptions</h3>
        <ul>
          <li><code>ZeroDivisionError</code> - dividing by 0</li>
          <li><code>ValueError</code> - invalid conversion (e.g. <code>int("abc")</code>)</li>
          <li><code>KeyError</code> - looking up a missing dictionary key</li>
          <li><code>IndexError</code> - accessing an out-of-bounds list index</li>
        </ul>
      </div>
    `,
    task: {
      description: "Write a function <code>safe_divide(a, b)</code>. Inside a <code>try</code> block, return <code>a / b</code>. If a <code>ZeroDivisionError</code> occurs, catch it and return <code>'Error: Cannot divide by zero'</code>. Test it with <code>safe_divide(10, 0)</code> and print the output.",
      checklist: [
        "Define safe_divide(a, b)",
        "Use try block with a / b",
        "Catch ZeroDivisionError and return custom message",
        "Print output for safe_divide(10, 0)"
      ]
    },
    starterCode: `def safe_divide(a, b):
    # Implement try / except ZeroDivisionError:
    pass

# Test dividing by zero:
result = safe_divide(10, 0)
print(result)
`,
    solutionCode: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero"

result = safe_divide(10, 0)
print(result)
`,
    hints: [
      {
        title: "Hint 1: Catching ZeroDivisionError",
        content: "Write <code>except ZeroDivisionError:</code> right after the try block."
      },
      {
        title: "Hint 2: Return string",
        content: "Return the exact string: <code>\"Error: Cannot divide by zero\"</code>."
      },
      {
        title: "Hint 3: Full Solution",
        content: "<code>def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'Error: Cannot divide by zero'</code>"
      }
    ],
    verify: (output, code) => {
      const hasTryExcept = /try:[\s\S]+except\s+ZeroDivisionError/.test(code);
      const hasOutput = output.includes("Error: Cannot divide by zero");
      return {
        passed: hasTryExcept && hasOutput,
        checks: [
          { name: "Uses try / except ZeroDivisionError", passed: hasTryExcept },
          { name: "Returns safe fallback message on zero division", passed: hasOutput }
        ],
        feedback: hasOutput ? "Superb defensive programming! Your code is resilient." : "Make sure you catch ZeroDivisionError and return 'Error: Cannot divide by zero'."
      };
    }
  },

  {
    id: "m12_oop_basics",
    moduleNum: 12,
    title: "OOP Part 1: Classes & Objects",
    category: "Pro Engineering",
    level: "advanced",
    xp: 130,
    time: "15 mins",
    analogy: {
      headline: "The Architectural Blueprint",
      body: "A <strong>Class</strong> is an architectural blueprint for a house (specifying number of doors, rooms, and electrical circuits). An <strong>Object (or Instance)</strong> is the actual physical house built from that blueprint. You can build 50 different houses (objects) from one single blueprint (class)!"
    },
    content: `
      <div class="lesson-section">
        <h3>The Blueprint: Classes & <code>__init__</code></h3>
        <p>The <code>__init__</code> method is the constructor: it initializes attributes whenever a new object is created. <code>self</code> refers to the specific instance being built.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>car_class.py</span></div>
          <pre class="code-example-body">class ElectricCar:
    def __init__(self, brand, battery_kwh):
        self.brand = brand
        self.battery_kwh = battery_kwh
        self.charge_level = 100

    def drive(self, miles):
        cost = miles * 0.5
        self.charge_level = max(0, self.charge_level - cost)
        return f"{self.brand} drove {miles} miles. Battery: {self.charge_level}%"

# Instantiate object:
tesla = ElectricCar("Tesla Model 3", 75)
print(tesla.drive(40))</pre>
        </div>
      </div>
    `,
    task: {
      description: "Create a class <code>BankAccount</code> with an <code>__init__(self, owner, balance=0)</code> method. Add a method <code>deposit(self, amount)</code> that increases balance by amount and returns <code>f'Deposited \${amount}. New balance: \${self.balance}'</code>. Create an account for <code>'Alice'</code> with starting balance <code>100</code>, deposit <code>50</code>, and print the return message.",
      checklist: [
        "Create BankAccount class with __init__ and deposit methods",
        "Track self.owner and self.balance",
        "Instantiate for 'Alice' with 100",
        "Call deposit(50) and print output"
      ]
    },
    starterCode: `class BankAccount:
    def __init__(self, owner, balance=0):
        # Store owner and balance in self:
        pass

    def deposit(self, amount):
        # Add amount to balance and return string:
        pass

# Test BankAccount:
account = BankAccount("Alice", 100)
message = account.deposit(50)
print(message)
`,
    solutionCode: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return f"Deposited \${amount}. New balance: \${self.balance}"

account = BankAccount("Alice", 100)
message = account.deposit(50)
print(message)
`,
    hints: [
      {
        title: "Hint 1: Constructor Setup",
        content: "In <code>__init__</code>, write <code>self.owner = owner</code> and <code>self.balance = balance</code>."
      },
      {
        title: "Hint 2: In deposit method",
        content: "Increase with <code>self.balance += amount</code> and return the formatted f-string."
      },
      {
        title: "Hint 3: Full Solution",
        content: "Check that the deposit method matches <code>return f\"Deposited \${amount}. New balance: \${self.balance}\"</code>."
      }
    ],
    verify: (output, code) => {
      const hasClass = /class\s+BankAccount/.test(code);
      const hasInit = /def\s+__init__\s*\(\s*self/.test(code);
      const hasDeposit = /def\s+deposit\s*\(\s*self/.test(code);
      const hasOutput = output.includes("Deposited $50. New balance: $150");
      return {
        passed: hasClass && hasInit && hasDeposit && hasOutput,
        checks: [
          { name: "Class BankAccount defined", passed: hasClass },
          { name: "Has __init__ and deposit methods", passed: hasInit && hasDeposit },
          { name: "Outputs 'Deposited $50. New balance: $150'", passed: hasOutput }
        ],
        feedback: hasOutput ? "Outstanding! You've mastered Object-Oriented Programming foundations." : "Expected 'Deposited $50. New balance: $150'. Check your deposit calculation."
      };
    }
  },

  {
    id: "m13_oop_advanced",
    moduleNum: 13,
    title: "OOP Part 2: Inheritance & Polymorphism",
    category: "Pro Engineering",
    level: "advanced",
    xp: 140,
    time: "15 mins",
    analogy: {
      headline: "The Family DNA & Specialized Vehicles",
      body: "All motor vehicles have an engine and steering wheel (Parent Class). A Firetruck inherits all those base features, but specializes by adding a high-pressure water cannon and sirens (Child Class). With <code>super()</code>, child classes reuse their parent's DNA without rewriting it!"
    },
    content: `
      <div class="lesson-section">
        <h3>Class Inheritance with <code>super()</code></h3>
        <p>Inheritance lets a subclass inherit attributes and methods from a parent class while overriding or adding unique behavior.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>inheritance.py</span></div>
          <pre class="code-example-body">class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_role(self):
        return "General Employee"

class Engineer(Employee):
    def __init__(self, name, salary, tech_stack):
        super().__init__(name, salary) # Reuses parent constructor!
        self.tech_stack = tech_stack

    def get_role(self): # Overrides parent method
        return f"Software Architect ({self.tech_stack})"</pre>
        </div>
      </div>
    `,
    task: {
      description: "Create a base class <code>Vehicle</code> with <code>__init__(self, make)</code> and a method <code>describe(self)</code> returning <code>f'Vehicle make: {self.make}'</code>. Then create a child class <code>SportsCar(Vehicle)</code> that accepts <code>make</code> and <code>top_speed</code>. Call <code>super().__init__(make)</code>, and override <code>describe()</code> to return <code>f'{self.make} sports car reaching {self.top_speed} mph'</code>. Instantiate a <code>SportsCar('Ferrari', 211)</code> and print its description.",
      checklist: [
        "Create Vehicle base class with describe()",
        "Create SportsCar child class inheriting Vehicle",
        "Call super().__init__(make)",
        "Print Ferrari description"
      ]
    },
    starterCode: `class Vehicle:
    def __init__(self, make):
        self.make = make

    def describe(self):
        return f"Vehicle make: {self.make}"

# Create SportsCar(Vehicle) below:


# Test with Ferrari:
car = SportsCar("Ferrari", 211)
print(car.describe())
`,
    solutionCode: `class Vehicle:
    def __init__(self, make):
        self.make = make

    def describe(self):
        return f"Vehicle make: {self.make}"

class SportsCar(Vehicle):
    def __init__(self, make, top_speed):
        super().__init__(make)
        self.top_speed = top_speed

    def describe(self):
        return f"{self.make} sports car reaching {self.top_speed} mph"

car = SportsCar("Ferrari", 211)
print(car.describe())
`,
    hints: [
      {
        title: "Hint 1: Class Declaration",
        content: "Declare inheritance using: <code>class SportsCar(Vehicle):</code>."
      },
      {
        title: "Hint 2: Super constructor",
        content: "Inside <code>SportsCar.__init__</code>, call: <code>super().__init__(make)</code>."
      },
      {
        title: "Hint 3: Full Solution",
        content: "Override <code>describe(self)</code> in SportsCar to return <code>f\"{self.make} sports car reaching {self.top_speed} mph\"</code>."
      }
    ],
    verify: (output, code) => {
      const hasSubclass = /class\s+SportsCar\s*\(\s*Vehicle\s*\)/.test(code);
      const hasSuper = /super\(\)\.__init__/.test(code);
      const hasOutput = output.includes("Ferrari sports car reaching 211 mph");
      return {
        passed: hasSubclass && hasSuper && hasOutput,
        checks: [
          { name: "SportsCar inherits Vehicle", passed: hasSubclass },
          { name: "Calls super().__init__(make)", passed: hasSuper },
          { name: "Outputs 'Ferrari sports car reaching 211 mph'", passed: hasOutput }
        ],
        feedback: hasOutput ? "Brilliant! Inheritance and method overriding are core tenets of software architecture." : "Check your SportsCar implementation and describe output string."
      };
    }
  },

  {
    id: "m14_comprehensions",
    moduleNum: 14,
    title: "Comprehensions & Functional Python",
    category: "Pro Engineering",
    level: "advanced",
    xp: 140,
    time: "12 mins",
    analogy: {
      headline: "The Precision Filter Funnel",
      body: "Instead of writing 5 lines of tedious loops just to transform or filter items, a Python Comprehension is a sleek single-line pipeline that extracts, modifies, and collects exactly what you need in one fluid motion!"
    },
    content: `
      <div class="lesson-section">
        <h3>List Comprehensions</h3>
        <p>The Pythonic way to transform lists: <code>[expression for item in iterable if condition]</code>.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>comprehensions.py</span></div>
          <pre class="code-example-body">numbers = [1, 2, 3, 4, 5, 6]

# Traditional way (4 lines):
# squares = []
# for n in numbers:
#     if n % 2 == 0:
#         squares.append(n ** 2)

# The Pythonic way (1 line!):
even_squares = [n ** 2 for n in numbers if n % 2 == 0]
# [4, 16, 36]</pre>
        </div>

        <h3>Lambda Functions (Anonymous Micro-functions)</h3>
        <div class="code-example-card">
          <div class="code-example-header"><span>lambda.py</span></div>
          <pre class="code-example-body">multiply = lambda x, y: x * y
print(multiply(4, 5)) # 20</pre>
        </div>
      </div>
    `,
    task: {
      description: "Given a list of numbers <code>nums = [12, 5, 8, 19, 24, 3, 16]</code>, use a list comprehension to create a new list <code>filtered_doubles</code> containing the double (<code>n * 2</code>) of only the numbers greater than or equal to 10. Print <code>filtered_doubles</code> (Expected: <code>[24, 38, 48, 32]</code>).",
      checklist: [
        "Use single-line list comprehension",
        "Filter for numbers >= 10",
        "Multiply matching numbers by 2",
        "Print [24, 38, 48, 32]"
      ]
    },
    starterCode: `nums = [12, 5, 8, 19, 24, 3, 16]

# Use a list comprehension to double numbers >= 10:
filtered_doubles = []

print(filtered_doubles)
`,
    solutionCode: `nums = [12, 5, 8, 19, 24, 3, 16]
filtered_doubles = [n * 2 for n in nums if n >= 10]
print(filtered_doubles)
`,
    hints: [
      {
        title: "Hint 1: Comprehension Structure",
        content: "Pattern: <code>[n * 2 for n in nums if n >= 10]</code>"
      },
      {
        title: "Hint 2: Condition check",
        content: "Place <code>if n >= 10</code> at the end of the comprehension expression."
      },
      {
        title: "Hint 3: Full Solution",
        content: "<code>filtered_doubles = [n * 2 for n in nums if n >= 10]</code>"
      }
    ],
    verify: (output, code) => {
      const hasComp = /\[\s*\w+\s*\*\s*2\s+for\s+\w+\s+in\s+nums\s+if/.test(code);
      const hasOutput = output.includes("[24, 38, 48, 32]");
      return {
        passed: hasComp && hasOutput,
        checks: [
          { name: "Uses list comprehension with filter", passed: hasComp },
          { name: "Outputs [24, 38, 48, 32]", passed: hasOutput }
        ],
        feedback: hasOutput ? "Beautiful Pythonic style! Comprehensions make your code clean and concise." : "Expected output [24, 38, 48, 32]. Check your list comprehension filter condition."
      };
    }
  },

  {
    id: "m15_modules_data",
    moduleNum: 15,
    title: "Working with Data: JSON & Built-in Modules",
    category: "Pro Engineering",
    level: "advanced",
    xp: 150,
    time: "15 mins",
    analogy: {
      headline: "The Universal Shipping Container",
      body: "Whether software runs in Tokyo or New York, in Python or Javascript, JSON is the universal shipping container of data. Python's <code>json</code> module serializes your Python dictionaries into standard JSON strings and unpacks them back seamlessly."
    },
    content: `
      <div class="lesson-section">
        <h3>The Power of Built-in Modules</h3>
        <p>Python comes with 'batteries included'. Use <code>import</code> to unlock modules like <code>math</code>, <code>random</code>, and <code>json</code>.</p>

        <div class="code-example-card">
          <div class="code-example-header"><span>json_demo.py</span></div>
          <pre class="code-example-body">import json

user_profile = {
    "id": 101,
    "username": "coder_pro",
    "skills": ["Python", "Algorithms"]
}

# Convert Python Dict -> JSON String (Serialization)
json_str = json.dumps(user_profile)
print(json_str)

# Convert JSON String -> Python Dict (Deserialization)
parsed_dict = json.loads(json_str)
print(parsed_dict["username"])</pre>
        </div>
      </div>
    `,
    task: {
      description: "Import the <code>json</code> module. Define a Python dictionary <code>config = {'app_name': 'CloudWatch', 'version': 2.5, 'active': True}</code>. Serialize this dictionary into a formatted JSON string with 2-space indentation using <code>json.dumps(config, indent=2)</code> and print the result.",
      checklist: [
        "Import json module",
        "Define config dictionary",
        "Use json.dumps with indent=2",
        "Print formatted JSON string"
      ]
    },
    starterCode: `# 1. Import json:


# 2. Define config dictionary:
config = {
    "app_name": "CloudWatch",
    "version": 2.5,
    "active": True
}

# 3. Serialize and print formatted JSON:
`,
    solutionCode: `import json

config = {
    "app_name": "CloudWatch",
    "version": 2.5,
    "active": True
}

json_output = json.dumps(config, indent=2)
print(json_output)
`,
    hints: [
      {
        title: "Hint 1: json.dumps()",
        content: "<code>json.dumps(config, indent=2)</code> converts a dictionary to formatted JSON."
      },
      {
        title: "Hint 2: Indentation argument",
        content: "Make sure you pass the keyword argument <code>indent=2</code>."
      },
      {
        title: "Hint 3: Full Solution",
        content: "<code>import json\njson_output = json.dumps(config, indent=2)\nprint(json_output)</code>"
      }
    ],
    verify: (output, code) => {
      const hasImport = /import\s+json/.test(code);
      const hasDumps = /json\.dumps\(/.test(code);
      const hasAppName = output.includes('"app_name": "CloudWatch"');
      const hasActive = output.includes('"active": true'); // JSON uses lowercase true
      return {
        passed: hasImport && hasDumps && hasAppName && hasActive,
        checks: [
          { name: "Imports json module", passed: hasImport },
          { name: "Calls json.dumps with indent=2", passed: hasDumps },
          { name: "Outputs valid indented JSON", passed: hasAppName && hasActive }
        ],
        feedback: (hasAppName && hasActive) ? "Outstanding! JSON serialization is fundamental for web APIs and microservices." : "Make sure you use json.dumps(config, indent=2) and print the result."
      };
    }
  },

  {
    id: "m16_capstone",
    moduleNum: 16,
    title: "Architect Capstone: Smart Banking System",
    category: "Pro Engineering",
    level: "advanced",
    xp: 250,
    time: "20 mins",
    analogy: {
      headline: "The Pro Architect Capstone",
      body: "Congratulations! You have journeyed from printing your first line to architecting complete software systems. In this Capstone, you will combine Classes, Methods, Conditionals, Error Handling, and Formatted output into an enterprise Banking Engine!"
    },
    content: `
      <div class="lesson-section">
        <h3>The Architecture Brief</h3>
        <p>Real-world software requires combining multiple concepts into a cohesive, robust system. Your challenge is to build the <code>BankSystem</code> class.</p>
        
        <p>The system will:</p>
        <ul>
          <li>Initialize with a bank name and an empty accounts dictionary <code>self.accounts = {}</code>.</li>
          <li><code>create_account(account_id, holder_name, initial_deposit)</code>: Creates a record if account doesn't exist, else returns an error message.</li>
          <li><code>transfer(from_id, to_id, amount)</code>: Validates both accounts exist and sufficient funds are available before transferring.</li>
          <li><code>get_balance(account_id)</code>: Returns the current balance.</li>
        </ul>
      </div>
    `,
    task: {
      description: "Implement the <code>BankSystem</code> class. Create accounts for <code>'ACC101'</code> (Alice, $500) and <code>'ACC102'</code> (Bob, $200). Transfer $150 from Alice to Bob. Print Bob's new balance with <code>f'Bob Balance: \${bank.get_balance(\"ACC102\")}'</code> (Should be $350).",
      checklist: [
        "Implement BankSystem with create_account, transfer, and get_balance",
        "Create Alice with $500 and Bob with $200",
        "Transfer $150 from Alice to Bob",
        "Print 'Bob Balance: $350'"
      ]
    },
    starterCode: `class BankSystem:
    def __init__(self, name):
        self.name = name
        self.accounts = {} # format: {acc_id: {"holder": name, "balance": amount}}

    def create_account(self, acc_id, holder, initial_deposit):
        self.accounts[acc_id] = {"holder": holder, "balance": initial_deposit}

    def transfer(self, from_id, to_id, amount):
        # Deduct amount from from_id and credit to to_id:
        if from_id in self.accounts and to_id in self.accounts:
            if self.accounts[from_id]["balance"] >= amount:
                self.accounts[from_id]["balance"] -= amount
                self.accounts[to_id]["balance"] += amount
                return True
        return False

    def get_balance(self, acc_id):
        return self.accounts[acc_id]["balance"]

# --- Test Your Capstone ---
bank = BankSystem("Apex Global Bank")
bank.create_account("ACC101", "Alice", 500)
bank.create_account("ACC102", "Bob", 200)

# Perform Transfer of $150 from ACC101 to ACC102:
bank.transfer("ACC101", "ACC102", 150)

# Print Bob's balance:
print(f"Bob Balance: \${bank.get_balance('ACC102')}")
`,
    solutionCode: `class BankSystem:
    def __init__(self, name):
        self.name = name
        self.accounts = {}

    def create_account(self, acc_id, holder, initial_deposit):
        self.accounts[acc_id] = {"holder": holder, "balance": initial_deposit}

    def transfer(self, from_id, to_id, amount):
        if from_id in self.accounts and to_id in self.accounts:
            if self.accounts[from_id]["balance"] >= amount:
                self.accounts[from_id]["balance"] -= amount
                self.accounts[to_id]["balance"] += amount
                return True
        return False

    def get_balance(self, acc_id):
        return self.accounts[acc_id]["balance"]

bank = BankSystem("Apex Global Bank")
bank.create_account("ACC101", "Alice", 500)
bank.create_account("ACC102", "Bob", 200)
bank.transfer("ACC101", "ACC102", 150)
print(f"Bob Balance: \${bank.get_balance('ACC102')}")
`,
    hints: [
      {
        title: "Hint 1: Transfer Logic",
        content: "Check that the sender has enough funds: <code>self.accounts[from_id]['balance'] >= amount</code>."
      },
      {
        title: "Hint 2: Updating Balances",
        content: "Subtract from sender and add to recipient: <code>self.accounts[from_id]['balance'] -= amount</code> and <code>self.accounts[to_id]['balance'] += amount</code>."
      },
      {
        title: "Hint 3: Full Solution",
        content: "Run the provided starter code after verifying the transfer logic is hooked up."
      }
    ],
    verify: (output, code) => {
      const hasTransfer = output.includes("Bob Balance: $350");
      return {
        passed: hasTransfer,
        checks: [
          { name: "Transfer verified between accounts", passed: hasTransfer },
          { name: "Outputs 'Bob Balance: $350'", passed: hasTransfer }
        ],
        feedback: hasTransfer ? "🎉 MASTER ARCHITECT CERTIFICATION ACHIEVED! You have successfully completed the entire Zero-to-Pro Python Curriculum!" : "Expected 'Bob Balance: $350'. Verify account amounts and transfer execution."
      };
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRICULUM };
}
