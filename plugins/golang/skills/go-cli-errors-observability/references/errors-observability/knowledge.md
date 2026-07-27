# Errors and Observability Knowledge

## Four Layers

1. **Cause**: wrapped or typed error retaining programmatic identity.
2. **Classification**: invalid input, unavailable dependency, conflict,
   cancellation, timeout, permission, or internal defect.
3. **Presentation**: concise message, relevant context, and recovery action.
4. **Process mapping**: stable exit status or structured error envelope.

Keep classification independent of prose so messages can improve without
breaking callers.

## Evidence Channels

- Normal result data belongs on stdout.
- User diagnostics and logs belong on stderr or a configured log sink.
- Debug mode increases evidence detail, not result verbosity or secret exposure.
- A correlation ID can connect a concise failure to local or remote telemetry.

`slog` supports structured records, levels, attributes, handlers, and contextual
logging. Choose keys deliberately and avoid dumping arbitrary structs.

## Diagnostic Bundles

A bundle is a curated support artifact, not a filesystem or environment dump.
Define an allowlist such as version, platform, selected nonsecret settings,
sanitized logs, and a user-provided reproduction note. Show what will be
collected, redact again before serialization, and separate creation from upload.

## Profiling and Tracing

Profiles and traces can expose arguments, paths, request metadata, and workload
shape. Enable them explicitly, bind debug endpoints to loopback by default,
authenticate when exposure is possible, and impose collection limits.
