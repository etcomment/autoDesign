import { describe, it, expect } from 'vitest'
import { computeDiagnostics } from '../diagnostics'

describe('computeDiagnostics (templates)', () => {
  it('signale un avertissement pour un nom d icône inconnu', () => {
    const dsl = '@puzzle2\n  piece "Identify" "desc" icon:compass #2c2b64'
    const diagnostics = computeDiagnostics('templates', dsl)
    expect(diagnostics).toHaveLength(1)
    expect(diagnostics[0]!.severity).toBe('warning')
    expect(diagnostics[0]!.message).toContain('compass')
  })

  it('ne signale rien pour une icône valide', () => {
    const dsl = '@puzzle2\n  piece "Identify" "desc" icon:briefcase #2c2b64'
    const diagnostics = computeDiagnostics('templates', dsl)
    expect(diagnostics).toHaveLength(0)
  })
})
