export default function isJsObject(target: unknown): target is Record<string, unknown> {
  return Boolean(target && target.constructor === Object);
}
