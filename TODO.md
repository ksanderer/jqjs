# TODO

- [x] Implement basic string trimming functions `ltrimstr/1`, `rtrimstr/1`, and `trimstr/1`.
- [x] Provide whitespace trimming helpers `ltrim/0`, `rtrim/0`, and `trim/0`.
- [x] Add substring index helpers `index/1`, `rindex/1`, and `indices/1`.
- [x] Expose a numeric constant `nan/0`.
- [x] Support `walk/1` for recursively applying a filter.
- [x] Investigate fractional slice indexes such as `.[] | .[1.5:3.5]`.
- [x] Implement `foreach` loops.
- [x] Implement `try ... catch` error handling.

- [x] Provide built-ins `tojson/0` and `fromjson/0` for encoding and decoding JSON (see failing cases 19 and 493).
- [ ] Support string format modifiers such as `@base64` and `@base64d` (cases 13-15).
- [ ] Implement array grouping and ordering helpers `group_by/1`, `unique/0`, `min/0`, `max/0`, `min_by/1`, and `max_by/1` (cases 333-337).
- [ ] Support update assignment `=` and functions like `setpath/2` (cases 339, 488, 498).
- [ ] Provide object entry utilities `with_entries/1` and `from_entries/0` (cases 341-343).
- [ ] Add path utilities `paths/0`, `getpath/1`, and `delpaths/1` (cases 364 etc.).
- [ ] Implement array transforms `flatten/1` and `transpose/0` (cases 361-367).
- [ ] Provide search helpers `IN/1`, `IN/2`, `JOIN/2`, and `bsearch/1` (cases 369-417).
- [ ] Add date/time functions such as `strftime/1`, `mktime/0`, and `gmtime/0` (cases 372-382).
- [ ] Add math built-ins `pow/2`, `sqrt/0`, `sin/0`, `cos/0`, and `abs/0` (cases 269 and 409+).
