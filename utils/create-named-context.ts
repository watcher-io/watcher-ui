/**
 * Helper function to createContext and set display name
 */
import { createContext } from "react"
import type * as React from "react"

function createNamedContext<ContextValueType>(
  name: string,
  defaultValue: ContextValueType
): React.Context<ContextValueType> {
  const Ctx = createContext<ContextValueType>(defaultValue)
  Ctx.displayName = name
  return Ctx
}

export default createNamedContext
