window.addEventListener("DOMContentLoaded", () => {
  const raw = localStorage.getItem("riskAssessmentData");
  if (!raw) {
    document.getElementById("reportWrap").innerHTML = `
      <div class="empty-state">
        <p>No assessment data found.</p>
        <a href="nosa.html">← Go back to the form</a>
      </div>`;
    return;
  }
  try {
    renderReport(JSON.parse(raw));
  } catch (e) {
    document.getElementById("reportWrap").innerHTML = `
      <div class="empty-state">
        <p>Could not load the report. The data may be corrupted.</p>
        <a href="nosa.html">← Go back to the form</a>
      </div>`;
  }
});

/* ─────────────────────────────────────────────
     Main render
  ───────────────────────────────────────────── */
function renderReport(data) {
  const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  data.threats.forEach(t => {
    if (t.riskLevel && counts[t.riskLevel] !== undefined) counts[t.riskLevel]++;
  });

  document.getElementById("reportWrap").innerHTML = `
    ${renderMeta(data)}
    ${renderSummary(counts, data.threats.length)}
    <div class="section-title">Identified Threats &amp; Countermeasures</div>
    ${data.threats.map((t, i) => renderThreat(t, i + 1)).join("")}
    <div class="report-footer">
      Report generated on ${formatDate(new Date().toISOString().split("T")[0])}
    </div>
  `;
}

/* ─────────────────────────────────────────────
     Assessment details
  ───────────────────────────────────────────── */
function renderMeta(data) {
  return `
    <div class="meta-card">
      <div class="meta-title">${data.assessmentTitle || "Untitled Assessment"}</div>
      <div class="meta-grid">
        <div class="meta-item">
          <span class="meta-label">Company</span>
          <span class="meta-value">${data.companyName || "—"}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Assessed By</span>
          <span class="meta-value">${data.assessorName || "—"}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Date of Assessment</span>
          <span class="meta-value">${formatDate(data.assessmentDate)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Next Review Date</span>
          <span class="meta-value">${formatDate(data.reviewDate)}</span>
        </div>
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────
     Risk summary
  ───────────────────────────────────────────── */
function renderSummary(counts, total) {
  const critical = counts.Critical || 0;
  return `
    <div class="summary-card">
      <div class="summary-heading">Residual Risk Summary</div>
      <div class="summary-grid">
        <div class="summary-item">
          <span class="summary-num">${total}</span>
          <span class="summary-label">Total Threats</span>
        </div>
        <div class="summary-item risk-critical">
          <span class="summary-num">${critical}</span>
          <span class="summary-label">Critical</span>
        </div>
        <div class="summary-item risk-high">
          <span class="summary-num">${counts.High || 0}</span>
          <span class="summary-label">High</span>
        </div>
        <div class="summary-item risk-medium">
          <span class="summary-num">${counts.Medium || 0}</span>
          <span class="summary-label">Medium</span>
        </div>
        <div class="summary-item risk-low">
          <span class="summary-num">${counts.Low || 0}</span>
          <span class="summary-label">Low</span>
        </div>
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────
     Individual threat card
  ───────────────────────────────────────────── */
function renderThreat(threat, num) {
  const fw              = FRAMEWORKS[threat.threatType];
  const residualClass   = (threat.riskLevel || "medium").toLowerCase();
  const inherentClass   = (threat.inherentLevel || "medium").toLowerCase();
  const fwClass         = fw ? `fw-badge--${fw.framework.toLowerCase()}` : "";
  const iScore          = threat.inherentScore  || "—";
  const rScore          = threat.residualScore  || "—";
  const reduction       = (threat.inherentScore && threat.residualScore)
                          ? parseInt(threat.inherentScore) - parseInt(threat.residualScore)
                          : null;

  const countermeasureItems = fw
    ? fw.countermeasures.map(c => `<li>${c}</li>`).join("")
    : "";

  return `
    <div class="threat-report-card">
      <div class="threat-report-header">
        <div class="threat-report-title">
          <span class="threat-num">${num}</span>
          <span>${fw ? fw.label : threat.threatType}</span>
        </div>
        <div class="threat-header-badges">
          ${fw ? `<span class="fw-badge-inline ${fwClass}">${fw.frameworkFull}</span>` : ""}
          <span class="risk-pill risk-pill--${residualClass}">${threat.riskLevel || "—"} Risk</span>
        </div>
      </div>

      <div class="threat-report-body">
        ${fw ? `<div class="fw-control-ref">${fw.control}</div>` : ""}

        <!-- Score comparison -->
        <div class="score-comparison">
          <div class="score-box score-box--inherent">
            <div class="score-box-label">Inherent Risk Score</div>
            <div class="score-box-num">${iScore}</div>
            <span class="risk-pill risk-pill--${inherentClass}">${threat.inherentLevel || "—"}</span>
            ${threat.inherentLikelihood ? `<div class="score-box-detail">Likelihood ${threat.inherentLikelihood} × Impact ${threat.inherentImpact}</div>` : ""}
          </div>
          <div class="score-arrow">→</div>
          <div class="score-box score-box--residual">
            <div class="score-box-label">Residual Risk Score</div>
            <div class="score-box-num">${rScore}</div>
            <span class="risk-pill risk-pill--${residualClass}">${threat.riskLevel || "—"}</span>
            ${threat.residualLikelihood ? `<div class="score-box-detail">Likelihood ${threat.residualLikelihood} × Impact ${threat.residualImpact}</div>` : ""}
          </div>
          ${reduction !== null ? `
          <div class="score-box score-box--reduction">
            <div class="score-box-label">Score Reduction</div>
            <div class="score-box-num score-box-num--reduction">${reduction > 0 ? "−" + reduction : reduction === 0 ? "0" : "+" + Math.abs(reduction)}</div>
            <div class="score-box-detail">${reduction > 0 ? "Controls are effective" : reduction === 0 ? "No change" : "Controls need review"}</div>
          </div>` : ""}
        </div>

        <div class="report-grid">
          <div>
            <div class="report-field-label">Who May Be Harmed</div>
            <div class="report-field-value">${threat.who || "—"}</div>
          </div>
          <div>
            <div class="report-field-label">How</div>
            <div class="report-field-value">${threat.how || "—"}</div>
          </div>
          <div>
            <div class="report-field-label">Existing Controls in Place</div>
            <div class="report-field-value">${threat.existingControls || "—"}</div>
          </div>
          <div>
            <div class="report-field-label">Further Actions Required</div>
            <div class="report-field-value">${threat.furtherActions || "—"}</div>
          </div>
          <div>
            <div class="report-field-label">Action By Whom</div>
            <div class="report-field-value">${threat.actionByWhom || "—"}</div>
          </div>
          <div>
            <div class="report-field-label">Action Due By</div>
            <div class="report-field-value">${formatDate(threat.actionByWhen)}</div>
          </div>
          ${threat.completed ? `
          <div>
            <div class="report-field-label">Completed On</div>
            <div class="report-field-value">${formatDate(threat.completed)}</div>
          </div>` : ""}
        </div>

        ${fw ? `
        <div class="countermeasures">
          <div class="countermeasures-title">Recommended Countermeasures — ${fw.frameworkFull}</div>
          <ul class="countermeasures-list">${countermeasureItems}</ul>
        </div>` : ""}
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────
     Helpers
  ───────────────────────────────────────────── */
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
