PONTRYAGIN_MAXIMUM_PRINCIPLE

NORMALISED EXTRACT:
Table of contents:
- Problem statement (optimal control)
- Hamiltonian definition
- State and costate (adjoint) equations
- Stationarity (optimality) condition for control
- Transversality / boundary conditions
- Special cases: time-optimal and bang-bang controls, singular arcs

Problem statement (standard form):
- Consider the optimal control problem on t in [t0, tf]:
  Minimize J[u,x] = phi(x(tf), tf) + ∫_{t0}^{tf} L(x(t), u(t), t) dt
  subject to state equations ẋ(t) = f(x(t), u(t), t), initial condition x(t0) = x0, and control constraint u(t) ∈ U (admissible set).

Hamiltonian definition:
- Define the Hamiltonian function H(x, u, λ, t) = L(x, u, t) + λ^T f(x, u, t)
  where λ(t) ∈ R^n is the costate (adjoint) vector.

State and costate (adjoint) equations:
- State equation (primal): ẋ(t) = ∂H/∂λ (x(t), u(t), λ(t), t) = f(x(t), u(t), t).
- Costate equation (adjoint): λ̇(t) = -∂H/∂x (x(t), u(t), λ(t), t) = -∂L/∂x - (∂f/∂x)^T λ(t).
  These hold a.e. on [t0, tf] along the optimal trajectory.

Stationarity (optimality) condition for the control:
- For problems stated as minimization, an optimal control u*(t) satisfies the pointwise condition:
  u*(t) ∈ argmin_{u ∈ U} H(x*(t), u, λ(t), t)
  equivalently, if U is unconstrained and H is differentiable in u, then ∂H/∂u (x*(t), u*(t), λ(t), t) = 0.
- For maximization formulations (common in some texts), replace argmin with argmax accordingly; sign convention must be consistent across L and H.

Transversality and boundary conditions:
- If terminal state x(tf) is free and terminal cost includes phi(x(tf), tf), then the costate must satisfy the transversality condition:
  λ(tf) = ∂φ/∂x (x(tf), tf).
- If final time tf is free, an additional scalar condition holds involving the Hamiltonian:
  H(x(tf), u(tf), λ(tf), tf) + ∂φ/∂t (x(tf), tf) = 0 (proper sign depending on minimization/maximization formulation).
- If final state is fixed, λ(tf) is determined by Lagrange multipliers enforcing the constraint and the simple equality above does not apply.

Special cases and consequences:
- Control-affine systems (ẋ = f0(x) + g(x) u) often yield bang-bang optimal solutions when the Hamiltonian is linear in u and U is a compact set; the optimal control switches between extreme allowed values according to the sign of the switching function s(t) = ∂H/∂u.
- Singular arcs occur when ∂H/∂u = 0 identically over a nontrivial interval; higher-order derivatives of the Hamiltonian w.r.t. time and control must be examined to determine control along singular arcs.
- Time-optimal control problems can be posed by choosing L(x,u,t) = 1 and minimizing final time; Pontryagin gives necessary conditions which often reduce to bang-bang laws.

SUPPLEMENTARY DETAILS:
- Implementation implications for discrete-time simulators: Pontryagin's conditions are continuous-time necessary conditions; for discrete-time simulation approximate necessary conditions via discrete-time adjoint equations or use direct transcription and nonlinear programming.
- When applying in practice, numerically integrate forward the state equation with a candidate control, integrate the costate backward (terminal condition from ∂φ/∂x), then update control by minimizing the Hamiltonian using the computed costate (shooting method). Iteratively solve boundary-value problems or use direct collocation for robust numerical implementation.

REFERENCE DETAILS (equations and precise statements):
- Problem: minimize J = φ(x(tf), tf) + ∫_{t0}^{tf} L(x, u, t) dt subject to ẋ = f(x,u,t), x(t0) = x0.
- Hamiltonian: H(x,u,λ,t) = L(x,u,t) + λ^T f(x,u,t).
- Costate ODE: λ̇(t) = -∂H/∂x (x(t), u(t), λ(t), t).
- Stationarity: u*(t) ∈ argmin_{u ∈ U} H(x*(t), u, λ(t), t) for minimization problems.
- Transversality: λ(tf) = ∂φ/∂x(x(tf), tf) when final state is free; free final time condition H(tf) + ∂φ/∂t = 0.

DETAILED DIGEST:
- Source: https://en.wikipedia.org/wiki/Pontryagin%27s_maximum_principle — retrieved 2026-03-22 — bytes downloaded: 180531
- The Wikipedia article contains the formal statement of the necessary conditions (Hamiltonian, adjoint equations, stationarity, transversality) and discussions of bang-bang, singular controls, and examples demonstrating time-optimal and fuel-optimal cases. The document reproduces the standard set of conditions above used in continuous optimal control theory.

ATTRIBUTION:
- Content adapted from Wikipedia: Pontryagin's maximum principle (CC BY-SA). Data retrieved 2026-03-22 from en.wikipedia.org.
