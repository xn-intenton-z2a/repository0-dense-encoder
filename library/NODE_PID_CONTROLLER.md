NODE_PID_CONTROLLER

NORMALISED EXTRACT:
Table of contents:
- Package metadata and purpose
- Installation
- Constructor signatures and options
- Public methods and behaviour
- Example usage (plain text)

Package metadata and purpose:
- Name: node-pid-controller
- Latest release (dist-tags.latest): 1.0.1
- Description: Node.js PID controller (simple PID implementation for closed-loop control)
- License: BSD
- Repository: git://github.com/Philmod/node-pid-controller

Installation:
- npm install node-pid-controller

Constructor signatures and options:
- Controller(options) where options is an object with numeric fields:
  k_p: proportional gain (number)
  k_i: integral gain (number)
  k_d: derivative gain (number)
  dt: sample interval in seconds (optional; if omitted the controller will calculate dt automatically)
  i_max: optional maximum absolute value for the integral term (optional clamp)
- Controller(k_p, k_i, k_d, dt) — alternate positional signature supported by the package

Public methods and behaviour:
- setTarget(target: number) -> void
  Sets the controller target set-point used when computing the error.
- update(measure: number) -> number
  Computes the control correction for the supplied measurement value using current PID terms and internal state; returns the correction (numeric output). Each call advances the controller by one sample interval (dt). When dt is not provided, the implementation computes elapsed time between update calls.
- Integral handling: the package supports an optional i_max value to cap the integral accumulator and prevent integral windup.
- Output semantics: update(...) returns a numeric correction value; the package README uses the correction directly as actuator input in closed-loop examples.

Example usage (plain text, extracted from package README):
- Create a controller with named options: create Controller with {k_p: 0.25, k_i: 0.01, k_d: 0.01, dt: 1}
- Set the setpoint using setTarget(120)
- On each loop sample call update(currentValue) and use returned correction to drive the actuator

SUPPLEMENTARY DETAILS:
- Sample interval dt handling: when dt is omitted the implementation measures elapsed time between update() calls to compute derivative and integral contributions; calling update at irregular intervals will change controller behaviour unless dt is explicitly supplied.
- Integral clamp (i_max): set i_max to limit the magnitude of the accumulated integral term to avoid windup in long errors. No explicit anti-windup back-calculation method is provided in the package README; the simple clamp is provided as an option.
- Edge cases: behaviour with NaN or non-numeric inputs is not specified in the README; callers should validate inputs before calling update.

REFERENCE DETAILS (API signatures and parameters):
- Controller(options: {k_p:number,k_i:number,k_d:number,dt?:number,i_max?:number}) -> ControllerInstance
- Controller(k_p:number,k_i:number,k_d:number,dt?:number) -> ControllerInstance
- ControllerInstance.setTarget(target:number) -> void
- ControllerInstance.update(measure:number) -> number

DETAILED DIGEST:
- Source: registry.npmjs.org/node-pid-controller (package metadata + README) — retrieved 2026-03-22 — bytes downloaded: 12271
- Readme contains installation, constructor signatures, option descriptions, an example showing: instantiate Controller with named options or positional args, setTarget(120), then call update(110) to receive correction output.

ATTRIBUTION:
- Package author/maintainer: Philmod <philippe.modard@gmail.com>
- License: BSD
- Data obtained from npm registry (registry.npmjs.org) and package README.
