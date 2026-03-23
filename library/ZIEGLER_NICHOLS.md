ZIEGLER_NICHOLS

Table of contents
- Method overview
- Procedure to obtain Ku and Pu
- Suggested starting gains for PID
- Limitations and recommendations

Method overview
- Ziegler–Nichols tuning provides heuristic PID gains based on the ultimate gain (Ku) and ultimate period (Pu).

Procedure
1. Set Ki and Kd to zero.
2. Increase Kp until system oscillates with constant amplitude; that Kp is Ku.
3. Measure oscillation period Pu.
4. Apply formulas: for PID, Kp=0.6*Ku, Ki=2*Kp/Pu, Kd=Kp*Pu/8.

Limitations
- Works for linear systems with sustained oscillation; for discrete, quantized thrust systems results are only heuristic and require validation.

Crawl digest
- Retrieved Ziegler–Nichols page 2026-03-23.

Attribution
- Wikipedia Ziegler–Nichols method
