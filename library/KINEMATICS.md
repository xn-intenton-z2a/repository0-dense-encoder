KINEMATICS

Table of contents
- One-dimensional motion equations
- Sign conventions and discrete updates
- Application to lander simulation

One-dimensional motion equations
- Position update: x(t+dt) = x(t) + v(t)*dt + 0.5*a*dt^2
- Velocity update: v(t+dt) = v(t) + a*dt

Sign conventions and discrete updates
- Using positive downward velocity simplifies gravity as positive acceleration.
- For integer-per-tick updates with dt=1 and treating thrust as instantaneous velocity change, use v_{t+1}=v_t + gravity - thrustEffect

Application to lander simulation
- Because mission defines altitude decrement after velocity update, use discrete per-tick velocity then altitude step.

Crawl digest
- Retrieved Kinematics page 2026-03-23.

Attribution
- Wikipedia: Kinematics
