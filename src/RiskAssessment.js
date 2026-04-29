let threatCount = 0;

/* ── Scoring helpers ── */
function getRiskLevel(score) {
  if (score <= 4)  return { level: "Low",      cls: "low"      };
  if (score <= 9)  return { level: "Medium",   cls: "medium"   };
  if (score <= 14) return { level: "High",     cls: "high"     };
                   return { level: "Critical", cls: "critical" };
}

function likelihoodLabel(n) {
  return ["", "Rare", "Unlikely", "Possible", "Likely", "Certain"][n];
}

function impactLabel(n) {
  return ["", "Negligible", "Minor", "Moderate", "Major", "Severe"][n];
}

function setScore(id, type, val) {
  document.getElementById(`h${id}-${type}`).value = val;
  document.querySelectorAll(`#${type}-row-${id} .score-btn`).forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.val) === val);
  });
  document.getElementById(`${type}-row-${id}`).classList.remove("invalid-row");
  const side = (type === "iL" || type === "iI") ? "inherent" : "residual";
  updateScoreDisplay(id, side);
}

function updateScoreDisplay(id, side) {
  const lKey = side === "inherent" ? "iL" : "rL";
  const iKey = side === "inherent" ? "iI" : "rI";
  const l = parseInt(document.getElementById(`h${id}-${lKey}`).value) || 0;
  const i = parseInt(document.getElementById(`h${id}-${iKey}`).value) || 0;
  if (!l || !i) return;

  const score          = l * i;
  const { level, cls } = getRiskLevel(score);
  const resultEl       = document.getElementById(`${side}-result-${id}`);
  const formulaEl      = document.getElementById(`${side}-formula-${id}`);
  const badgeEl        = document.getElementById(`${side}-badge-${id}`);

  formulaEl.textContent  = `${likelihoodLabel(l)} (${l}) × ${impactLabel(i)} (${i}) = ${score}`;
  badgeEl.textContent    = level;
  badgeEl.className      = `score-badge score-badge--${cls}`;
  resultEl.style.display = "flex";

  const scoreKey = side === "inherent" ? "inherentScore" : "residualScore";
  const levelKey = side === "inherent" ? "inherentLevel" : "riskLevel";
  document.getElementById(`h${id}-${scoreKey}`).value = score;
  document.getElementById(`h${id}-${levelKey}`).value = level;
}

function scoreBtns(id, type, labelFn) {
  return [1, 2, 3, 4, 5].map(n =>
    `<button type="button" class="score-btn" data-val="${n}" onclick="setScore(${id},'${type}',${n})">
      <span class="score-n">${n}</span>
      <span class="score-lbl">${labelFn(n)}</span>
    </button>`
  ).join("");
}

/* ── Build threat <optgroup> HTML from FRAMEWORKS data ── */
function buildThreatOptions() {
  const groups = {
    CIS:   { label: "CIS Critical Security Controls v8", threats: [] },
    NIST:  { label: "NIST SP 800-53 Rev. 5",             threats: [] },
    MITRE: { label: "MITRE ATT&CK",                      threats: [] }
  };
  Object.values(FRAMEWORKS).forEach(t => groups[t.framework].threats.push(t));
  return Object.entries(groups).map(([, g]) =>
    `<optgroup label="${g.label}">
      ${g.threats.map(t => `<option value="${t.id}">${t.label}</option>`).join("")}
    </optgroup>`
  ).join("");
}

