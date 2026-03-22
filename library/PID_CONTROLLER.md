PID_CONTROLLER

NORMALISED EXTRACT:
Table of contents:
- Package metadata
- Purpose and relationship to Arduino PID library
- Constructor signature and core methods
- Example control loop usage

Package metadata:
- Name: pid-controller
- Latest release (dist-tags.latest): 1.0.5
- Description: A node advanced PID controller based on the Arduino PID library
- License: GPL-3.0
- Repository: git://github.com/wilberforce/pid-controller.git

Purpose and relationship to Arduino PID library:
- This package is a Node.js port inspired by the Arduino PID library; it exposes control patterns familiar to embedded PID users: sample time, output limits, auto/manual mode, and methods for setting input and computing output.

Constructor signature and core methods (extracted from README):
- Constructor: PID(initialInput:number, setpoint:number, Kp:number, Ki:number, Kd:number, mode?: string)
  - Example instantiation uses: new PID(temperature, temperatureSetpoint, Kp, Ki, Kd, 'direct')
- Methods and behaviour (README examples show these public methods):
  - setSampleTime(sampleTimeMs: number) -> void
    Sets the controller sample interval; typical use: setSampleTime(timeframe)
  - setOutputLimits(min:number, max:number) -> void
    Restricts the output range used by compute()/getOutput()
  - setMode(mode: 'auto' | 'manual') -> void
    Switches between automatic closed-loop operation and manual mode
  - setInput(value:number) -> void
    Provide the latest process variable (measurement)
  - compute() -> void
    Perform PID computation using internal input/setpoint/state; after calling compute(), output is updated
  - getOutput() -> number
    Returns the controller output computed by the last compute() call
  - setOutput(value:number) -> void
    In manual mode allows setting the output directly (used in examples to disable control)

Example control loop usage (plain text):
- Typical sequence: instantiate, configure sample time and output limits, setMode('auto'), then every sample:
  setInput(currentValue)
  compute()
  let output = getOutput()
  apply output to actuator

SUPPLEMENTARY DETAILS:
- The package exposes the same conceptual primitives as Arduino PID: sample time, output range, control mode and compute loop separation. This makes it suitable for porting PID-based control experiments to Node.js environments (e.g., Raspberry Pi).
- The library README demonstrates a temperature-control simulation to illustrate compute() interaction with input and output.

REFERENCE DETAILS (API signatures):
- PID(input:number, setpoint:number, Kp:number, Ki:number, Kd:number, mode?:string) -> PIDInstance
- PIDInstance.setSampleTime(sampleTimeMs:number) -> void
- PIDInstance.setOutputLimits(min:number,max:number) -> void
- PIDInstance.setMode(mode:'auto'|'manual') -> void
- PIDInstance.setInput(value:number) -> void
- PIDInstance.compute() -> void
- PIDInstance.getOutput() -> number
- PIDInstance.setOutput(value:number) -> void

DETAILED DIGEST:
- Source: registry.npmjs.org/pid-controller (package metadata + README) — retrieved 2026-03-22 — bytes downloaded: 8794
- README contains a temperature control example: create PID object with Kp,Ki,Kd, call setSampleTime, setOutputLimits, setMode('auto'), then repeatedly setInput, compute, and read getOutput.

ATTRIBUTION:
- Package author: Rhys Williams (github@wilberforce.co.nz)
- License: GPL-3.0
- Data derived from npm registry package metadata and README.
