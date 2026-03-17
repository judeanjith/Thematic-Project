let threatCount = 0;

function addThreat() {
  threatCount++;
  const id = threatCount;
  const container = document.getElementById("threatsContainer");

  const el = document.createElement("div");
  el.className = "threat-card";
  el.id = `threat-${id}`;
  el.style.animationDelay = "0s";
  el.innerHTML = `
      <div class="threat-header" style="display:flex;align-items:center;justify-content:space-between;">
        <h2 id="threat-title-${id}">Threat ${id}</h2>
        <button onclick="removeThreat(${id})" style="background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.4);color:#fff;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:.8rem;">✕ Remove</button>
      </div>
      <div class="threat-body">

        <div class="step-title"><span class="step-badge">1</span>Identify the Threat</div>
        <div class="field">
          <label>Select the threat <span class="req">*</span></label>
          <select  required name="" id="h${id}-threat-type" onchange="updateTitle(${id})">
            <option value="" selected>Select a threat</option>
            <option value="phishing">Phishing</option>
            <option value="malware">Malware</option>
            <option value="misconfiguration">Misconfiguration</option>
            <option value="data-leakage">Data Leakage</option>
            <option value="insider-threat">Insider Threat</option>
          </select>
        </div>

        <div class="step-title"><span class="step-badge">2</span>Decide Who Might Be Harmed &amp; How</div>
        <div class="field">
          <label>Who? <span class="req">*</span> </label>
          <textarea id="h${id}-who" placeholder="e.g. Students, staff"></textarea>
        </div>

      <div class="field">
          <label>How? <span class="req">*</label>
          <select  required name="" id="h${id}-threat-type" onchange="updateTitle(${id})">
            <option value="" selected>Select description</option>
            <option value="Email-based social engineering">Email-based social engineering</option>
            <option value="Malicious software">Malicious software</option>
            <option value="Incorrect system setup">Incorrect system setup</option>
            <option value="Unauthorised data exposure">Unauthorised data exposure</option>
            <option value="Malicious internal actor">Malicious internal actor</option>
          </select>
        </div>

        <div class="step-title"><span class="step-badge">3</span>Evaluate Risks &amp; Decide on Precautions</div>
        <div class="field">
          <label>What are you already doing? <span class="req">*</span> </label>
          <textarea id="h${id}-existing" placeholder="e.g. Staff training"></textarea>
        </div>
        <div class="field">
          <label>Remaining Risk Level <span class="req">*</span></label>
          <div class="risk-row" id="risk-row-${id}">
            <button class="risk-btn" data-level="Low"    onclick="setRisk(${id},'Low')">🟢 Low</button>
            <button class="risk-btn active" data-level="Medium" onclick="setRisk(${id},'Medium')">🟡 Medium</button>
            <button class="risk-btn" data-level="High"   onclick="setRisk(${id},'High')">🔴 High</button>
          </div>
          <input type="hidden" id="h${id}-risk" value="Medium"/>
        </div>
        <div class="field">
          <label>Further Action / Control Measures <span class="req">*</span> </label>
          <textarea id="h${id}-further" placeholder="e.g. Enable multi-factor authenticator"></textarea>
        </div>

        <div class="step-title"><span class="step-badge">4</span>Record &amp; Implement Findings</div>
        <div class="field">
          <label>Action By Whom? <span class="req">*</span> </label>
          <input type="text" id="h${id}-byWhom" placeholder="e.g. Site Manager"/>
        </div>
        <div class="field">
          <label>Action By When? <span class="req">*</span></label>
          <input type="date" id="h${id}-byWhen"/>
        </div>

        <div class="step-title"><span class="step-badge">5</span>Date Completed</div>
        <div class="field">
          <label>Completed On</label>
          <input type="date" id="h${id}-completed"/>
        </div>
      </div>
    `;
  container.appendChild(el);
  updateProgress();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateTitle(id) {
  const val = document.getElementById(`h${id}-threat-type`).value;
  document.getElementById(`threat-title-${id}`).textContent =
    val || `Threat ${id}`;
}

function setRisk(id, level) {
  document.getElementById(`h${id}-risk`).value = level;
  document.querySelectorAll(`#risk-row-${id} .risk-btn`).forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.level === level);
  });
}

function removeThreat(id) {
  const el = document.getElementById(`threat-${id}`);
  if (el) el.remove();
  updateProgress();
}

/* ─────────────────────────────────────────────
     Progress Pill
  ───────────────────────────────────────────── */
