# VALIDATION_ERRORS

Overview

Define the exact error types and recommended messages so unit tests can assert correct failure modes.

Rules

- For string hamming:
  - If either argument is not a string: throw TypeError with message: arguments must be strings
  - If code-point lengths differ: throw RangeError with message: strings must have equal length
- For bit hamming:
  - If an argument is not an integer or bigint: throw TypeError with message: arguments must be non-negative integers
  - If an argument is negative: throw RangeError with message: integers must be non-negative

Acceptance Criteria

- Implementations use the specified error types and messages so unit tests can assert type and message.