function addThreat() {
  threatCount++;
  const id = threatCount;
  const container = document.getElementById("threatsContainer");

  const el = document.createElement("div");
  el.className = "threat-card";
  el.id = `threat-${id}`;
  el.style.animationDelay = "0s";
  el.innerHTML = `
    <div class="threat-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <h2 id="threat-title-${id}">Threat ${id}</h2>
        <span class="fw-badge" id="fw-badge-${id}" style="display:none"></span>
      </div>
      <button onclick="removeThreat(${id})" style="background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.4);color:#fff;border-radius:6px;padding:4px 10px;cursor:pointer;font-size:.8rem;">✕ Remove</button>
    </div>
    <div class="threat-body">

      <div class="step-title"><span class="step-badge">1</span>Identify the Threat</div>
      <div class="field">
        <label>Select the threat <span class="req">*</span></label>
        <select required id="h${id}-threat-type" onchange="onThreatChange(${id})">
          <option value="">Select a threat</option>
          ${buildThreatOptions()}
        </select>
      </div>

      <div class="framework-info" id="fw-info-${id}" style="display:none">
        <div class="fw-info-top">
          <span class="fw-badge-inline" id="fw-badge-inline-${id}"></span>
          <span class="fw-control" id="fw-control-${id}"></span>
        </div>
        <p class="fw-description" id="fw-description-${id}"></p>
      </div>

      <div class="step-title"><span class="step-badge">2</span>Decide Who Might Be Harmed &amp; How</div>
      <div class="field">
        <label>Who? <span class="req">*</span></label>
        <textarea id="h${id}-who" placeholder="e.g. Students, staff, customers"></textarea>
      </div>
      <div class="field">
        <label>How? <span class="req">*</span></label>
        <select required id="h${id}-how" disabled>
          <option value="">Select a threat above first</option>
        </select>
      </div>

      <div class="step-title"><span class="step-badge">3</span>Evaluate Risks &amp; Decide on Precautions</div>

      <!-- Inherent Risk -->
      <div class="score-section score-section--inherent">
        <div class="score-section-title">Inherent Risk
          <span class="score-hint">— the risk level before any controls are in place</span>
        </div>
        <div class="field">
          <label>Likelihood <span class="req">*</span>
            <span class="field-hint">How likely is it that this threat will occur?</span>
          </label>
          <div class="score-btn-row" id="iL-row-${id}">
            ${scoreBtns(id, "iL", likelihoodLabel)}
          </div>
          <input type="hidden" id="h${id}-iL" value=""/>
        </div>
        <div class="field">
          <label>Impact <span class="req">*</span>
            <span class="field-hint">How serious would the damage be if it happened?</span>
          </label>
          <div class="score-btn-row" id="iI-row-${id}">
            ${scoreBtns(id, "iI", impactLabel)}
          </div>
          <input type="hidden" id="h${id}-iI" value=""/>
        </div>
        <div class="score-result" id="inherent-result-${id}" style="display:none">
          <span class="score-formula" id="inherent-formula-${id}"></span>
          <span class="score-badge" id="inherent-badge-${id}"></span>
        </div>
        <input type="hidden" id="h${id}-inherentScore" value=""/>
        <input type="hidden" id="h${id}-inherentLevel" value=""/>
      </div>

      <!-- Existing Controls -->
      <div class="field">
        <label>What are you already doing? <span class="req">*</span></label>
        <textarea id="h${id}-existing" placeholder="e.g. Staff training, antivirus installed"></textarea>
      </div>

      <!-- Residual Risk -->
      <div class="score-section score-section--residual">
        <div class="score-section-title">Residual Risk
          <span class="score-hint">— the risk level after your existing controls are applied</span>
        </div>
        <div class="field">
          <label>Likelihood <span class="req">*</span>
            <span class="field-hint">How likely is it now, given what you already have in place?</span>
          </label>
          <div class="score-btn-row" id="rL-row-${id}">
            ${scoreBtns(id, "rL", likelihoodLabel)}
          </div>
          <input type="hidden" id="h${id}-rL" value=""/>
        </div>
        <div class="field">
          <label>Impact <span class="req">*</span>
            <span class="field-hint">How serious would the damage be now, given your controls?</span>
          </label>
          <div class="score-btn-row" id="rI-row-${id}">
            ${scoreBtns(id, "rI", impactLabel)}
          </div>
          <input type="hidden" id="h${id}-rI" value=""/>
        </div>
        <div class="score-result" id="residual-result-${id}" style="display:none">
          <span class="score-formula" id="residual-formula-${id}"></span>
          <span class="score-badge" id="residual-badge-${id}"></span>
        </div>
        <input type="hidden" id="h${id}-residualScore" value=""/>
        <input type="hidden" id="h${id}-riskLevel" value=""/>
      </div>

      <div class="field">
        <label>Further Action / Control Measures <span class="req">*</span></label>
        <textarea id="h${id}-further" placeholder="e.g. Enable multi-factor authentication"></textarea>
      </div>

      <div class="step-title"><span class="step-badge">4</span>Record &amp; Implement Findings</div>
      <div class="field">
        <label>Action By Whom? <span class="req">*</span></label>
        <input type="text" id="h${id}-byWhom" placeholder="e.g. IT Manager"/>
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

/* ── Update card when a threat is selected ── */
function onThreatChange(id) {
  const key         = document.getElementById(`h${id}-threat-type`).value;
  const titleEl     = document.getElementById(`threat-title-${id}`);
  const badgeEl     = document.getElementById(`fw-badge-${id}`);
  const infoEl      = document.getElementById(`fw-info-${id}`);
  const badgeInline = document.getElementById(`fw-badge-inline-${id}`);
  const controlEl   = document.getElementById(`fw-control-${id}`);
  const descEl      = document.getElementById(`fw-description-${id}`);
  const howEl       = document.getElementById(`h${id}-how`);

  if (!key || !FRAMEWORKS[key]) {
    titleEl.textContent   = `Threat ${id}`;
    badgeEl.style.display = "none";
    infoEl.style.display  = "none";
    howEl.innerHTML       = `<option value="">Select a threat above first</option>`;
    howEl.disabled        = true;
    return;
  }

  const t  = FRAMEWORKS[key];
  const fw = t.framework.toLowerCase();

  titleEl.textContent     = t.label;
  badgeEl.textContent     = t.framework;
  badgeEl.className       = `fw-badge fw-badge--${fw}`;
  badgeEl.style.display   = "inline-block";
  badgeInline.textContent = t.frameworkFull;
  badgeInline.className   = `fw-badge-inline fw-badge--${fw}`;
  controlEl.textContent   = t.control;
  descEl.textContent      = t.description;
  infoEl.style.display    = "block";

  howEl.disabled  = false;
  howEl.innerHTML = `<option value="">Select how this threat may occur</option>` +
    t.howOptions.map(o => `<option value="${o}">${o}</option>`).join("");
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
     Validation
  ───────────────────────────────────────────── */
function validateField(id, errId) {
  const el  = document.getElementById(id);
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
  valid = validateField("assessmentTitle", "err-title")    && valid;
  valid = validateField("companyName",     "err-company")  && valid;
  valid = validateField("assessorName",    "err-assessor") && valid;
  valid = validateField("assessmentDate",  "err-date")     && valid;
  valid = validateField("reviewDate",      "err-review")   && valid;

  document.querySelectorAll(".threat-card").forEach(card => {
    const id = card.id.replace("threat-", "");
    ["threat-type", "who", "how", "existing", "further", "byWhom", "byWhen"].forEach(f => {
      const el = document.getElementById(`h${id}-${f}`);
      if (el && !el.value.trim()) {
        el.classList.add("invalid");
        valid = false;
      } else if (el) {
        el.classList.remove("invalid");
      }
    });

    // Scoring fields — highlight the button row if not selected
    ["iL", "iI", "rL", "rI"].forEach(f => {
      const hiddenEl = document.getElementById(`h${id}-${f}`);
      const rowEl    = document.getElementById(`${f}-row-${id}`);
      if (hiddenEl && !hiddenEl.value) {
        if (rowEl) rowEl.classList.add("invalid-row");
        valid = false;
      } else if (rowEl) {
        rowEl.classList.remove("invalid-row");
      }
    });
  });
  return valid;
}

/* ─────────────────────────────────────────────
     Collect Data
  ───────────────────────────────────────────── */
function collectFormData() {
  const threats = [];
  document.querySelectorAll(".threat-card").forEach(card => {
    const id = card.id.replace("threat-", "");
    threats.push({
      threatType:       document.getElementById(`h${id}-threat-type`).value,
      who:              document.getElementById(`h${id}-who`).value,
      how:              document.getElementById(`h${id}-how`).value,
      existingControls:   document.getElementById(`h${id}-existing`).value,
      inherentLikelihood: document.getElementById(`h${id}-iL`).value,
      inherentImpact:     document.getElementById(`h${id}-iI`).value,
      inherentScore:      document.getElementById(`h${id}-inherentScore`).value,
      inherentLevel:      document.getElementById(`h${id}-inherentLevel`).value,
      residualLikelihood: document.getElementById(`h${id}-rL`).value,
      residualImpact:     document.getElementById(`h${id}-rI`).value,
      residualScore:      document.getElementById(`h${id}-residualScore`).value,
      riskLevel:          document.getElementById(`h${id}-riskLevel`).value,
      furtherActions:     document.getElementById(`h${id}-further`).value,
      actionByWhom:     document.getElementById(`h${id}-byWhom`).value,
      actionByWhen:     document.getElementById(`h${id}-byWhen`).value,
      completed:        document.getElementById(`h${id}-completed`).value,
    });
  });
  return {
    assessmentTitle: document.getElementById("assessmentTitle").value,
    companyName:     document.getElementById("companyName").value,
    assessorName:    document.getElementById("assessorName").value,
    assessmentDate:  document.getElementById("assessmentDate").value,
    reviewDate:      document.getElementById("reviewDate").value,
    threats,
  };
}

/* ─── Save Draft ─── */
function saveDraft() {
  const data = collectFormData();
  localStorage.setItem("riskAssessmentDraft", JSON.stringify(data));
  const bar = document.querySelector(".action-bar");
  const msg = document.createElement("span");
  msg.textContent = "✓ Draft saved";
  msg.style.cssText = "color:var(--teal-mid);font-weight:600;font-size:.85rem;margin-right:auto;";
  bar.prepend(msg);
  setTimeout(() => msg.remove(), 2500);
}

/* ─── Submit ─── */
function submitForm() {
  if (!validateAll()) {
    document.querySelector(".invalid, .invalid-row")?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const data = collectFormData();
  localStorage.setItem("riskAssessmentData", JSON.stringify(data));
  window.location.href = "score.html";
}

/* ─────────────────────────────────────────────
     Restore draft on load
  ───────────────────────────────────────────── */
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("assessmentDate").valueAsDate = new Date();
  addThreat();
  const draft = localStorage.getItem("riskAssessmentDraft");
  if (draft) {
    try {
      const d = JSON.parse(draft);
      document.getElementById("assessmentTitle").value = d.assessmentTitle || "";
      document.getElementById("companyName").value     = d.companyName     || "";
      document.getElementById("assessorName").value    = d.assessorName    || "";
      document.getElementById("assessmentDate").value  = d.assessmentDate  || "";
      document.getElementById("reviewDate").value      = d.reviewDate      || "";
    } catch (e) {}
  }
});