function updateProgress() {
  const count = document.querySelectorAll(".threat-card").length;
  document.getElementById("progressPill").textContent =
    count > 0 ? `${count} Threat${count > 1 ? "s" : ""} Added` : "Step 1 of 2";
}

/* ─────────────────────────────────────────────
     Validation helpers
  ───────────────────────────────────────────── */
function validateField(id, errId) {
  const el = document.getElementById(id);
  const err = document.getElementById(errId);
  if (!el.value.trim()) {
    el.classList.add("invalid");
    if (err) err.classList.add("show");
    return false;
  }
  el.classList.remove("invalid");
  if (err) err.classList.remove("show");
  return true;
}

function validateAll() {
  let valid = true;
  valid = validateField("assessmentTitle", "err-title") && valid;
  valid = validateField("companyName", "err-company") && valid;
  valid = validateField("assessorName", "err-assessor") && valid;
  valid = validateField("assessmentDate", "err-date") && valid;
  valid = validateField("reviewDate", "err-review") && valid;

  document.querySelectorAll(".threat-card").forEach((card) => {
    const id = card.id.replace("threat-", "");
    [
      "threat-type",
      "who",
      "how",
      "existing",
      "further",
      "byWhom",
      "byWhen",
    ].forEach((f) => {
      const el = document.getElementById(`h${id}-${f}`);
      if (el && !el.value.trim()) {
        el.classList.add("invalid");
        valid = false;
      } else if (el) el.classList.remove("invalid");
    });
  });
  return valid;
}

/* ─────────────────────────────────────────────
     Collect Data (exported for other pages)
  ───────────────────────────────────────────── */
function collectFormData() {
  const threats = [];
  document.querySelectorAll(".threat-card").forEach((card) => {
    const id = card.id.replace("threat-", "");
    threats.push({
      threatType: document.getElementById(`h${id}-threat-type`).value,
      who: document.getElementById(`h${id}-who`).value,
      how: document.getElementById(`h${id}-how`).value,
      existingControls: document.getElementById(`h${id}-existing`).value,
      riskLevel: document.getElementById(`h${id}-risk`).value,
      furtherActions: document.getElementById(`h${id}-further`).value,
      actionByWhom: document.getElementById(`h${id}-byWhom`).value,
      actionByWhen: document.getElementById(`h${id}-byWhen`).value,
      completed: document.getElementById(`h${id}-completed`).value,
    });
  });
  return {
    assessmentTitle: document.getElementById("assessmentTitle").value,
    companyName: document.getElementById("companyName").value,
    assessorName: document.getElementById("assessorName").value,
    assessmentDate: document.getElementById("assessmentDate").value,
    reviewDate: document.getElementById("reviewDate").value,
    threats,
  };
}

//  Save Draft
function saveDraft() {
  const data = collectFormData();
  localStorage.setItem("riskAssessmentDraft", JSON.stringify(data));
  const bar = document.querySelector(".action-bar");
  const msg = document.createElement("span");
  msg.textContent = "✓ Draft saved";
  msg.style.cssText =
    "color:var(--teal-mid);font-weight:600;font-size:.85rem;margin-right:auto;";
  bar.prepend(msg);
  setTimeout(() => msg.remove(), 2500);
}

/* ─────────────────────────────────────────────
     Submit → pass data to score page
  ───────────────────────────────────────────── */
function submitForm() {
  if (!validateAll()) {
    document
      .querySelector(".invalid")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const data = collectFormData();
  localStorage.setItem("riskAssessmentData", JSON.stringify(data));
  alert(
    "Form submitted successfully! Data is stored in localStorage under 'riskAssessmentData'. You can now navigate to the score page to see the results.",
    JSON.stringify(data),
  );
}

/* ─────────────────────────────────────────────
     Restore draft on load
  ───────────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  // Pre-fill date
  document.getElementById("assessmentDate").valueAsDate = new Date();
  // Add first threat automatically
  addThreat();
  // Restore draft if exists
  const draft = localStorage.getItem("riskAssessmentDraft");
  if (draft) {
    try {
      const d = JSON.parse(draft);
      document.getElementById("assessmentTitle").value =
        d.assessmentTitle || "";
      document.getElementById("companyName").value = d.companyName || "";
      document.getElementById("assessorName").value = d.assessorName || "";
      document.getElementById("assessmentDate").value = d.assessmentDate || "";
      document.getElementById("reviewDate").value = d.reviewDate || "";
    } catch (e) {}
  }
});
