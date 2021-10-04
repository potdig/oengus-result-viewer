import Terminal, { KeyboardEvent } from 'tty-events'

export class KeyWaiter {
  private _callbacks: Map<string, (terminal: Terminal) => void> = new Map()

  public addKey(key: string, callback: (terminal: Terminal) => void) {
    this._callbacks.set(key, callback)
  }

  public waitForKey() {
    const terminal = new Terminal(process.stdin, process.stdout, {})
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true)
    }

    terminal.addListener('keypress', (keyEvent: KeyboardEvent) => {
      const callback = this._callbacks.get(keyEvent.name)
      if (callback) {
        callback(terminal)
      }
    })
  }
}
