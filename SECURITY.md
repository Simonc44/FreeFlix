# Security Policy 

## Supported Versions

FreeFlix is currently maintained on the `main` branch and does not publish semantic versioned releases (no tags/releases are published at this time).

| Version / Branch | Supported |
| ---------------- | --------- |
| main             | :white_check_mark: Active — security fixes applied on main |
| Releases (tagged) | :x: None published |
| Archived snapshots | :x: No support |

> If you start publishing releases (e.g. `v1.0.0`), this table will be updated to indicate which series are supported.

---

## Reporting a Vulnerability

Thank you for responsibly disclosing security issues. Preferred private disclosure channels (in order):

1. **GitHub Security Advisory (private)** — preferred. Create a private advisory for this repository.  
2. **Email:** `simon.chusseau@gmail.com` — if you cannot open a private advisory.  
   - Subject: `[Security] FreeFlix — <short description>`  
   - Provide: affected branch/commit (SHA), file(s), reproduction steps, PoC (if safe), severity assessment, and contact details.

**Do NOT** open a public GitHub issue containing exploit code or PoC. Use a private advisory or the email above for sensitive details.

---

## What to expect after reporting

1. **Acknowledgement:** within **3 business days**.  
2. **Triage:** initial assessment within **7 calendar days**.  
3. **Fix & Coordination:** when a valid vulnerability is confirmed we will:
   - Work on a fix or mitigation as priority.
   - Coordinate disclosure timeline with the reporter (default embargo: **30 days** unless otherwise agreed).
   - Publish a public advisory and request a CVE if appropriate.

If we do not respond within the stated timelines, please reply to the original message to escalate.

---

## Information to include in a report

To reproduce and fix the issue quickly, please provide:

- Branch and commit SHA (or file path + line numbers).  
- Minimal reproduction steps and expected vs actual behavior.  
- PoC/exploit code **only** via private advisory or encrypted email.  
- Suggested mitigation if you have one.  
- Preferred disclosure handling (embargo length, CVE request, anonymity).

---

## Secure communication (PGP)

If you prefer encrypted communication, request the maintainer's PGP key in your first non-sensitive contact; we will provide it.

---

## Scope

**In-scope:**
- Code and configuration within this repository (files under the `main` branch). Examples: `src/`, `next.config.ts`, `firebase.json`, `.firebaserc`, `apphosting.yaml`, `package.json`. :contentReference[oaicite:5]{index=5}

**Out-of-scope:**
- Third-party services and dependencies (report upstream).  
- Misconfigurations in user-hosted deployments unless they are reproducible using the repository defaults.

---

## Disclosure & credit

- We appreciate responsible disclosure. Reporters who follow this policy will be credited in advisories unless they request anonymity.  
- If you request a CVE, state that preference in your report.

---

## Contact

- **Primary contact:** `simon.chusseau@gmail.com` (maintainer)  
- **Repo:** `https://github.com/Simonc44/FreeFlix`. :contentReference[oaicite:6]{index=6}

_Last updated: YYYY-MM-DD_
