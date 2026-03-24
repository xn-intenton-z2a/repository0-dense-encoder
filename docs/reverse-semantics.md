# Clarification: "reverse" semantics

This project interprets the ambiguous phrase in MISSION.md "strip dashes from a UUID string, encode the 16 bytes, and reverse" as referring to the reverse operation (decode) — i.e., the library must provide a way to reverse the encoding and perform a round-trip.

Consequently:

- The library exposes encodeUUID(encodingName, uuid) and decodeUUID(encodingName, encoded) for round-trip encode/decode of UUIDs.
- The library does not perform a textual reversal (string reversal) of the encoded output by default.

This clarification is also summarised in README.md.
