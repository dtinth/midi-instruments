import { MIDI, createFeature } from '../core'

let wasDown = false
function updateGamepads() {
  let down = false
  for (const gamepad of navigator.getGamepads()) {
    if (!gamepad) continue
    for (const i of [10, 11]) {
      if (gamepad.buttons[i] && gamepad.buttons[i].pressed) {
        down = true
      }
    }
  }
  if (!wasDown && down) {
    wasDown = true
    // MIDI.send([0x99, 36, 127])
    // MIDI.send([0x89, 36, 127])
    MIDI.send([0xb0, 0x40, 127])
  } else if (wasDown && !down) {
    wasDown = false
    MIDI.send([0xb0, 0x40, 0])
  }
}

setInterval(updateGamepads, 16)

export default createFeature({
  name: 'joypedal',
  category: 'addons',
  description:
    'Press button 10 or 11 on any connected gamepad to activate the pedal. These buttons correspond to the analog buttons on a DualShock controller.',
})
